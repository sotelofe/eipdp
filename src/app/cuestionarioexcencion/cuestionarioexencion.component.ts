import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, RequiredValidator } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { SesionService } from '../services/sesion.service';
import { ResponseLogin } from '../model/responselogin';
import {ExcencionService} from '../services/excencion.service';
import {Excencionresponse} from '../model/excencionresponse';
import {CuestionarioDTO} from '../model/cuestionario.dto';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import {UploadF} from '../model/upload';
import {Preguntasexcencion} from '../model/preguntasexcencion';
import {Excencionrequest} from '../model/excencionrequest';
import {ExencionUtilService} from '../services/exencion.util.service';
@Component({
  selector: 'app-preconsulta',
  templateUrl: './cuestionarioexencion.component.html',
  styleUrls: ['./cuestionarioexencion.component.scss']
})
export class CuestionarioexencionComponent implements OnInit,  AfterViewInit {
  @ViewChild('frameOk', { static: true }) frameOk: ModalDirective;
  @ViewChild('frameFail', { static: true }) frameFail: ModalDirective;
  @ViewChild('frameria', { static: true }) frameria: ModalDirective;

  public form: FormGroup;
  public response: Excencionresponse;
  public usuario:ResponseLogin;
  public faDownload = faDownload;
  public archivoRazones: UploadF;
  public archivoFinalidades: UploadF;
  public archivoMotivos: UploadF;
  public archivoConsecuencias: UploadF;
  public archivoFundamentos: UploadF;
  public archivoOpinion: UploadF;
  public archivoMecanismos: UploadF;
  public archivoInformacion: UploadF;
  public preguntasAceptacion: Preguntasexcencion[];
  public preguntasRia: Preguntasexcencion[];
  public peticionAceptacion:Excencionrequest;
  public peticionRia:Excencionrequest;
  public formAprobar: FormGroup;
  public formRIA: FormGroup;
  public botones:boolean=false;

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private excencionService: ExcencionService,
    private exencionUtil: ExencionUtilService,
    private spinner: NgxSpinnerService,
    private serviceSesion:SesionService
  ) {
    this.createForm();
    this.preguntasAceptacion=[];
    this.preguntasRia = [];
    this.peticionAceptacion = new Excencionrequest(0, this.preguntasAceptacion);
    this.peticionRia = new Excencionrequest(0,this.preguntasRia);
    this.response = new Excencionresponse(0, '','');
    this.archivoRazones = new UploadF('','','');
    this.archivoFinalidades = new UploadF('','','');
    this.archivoMotivos = new UploadF('','','');
    this.archivoConsecuencias = new UploadF('','','');
    this.archivoFundamentos = new UploadF('','','');
    this.archivoOpinion = new UploadF('','','');
    this.archivoMecanismos = new UploadF('','','');
    this.archivoInformacion = new UploadF('','','');
    let origen = sessionStorage.getItem("origenhistorico");
    if(origen!=null){
      this.botones = true;
    }
  }

  ngOnInit(): void {
    this.usuario = this.serviceSesion.obtenerSesionUsuario();
  }

  ngAfterViewInit(): void {
    this.consultarCuestionario();
  }

  createForm() {
    this.form = this.fb.group({
      denominacion:[''],
      politica:[''],
      relevante: [''],
      razones: [''],
      finaldades: [''],
      motivos: [''],
      emergencia: [''],
      fundamento: [''],
      fechaPolitica: [''],
      opinionTecnica: [''],
      mecanismosDiseno: [''],
      mecanismosDefecto: [''],
      informacionAdicional: [''],
      documentosAnexos: [''],
      objetivosGenerales: [''],
      objetivosEspecificos: [''],
      enlaceWeb: ['']
    });

    this.formAprobar = this.fb.group({
      aprobar: ['', Validators.required],
    });

    this.formRIA = this.fb.group({
      docria:['', Validators.required],
    });


  }

  onFileChange(event, idForm: string) {

    if(event.target.value.length == 0) {
     
        event.target.value = null;
        console.log("Aqui debe de entrar solo cuando se cancela");

        if(idForm === 'aprobar') {
          this.formAprobar.get('aprobar').setValue({
            filename: "",
            filetype: "",
            value: ""
          });
          this.formAprobar.value.aprobar =null;
          this.formAprobar.reset();
          
        }else if(idForm === 'docria') {
          console.log("Aqui solo ria");
          this.formRIA.get('docria').setValue({
            filename: "",
            filetype: "",
            value: ""
          });
          this.formRIA.value.docria =null;
          this.formRIA.reset();
        }
        return;
    }

    const size = event.srcElement.files[0].size;
    const name = event.srcElement.files[0].name; 

    if(size == 0 || size > 10485760){
      this.toastr.warning('El archivo no puede exceder los 10 megas...', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = null;
      if(idForm === 'aprobar') {
          this.formAprobar.get('aprobar').setValue({
            filename: "",
            filetype: "",
            value: ""
          });
          this.formAprobar.value.aprobar =null;
          this.formAprobar.value.aprobar ="";
          this.formAprobar.reset();
          
      }else if(idForm === 'docria') {
        this.formRIA.get('docria').setValue({
          filename: "",
          filetype: "",
          value: ""
        });
        this.formRIA.value.docria =null;
        this.formRIA.value.docria ="";
        this.formRIA.reset();
        
      }
      return;
    }else if(this.validarExtension(name)){
      this.toastr.warning('La extensión permitida para los archivos es .zip o .pdf, favor de revisar', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = null;      
          if(idForm === 'aprobar') {
            this.formAprobar.get('aprobar').setValue({
              filename: "",
              filetype: "",
              value: ""
            });
            this.formAprobar.value.aprobar =null;
            this.formAprobar.reset();
            }else if(idForm === 'docria') {
              this.formRIA.get('docria').setValue({
                filename: "",
                filetype: "",
                value: ""
              });
              this.formRIA.value.docria =null;
              this.formRIA.reset();
            }
      return;
    }else{
      
      if(event.target.files && event.target.files.length > 0) {
          const reader = new FileReader();
          const file = event.target.files[0];
          reader.readAsDataURL(file);
          if(idForm === 'aprobar') {
            reader.onload = () => {
              this.formAprobar.get('aprobar').setValue({
                filename: file.name,
                filetype: file.type,
                value: (reader.result as string).split(',')[1]
              })
            };
          } else {
            reader.onload = () => {
              this.formRIA.get('docria').setValue({
                filename: file.name,
                filetype: file.type,
                value: (reader.result as string).split(',')[1]
              })
            };
          }
        }
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

  setValor(valor: string, idForm: string) {
    this.form.get(idForm).setValue(valor);
  }

  descargarArchivo(idPregunta:string) {
    this.excencionService.descargarDocumento(idPregunta);
  }

  descargarCuestionario() {
    const folio = sessionStorage.getItem('folioExencion');
    this.excencionService.descargarArchivo(folio);
  }

  aceptarCuestionario() {
    this.frameOk.show();
  }

  navegaBandeja(){
    let dash = sessionStorage.getItem("dashboard");
    if(dash === 'expediente'){
      this._router.navigate(['/expedientes']);
    }else{
      this._router.navigate(['/exencion']);
    }
  }

  aceptar() {
    const folio = sessionStorage.getItem('folioExencion');
    const ID_ACEPTACION = 10;
    this.preguntasAceptacion[0] = new Preguntasexcencion(ID_ACEPTACION,1, '', null);
    this.peticionAceptacion.idUsuario = this.usuario.usuario.idUsuario;
    this.peticionAceptacion.preguntas = this.preguntasAceptacion;
    console.log('Folio: ' + folio);
    console.log('Peticion: ' + JSON.stringify(this.peticionAceptacion));
    this.spinner.show();
    this.excencionService.aceptarFlujo(this.peticionAceptacion, folio).subscribe(
      result => {
        this.response = result;
        if (this.response != null) {
          console.log('Respuesta: ' +  JSON.stringify(this.response));
           if(this.response.code === 0) {
             this.spinner.hide();
             this.exencionUtil.mostrarMensaje('El cuestionario con folio: '+ folio +', se ha aceptado de forma correcta');
           } else {
             this.spinner.hide();
             this.exencionUtil.mostrarAviso('No se pudo aceptar el cuestionario');
           }
        } else {
          this.spinner.hide();
          this.exencionUtil.mostrarError('No se pudo realizar la operación');
        }
        setTimeout(() => {
          this.spinner.hide();
          this.navegaBandeja();
        }, 1000);
      },(error:any)=>{
        console.log(error);
        this.spinner.hide();
        this.exencionUtil.mostrarError('Servicio no disponible');
      }
    );
  }

  riaCuestionario() {
    this.frameria.show();
  }

  ria() {
    const folio = sessionStorage.getItem('folioExencion');
    const ID_RIA = 11;
    this.preguntasRia[0] = new Preguntasexcencion(ID_RIA,1, '', this.formRIA.value.docria);
    this.peticionRia.idUsuario = this.usuario.usuario.idUsuario;
    this.peticionRia.preguntas = this.preguntasRia;
    console.log('Folio: ' + folio);
    console.log('Peticion: ' + JSON.stringify(this.peticionRia));
    this.spinner.show();
    this.excencionService.registrarRia(this.peticionRia, folio).subscribe(
      result => {
        this.response = result;
        if (this.response != null) {
          console.log('Respuesta: ' +  JSON.stringify(this.response));
          if(this.response.code === 0) {
            this.spinner.hide();
            this.exencionUtil.mostrarMensaje('Se ha solicitado información adicional al folio: '+ folio);
          } else {
            this.spinner.hide();
            this.exencionUtil.mostrarAviso('No se pudo solicitar información adicional al cuestionario');
          }
        } else {
          this.spinner.hide();
          this.exencionUtil.mostrarError('No se pudo realizar la operación');
        }
        setTimeout(() => {
          this.spinner.hide();
          this.navegaBandeja();
        }, 1000);
      },(error:any)=>{
        console.log(error);
        this.spinner.hide();
        this.exencionUtil.mostrarError('Servicio no disponible');
      }
    );
  }

  initForm(cuestionario:CuestionarioDTO[]) {
    cuestionario.forEach((c)=>{
        if(c.pregunta === 1) {
          if(c.subpregunta === 1) {
             this.setValor(c.respuesta, 'denominacion');
          }
          if(c.subpregunta === 2) {
            this.setValor(c.respuesta, 'politica');
          }
          if(c.subpregunta === 3) {
            this.setValor(c.respuesta, 'objetivosGenerales');
          }
          if(c.subpregunta === 4) {
            this.setValor(c.respuesta, 'objetivosEspecificos');
          }
          if(c.subpregunta === 5) {
            this.setValor(c.respuesta, 'relevante');
          }
          if(c.subpregunta === 6) {
            this.setValor(c.respuesta, 'razones');
          }
          if(c.subpregunta === 7) {
            this.archivoRazones = new UploadF(c.respuesta,c.idCuestionario.toString(),c.rutaArchivo);
          }
        }

        if(c.pregunta === 2) {
          if(c.subpregunta === 1) {
            this.archivoFinalidades = new UploadF(c.respuesta,c.idCuestionario.toString(),c.rutaArchivo);
          }
          if(c.subpregunta === 2) {
            this.setValor(c.respuesta, 'finaldades');
          }
        }

        if(c.pregunta === 3) {
          if(c.subpregunta === 1) {
            this.archivoMotivos = new UploadF(c.respuesta,c.idCuestionario.toString(),c.rutaArchivo);
          }
          if(c.subpregunta === 2) {
            this.setValor(c.respuesta, 'motivos');
          }
          if(c.subpregunta === 3) {
            this.setValor(c.respuesta, 'emergencia');
          }
        }

        if(c.pregunta === 4) {
          if(c.subpregunta === 1) {
            this.archivoConsecuencias = new UploadF(c.respuesta,c.idCuestionario.toString(),c.rutaArchivo);
          }
        }

        if(c.pregunta === 5) {
          if(c.subpregunta === 1) {
            this.archivoFundamentos = new UploadF(c.respuesta,c.idCuestionario.toString(),c.rutaArchivo);
          }
          if(c.subpregunta === 2) {
            this.setValor(c.respuesta, 'fundamento');
          }
          if(c.subpregunta === 3) {
            this.setValor(c.respuesta, 'enlaceWeb');
          }
        }

        if(c.pregunta === 6) {
          if(c.subpregunta === 1) {
            this.setValor(c.respuesta, 'fechaPolitica');
          }
        }

        if(c.pregunta === 7) {
          if(c.subpregunta === 1) {
            this.archivoOpinion = new UploadF(c.respuesta,c.idCuestionario.toString(),c.rutaArchivo);
          }
          if(c.subpregunta === 2) {
            this.setValor(c.respuesta, 'opinionTecnica');
          }
        }

        if(c.pregunta === 8) {
          if(c.subpregunta === 1) {
            this.archivoMecanismos = new UploadF(c.respuesta,c.idCuestionario.toString(),c.rutaArchivo);
          }
          if(c.subpregunta === 2) {
            this.setValor(c.respuesta, 'mecanismosDiseno');
          }
          if(c.subpregunta === 3) {
            this.setValor(c.respuesta, 'mecanismosDefecto');
          }
        }

        if(c.pregunta === 9) {
          if(c.subpregunta === 1) {
            this.archivoInformacion = new UploadF(c.respuesta,c.idCuestionario.toString(),c.rutaArchivo);
          }
          if(c.subpregunta === 2) {
            this.setValor(c.respuesta, 'informacionAdicional');
          }
          if(c.subpregunta === 3) {
            this.setValor(c.respuesta, 'documentosAnexos');
          }
        }
    });
  }
  consultarCuestionario(){
    const folio = sessionStorage.getItem('folioExencion');
    console.log('Folio: ' + folio);
    this.spinner.show();
    this.excencionService.consultarCuestionario(folio).subscribe(
      result => {
        this.response = result;
        if (this.response != null) {
          console.log('Respuesta: ' +  JSON.stringify(this.response));
          this.initForm(this.response.payload);
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
        this.exencionUtil.mostrarError('Servicio no disponible'); }
    );
  }

  navegaHistorico(){
    this._router.navigate(['/historico']); 
  }

  regresar(){
    let retorno = sessionStorage.getItem("dashboard");
    this._router.navigate(['/'+retorno]); 
  }
}
