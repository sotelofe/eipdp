import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import { UsuarioDTO } from '../model/usuario';
import { Global } from '../global/global';
import { TokenResponse } from '../model/token-response.model';
import { ResponseLogin } from '../model/responselogin';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public url:string;
  public urlOauth:string;
 
  constructor(private http:HttpClient) { 
    this.url = Global.url+"login/acceso";
    this.urlOauth = Global.url+"oauth/token";
  }

  public validarUsuario(usuario:UsuarioDTO){
    debugger
    
    let authorizationData =
    'Basic ' + btoa(Global.userIdClient + ':' + Global.passClient);
    console.log(authorizationData);

  
    const HTTP_OPTIONS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: authorizationData
      })
    };
    
    let params = new HttpParams()
    .set('grant_type', 'password')
    .set('username', usuario.usuario)
    .set('password', usuario.contrasena);
    
    return this.http
    .post<TokenResponse>(this.urlOauth, params, HTTP_OPTIONS)
    .pipe(
      map((res: TokenResponse) => {
        return res;
      }),
      catchError((err) => {
        console.log(err);
        throw 'Usuario no registrado';
      })
    );
  }

  public getDatosUsuario(usuario:UsuarioDTO){   
    
    return this.http
    .post<ResponseLogin>(this.url, usuario )
    .pipe(
      map((res: ResponseLogin) => {
        return res;
      })
    );

  }


}
