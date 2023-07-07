import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { UsuarioDTO } from '../model/usuario';
import { Global } from '../global/global';
import { UsuarioAlta } from '../model/usuarioalta';
import { RecuperarUsuario } from '../model/recupera';
import { TokenRecupera } from '../model/tokenrecupera';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url:string;
  public urlRecuperaUsuario:string;
  public urlValidaActualizacionPass:string;
  public urlActualizacionPass:string;
  public urlRecuperaUsuarios:string;
  public urlActivarUsuario:string;
  public urlDesactivarUsuario:string;
  public urlActualizarUsuario:string;
  public urlEliminarUsuario:string;
  public urlRecuperaUsuarioByEmail:string;
 
  constructor(private http:HttpClient) { 
    this.url = Global.url+"usuario/alta";
    this.urlRecuperaUsuario = Global.url+"usuario/recuperarUsuario";
    this.urlValidaActualizacionPass = Global.url+"usuario/validaUsuarioToken";
    this.urlActualizacionPass = Global.url+"usuario/actualizarPass";
    this.urlRecuperaUsuarios = Global.url+"usuario/recuperarUsuarios";
    this.urlActivarUsuario = Global.url+"usuario/activarUsuario";
    this.urlDesactivarUsuario = Global.url+"usuario/desactivarUsuario";
    this.urlActualizarUsuario = Global.url+"usuario/actualizarUsuario";
    this.urlEliminarUsuario = Global.url+"usuario/eliminarUsuario";
    this.urlRecuperaUsuarioByEmail = Global.url+"usuario/recuperarUsuarioByEmail";
  }

  public altaUsuario(usuario:UsuarioAlta){
    
    return this.http
    .post<any>(this.url, usuario )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public recuperarUsuario(recuperarUsuario:RecuperarUsuario){
 
    return this.http
    .post<any>(this.urlRecuperaUsuario, recuperarUsuario )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public validarActualizacionPass(token:TokenRecupera){
   

    return this.http
    .post<any>(this.urlValidaActualizacionPass, token )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public actualizarPass(pass:UsuarioAlta){
   
    return this.http
    .post<any>(this.urlActualizacionPass, pass )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public recuperarUsuarios(){
   
    return this.http
    .post<any>(this.urlRecuperaUsuarios, "" )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public activarUsuario(activarUsuario:RecuperarUsuario){
   
    return this.http
    .post<any>(this.urlActivarUsuario, activarUsuario )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  
  public desactivarUsuario(activarUsuario:RecuperarUsuario){
 
    return this.http
    .post<any>(this.urlDesactivarUsuario, activarUsuario )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public actualizarUsuario(actualizarUsuario:UsuarioDTO){
   
    return this.http
    .post<any>(this.urlActualizarUsuario, actualizarUsuario )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public eliminarUsuario(eliminarUsuario:RecuperarUsuario){
 
    return this.http
    .post<any>(this.urlEliminarUsuario, eliminarUsuario )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public recuperarUsuarioByEmail(recuperarUsuario:RecuperarUsuario){
 
    return this.http
    .post<any>(this.urlRecuperaUsuarioByEmail, recuperarUsuario )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
