import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SesionService } from '../services/sesion.service';
import { ModalDirective } from 'ng-uikit-pro-standard';
import {Preguntasexcencion} from '../model/preguntasexcencion';
import {Excencionrequest} from '../model/excencionrequest';
import {ResponseLogin} from '../model/responselogin';
import {Excencionresponse} from '../model/excencionresponse';
import {ExcencionService} from '../services/excencion.service';
import {ExencionUtilService} from '../services/exencion.util.service';

@Component({
  selector: 'app-generando',
  templateUrl: './respuesta.component.html',
  styleUrls: ['./respuesta.component.scss']
})
export class RespuestaComponent implements OnInit {
  @ViewChild('frameOk', { static: true }) frameOk: ModalDirective;
  @ViewChild('frameFail', { static: true }) frameFail: ModalDirective;
  public form: FormGroup;
  public preguntasRespuesta: Preguntasexcencion[];
  public peticionRespuesta:Excencionrequest;
  public usuario:ResponseLogin;
  public response: Excencionresponse;

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private serviceSesion:SesionService,
    private exencionUtil: ExencionUtilService,
    private excencionService: ExcencionService,
  ) {
    this.preguntasRespuesta = [];
    this.peticionRespuesta = new Excencionrequest(0, this.preguntasRespuesta);
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      asunto:['', Validators.required],
      opinion:['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.usuario = this.serviceSesion.obtenerSesionUsuario();
  }

  onFileChange(event) {
    if(event.target.value.length == 0) {
      
      event.target.value = null;
      this.form.controls['opinion'].setValue("");
      return;
    }
      

    const size = event.srcElement.files[0].size;
    const name = event.srcElement.files[0].name; 

    if(size == 0 || size > 10485760){
      this.toastr.warning('El archivo no puede exceder los 10 megas...', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = null;
     
          this.form.get('opinion').setValue({
            filename: "",
            filetype: "",
            value: ""
          });        
          this.form.controls['opinion'].setValue("");
          
      return;
    }else if(this.validarExtension(name)){
      this.toastr.warning('La extensión permitida para los archivos es .zip o .pdf, favor de revisar', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = null;      
          
            this.form.get('opinion').setValue({
              filename: "",
              filetype: "",
              value: ""
            });
            this.form.controls['opinion'].setValue("");
            
      return;
    }else{
      const reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('opinion').setValue({
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
    const ID_RESPUESTA = 12;
    this.preguntasRespuesta[0] = new Preguntasexcencion(ID_RESPUESTA,1, '', this.form.value.opinion);
    this.preguntasRespuesta[1] = new Preguntasexcencion(ID_RESPUESTA,2, this.form.value.asunto, null);

    this.peticionRespuesta.idUsuario = this.usuario.usuario.idUsuario;
    this.peticionRespuesta.preguntas = this.preguntasRespuesta;

    this.spinner.show();
    this.excencionService.registrarRespuesta(this.peticionRespuesta,folio).subscribe(
      result => {
            this.response = result;
            if (this.response !=null ) {
                console.log('Respuesta: ' + JSON.stringify(this.response));
                if(this.response.code === 0){
                  this.spinner.hide();
                  this.exencionUtil.mostrarMensaje('La respuesta para el folio ' + folio + ' se ha enviado de forma correcta');
                }else{
                  this.spinner.hide();
                  this.exencionUtil.mostrarAviso('No se pudo registrar la respuesta');
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

  validar() {
    if (this.exencionUtil.isEmpty(this.form.value.asunto)) {
      this.exencionUtil.mostrarMensaje('El campo asunto es requerido');
      return false;
    }
    return true;
  }
}
