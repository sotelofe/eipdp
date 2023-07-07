import { Component, OnInit, ViewChild } from '@angular/core';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadF } from '../model/upload';
import { SubeDocumento } from '../model/sube.documento';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { ResponseUsuario } from '../model/responseusuario';
import { UsuarioDTO } from '../model/usuario';
import { Router } from '@angular/router';
import { FlujoService } from '../services/flujos.service';
import { CuestionarioDTO } from '../model/cuestionario.dto';
import { RecuperarUsuario } from '../model/recupera';
import { DescargaService } from '../services/descarga.service';
import { RutaUtilService } from '../services/ruta.util.service';

@Component({
  selector: 'app-ria',
  templateUrl: './ria.component.html',
  styleUrls: ['./ria.component.scss']
})
export class RiaComponent implements OnInit {
  @ViewChild('frameOk', { static: true }) frameOk: ModalDirective;
  @ViewChild('frameFail', { static: true }) frameFail: ModalDirective;
  faDownload=faDownload;
  public form: FormGroup;
  public folioConsultafUno:string;
  public documento:SubeDocumento;
  public pupload:UploadF;
  public response:ResponseUsuario;
  public user:UsuarioDTO[];
  public formPreconsulta:CuestionarioDTO[];
  public upload:UploadF;
  public barchivoDos:boolean;

  constructor(
    private fb: FormBuilder, 
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private _router: Router,
    private flujoService: FlujoService,
    private serviceDescarga:DescargaService,
    private rutaService:RutaUtilService
  ) {
    this.pupload = new UploadF("","","",);
    this.documento = new SubeDocumento("","","",this.pupload);
    this.user = new Array();
    this.response = new ResponseUsuario(this.user,"","");
    this.formPreconsulta = new Array();
    this.upload= new UploadF("","","");
    this.barchivoDos = false;
    this.createForm();
   }

  ngOnInit(): void {
    this.folioConsultafUno = sessionStorage.getItem("folioConsultafUno");
    this.precargaRia();
  }

  createForm() {
    this.form = this.fb.group({
      sria:['', Validators.required],
    });
  }

  precargaRia(){
    var obj = new RecuperarUsuario(this.folioConsultafUno);

    this.spinner.show();
    
          this.flujoService.obtenerDetalleRiaFlujo1(obj).subscribe(
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
          if(c.pregunta == 7 && c.subpregunta == 1){
            var rutaArchivo = c.rutaArchivo.split("/");
            var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
            this.upload.filename = nombreArchivo;
          }
      }
    });
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
        this.form.get('sria').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        })
      };
    }

    if(size == 0 || size > 10485760){
      this.toastr.warning('El archivo no puede exceder los 10 megas...', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoDos = false;
      this.documento.upload.filename="";
     
    }else if(this.validarExtension(name)){
      this.toastr.warning('La extensión permitida para los archivos es .zip o .pdf, favor de revisar', 'Aviso!', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoDos = false;
      this.documento.upload.filename="";
    }else{
      this.barchivoDos = true;
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
    //this.documento.upload = this.form.value.sria;
    this.documento.folio = this.folioConsultafUno;

    if(this.barchivoDos){
      this.documento.upload = this.form.value.sria;
    }else{
      this.documento.upload = new UploadF("","","");
    }
    this.spinner.show();
    this.flujoService.subirRiaRequerida(this.documento).subscribe(
      result => {

            this.response = result;
            if (this.response !=null ) {
                if(this.response.estatus === "ok"){
                  this.toastr.success('La información requerida se ha enviado de forma correcta', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
                }else if(this.response.estatus === "fail"){
                  this.frameFail.show();
                }else{
                  this.toastr.warning('No se pudo enviar la informarción requerida', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
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
      this._router.navigate(['/consulta']);
    
    }
  }

  descargarRia(pregunta){
    this.serviceDescarga.descargaDocumento(this.upload.filename ,1, this.rutaService.ruta(this.folioConsultafUno),pregunta);
  }

}
