import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioAlta } from '../model/usuarioalta';
import { ResponseUsuario } from '../model/responseusuario';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseLogin } from '../model/responselogin';
import { UsuarioDTO } from '../model/usuario';
import { UsuarioService } from '../services/usuario.service';
import { TokenRecupera } from '../model/tokenrecupera';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalDirective } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.scss']
})
export class ActualizarComponent implements OnInit {
  @ViewChild('frameActualiza', { static: true }) frameActualiza: ModalDirective;

  public formUsuario: UsuarioAlta;
  public responseUsuario:ResponseUsuario;
  public tipo:string;
  public tipod:string;
  public icon:string;
  public icond:string;
  public textoPass:string;
  public actualizar:boolean;
  public token:string;
  public user:UsuarioDTO;
  public responseLogin: ResponseLogin;
  public tokenRecupera:TokenRecupera;

  constructor(
    private toastr: ToastrService,
    private _router: Router,
    private _routed: ActivatedRoute,
    private usuarioService: UsuarioService,
    private spinner: NgxSpinnerService
    ) { 
    this.formUsuario = new UsuarioAlta("", "", "", "", "", "", "", "", "", "");
    this.tipo="password";
    this.tipod="password";
    this.icon="fa fa-eye";
    this.icond="fa fa-eye";
    this.textoPass = "Mostrar Contraseñas";
    this.actualizar = false;
    this.token="";
    this.user = new UsuarioDTO(0,0,"","","","","","","","","","");
    this.responseLogin = new ResponseLogin(this.user,"",null,"","");
    this.tokenRecupera = new TokenRecupera("");
  }

  ngOnInit(): void {
    sessionStorage.setItem("navVis", "/actualizar");
    /*this._routed.queryParams.subscribe(params => {
      this.token = params['token'] || null;
    });*/
    this.token = sessionStorage.getItem("etoken");
    this.token= this.token.replace(" ","+");
    this.validaActualizacion();
  }

  validaActualizacion(){
    this.tokenRecupera.token = this.token;
    this.spinner.show();
    this.usuarioService.validarActualizacionPass(this.tokenRecupera).subscribe(
      result => {
        this.responseLogin = result;
        
        if (this.responseLogin !=null ) {

            if(this.responseLogin.estatus === "ok"){
              this.actualizar = true;
            }else{
              this.actualizar = false;
            }
        } else {
          this.actualizar = false;
        }

        setTimeout(() => {
          
          this.spinner.hide();
        }, 1000);
        
      }, error => {
        var errorMensaje = <any>error;
        this.toastr.error('Servicio no disponible', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
      }
    );
  }

  actualizarPass():void{
    this.formUsuario.usuario = this.responseLogin.usuario.usuario;
    let hasNumber = /\d/.test(this.formUsuario.contrasena);
    let hasUpper = /[A-Z]/.test(this.formUsuario.contrasena);
    let hasLower = /[a-z]/.test(this.formUsuario.contrasena);
    let hasSimbol = /([!* "* #* $* %* &*  '* (* )* ** +* ,* \\* \-* .* /* :* ;* <* =* >* ¿* ?* @* \[* \]* ^* _* `* {* |* }*])/.test(this.formUsuario.contrasena);
    const valid = hasNumber && hasUpper && hasLower && hasSimbol;
    
    if (this.formUsuario.contrasena.length<8 ) {
      this.toastr.error('Error, la contraseña debe tener al menos 8 caracteres', '', { positionClass: 'toast-top-full-width', closeButton: true });
      return;
    }else if (!valid) {
      this.toastr.error('Error, La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial', '', { positionClass: 'toast-top-full-width', closeButton: true });
      return;
    }else if(this.formUsuario.contrasena != this.formUsuario.repetirContrasena){
      this.toastr.error('Error Las contraseñas no coinciden', '', { positionClass: 'toast-top-full-width', closeButton: true });
      return;
    }else{

      this.spinner.show();

      this.usuarioService.actualizarPass(this.formUsuario).subscribe(
        result => {
          this.responseUsuario = result;
         
          if (this.responseUsuario !=null ) {

              if(this.responseUsuario.estatus === "ok"){
                this.frameActualiza.show();
              }else{
                this.toastr.warning('No se actualizaron las credenciales de acceso', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
              }
          } else {
            this.toastr.error('No se actualizaron las credenciales de acceso', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
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

  login():void{
    this._router.navigate(['/login']);
  }

}
