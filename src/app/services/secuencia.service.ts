import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { UsuarioDTO } from '../model/usuario';
import { Global } from '../global/global';
import { UsuarioAlta } from '../model/usuarioalta';
import { RecuperarUsuario } from '../model/recupera';
import { TokenRecupera } from '../model/tokenrecupera';
import { NotificacionesDTO } from '../model/notificaciones';
import { SecuenciaRequest } from '../model/secuencia-request';



@Injectable({
  providedIn: 'root'
})
export class SecuenciaService {
  public urlSecuencia:string;
  public urlSecuenciaComentario:string;
  public urlSecuenciaAltaComentario:string;
  
  
 
  constructor(private http:HttpClient) { 
    this.urlSecuencia = Global.url+"historico/getSecuencia";
    this.urlSecuenciaComentario = Global.url+"historico/getComentario";
    this.urlSecuenciaAltaComentario = Global.url+"historico/altaComentario";
    
   
  }
  
  public getHistoricoSecuencia(secuencia:SecuenciaRequest){
    return this.http
    .post<any>(this.urlSecuencia, secuencia )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public getComentario(secuencia:SecuenciaRequest){
    return this.http
    .post<any>(this.urlSecuenciaComentario, secuencia )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public altaComentario(secuencia:SecuenciaRequest){
    return this.http
    .post<any>(this.urlSecuenciaAltaComentario, secuencia )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
