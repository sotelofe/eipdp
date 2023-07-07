import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadF } from '../model/upload';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SesionService } from '../services/sesion.service';
import { SubeDocumento } from '../model/sube.documento';
import { FlujoService } from '../services/flujos.service';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { ResponseUsuario } from '../model/responseusuario';
import { UsuarioDTO } from '../model/usuario';

@Component({
  selector: 'app-rianopresentada',
  templateUrl: './rianopresentada.component.html',
  styleUrls: ['./rianopresentada.component.scss']
})
export class RianopresentadaComponent implements OnInit {

  @ViewChild('frameOk', { static: true }) frameOk: ModalDirective;
  @ViewChild('frameFail', { static: true }) frameFail: ModalDirective;
  public asunto:string;
  public upload:UploadF;
  public form: FormGroup;
  public folioConsultafUno:string;
  public documento:SubeDocumento;
  public pupload:UploadF;
  public response:ResponseUsuario;
  public user:UsuarioDTO[];
  public barchivoDos:boolean;
  public tipoFlujo:string;

  constructor(
    private _router: Router,
    private fb: FormBuilder, 
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private serviceSesion:SesionService,
    private flujoService: FlujoService,
  ) { 
    this.upload = new UploadF("","","",);
    this.pupload = new UploadF("","","",);
    this.asunto = "";
    this.documento = new SubeDocumento("","","",this.pupload);
    this.user = new Array();
    this.response = new ResponseUsuario(this.user,"","");
    this.barchivoDos = false;
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      asunto:['', Validators.required],
      opinion:['', Validators.required],
    });
  }
  
  ngOnInit(): void {
    this.folioConsultafUno = sessionStorage.getItem("folioConsultafDos");
    this.tipoFlujo = sessionStorage.getItem("tipoFlujoRia");
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
    this.documento.asunto = this.form.value.asunto;
    this.documento.folio = this.folioConsultafUno;

    if(this.barchivoDos){
      this.documento.upload = this.form.value.opinion;
    }else{
      this.documento.upload = new UploadF("","","");
    }
    
    
    if(this.tipoFlujo==="1"){
      this.spinner.show();
      this.flujoService.notificarRiaNoPresentadaFu(this.documento).subscribe(
        result => {

              this.response = result;
              if (this.response !=null ) {
                  if(this.response.estatus === "ok"){
                    this.toastr.success('El documento se ha enviado de forma correcta', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
                  }else if(this.response.estatus === "fail"){
                    this.frameFail.show();
                  }else{
                    this.toastr.warning('No se pudo enviar tu documento', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
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
    }else if(this.tipoFlujo==="2"){
        this.spinner.show();
        this.flujoService.notificarRiaNoPresentada(this.documento).subscribe(
          result => {

                this.response = result;
                if (this.response !=null ) {
                    if(this.response.estatus === "ok"){
                      this.toastr.success('El documento se ha enviado de forma correcta', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
                    }else if(this.response.estatus === "fail"){
                      this.frameFail.show();
                    }else{
                      this.toastr.warning('No se pudo enviar tu documento', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
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
    }else if(this.tipoFlujo==="3"){
      this.spinner.show();
      this.flujoService.notificarRiaNoPresentada(this.documento).subscribe(
        result => {

              this.response = result;
              if (this.response !=null ) {
                  if(this.response.estatus === "ok"){
                    this.toastr.success('El documento se ha enviado de forma correcta', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
                  }else if(this.response.estatus === "fail"){
                    this.frameFail.show();
                  }else{
                    this.toastr.warning('No se pudo enviar tu documento', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
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

  }

  navegaBandeja(){
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

}
