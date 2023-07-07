import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, ResponseContentType, } from '@angular/http';
import {map} from 'rxjs/operators';
import { UsuarioDTO } from '../model/usuario';
import { Global } from '../global/global';
import { UsuarioAlta } from '../model/usuarioalta';
import { RecuperarUsuario } from '../model/recupera';
import { TokenRecupera } from '../model/tokenrecupera';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  public url:string;
  public urlAvisoNombre:string;
 
  constructor(private http:Http) { 
    this.url = Global.url+"documentos/aviso";
    this.urlAvisoNombre = Global.url+"documentos/avison";
  }

 

  aviso(): Observable<any> {
    const httpHeaders = new Headers({
      
    }); 
    const options = {
        headers: httpHeaders,
        responseType: ResponseContentType.Blob
    };
    return this.http.post(this.url , "", options);
  }

  avisop() {
    let headers = new Headers({'Content-type': 'application/json'});
    const httpHeaders = new Headers({
      headers:headers
    }); 
    const options = {
        headers: httpHeaders,
    };
    return this.http.post(this.urlAvisoNombre, "", options).pipe(map(res => res.json()));
}


  

}
