import { Component, OnInit, ViewChild } from '@angular/core';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadF } from '../model/upload';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { UsuarioDTO } from '../model/usuario';
import { Router } from '@angular/router';
import { CuestionarioDTO } from '../model/cuestionario.dto';
import {Excencionresponse} from '../model/excencionresponse';
import {ExcencionService} from '../services/excencion.service';
import {Preguntasexcencion} from '../model/preguntasexcencion';
import {SesionService} from '../services/sesion.service';
import {ResponseLogin} from '../model/responselogin';
import {Excencionrequest} from '../model/excencionrequest';
import {ExencionUtilService} from '../services/exencion.util.service';

@Component({
  selector: 'app-ria',
  templateUrl: './riaexencion.component.html',
  styleUrls: ['./riaexencion.component.scss']
})
export class RiaexencionComponent implements OnInit {
  @ViewChild('frameOk', { static: true }) frameOk: ModalDirective;
  @ViewChild('frameFail', { static: true }) frameFail: ModalDirective;
  public faDownload=faDownload;
  public form: FormGroup;
  public user:UsuarioDTO[];
  public archivo:UploadF;
  public response: Excencionresponse;
  public preguntasRia: Preguntasexcencion[];
  public usuario:ResponseLogin;
  public peticionRia:Excencionrequest;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private _router: Router,
    private serviceSesion:SesionService,
    private exencionUtil: ExencionUtilService,
    private excencionService: ExcencionService,
  ) {
    this.createForm();
    this.archivo= new UploadF('','','');
    this.response = new Excencionresponse(0, '','');
    this.preguntasRia = [];
    this.peticionRia = new Excencionrequest(0,this.preguntasRia);
   }

  ngOnInit(): void {
    this.usuario = this.serviceSesion.obtenerSesionUsuario();
    this.precargaRia();
  }

  createForm() {
    this.form = this.fb.group({
      asunto:['', Validators.required],
      sria:['', Validators.required],
    });
  }

  precargaRia(){
    const folio = sessionStorage.getItem('folioExencion');
    this.spinner.show();
    this.excencionService.consultarCuestionario(folio).subscribe(
      result => {
        this.response = result;
        if (this.response != null) {
          console.log('Respuesta: '  + JSON.stringify(this.response));
          this.initForm( this.response.payload);
        } else {
          this.spinner.hide();
          this.exencionUtil.mostrarError('No se pudo realizar la operación');
        }
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
      },(error:any)=>{
        console.log(error);
        this.spinner.hide();
        this.exencionUtil.mostrarError('Servicio no disponible');
      }
    );
  }

  initForm(cuestionario:CuestionarioDTO[]){
    cuestionario.forEach((c)=>{
      if(c.pregunta !=  null) {
          if(c.pregunta === 11 && c.subpregunta === 1) {
            this.archivo = new UploadF(c.respuesta,c.idCuestionario.toString(),c.rutaArchivo);
          }
      }
    });
  }

  onFileChange(event) {


    if(event.target.value.length == 0) {
      this.form.controls['sria'].setValue("");
        event.target.value = null;
        return;    
    }

    const size = event.srcElement.files[0].size;
    const name = event.srcElement.files[0].name; 

    if(size == 0 || size > 10485760){
      this.toastr.warning('El archivo no puede exceder los 10 megas...', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = null;
     
          this.form.get('sria').setValue({
            filename: "",
            filetype: "",
            value: ""
          });        
          this.form.controls['sria'].setValue("");
          
      return;
    }else if(this.validarExtension(name)){
      this.toastr.warning('La extensión permitida para los archivos es .zip o .pdf, favor de revisar', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = null;      
          
            this.form.get('sria').setValue({
              filename: "",
              filetype: "",
              value: ""
            });
            this.form.controls['sria'].setValue("");
            
      return;
    }else{
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('sria').setValue({
          filename: file.name,
          filetype: file.type,
          value: (reader.result as string).split(',')[1]
        })
      };
    }    
  }

  validarExtension(nombre:string){
    let indice = nombre.indexOf(".");
    let extension = nombre.substring(indice+1);   
    console.log(extension);
    if(extension === 'pdf' || extension ==='zip'){
      return false;
    }else{
      return true;
    }
  }

  enviar(){
    if(!this.validar()) {
      return;
    }
    const folio = sessionStorage.getItem('folioExencion');
    const ID_RESPUESTA_RIA = 13;
    this.preguntasRia[0] = new Preguntasexcencion(ID_RESPUESTA_RIA,1, '', this.form.value.sria);
    this.preguntasRia[1] = new Preguntasexcencion(ID_RESPUESTA_RIA,2, this.form.value.asunto, null);

    this.peticionRia.idUsuario = this.usuario.usuario.idUsuario;
    this.peticionRia.preguntas = this.preguntasRia;

    this.spinner.show();
    this.excencionService.enviarRia(this.peticionRia,folio).subscribe(
      result => {
        this.response = result;
        if (this.response !=null ) {
          console.log('Respuesta: ' + JSON.stringify(this.response));
          if(this.response.code === 0){
            this.spinner.hide();
            this.exencionUtil.mostrarMensaje('La información adicional para el folio ' + folio + ' se ha enviado de forma correcta');
          }else{
            this.spinner.hide();
            this.exencionUtil.mostrarAviso('No se pudo registrar la información adicional');
          }
        } else {
          this.spinner.hide();
          this.exencionUtil.mostrarError('No se pudo realizar la operación');
        }

        setTimeout(() => {
          this.spinner.hide();
          this.navegaBandeja();
        }, 1000);

      },(error: any) => {
        console.log(error);
        this.spinner.hide();
        this.exencionUtil.mostrarError('Servicio no disponible');
      }
    );
  }

  navegaBandeja(){
    let dash = sessionStorage.getItem("dashboard");
    if(dash === 'expediente'){
      this._router.navigate(['/expedientes']);
    }else{
      this._router.navigate(['/exencion']);
    }
  }

  descargarArchivo(idPregunta:string){
    this.excencionService.descargarDocumento(idPregunta);
  }

  validar() {
    if(this.exencionUtil.isEmpty(this.form.value.asunto)) {
      this.exencionUtil.mostrarMensaje('El campo asunto es requerido');
      return false;
    }
    return true;
  }

}
