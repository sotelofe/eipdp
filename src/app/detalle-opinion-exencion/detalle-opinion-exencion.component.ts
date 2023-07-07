import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CuestionarioDTO } from '../model/cuestionario.dto';
import { UploadF } from '../model/upload';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import {Excencionresponse} from '../model/excencionresponse';
import {ExcencionService} from '../services/excencion.service';
import {ExencionUtilService} from '../services/exencion.util.service';

@Component({
  selector: 'app-detalle-opinion-exencion',
  templateUrl: './detalle-opinion-exencion.component.html',
  styleUrls: ['./detalle-opinion-exencion.component.scss']
})
export class DetalleOpinionExencionComponent implements OnInit {

  public asunto:string;
  public archivo:UploadF
  public response: Excencionresponse;
  public faDownload = faDownload;

  constructor(
    private _router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private exencionUtil: ExencionUtilService,
    private excencionService: ExcencionService,
  ) {
    this.archivo= new UploadF('','','');
    this.response = new Excencionresponse(0, '','');
  }

  ngOnInit(): void {
    this.cargarRespuesta();
  }

  cargarRespuesta(){
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
                this.exencionUtil.mostrarError('No se pudo realizar la operacion');
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
          if(c.pregunta === 16 && c.subpregunta === 2){
            this.asunto = c.respuesta;
          }

          if(c.pregunta === 16 && c.subpregunta === 1){
            this.archivo = new UploadF(c.respuesta,c.idCuestionario.toString(),c.rutaArchivo);
          }
      }
    });
  }

  navegarConsulta(){
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

}
