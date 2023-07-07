import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ResponseUsuario } from '../model/responseusuario';
import { SubeDocumento } from '../model/sube.documento';
import { UploadF } from '../model/upload';
import { UsuarioDTO } from '../model/usuario';
import { FlujoService } from '../services/flujos.service';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-acuerdo-admision',
  templateUrl: './acuerdo-admision.component.html',
  styleUrls: ['./acuerdo-admision.component.scss']
})
export class AcuerdoAdmisionComponent implements OnInit {

  @ViewChild('frameOk', { static: true }) frameOk: ModalDirective;
  @ViewChild('frameFail', { static: true }) frameFail: ModalDirective;
  public asunto:string;
  public upload:UploadF;
  public form: FormGroup;
  public folioConsulta:string;
  public documento:SubeDocumento;
  public pupload:UploadF;
  public response:ResponseUsuario;
  public user:UsuarioDTO[];
  public barchivoDos:boolean;

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
    this.folioConsulta = sessionStorage.getItem("folioConsulta");
    console.log(this.folioConsulta);
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

  enviar(){
    this.documento.asunto = this.form.value.asunto;    
    this.documento.folio = this.folioConsulta;

    if(this.barchivoDos){
      this.documento.upload = this.form.value.opinion;
    }else{
      this.documento.upload = new UploadF("","","");
    }

    console.log(this.documento);
    
    this.spinner.show();
    this.flujoService.subirAcuerdoAdmisionGeneral(this.documento).subscribe(
      result => {

            this.response = result;
            if (this.response !=null ) {
                if(this.response.estatus === "ok"){
                  this.toastr.success('El acuerdo de admisión se ha enviado de forma correcta', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
                }else if(this.response.estatus === "fail"){
                  this.frameFail.show();
                }else{
                  this.toastr.warning('No se pudo enviar el acuerdo de admisión', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
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
    }else {
      this._router.navigate(['/'+dash]);
    
    }
  }

}
