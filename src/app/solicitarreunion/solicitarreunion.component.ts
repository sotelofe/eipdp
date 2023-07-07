import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadF } from '../model/upload';
import { SubeDocumento } from '../model/sube.documento';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FlujoService } from '../services/flujos.service';
import { UsuarioDTO } from '../model/usuario';
import { ResponseUsuario } from '../model/responseusuario';
import { CuestionarioDTO } from '../model/cuestionario.dto';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { AceptarFUno } from '../model/aceptarf1';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { DescargaService } from '../services/descarga.service';
import { RutaUtilService } from '../services/ruta.util.service';

@Component({
  selector: 'app-solicitarreunion',
  templateUrl: './solicitarreunion.component.html',
  styleUrls: ['./solicitarreunion.component.scss']
})
export class SolicitarreunionComponent implements OnInit, AfterViewInit {
  @ViewChild('frameOk', { static: true }) frameOk: ModalDirective;
  public asunto:string;
  public form: FormGroup;
  public formAprobar: FormGroup;
  public documento:SubeDocumento;
  public pupload:UploadF;
  public folioConsultafUno:string;
  public response:ResponseUsuario;
  public user:UsuarioDTO[];
  public formPreconsulta:CuestionarioDTO[];
  public acceptarFuno:AceptarFUno;
  public barchivoUno:boolean;
  faFileUpload = faFileUpload;
  public upload1:UploadF;
  public responseAceptar:ResponseUsuario;
  faFileDownload=faFileDownload;
  
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private flujoService: FlujoService,
    private serviceDescarga:DescargaService,
    private rutaService:RutaUtilService
  ) { 
    this.asunto = "";
    this.pupload = new UploadF("","","",);
    this.documento = new SubeDocumento("","","",this.pupload);
    this.user = new Array();
    this.response = new ResponseUsuario(this.user,"","");
    this.upload1 = new UploadF("","","");
    this.formPreconsulta = new Array();
    this.acceptarFuno = new AceptarFUno("","",this.upload1);
    this.barchivoUno = false;
    this.responseAceptar = new ResponseUsuario(this.user,"","");
    this.createForm();
    this.createForm2();
   
2   
  }

  ngAfterViewInit(): void {
    this.spinner.show();
    this.obtenerListaReunion();
  }

  createForm() {
    this.form = this.fb.group({
      asunto:['', Validators.required],
    });
  }

  createForm2() {
    this.formAprobar = this.fb.group({
      aprobar:['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.folioConsultafUno = sessionStorage.getItem("folioConsultafDos");
  }

  guardarReunion(){
    this.documento.asunto = this.form.value.asunto;   
    this.documento.folio = this.folioConsultafUno;
    this.spinner.show();
    this.flujoService.solicitarReunion(this.documento).subscribe(
      result => {

            this.response = result;
            if (this.response !=null ) {
                if(this.response.estatus === "ok"){
                  this.toastr.success('Solicitud de reunión enviada correctamente', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
                }else if(this.response.estatus === "fail"){
                  this.toastr.warning('No se pudo enviar la solicitud de reunión', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
                }else{
                  this.toastr.warning('No se pudo enviar la solicitud de reunión', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
                }
            } else {
              this.toastr.error('No se pudo realizar la operacion', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
            }

            setTimeout(() => {
              this.obtenerListaReunion();
            }, 1000);
        
      },(error: any) => {
        var errorMensaje = <any>error;
        this.toastr.error('Servicio no disponible', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
      }
    );
  }

  obtenerListaReunion(){
    this.documento.folio = this.folioConsultafUno;
    this.flujoService.obtenerListaReunion(this.documento).subscribe(
      result => {

            this.formPreconsulta = result;
            
            setTimeout(() => {
              this.spinner.hide();
              this.createForm();
              this.createForm2();
            }, 1000);
        
      },(error: any) => {
        var errorMensaje = <any>error;
        this.toastr.error('Servicio no disponible', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
      }
    );
  }

  cargarMinuta(folio:string,nr:number){
    this.acceptarFuno.folio = folio;
    this.acceptarFuno.email = nr+"";

    this.frameOk.show();
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
    this.acceptarFuno.upload.filename="";
    

    if (event.target.value.length == 0) {
      event.target.value = "";
      this.barchivoUno = false;
      return;
    }

    const size = event.srcElement.files[0].size;
    const name = event.srcElement.files[0].name; 
   
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.acceptarFuno.upload.filename = file.name;
      this.acceptarFuno.upload.filetype = file.type;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.formAprobar.get('aprobar').setValue({
          filename: file.name,
          filetype: file.type,
          value: (<string>reader.result).split(',')[1]
        })
      };
    }

   

    if(size == 0 || size > 10485760){
      this.toastr.warning('El archivo no puede exceder los 10 megas', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoUno = false;
      this.acceptarFuno.upload.filename="";
     
    }else if(this.validarExtension(name)){
      this.toastr.warning('La extensión permitida para los archivos es .zip o .pdf, favor de revisar', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
      event.target.value = "";
      this.barchivoUno = false;
      this.acceptarFuno.upload.filename="";
    }else{
      this.barchivoUno = true;
    }

  }

  aceptar(){
    

    if(this.barchivoUno){
      this.acceptarFuno.upload = this.formAprobar.value.aprobar;
    }else{
      this.acceptarFuno.upload = new UploadF("","","");
    }

    this.spinner.show();
        this.flujoService.actualizarMinuta( this.acceptarFuno).subscribe(
          result => {

            this.responseAceptar = result;
                if (this.responseAceptar !=null ) {
                    if(this.responseAceptar.estatus === "ok"){
                      this.toastr.success('Se adjunto la minuta de forma correcta', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
                    }else if(this.responseAceptar.estatus === "fail"){
                      this.toastr.warning('No se pudo adjuntar la minuta', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
                    }else{
                      this.toastr.warning('No se pudo adjuntar la minuta', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
                    }
                  } else {
                  this.toastr.error('No se pudo realizar la operacion', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
                }

                setTimeout(() => {
                  this.obtenerListaReunion();
                }, 1000);
            
          },(error: any) => {
            var errorMensaje = <any>error;
            this.toastr.error('Servicio no disponible', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
          }
        );
      
  }

  descargarMinuta(up:string,pregunta){
    var rutaArchivo = up.split("/");
    var nombreArchivo = (rutaArchivo[rutaArchivo.length-1]);
    this.serviceDescarga.descargaDocumento(nombreArchivo,2, this.rutaService.ruta(this.folioConsultafUno),pregunta);
  }

}
