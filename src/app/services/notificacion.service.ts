import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { UsuarioDTO } from '../model/usuario';
import { Global } from '../global/global';
import { UsuarioAlta } from '../model/usuarioalta';
import { RecuperarUsuario } from '../model/recupera';
import { TokenRecupera } from '../model/tokenrecupera';
import { NotificacionesDTO } from '../model/notificaciones';



@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  public url:string;
  public urlRecuperaNotificaciones:string;
  public urlBajaNotificaciones:string;
  public urlDescargaDescargaNotificacion:string;
  public urlRespondeNotificaciones:string;
  public urlGetAdministradores:string;
  public urlGetUsuarios:string;
  public urlUsuarioPorFolio:string;
  
 
  constructor(private http:HttpClient) { 
    this.url = Global.url+"notificaciones/alta";
    this.urlRecuperaNotificaciones = Global.url+"notificaciones/recuperarNotificaciones";
    this.urlBajaNotificaciones = Global.url+"notificaciones/bajaNotificaciones";
    this.urlDescargaDescargaNotificacion = Global.url+"notificaciones/descargaNotificaciones";
    this.urlRespondeNotificaciones = Global.url+"notificaciones/respondeNotificaciones";
    this.urlGetAdministradores = Global.url+"notificaciones/getAdministradores";
    this.urlGetUsuarios = Global.url+"notificaciones/getUsuarios";
    this.urlUsuarioPorFolio = Global.url+"notificaciones/getUsuarioPorFolio";
   
  }

  public altaNotificacion(notificacion:NotificacionesDTO){
    
    return this.http
    .post<any>(this.url, notificacion )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public recuperaNotificaciones(notificacion:NotificacionesDTO){
   
    return this.http
    .post<any>(this.urlRecuperaNotificaciones, notificacion )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public bajaNotificaciones(notificacion:NotificacionesDTO){
    return this.http
    .post<any>(this.urlBajaNotificaciones, notificacion )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public descargaNotificacion(ruta: string){
    const link = document.createElement('a');
    link.target = '_self';
    link.href = this.urlDescargaDescargaNotificacion+"?ruta="+ruta;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }

  public respondeNotificaciones(notificacion:NotificacionesDTO){
    return this.http
    .post<any>(this.urlRespondeNotificaciones, notificacion )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  
  public getAdministradores(){
   
    return this.http
    .get<any>(this.urlGetAdministradores,  )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public getUsuarios(){
   
    return this.http
    .get<any>(this.urlGetUsuarios,  )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public getUsuarioPorFolio(notificacion:NotificacionesDTO){
    return this.http
    .post<any>(this.urlUsuarioPorFolio, notificacion )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
