import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FlujoService } from '../services/flujos.service';
import { ToastrService } from 'ngx-toastr';
import { CuestionarioDTO } from '../model/cuestionario.dto';
import { RecuperarUsuario } from '../model/recupera';
import { UploadF } from '../model/upload';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { DescargaService } from '../services/descarga.service';
import { RutaUtilService } from '../services/ruta.util.service';

@Component({
  selector: 'app-ver-admision',
  templateUrl: './ver-admision.component.html',
  styleUrls: ['./ver-admision.component.scss']
})
export class VerAdmisionComponent implements OnInit {

  public folioConsultafUno:string;
  public formPreconsulta:CuestionarioDTO[];
  public asunto:string;
  public upload:UploadF;
  public faDownload = faDownload;


  constructor(
    private _router: Router,
    private spinner: NgxSpinnerService,
    private flujoService: FlujoService,
    private toastr: ToastrService,
    private serviceDescarga:DescargaService,
    private rutaService:RutaUtilService
  ) { 
    this.formPreconsulta = new Array();
    this.upload= new UploadF("","","");
    
  }

  ngOnInit(): void {
    this.folioConsultafUno = sessionStorage.getItem("folioConsultafUno");
    this.precargaOpinion();
  }

  precargaOpinion(){
    var obj = new RecuperarUsuario(this.folioConsultafUno);

    this.spinner.show();
    
          this.flujoService.obtenerDetalleCuestionarioFlujo1(obj).subscribe(
            result => {
              this.formPreconsulta = result;
              console.log(this.formPreconsulta);
              if (this.formPreconsulta !=null ) {
                this.iniciaPrecarga( this.formPreconsulta);
              
              } else {
                this.toastr.error('No se pudo realizar la operacion', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
              }

              setTimeout(() => {
                this.spinner.hide();
              }, 1000);
            },(error:any)=>{

            }
          );
  }

  iniciaPrecarga(con:CuestionarioDTO[]){
    con.forEach((c)=>{
     
      if(c.pregunta!=null){
          if(c.pregunta == 21 && c.subpregunta == 1){
            this.asunto = c.respuesta;
          }

          if(c.pregunta == 21 && c.subpregunta == 2){
            var rutaArchivo = c.rutaArchivo.split("/");
            var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
            this.upload.filename = nombreArchivo;
          }

          if(c.pregunta == 23 && c.subpregunta == 1){
            this.asunto = c.respuesta;
          }

          if(c.pregunta == 23 && c.subpregunta == 2){
            var rutaArchivo = c.rutaArchivo.split("/");
            var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
            this.upload.filename = nombreArchivo;
          }
      }
    });
  }

  navegarConsulta(){
    let dash = sessionStorage.getItem("dashboard");
    if(dash === 'expediente'){
      this._router.navigate(['/expedientes']);
    }else{
      this._router.navigate(['/'+dash]);
    
    }
  }

  descargaOpinion(pregunta){
    let dash = sessionStorage.getItem("dashboard");
    console.log(dash);
    if(dash == "consulta"){
      this.serviceDescarga.descargaDocumento(this.upload.filename ,1, this.rutaService.ruta(this.folioConsultafUno),pregunta);
    }else if(dash == "presentacion"){
      this.serviceDescarga.descargaDocumento(this.upload.filename ,2, this.rutaService.ruta(this.folioConsultafUno),"23");
    }

  }


}
