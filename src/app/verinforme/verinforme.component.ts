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
import { SubeDocumento } from '../model/sube.documento';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ResponseUsuario } from '../model/responseusuario';
import { UsuarioDTO } from '../model/usuario';
import { RutaUtilService } from '../services/ruta.util.service';


@Component({
  selector: 'app-verinforme',
  templateUrl: './verinforme.component.html',
  styleUrls: ['./verinforme.component.scss']
})
export class VerinformeComponent implements OnInit {

  public folioConsultafUno:string;
  public formPreconsulta:CuestionarioDTO[];
  public asunto:string;
  public upload:UploadF
  public upload2:UploadF
  faDownload = faDownload;
  public documento:SubeDocumento;
  public barchivoDos:boolean;
  public pupload:UploadF;
  public form: FormGroup;
  public response:ResponseUsuario;
  public user:UsuarioDTO[];


  constructor(
    private _router: Router,
    private spinner: NgxSpinnerService,
    private flujoService: FlujoService,
    private toastr: ToastrService,
    private serviceDescarga:DescargaService,
    private fb: FormBuilder, 
    private rutaService:RutaUtilService,
  ) { 
    this.formPreconsulta = new Array();
    this.upload= new UploadF("","","");
    this.upload2= new UploadF("","","");
    this.pupload = new UploadF("","","",);
    this.documento = new SubeDocumento("","","",this.pupload);
    this.barchivoDos = false;
    this.user = new Array();
    this.response = new ResponseUsuario(this.user,"","");
    
  }

  

  ngOnInit(): void {
    this.folioConsultafUno = sessionStorage.getItem("folioConsultafDos");
    this.precargaOpinion();
  }

  precargaOpinion(){
    var obj = new RecuperarUsuario(this.folioConsultafUno);

    this.spinner.show();
    
          this.flujoService.obtenerDetalleCuestionarioFlujo2(obj).subscribe(
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
          if(c.pregunta == 19 && c.subpregunta == 1){
            this.asunto = c.respuesta;
            var rutaArchivo = c.rutaArchivo.split("/");
            var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
            this.upload.filename = nombreArchivo;
          }

          if(c.pregunta == 19 && c.subpregunta == 2){
            var rutaArchivo2 = c.rutaArchivo.split("/");
            var nombreArchivo2 = (rutaArchivo2[rutaArchivo2.length-1]);
            this.upload2.filename = nombreArchivo2;
          }
      }
    });
  }

  navegarConsulta(){
    let dash = sessionStorage.getItem("dashboard");
    if(dash === 'expediente'){
      this._router.navigate(['/expedientes']);
    }else{
      this._router.navigate(['/presentacion']);    
    }
  }

  descargaOpinion(pregunta){
    this.serviceDescarga.descargaDocumento(this.upload.filename ,2, this.rutaService.ruta(this.folioConsultafUno),pregunta);
  }
  
  descargaOpinion2(pregunta){
    this.serviceDescarga.descargaDocumento(this.upload2.filename ,2, this.rutaService.ruta(this.folioConsultafUno),pregunta);
  }
 

}
