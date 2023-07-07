import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import {Global} from '../global/global';
import {UsuarioDTO} from '../model/usuario';
import {map} from 'rxjs/operators';
import {Excencionrequest} from '../model/excencionrequest';

@Injectable({
  providedIn: 'root'
})

export class ExcencionService {
  private urlConsulta: string;
  private urlRegistrar: string;
  private urlDescargar: string;
  private urlDocumento: string;
  private urlCustionario: string;
  private urlAceptar: string;
  private urlRia: string;
  private urlRespuesta: string;
  private urlEnviarRia: string;
  private urlAceptarRia: string;
  private urlOpinion: string;

  constructor(private http: HttpClient) {
    this.urlConsulta = Global.url + 'api/excencion/flujo/consultar?idUsuario=';
    this.urlRegistrar = Global.url + 'api/excencion/cuestionario/registrar';
    this.urlDescargar = Global.url + 'api/excencion/cuestionario/descargar?folio=';
    this.urlCustionario = Global.url + 'api/excencion/cuestionario/consultar?folio=';
    this.urlDocumento = Global.url + 'api/excencion/cuestionario/descargar?id=';
    this.urlAceptar = Global.url + 'api/excencion/cuestionario/aceptar?folio=';
    this.urlRia = Global.url + 'api/excencion/ria/registrar?folio=';
    this.urlRespuesta = Global.url + 'api/excencion/respuesta/registrar?folio=';
    this.urlEnviarRia = Global.url + 'api/excencion/ria/enviar?folio=';
    this.urlAceptarRia = Global.url + 'api/excencion/ria/aceptar?folio=';
    this.urlOpinion = Global.url + 'api/excencion/registrar/opinion?folio=';
  }

  public consultarFlujo(idUsuario: number) {
 
      return this.http
      .get<any>(this.urlConsulta + idUsuario )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
   }

  public consultarCuestionario(folio: string) {
   
      return this.http
      .get<any>(this.urlCustionario + folio )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

   public registrarFlujo(peticion: Excencionrequest) {
   
       return this.http
       .post<any>(this.urlRegistrar, peticion )
       .pipe(
         map((res: any) => {
           return res;
         })
       );
   }

  public aceptarFlujo(peticion: Excencionrequest, folio: string) {
    /*const headers = new Headers({ 'Content-type': 'application/json' });
    const options = new RequestOptions({ headers });
    const cuestionarioForm = JSON.stringify(peticion);
    return this.http.post(this.urlAceptar + folio, cuestionarioForm, options)
      .pipe(map(res => res.json()));
*/
      return this.http
      .post<any>(this.urlAceptar + folio, peticion )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  public registrarRia(peticion: Excencionrequest, folio: string) {
    /*const headers = new Headers({ 'Content-type': 'application/json' });
    const options = new RequestOptions({ headers });
    const cuestionarioForm = JSON.stringify(peticion);
    return this.http.post(this.urlRia + folio, cuestionarioForm, options)
      .pipe(map(res => res.json()));
*/
      return this.http
      .post<any>(this.urlRia + folio, peticion )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  public aceptarRia(peticion: Excencionrequest, folio: string) {
    /*const headers = new Headers({ 'Content-type': 'application/json' });
    const options = new RequestOptions({ headers });
    const cuestionarioForm = JSON.stringify(peticion);
    return this.http.post(this.urlAceptarRia + folio, cuestionarioForm, options)
      .pipe(map(res => res.json()));
*/
      return this.http
      .post<any>(this.urlAceptarRia + folio, peticion )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  public enviarRia(peticion: Excencionrequest, folio: string) {
    /*const headers = new Headers({ 'Content-type': 'application/json' });
    const options = new RequestOptions({ headers });
    const cuestionarioForm = JSON.stringify(peticion);
    return this.http.post(this.urlEnviarRia + folio, cuestionarioForm, options)
      .pipe(map(res => res.json()));
*/
      return this.http
      .post<any>(this.urlEnviarRia + folio, peticion )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  public registrarRespuesta(peticion: Excencionrequest, folio: string) {
 
      return this.http
      .post<any>(this.urlRespuesta + folio, peticion )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }


  public registrarOpinion(peticion: Excencionrequest, folio: string) {
 
    return this.http
    .post<any>(this.urlOpinion + folio, peticion )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
}


   public descargarArchivo(folio: string) {
     const link = document.createElement('a');
     link.target = '_self';
     link.href = this.urlDescargar + folio;
     link.setAttribute('visibility', 'hidden');
     link.click();
   }

  public descargarDocumento(id: string) {
    const link = document.createElement('a');
    link.target = '_self';
    link.href = this.urlDocumento + id;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }

  public descargarDocumentos(folio: string, pregunta: string) {
    const link = document.createElement('a');
    link.target = '_self';
    link.href = this.urlDescargar + folio + '&pregunta=' + pregunta;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }
}
