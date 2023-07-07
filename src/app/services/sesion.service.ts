import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { UsuarioDTO } from '../model/usuario';
import { ResponseLogin } from '../model/responselogin';
import { TokenResponse } from '../model/token-response.model';


@Injectable({
  providedIn: 'root'
})
export class SesionService {
  public url:string;
  public usuarioLogueado:ResponseLogin;
  

  constructor(private _router: Router) { 
    
  }

  sesionUsuario(usuario:ResponseLogin):void{
    sessionStorage.setItem("usuarioLogueado",JSON.stringify(usuario));
  }

  sesionToken(token:TokenResponse){
    sessionStorage.setItem('token', token.access_token);
    sessionStorage.setItem('refresh_token', token.refresh_token);
  }

  obtenerSesionUsuario():ResponseLogin{
    let sUsuario:string;
    sUsuario = sessionStorage.getItem("usuarioLogueado");
    return JSON.parse(sUsuario);
  }

  limpiarSesion(){
    sessionStorage.clear();
  }

  sesionVista(vista:string){
    sessionStorage.setItem("vistaActual",vista);
  }

  obtenerSesionVista():string{
    let vistaActual = sessionStorage.getItem("vistaActual");
    return vistaActual;
  }
  
  validarInicioSesion(){
    this.usuarioLogueado = this.obtenerSesionUsuario();
    
    if(this.usuarioLogueado == null){
      this._router.navigate(['/login']);
    }else{
      console.log("usuario logueado"+ this.usuarioLogueado.usuario)
    }
  }

}
