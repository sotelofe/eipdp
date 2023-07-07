import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, RequiredValidator } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { SesionService } from '../services/sesion.service';
import { ResponseLogin } from '../model/responselogin';
import {Excencionrequest} from '../model/excencionrequest';
import {Preguntasexcencion} from '../model/preguntasexcencion';
import {ExcencionService} from '../services/excencion.service';
import {Excencionresponse} from '../model/excencionresponse';
import {ExencionUtilService} from '../services/exencion.util.service';

@Component({
  selector: 'app-preconsulta',
  templateUrl: './preconsultaexencion.component.html',
  styleUrls: ['./preconsultaexencion.component.scss']
})
export class PreconsultaexencionComponent implements OnInit {
  @ViewChild('frameOk', { static: true }) frameOk: ModalDirective;
  @ViewChild('frameFail', { static: true }) frameFail: ModalDirective;
  public formPreconsulta:Excencionrequest;
  public preguntas: Preguntasexcencion[];
  public form: FormGroup;
  public chipervinculo:number;
  public response: Excencionresponse;
  public usuario:ResponseLogin;
  public barchivo = false;

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private excencionService: ExcencionService,
    private exencionUtil: ExencionUtilService,
    private spinner: NgxSpinnerService,
    private serviceSesion:SesionService
  ) {
    this.preguntas = [];
    this.formPreconsulta = new Excencionrequest(0, this.preguntas);
    this.createForm();
    this.chipervinculo =0;
    this.response = new Excencionresponse(0, '','');
  }

  ngOnInit(): void {
    this.usuario = this.serviceSesion.obtenerSesionUsuario();
  }

  createForm() {
    this.form = this.fb.group({
      denominacion:['', Validators.required],
      politica:['', Validators.required],
      relevante: ['', Validators.required],
      razones: ['', Validators.required],
      finaldades: ['', Validators.required],
      motivos: ['', Validators.required],
      emergencia: ['', Validators.required],
      fundamento: ['', Validators.required],
      fechaPolitica: ['', Validators.required],
      opinionTecnica: ['', Validators.required],
      mecanismosDiseño: ['', Validators.required],
      mecanismosDefecto: ['', Validators.required],
      informacionAdicional: ['', Validators.required],
      documentosAnexos: ['', Validators.required],
      objetivosGenerales: ['', Validators.required],
      objetivosEspecificos: ['', Validators.required],
      enlaceWeb: [''],
      archivoRazones: ['',Validators.required],
      archivoFinalidades: ['',Validators.required],
      archivoMotivos: ['',Validators.required],
      archivoConsecuencias: ['',Validators.required],
      archivoFundamentos: ['',Validators.required],
      archivoOpinion: ['',Validators.required],
      archivoMecanismos: ['',Validators.required],
      archivoInformacion: ['',Validators.required],
    });
  }

  setRadioValue(valorRadio: string, idForm: string) {
    this.form.get(idForm).setValue(valorRadio);
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

  onFileChange(event, idForm: string) {
    
    if (event.target.value.length == 0) {
      event.target.value = null;    
      this.barchivo = false;
      this.form.get(idForm).setValue({
        filename: "",
        filetype: "",
        value: ""
      });
      return;
    }
    
    const size = event.srcElement.files[0].size;
    const name = event.srcElement.files[0].name; 
   

    if(size == 0 || size > 10485760){
      this.toastr.warning('El archivo no puede exceder los 10 megas...', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = null;      
      this.form.get(idForm).setValue({
        filename: "",
        filetype: "",
        value: ""
      });
      return;
    }else if(this.validarExtension(name)){
      this.toastr.warning('La extensión permitida para los archivos es .zip o .pdf, favor de revisar', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = null;      
      this.form.get(idForm).setValue({
        filename: "",
        filetype: "",
        value: ""
      });
      return;
    }else{
      event.stopPropagation();
      event.preventDefault();
      if(event.target.files && event.target.files.length > 0) {
        
        const reader = new FileReader();
        const file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.form.get(idForm).setValue({
              filename: file.name,
              filetype: file.type,
              value: (reader.result as string).split(',')[1]
            });
            this.barchivo = true;
        };
      }
    }

  }

  guardarCuestionario(){
    let index=0;
    if(!this.validar()) {
      return;
    }
    this.preguntas[index++] = new Preguntasexcencion(1,1, this.form.value.denominacion, null);
    this.preguntas[index++] = new Preguntasexcencion(1,2, this.form.value.politica, null);
    this.preguntas[index++] = new Preguntasexcencion(1,3, this.form.value.objetivosGenerales, null);
    this.preguntas[index++] = new Preguntasexcencion(1,4, this.form.value.objetivosEspecificos, null);
    this.preguntas[index++] = new Preguntasexcencion(1,5, this.form.value.relevante, null);
    this.preguntas[index++] = new Preguntasexcencion(1,6, this.form.value.razones, null);
    this.preguntas[index++] = new Preguntasexcencion(1,7, '', this.form.value.archivoRazones);

    this.preguntas[index++] = new Preguntasexcencion(2,1, '', this.form.value.archivoFinalidades);
    this.preguntas[index++] = new Preguntasexcencion(2,2, this.form.value.finaldades, null);

    this.preguntas[index++] = new Preguntasexcencion(3,1, '', this.form.value.archivoMotivos);
    this.preguntas[index++] = new Preguntasexcencion(3,2, this.form.value.motivos, null);
    this.preguntas[index++] = new Preguntasexcencion(3,3, this.form.value.emergencia, null);

    this.preguntas[index++] = new Preguntasexcencion(4,1, '', this.form.value.archivoConsecuencias);

    this.preguntas[index++] = new Preguntasexcencion(5,1, '', this.form.value.archivoFundamentos);
    this.preguntas[index++] = new Preguntasexcencion(5,2, this.form.value.fundamento, null);
    this.preguntas[index++] = new Preguntasexcencion(5,3, this.obtenerEnlaceWeb(this.form.value.enlaceWeb), null);

    this.preguntas[index++] = new Preguntasexcencion(6,1, this.form.value.fechaPolitica, null);

    this.preguntas[index++] = new Preguntasexcencion(7,1, '', this.form.value.archivoOpinion);
    this.preguntas[index++] = new Preguntasexcencion(7,2, this.form.value.opinionTecnica, null);

    this.preguntas[index++] = new Preguntasexcencion(8,1, '', this.form.value.archivoMecanismos);
    this.preguntas[index++] = new Preguntasexcencion(8,2, this.form.value.mecanismosDiseño, null);
    this.preguntas[index++] = new Preguntasexcencion(8,3, this.form.value.mecanismosDefecto, null);

    this.preguntas[index++] = new Preguntasexcencion(9,1, '', this.form.value.archivoInformacion);
    this.preguntas[index++] = new Preguntasexcencion(9,2, this.form.value.informacionAdicional, null);
    this.preguntas[index++] = new Preguntasexcencion(9,3, this.form.value.documentosAnexos, null);

    this.formPreconsulta.idUsuario = this.usuario.usuario.idUsuario;
    this.formPreconsulta.preguntas = this.preguntas;

    this.spinner.show();
    this.excencionService.registrarFlujo(this.formPreconsulta).subscribe(
      result => {
        this.response = result;
        if (this.response != null) {
          console.log('Respuesta: ' + JSON.stringify(this.response));
          if(this.response.code === 0){
            this.spinner.hide();
            this.frameOk.show();
          } else{
            this.spinner.hide();
            this.exencionUtil.mostrarAviso('No se pudo registrar el cuestionario');
          }
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

  private obtenerEnlaceWeb(enlaceWeb: string) {
    if (this.form.value.fundamento === 'Si'){
      return enlaceWeb;
    }
    return '';
  }

  private validar() {
    if(this.exencionUtil.isEmpty(this.form.value.denominacion)) {
      this.exencionUtil.mostrarAviso('El campo denominación es requerido, letra(a) seccion 1');
      return false;
    }

    if(this.exencionUtil.isEmpty(this.form.value.politica)) {
      this.exencionUtil.mostrarAviso('El campo política pública es requerido, letra(b) seccion 1');
      return false;
    }

    if(this.exencionUtil.isEmpty(this.form.value.objetivosGenerales)) {
      this.exencionUtil.mostrarAviso('El campo objetivos generales es requerido, letra(c) seccion 1');
      return false;
    }

    if(this.exencionUtil.isEmpty(this.form.value.objetivosEspecificos)) {
      this.exencionUtil.mostrarAviso('El campo objetivos especificos es requerido, letra(c) seccion 1');
      return false;
    }

    if(this.exencionUtil.isEmpty(this.form.value.relevante)) {
      this.exencionUtil.mostrarAviso('El campo tratamiento relevante es requerido, letra(d) seccion 1');
      return false;
    }

    if(this.exencionUtil.isEmpty(this.form.value.razones)) {
      this.exencionUtil.mostrarAviso('El campo razones es requerido, letra(e) seccion 1');
      return false;
    }
    
    if(this.exencionUtil.isEmpty(this.form.value.archivoRazones.filename)) {
      this.exencionUtil.mostrarAviso('Cargar el archivo de la sección 1');
      return false;
    }

    if(this.exencionUtil.isEmpty(this.form.value.archivoFinalidades.filename)) {
      this.exencionUtil.mostrarAviso('Cargar el archivo de la sección 2');
      return false;
    }

    if(this.exencionUtil.isEmpty(this.form.value.finaldades)) {
      this.exencionUtil.mostrarAviso('El campo finalidades del tratamiento de la sección 2 es requerido');
      return false;
    }

    if(this.exencionUtil.isEmpty(this.form.value.archivoMotivos.filename)) {
      this.exencionUtil.mostrarAviso('Cargar el archivo de la sección 3');
      return false;
    }

    if(this.exencionUtil.isEmpty(this.form.value.motivos)) {
      this.exencionUtil.mostrarAviso('El campo razones o motivos de la sección 3 es requerido');
      return false;
    }

    if(this.exencionUtil.isEmpty(this.form.value.emergencia)) {
      this.exencionUtil.mostrarAviso('El campo situación de emergencia de la sección 3 es requerido');
      return false;
    }

    if(this.exencionUtil.isEmpty(this.form.value.archivoConsecuencias.filename)) {
      this.exencionUtil.mostrarAviso('Cargar el archivo de la sección 4');
      return false;
    }

    if(this.exencionUtil.isEmpty(this.form.value.archivoFundamentos.filename)) {
      this.exencionUtil.mostrarAviso('Cargar el archivo de la sección 5');
      return false;
    }

    if(this.exencionUtil.isEmpty(this.form.value.fundamento)) {
      this.exencionUtil.mostrarAviso('El campo fundamento legal de la sección 5 es requerido');
      return false;
    }

    if(this.form.value.fundamento==='Si' && this.exencionUtil.isEmpty(this.form.value.enlaceWeb)) {
      this.exencionUtil.mostrarAviso('El campo de hipervinculo web del fundamento legal de la sección 5 es requerido');
      return false;
    }

    if(this.exencionUtil.isEmpty(this.form.value.fechaPolitica)) {
      this.exencionUtil.mostrarAviso('El campo fecha de la sección 6 es requerido');
      return false;
    }

    if(this.exencionUtil.isEmpty(this.form.value.archivoOpinion.filename)) {
      this.exencionUtil.mostrarAviso('Cargar el archivo de la sección 7');
      return false;
    }

    if(this.exencionUtil.isEmpty(this.form.value.opinionTecnica)) {
      this.exencionUtil.mostrarAviso('El campo opinión de la sección 7 es requerido');
      return false;
    }


    if(this.exencionUtil.isEmpty(this.form.value.archivoMecanismos.filename)) {
      this.exencionUtil.mostrarAviso('Cargar el archivo de la sección 8');
      return false;
    }

    if(this.exencionUtil.isEmpty(this.form.value.mecanismosDiseño)) {
      this.exencionUtil.mostrarAviso('El campo mecanismo desde el diseño de la sección 8 es requerido');
      return false;
    }

    if(this.exencionUtil.isEmpty(this.form.value.mecanismosDefecto)) {
      this.exencionUtil.mostrarAviso('El campo mecanismo cumpla obligaciones de la sección 8 es requerido');
      return false;
    }


    if(this.exencionUtil.isEmpty(this.form.value.archivoInformacion.filename)) {
      this.exencionUtil.mostrarAviso('Cargar el archivo de la sección 9');
      return false;
    }

    if(this.exencionUtil.isEmpty(this.form.value.informacionAdicional)) {
      this.exencionUtil.mostrarAviso('El campo información adicional de la sección 9 es requerido');
      return false;
    }

    if(this.exencionUtil.isEmpty(this.form.value.documentosAnexos)) {
      this.exencionUtil.mostrarAviso('El campo documentos anexos de la sección 9 es requerido');
      return false;
    }

  

    

    if(!this.validarEnlace()) {
      return false;
    }
    return true;
  }

  private validarEnlace() {
    if (this.form.value.fundamento === 'Si'){
      console.log('Enlace Web: ' + this.form.value.enlaceWeb);
       if (this.exencionUtil.isEmpty(this.form.value.enlaceWeb)) {
         this.exencionUtil.mostrarMensaje('El campo enlace web es requerido');
         return false;
       }
       /*if(!this.exencionUtil.validaURL(this.form.value.enlaceWeb)) {
         this.exencionUtil.mostrarMensaje('El campo enlace no tiene el formato correcto de una url');
         return false;
       }*/
    }
    return true;
  }

  navegaBandeja() {
    let dash = sessionStorage.getItem("dashboard");
    if(dash === 'expediente'){
      this._router.navigate(['/expedientes']);
    }else{
      this._router.navigate(['/exencion']);
    }
  }
}
