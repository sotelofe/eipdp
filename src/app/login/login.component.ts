import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioDTO } from '../model/usuario';
import { SesionService } from '../services/sesion.service';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseLogin } from '../model/responselogin';
import { NgxSpinnerService } from "ngx-spinner";
import { TokenResponse } from '../model/token-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public responseLogin: ResponseLogin;
  public user:UsuarioDTO;
  public display:string;
  public token:string;

  constructor( private toastr: ToastrService,
    private serviceSesion: SesionService,
    private _router: Router,
    private _routed: ActivatedRoute,
    private loginService: LoginService,
    private spinner: NgxSpinnerService) { 
      this.user = new UsuarioDTO(0,0,"","","","","","","","","","");
      this.responseLogin = new ResponseLogin(this.user,"",null,"","");
      this.display ='none';
      this.token='';
    }

  ngOnInit(): void {
    
    this._routed.queryParams.subscribe(params => {
      this.token = params['token'] || null;
    });
    console.log("this.token: "+this.token);
    if(this.token!=null){
      
      sessionStorage.removeItem("etoken");
      sessionStorage.setItem("etoken", this.token);
      this._router.navigate(['/actualizar']);
    }

  }

  iniciarSesion() {
    let hasNumber = /\d/.test(this.user.contrasena);
    let hasUpper = /[A-Z]/.test(this.user.contrasena);
    let hasLower = /[a-z]/.test(this.user.contrasena);
    const valid = hasNumber && hasUpper && hasLower;

    if (this.user.usuario == "" || this.user.contrasena == "") {
      this.toastr.error('Error, Introduce el campo usuario y contraseña', '', { positionClass: 'toast-top-full-width', closeButton: true });
    }
    if (this.user.contrasena.length<8 ) {
      this.toastr.error('Error, la contraseña debe tener al menos 8 caracteres', '', { positionClass: 'toast-top-full-width', closeButton: true });
      this.responseLogin = new ResponseLogin(null,"",null,"","");
      return;
    }
    if (!valid) {
      this.toastr.error('Error, La contraseña debe contener al menos una mayúscula, una minúscula y un número', '', { positionClass: 'toast-top-full-width', closeButton: true });
      this.responseLogin = new ResponseLogin(null,"",null,"","");
      return;
    }
     else {
      this.display ='block';
      this.spinner.show();
      
      
      this.loginService.validarUsuario(this.user).subscribe(
        result => {
          let response:TokenResponse = result;
          console.log(response);
          if (response.access_token !=null ) {
            this.serviceSesion.sesionToken(response);
            
            this.loginService.getDatosUsuario(this.user).subscribe(
              result => {
                console.log(result);
                if(result.estatus === 'ok'){
                  this.serviceSesion.sesionUsuario(result);
                  this._router.navigate(['/inicio']);                           
                }else{
                  this.toastr.error('Usuario no registrado', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
                  this.responseLogin = new ResponseLogin(null,"",null,"","");
                  this._router.navigate(['/login']);                           
                }
              });                          
          } else {
                this.toastr.error('Usuario no registrado', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
                this.responseLogin = new ResponseLogin(null,"",null,"","");
          }

          setTimeout(() => {
            this.display ='none';
            this.spinner.hide();
          }, 1000);
          
        },
        err=>{
          console.log(err);
          if(err){
            
            this.toastr.error('Usuario no registrado', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
            this.serviceSesion.limpiarSesion();
            this.responseLogin = new ResponseLogin(null,"",null,"","");
            setTimeout(() => {
              this.display ='none';
              this.spinner.hide();
            }, 1000);
                        
          }
        }
      );
    }
  }
}
