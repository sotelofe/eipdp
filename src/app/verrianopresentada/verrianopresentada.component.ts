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
  selector: 'app-verrianopresentada',
  templateUrl: './verrianopresentada.component.html',
  styleUrls: ['./verrianopresentada.component.scss']
})
export class VerrianopresentadaComponent implements OnInit {

  public folioConsultafUno:string;
  public formPreconsulta:CuestionarioDTO[];
  public asunto:string;
  public upload:UploadF
  faDownload = faDownload;
  public tipoFlujo:string;


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
    this.folioConsultafUno = sessionStorage.getItem("folioConsultafDos");
    this.tipoFlujo = sessionStorage.getItem("tipoFlujoRia");
    this.precargaOpinion();
  }

  precargaOpinion(){
    var obj = new RecuperarUsuario(this.folioConsultafUno);

    if(this.tipoFlujo==="1"){
      this.spinner.show();
      this.flujoService.obtenerDetalleRiaNoPresentadaFu(obj).subscribe(
        result => {
          this.formPreconsulta = result;
          console.log(this.formPreconsulta);
          if (this.formPreconsulta !=null ) {
            this.iniciaPrecargaFu( this.formPreconsulta);
          
        } else {
          this.toastr.error('No se pudo realizar la operacion', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
        }

          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        },(error:any)=>{

        }
      );
    }else if(this.tipoFlujo==="2" || this.tipoFlujo==="3"){
          this.spinner.show();
          this.flujoService.obtenerDetalleRiaNoPresentada(obj).subscribe(
            result => {
              this.formPreconsulta = result;
              console.log(this.formPreconsulta);
              if (this.formPreconsulta !=null ) {
                this.iniciaPrecarga( this.formPreconsulta);
              
            } else {
              this.toastr.error('No se pudo realizar la operación', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
            }

              setTimeout(() => {
                this.spinner.hide();
              }, 1000);
            },(error:any)=>{

            }
          );
    }

  }

  iniciaPrecargaFu(con:CuestionarioDTO[]){
    con.forEach((c)=>{
     
      if(c.pregunta!=null){
          if(c.pregunta == 20 && c.subpregunta == 1){
            this.asunto = c.respuesta;
            var rutaArchivo = c.rutaArchivo.split("/");
            var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
            this.upload.filename = nombreArchivo;
          }         
      }
    });
  }
  iniciaPrecarga(con:CuestionarioDTO[]){
    con.forEach((c)=>{
     
      if(c.pregunta!=null){
          if(c.pregunta == 21 && c.subpregunta == 1){
            this.asunto = c.respuesta;
            var rutaArchivo = c.rutaArchivo.split("/");
            var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
            this.upload.filename = nombreArchivo;
          }else if(c.pregunta == 20 && c.subpregunta == 1){
            this.asunto = c.respuesta;
            var rutaArchivo = c.rutaArchivo.split("/");
            var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
            this.upload.filename = nombreArchivo;
          }else if(c.pregunta == 24 && c.subpregunta == 1){
            this.asunto = c.respuesta;
            var rutaArchivo = c.rutaArchivo.split("/");
            var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
            this.upload.filename = nombreArchivo;
          }


      }
    });
  }

  navegarConsulta(){
    if(this.tipoFlujo==="1"){
      let dash = sessionStorage.getItem("dashboard");
      if(dash === 'expediente'){
        this._router.navigate(['/expedientes']);
      }else{
        this._router.navigate(['/consulta']);
      
      }
    }else if(this.tipoFlujo==="2"){
      let dash = sessionStorage.getItem("dashboard");
      if(dash === 'expediente'){
        this._router.navigate(['/expedientes']);
      }else{
        this._router.navigate(['/presentacion']);      
      }
     
    }else if(this.tipoFlujo==="3"){
      let dash = sessionStorage.getItem("dashboard");
      if(dash === 'expediente'){
        this._router.navigate(['/expedientes']);
      }else{
        this._router.navigate(['/exencion']);    
      }      
    }
  }

  descargaOpinion(pregunta){
    if(this.tipoFlujo==="1"){
      this.serviceDescarga.descargaDocumento(this.upload.filename ,1, this.rutaService.ruta(this.folioConsultafUno),"20");
    }else if(this.tipoFlujo==="2"){
      this.serviceDescarga.descargaDocumento(this.upload.filename ,2, this.rutaService.ruta(this.folioConsultafUno),"24");
    }else if(this.tipoFlujo==="3"){
      this.serviceDescarga.descargaDocumento(this.upload.filename ,3, this.rutaService.rutaEx(this.folioConsultafUno),"24");
    }
  }
}
