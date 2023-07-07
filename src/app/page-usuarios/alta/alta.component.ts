import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { ResponseLogin } from 'src/app/model/responselogin';
import { UsuarioAlta } from 'src/app/model/usuarioalta';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResponseUsuario } from 'src/app/model/responseusuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { Router } from '@angular/router';
import { DocumentoService } from 'src/app/services/documentos.service';
import { Documentos } from 'src/app/model/documentos';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.scss']
})
export class AltaComponent implements OnInit, AfterViewInit {
  @ViewChild('frameAlta', { static: true }) frameAlta: ModalDirective;
  @ViewChild('frameAvisoPrivacidad', { static: true }) frameAvisoPrivacidad: ModalDirective;
  @ViewChild('pdfViewerOnDemand') pdfViewerOnDemand;
  private sesion:ResponseLogin;
  
  public usuario: ResponseLogin;
  public formUsuario: UsuarioAlta;
  public responseUsuario:ResponseUsuario;
  public tipo:string;
  public tipod:string;
  public icon:string;
  public icond:string;
  public textoPass:string;
  public aviso:string;
  public fileURL:string;
  public documento:Documentos;
 

  constructor(
    private serviceSesion: SesionService,
    private documentoService: DocumentoService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private usuarioService: UsuarioService,
    private _router: Router
    ) {
    this.formUsuario = new UsuarioAlta("", "", "", "", "", "", "", "", "", "");
    this.tipo="password";
    this.tipod="password";
    this.icon="fa fa-eye";
    this.icond="fa fa-eye";
    this.textoPass = "Mostrar Contraseñas";
    this.documento = new Documentos("AvisoPrivacidad.pdf","");
  }


  ngOnInit() {

    this.sesion = this.serviceSesion.obtenerSesionUsuario();
    if(this.sesion == null || this.sesion.usuario.usuario === ""){
      this._router.navigate(["/login"]);
    }

    this.serviceSesion.sesionVista("alta");
    sessionStorage.setItem("navVis", "/alta");
    this.usuarioLogueado();
    this.fileURL ="";
    
   
  }

  ngAfterViewInit(): void {

   this.documentoService.aviso().subscribe(
    (res) => {
      console.log(res);
        var blob = new Blob([res.blob()], {type: 'application/pdf'});
        this.pdfViewerOnDemand.pdfSrc = blob; 
        this.pdfViewerOnDemand.refresh(); 
      }
    );
   
    this.frameAvisoPrivacidad.show();
  }

  usuarioLogueado() {
    this.usuario = this.serviceSesion.obtenerSesionUsuario();
  }

  altaUsuario():void{
    console.log("alta usuario: "+this.formUsuario.usuario);
    let hasNumber = /\d/.test(this.formUsuario.contrasena);
    let hasUpper = /[A-Z]/.test(this.formUsuario.contrasena);
    let hasLower = /[a-z]/.test(this.formUsuario.contrasena);
    let hasEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.formUsuario.emailInstitucional);
    let hasSimbol = /([!* "* #* $* %* &*  '* (* )* ** +* ,* \\* \-* .* /* :* ;* <* =* >* ¿* ?* @* \[* \]* ^* _* `* {* |* }*])/.test(this.formUsuario.contrasena);

    const valid = hasNumber && hasUpper && hasLower && hasSimbol;
    
    if (this.formUsuario.contrasena.length<8 ) {
      this.toastr.error('Error, la contraseña debe tener al menos 8 caracteres', '', { positionClass: 'toast-top-full-width', closeButton: true });
      return;
    }else if (!valid) {
      this.toastr.error('Error, La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial', '', { positionClass: 'toast-top-full-width', closeButton: true });
      return;
    }else if(this.formUsuario.contrasena != this.formUsuario.repetirContrasena){
      this.toastr.error('Error, Las contraseñas no coinciden', '', { positionClass: 'toast-top-full-width', closeButton: true });
      return;
    }else if(!hasEmail){
      this.toastr.error('Error, Ingresa un formato valido para el email', '', { positionClass: 'toast-top-full-width', closeButton: true });
      return;
    }else{

      this.spinner.show();

      this.usuarioService.altaUsuario(this.formUsuario).subscribe(
        result => {
          this.responseUsuario = result;
         
          if (this.responseUsuario !=null ) {

              if(this.responseUsuario.estatus === "ok"){
                console.log("Usuario registrado correctamente");
                this.frameAlta.show();
              }else if(this.responseUsuario.estatus === "existe"){
                this.toastr.info('El usuario o email institucional ya se encuentra registrado', 'Aviso', { positionClass: 'toast-top-full-width', closeButton: true });
              }else{
                this.toastr.warning('Usuario no registrado', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
              }
          } else {
            this.toastr.error('No se pudo dar de alta el usuario', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
          }

          setTimeout(() => {
            this.spinner.hide();
          }, 1000);
          
        },(error: any) => {
          var errorMensaje = <any>error;
          this.toastr.error('Servicio no disponible', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
        }
      );
    }
  }

  verPass(){
    if(this.tipo === "password"){
      this.tipo="text";
      this.icon="fa fa-eye-slash";
      this.textoPass = "Ocultar Contraseñas"
    }else if(this.tipo === "text"){
      this.tipo="password";
      this.icon="fa fa-eye";
      this.textoPass = "Mostrar Contraseñas"
    }
    
    if(this.tipod === "password"){
      this.tipod="text";
      this.icond="fa fa-eye-slash";
      
    }else if(this.tipod === "text"){
      this.tipod="password";
      this.icond="fa fa-eye";
     
    }
  }

  public restrictNumeric(e) {
    
    let i=0;
    
    if( (e.which>=97 && e.which<=122) || (e.which>=65 && e.which<=90) || e.which == 32 || e.which == 241 || e.which == 209){
      i++;
    }
    
    if(e.which == 225 || e.which == 233 || e.which == 237 || e.which == 243 || e.which == 250 ){
      i++;
    }
    
    if(e.which == 193 || e.which == 201 || e.which == 205 || e.which == 211 || e.which == 218 ){
      i++;
    }

    if(i==1){
      return true;
    }else{
      return false;
    }

   }

  

}
