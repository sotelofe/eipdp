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
  selector: 'app-cargarinforme',
  templateUrl: './cargarinforme.component.html',
  styleUrls: ['./cargarinforme.component.scss']
})
export class CargarinformeComponent implements OnInit {

  public folioConsultafUno:string;
  public formPreconsulta:CuestionarioDTO[];
  public asunto:string;
  public upload:UploadF
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
    private rutaService:RutaUtilService
  ) { 
    this.formPreconsulta = new Array();
    this.upload= new UploadF("","","");
    this.pupload = new UploadF("","","",);
    this.documento = new SubeDocumento("","","",this.pupload);
    this.barchivoDos = false;
    this.user = new Array();
    this.response = new ResponseUsuario(this.user,"","");
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      opinion:['', Validators.required],
    });
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

  onFileChange(event) {
    let reader = new FileReader();

    this.documento.upload.filename="";
    

    if (event.target.value.length == 0) {
      event.target.value = "";
      this.barchivoDos = false;
      return;
    }

    const size = event.srcElement.files[0].size;
    const name = event.srcElement.files[0].name;

    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.documento.upload.filename = file.name;
      this.documento.upload.filetype = file.type;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('opinion').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        })
      };
    }

    if(size == 0 || size > 10485760){
      this.toastr.warning('El archivo no puede exceder los 10 megas', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoDos = false;
      this.documento.upload.filename="";
     
    }else if(this.validarExtension(name)){
      this.toastr.warning('La extensión permitida para los archivos es .zip o .pdf, favor de revisar', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoDos = false;
      this.documento.upload.filename="";
    }else{
      this.barchivoDos = true;
    }

  }

  enviar(){
    this.documento.asunto = '';
    this.documento.folio = this.folioConsultafUno;

    if(this.barchivoDos){
      this.documento.upload = this.form.value.opinion;
    }else{
      this.documento.upload = new UploadF("","","");
    }
    
    this.spinner.show();
    this.flujoService.subirInforme(this.documento).subscribe(
      result => {

            this.response = result;
            if (this.response !=null ) {
                if(this.response.estatus === "ok"){
                  this.toastr.success('La solicitud se ha enviado de forma correcta', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
                  setTimeout(() => {
                    this.spinner.hide();
                    this.navegarConsulta();
                  }, 1000);
                }else if(this.response.estatus === "fail"){
                  this.toastr.warning('No se pudo enviar tu solicitud', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
                }else{
                  this.toastr.warning('No se pudo enviar tu solicitud', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
                }
            } else {
              this.toastr.error('No se pudo realizar la operacion', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
            }

           
        
      },(error: any) => {
        var errorMensaje = <any>error;
        this.toastr.error('Servicio no disponible', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
      }
    );

  }

}
