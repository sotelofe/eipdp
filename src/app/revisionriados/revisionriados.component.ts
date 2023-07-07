import { Component, OnInit, ViewChild } from '@angular/core';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { RecuperarUsuario } from '../model/recupera';
import { NgxSpinnerService } from 'ngx-spinner';
import { FlujoService } from '../services/flujos.service';
import { CuestionarioDTO } from '../model/cuestionario.dto';
import { ToastrService } from 'ngx-toastr';
import { UploadF } from '../model/upload';
import { DescargaService } from '../services/descarga.service';
import { AceptarFUno } from '../model/aceptarf1';
import { ResponseUsuario } from '../model/responseusuario';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { RutaUtilService } from '../services/ruta.util.service';

@Component({
  selector: 'app-revisionriados',
  templateUrl: './revisionriados.component.html',
  styleUrls: ['./revisionriados.component.scss']
})
export class RevisionriadosComponent implements OnInit {

  @ViewChild('frameFail', { static: true }) frameFail: ModalDirective;
  faDownload=faDownload;
  public folioConsultafUno:string;
  public formPreconsulta:CuestionarioDTO[];
  public formPreconsulta2:CuestionarioDTO[];
  public upload:UploadF;
  public upload2:UploadF;
  public upload3:UploadF;
  public acceptarFuno:AceptarFUno;
  public responseAceptar:ResponseUsuario;

  constructor(
    private spinner: NgxSpinnerService,
    private flujoService: FlujoService,
    private toastr: ToastrService,
    private serviceDescarga:DescargaService,
    private _router: Router,
    private rutaService:RutaUtilService
  ) { 
    this.formPreconsulta = new Array();
    this.formPreconsulta2 = new Array();
    this.upload= new UploadF("","","");
    this.upload2= new UploadF("","","");
    this.upload3= new UploadF("","","");
    this.acceptarFuno = new AceptarFUno("","",this.upload3);
    this.responseAceptar = new ResponseUsuario(null,"","");
    this.folioConsultafUno = sessionStorage.getItem("folioConsultafDos");
  }

  ngOnInit(): void {
    
    this.precargaRia();
    this.precargaRia2();
  }

  precargaRia(){
    var obj = new RecuperarUsuario(this.folioConsultafUno);

    this.spinner.show();
    
          this.flujoService.obtenerDetalleRiaFlujo2(obj).subscribe(
            result => {
              this.formPreconsulta = result;
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
          if(c.pregunta == 20 && c.subpregunta == 1){
            var rutaArchivo = c.rutaArchivo.split("/");
            var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
            this.upload.filename = nombreArchivo;
          }
      }
    });
  }

  precargaRia2(){
    var obj = new RecuperarUsuario(this.folioConsultafUno);

    this.spinner.show();
    
          this.flujoService.obtenerDetalleRiaFlujo2(obj).subscribe(
            result => {
              this.formPreconsulta2 = result;
              if (this.formPreconsulta2 !=null ) {
                this.iniciaPrecarga2( this.formPreconsulta2);
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

  iniciaPrecarga2(con:CuestionarioDTO[]){
    con.forEach((c)=>{
     
      if(c.pregunta!=null){
          if(c.pregunta == 20 && c.subpregunta == 2){
            var rutaArchivo = c.rutaArchivo.split("/");
            var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
            this.upload2.filename = nombreArchivo;
          }
      }
    });
  }

  descargarsRia(pregunta){
    this.serviceDescarga.descargaDocumento(this.upload.filename ,2,this.rutaService.ruta(this.folioConsultafUno),pregunta);
  }

  descargareRia(pregunta){
    this.serviceDescarga.descargaDocumento(this.upload2.filename ,2,this.rutaService.ruta(this.folioConsultafUno),pregunta);
  }

  aceptar(){ 
    this.acceptarFuno.folio = this.folioConsultafUno;
   
    this.flujoService.aceptarRiaDos(this.acceptarFuno).subscribe(
      result => {

        this.responseAceptar = result;
            if (this.responseAceptar !=null ) {
                if(this.responseAceptar.estatus === "ok"){
                  this.toastr.success('El cuestionario con folio: '+ this.folioConsultafUno +', se ha aceptado de forma correcta', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
                }else if(this.responseAceptar.estatus === "fail"){
                  this.frameFail.show();
                }else{
                  this.toastr.warning('No se pudo aceptar el cuestionario', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
                }
              } else {
              this.toastr.error('No se pudo realizar la operacion', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
            }

            setTimeout(() => {
              this.spinner.hide();
              this.navegaBandeja();
            }, 1000);
        
      },(error: any) => {
        var errorMensaje = <any>error;
        this.toastr.error('Servicio no disponible', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
      }
    );
  }

  navegaBandeja(){
    let dash = sessionStorage.getItem("dashboard");
    if(dash === 'expediente'){
      this._router.navigate(['/expedientes']);
    }else{
      this._router.navigate(['/presentacion']);    
    }
  }

}
