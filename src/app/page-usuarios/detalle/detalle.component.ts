import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioAlta } from '../../model/usuarioalta';
import { UsuarioDTO } from '../../model/usuario';
import { Router } from '@angular/router';
import { RecuperarUsuario } from '../../model/recupera';
import { ModalDirective } from 'ng-uikit-pro-standard';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResponseUsuario } from '../../model/responseusuario';
import { UsuarioService } from '../../services/usuario.service';
import { ResponseLogin } from 'src/app/model/responselogin';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  @ViewChild('frameOk', { static: true }) frameOk: ModalDirective;
  @ViewChild('frameAct', { static: true }) frameAct: ModalDirective;
  @ViewChild('frameFail', { static: true }) frameFail: ModalDirective;

  public formUsuario: UsuarioDTO;
  public formUsuarioBase: UsuarioDTO;
  public recuperarUsuario:RecuperarUsuario;
  public responseUsuario:ResponseUsuario;
  public isReadonly:boolean;
  public esRequerido:boolean;
  public botonCancelar:boolean;
  public isReadonlyUsuario:boolean=false;
  public isReadonlySujeto:boolean=true;
  public botonRegresar:boolean=false;
  public logueado:ResponseLogin;
  
  constructor(
    private _router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private usuarioService: UsuarioService,
    
  ) {
    let origen = sessionStorage.getItem("usuarioDetalleDos");
    this.logueado = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
    this.formUsuario = new UsuarioDTO(0,0,"", "", "", "", "", "", "", "", "", "");

    if(origen==null){
      this.formUsuario = JSON.parse(sessionStorage.getItem("usuarioDetalle"));
      this.formUsuarioBase = JSON.parse(sessionStorage.getItem("usuarioDetalle"));
      if(this.formUsuario==null){
        this._router.navigate(['/activar']);
      }
    }else{      
       this.botonRegresar =true;
       this.obtenerUsuario(this.logueado);
    }

    sessionStorage.removeItem("usuarioDetalleDos");
    
    

    if(this.logueado.usuario.idPerfil==1){
      this.isReadonlyUsuario=true;     
    }else{
      this.isReadonlyUsuario=true;  
      this.isReadonlySujeto = true;
    }

    this.recuperarUsuario = new RecuperarUsuario("");
    this.recuperarUsuario.emailInstitucional = this.formUsuario.usuario;
    this.isReadonly = true;   
    this.esRequerido = false;   
    this.botonCancelar = false;   
   }


   obtenerUsuario(logueado:ResponseLogin){
    //console.log("logueado: "+JSON.stringify(logueado));
    let recuperarUsuario:RecuperarUsuario = {emailInstitucional:logueado.usuario.idUsuario+""};
    this.spinner.show();

    this.usuarioService.recuperarUsuarioByEmail(recuperarUsuario).subscribe(
      result => {

            let responseUsuario:ResponseUsuario = result;
            console.log(responseUsuario);
            if (responseUsuario !=null ) {
              console.log(responseUsuario.usuario[0]);
                if(responseUsuario.estatus === "ok"){
                    let u = responseUsuario.usuario[0];
                    this.formUsuario ={idUsuario:u.idUsuario,
                      idPerfil:u.idPerfil, 
                      sujetoObligado:u.sujetoObligado,
                      nombreServidorPublico:u.nombreServidorPublico,
                      cargoServidorPublico:u.cargoServidorPublico,
                      usuario:u.usuario,
                      contrasena:"",
                      emailInstitucional:u.emailInstitucional,
                      telefono:u.telefono,
                      extensionTelefono:u.extensionTelefono,
                      celular:u.celular,
                      activo:"",};
                      
                      this.formUsuarioBase = this.formUsuario;
                }else{
                  this.toastr.warning('No se pudo obtener el detalle del usuario', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
                }
            } else {
              this.toastr.error('No se pudo realizar la operacion', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
            }

            setTimeout(() => {
              if(this.formUsuario==null){
                this._router.navigate(['/inicio']);
              }
              this.spinner.hide();
            }, 1000);
        
      }
    );
   }

  ngOnInit(): void {
   
  }

  activarUsuario(){
    this.spinner.show();

    this.usuarioService.activarUsuario(this.recuperarUsuario).subscribe(
      result => {

            this.responseUsuario = result;
          
            if (this.responseUsuario !=null ) {

                if(this.responseUsuario.estatus === "ok"){
                  this.frameOk.show();
                }else if(this.responseUsuario.estatus === "fail"){
                  this.frameFail.show();
                }else{
                  this.toastr.warning('No se pudo activar el usuario', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
                }
            } else {
              this.toastr.error('No se pudo realizar la operacion', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
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

  navegarActivar(){
    this._router.navigate(['/activar']);
  }

  navegarInicio(){
    this._router.navigate(['/inicio']);
  }

  editar(){
    this.isReadonly = false;   
    this.botonCancelar = true;
    this.esRequerido = true;   
    
    if(this.logueado.usuario.idPerfil==1){
      this.isReadonlyUsuario=true;     
      this.isReadonlySujeto=false;
    }else{
      this.isReadonlyUsuario=false;     
      this.isReadonlySujeto=true;
    }
  }

  cancelar(){
    this.isReadonly = true;   
    this.botonCancelar = false;
    this.formUsuario = this.formUsuarioBase;
    this.esRequerido = false; 
    this.isReadonlyUsuario=true;     
    this.isReadonlySujeto=true;    
  }

  guardarEdicion(){
    console.log("actualizado");
    
    let hasEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.formUsuario.emailInstitucional);
    if(!hasEmail){
      this.toastr.error('Error, Ingresa un formato valido para el email', '', { positionClass: 'toast-top-full-width', closeButton: true });
      return;
    }else{
      this.isReadonly = true;   
      this.botonCancelar = false;
      this.esRequerido = false; 
      this.isReadonlyUsuario=true;     
      this.isReadonlySujeto=true;
      this.formUsuario.idUsuario = this.logueado.usuario.idUsuario;
console.log("this.formUsuario: "+ JSON.stringify( this.formUsuario));
      this.spinner.show();
      this.usuarioService.actualizarUsuario(this.formUsuario).subscribe(
          result=>{
            let response:ResponseUsuario = result;
            if(response!=null){
              if(response.estatus === 'ok'){
                this.frameAct.show();
              }else{
                this.toastr.warning('No se pudo actualizar el usuario', 'Error', { positionClass: 'toast-top-full-width', closeButton: true });
              }
            }else{
              this.toastr.error('Error, ocurrio un error al actualizar el registro', '', { positionClass: 'toast-top-full-width', closeButton: true });
            }
            setTimeout(() => {
              this.spinner.hide();
            }, 1000);
          }
      );

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

   numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

}
