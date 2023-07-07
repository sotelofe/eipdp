import { Component, OnInit, ViewChild } from '@angular/core';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { CuestionarioDTO } from '../model/cuestionario.dto';
import { ToastrService } from 'ngx-toastr';
import { UploadF } from '../model/upload';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import {Excencionresponse} from '../model/excencionresponse';
import {ExcencionService} from '../services/excencion.service';
import {ResponseLogin} from '../model/responselogin';
import {SesionService} from '../services/sesion.service';
import {Preguntasexcencion} from '../model/preguntasexcencion';
import {Excencionrequest} from '../model/excencionrequest';
import {ExencionUtilService} from '../services/exencion.util.service';

@Component({
  selector: 'app-revisionria',
  templateUrl: './revisionriaexencion.component.html',
  styleUrls: ['./revisionriaexencion.component.scss']
})
export class RevisionriaexencionComponent implements OnInit {
  @ViewChild('frameFail', { static: true }) frameFail: ModalDirective;
  public faDownload=faDownload;
  public archivoRia:UploadF;
  public archivoEnviado:UploadF;
  public asunto:string;
  public response: Excencionresponse;
  public usuario:ResponseLogin;
  public preguntasAceptacion: Preguntasexcencion[];
  public peticionAceptacion:Excencionrequest;

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private serviceSesion:SesionService,
    private excencionService: ExcencionService,
    private exencionUtil: ExencionUtilService,
    private _router: Router,
  ) {
    this.archivoRia = new UploadF('','','');
    this.archivoEnviado = new UploadF('','','');
    this.response = new Excencionresponse(0, '','');
    this.preguntasAceptacion = [];
    this.peticionAceptacion = new Excencionrequest(0, this.preguntasAceptacion);
  }

  ngOnInit(): void {
    this.usuario = this.serviceSesion.obtenerSesionUsuario();
    this.precargaRia();
  }

  precargaRia(){
    const folio = sessionStorage.getItem('folioExencion');
    this.spinner.show();
    this.excencionService.consultarCuestionario(folio).subscribe(
      result => {
        this.response = result;
        console.log('Respuesta: '  + JSON.stringify(this.response));
        if (this.response != null) {
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
      if(c.pregunta!=null){
        if(c.pregunta === 11 && c.subpregunta === 1){
         this.archivoRia = new UploadF(c.respuesta,c.idCuestionario.toString(),c.rutaArchivo);
        }
        if(c.pregunta === 13 && c.subpregunta === 1){
          this.archivoEnviado = new UploadF(c.respuesta,c.idCuestionario.toString(),c.rutaArchivo);
        }
        if(c.pregunta === 13 && c.subpregunta === 2){
          this.asunto = c.respuesta;
        }
      }
    });
  }

  descargarArchivo(idPregunta:string){
    this.excencionService.descargarDocumento(idPregunta);
  }

  aceptar(){
    const folio = sessionStorage.getItem('folioExencion');
    this.peticionAceptacion.idUsuario = this.usuario.usuario.idUsuario;
    this.peticionAceptacion.preguntas = this.preguntasAceptacion;
    console.log('Peticion: ' + JSON.stringify(this.peticionAceptacion));
    console.log('Folio:' + folio);

    this.spinner.show();
    this.excencionService.aceptarRia(this.peticionAceptacion,folio).subscribe(
      result => {
        this.response = result;
        if (this.response !=null ) {
          console.log('Respuesta: ' + JSON.stringify(this.response));
          if(this.response.code === 0) {
            this.spinner.hide();
            this.exencionUtil.mostrarMensaje('La aceptación para el folio ' + folio + ' se ha enviado de forma correcta');
          } else{
            this.spinner.hide();
            this.exencionUtil.mostrarAviso('No se pudo registrar la aceptación');
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

}
