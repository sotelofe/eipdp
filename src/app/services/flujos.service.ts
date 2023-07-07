import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioDTO } from '../model/usuario';
import { Global } from '../global/global';
import { UsuarioAlta } from '../model/usuarioalta';
import { RecuperarUsuario } from '../model/recupera';
import { TokenRecupera } from '../model/tokenrecupera';
import { Preconsulta } from '../model/preconsulta';
import { AceptarFUno } from '../model/aceptarf1';
import { SubeDocumento } from '../model/sube.documento';
import { Presentacion } from '../model/presentacion';
import { ListaFlujoUno } from '../model/lista_flujo1';



@Injectable({
  providedIn: 'root'
})
export class FlujoService {
  public url: string;
  public urlListaFlujo1: string;
  public urlPrecargaFlujo1: string;
  public urlAceptarFlujo1: string;
  public urlOpinion: string;
  public urlDetalleOpinion: string;
  public urlRiaFlujo1: string;
  public urlSRiaFlujo1: string;
  public urlsubirRiaRequerida: string;
  public urlSRiaFlujo2: string;
  public urlAceptarRiaUno: string;
  public urlPresentacion: string;
  public urlListaFlujo2: string;
  public urlPrecargaFlujo2: string;
  public urlAceptarFlujo2: string;
  public urlSolicitarReunion: string;
  public urlObtenerListaReunion: string;
  public urlActualizarMinuta: string;
  public urlRiesgos: string;
  public urlDictamen: string;
  public urlInforme: string;
  public urlSubirInforme: string;
  public urlRiaFlujo2: string;
  public urlsubirRiaRequerida2: string;
  public urlAceptarRiaDos: string;
  public urlSRiaFlujo12: string;
  public urlNotificaRiaNoPresentada: string;
  public urlDetalleRiaNoPresentada: string;
  public urlNotificaRiaNoPresentadaFu: string;
  public urlDetalleRiaNoPresentadaFu: string;
  public urlAcuerdoAdmision: string;
  public urlAcuerdoAdmisionGeneral: string;
  public urlNovinculantes: string;

  constructor(private http: HttpClient) {
    this.url = Global.url + "eipdp/flujo1";
    this.urlListaFlujo1 = Global.url + "eipdp/obtenerListaFlujo1";
    this.urlPrecargaFlujo1 = Global.url + "eipdp/obtenerDetalleCuestionarioFlujo1";
    this.urlAceptarFlujo1 = Global.url + "eipdp/aceptarfuno";
    this.urlOpinion = Global.url + "eipdp/generarOpinion";
    this.urlDetalleOpinion = Global.url + "eipdp/obtenerDetalleOpinionFlujo1";
    this.urlRiaFlujo1 = Global.url + "eipdp/riafuno";
    this.urlSRiaFlujo1 = Global.url + "eipdp/obtenerDetalleRiaFlujo1";
    this.urlsubirRiaRequerida = Global.url + "eipdp/subirRiaRequerida";
    this.urlSRiaFlujo2 = Global.url + "eipdp/obtenerDetalleRiaFlujo2";
    this.urlAceptarRiaUno = Global.url + "eipdp/aceptarRiaUno";
    this.urlPresentacion = Global.url + "eipdp/flujo2";
    this.urlListaFlujo2 = Global.url + "eipdp/obtenerListaFlujo2";
    this.urlPrecargaFlujo2 = Global.url + "eipdp/obtenerDetalleCuestionarioFlujo2";
    this.urlAceptarFlujo2 = Global.url + "eipdp/aceptarfdos";
    this.urlSolicitarReunion = Global.url + "eipdp/guardarReunion";
    this.urlObtenerListaReunion = Global.url + "eipdp/obtenerListaReunion";
    this.urlActualizarMinuta = Global.url + "eipdp/actualizarMinuta";
    this.urlRiesgos = Global.url + "eipdp/subirRiesgos";
    this.urlDictamen = Global.url + "eipdp/subirDictamen";
    this.urlInforme = Global.url + "eipdp/solicitarInforme";
    this.urlSubirInforme = Global.url + "eipdp/subirInforme";
    this.urlRiaFlujo2 = Global.url + "eipdp/riafdos";
    this.urlsubirRiaRequerida2 = Global.url + "eipdp/subirRiaRequerida2";
    this.urlAceptarRiaDos = Global.url + "eipdp/aceptarRiaDos";
    this.urlSRiaFlujo12 = Global.url + "eipdp/obtenerDetalleRiaFlujo12";
    this.urlNotificaRiaNoPresentada = Global.url + "eipdp/notificaRiaNoPresentadaDos";
    this.urlDetalleRiaNoPresentada = Global.url + "eipdp/obtenerDetalleRiaNoPresentadaDos";
    this.urlNotificaRiaNoPresentadaFu = Global.url + "eipdp/notificaRiaNoPresentada";
    this.urlDetalleRiaNoPresentadaFu = Global.url + "eipdp/obtenerDetalleRiaNoPresentada";
    this.urlAcuerdoAdmision = Global.url + "eipdp/acuerdoAdmision";
    this.urlAcuerdoAdmisionGeneral = Global.url + "eipdp/acuerdoAdmisionf2";
    this.urlNovinculantes = Global.url + "eipdp/terminarNoVinculantes";
  }

  public altaFlujo1(formPreconsulta: Preconsulta) {
   
    return this.http
    .post<any>(this.url, formPreconsulta )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public obtenerListaFlujo1(usuario: UsuarioDTO) {
    //let headers = new Headers({ 'Content-type': 'application/json' });
    //let options = new RequestOptions({ headers: headers });
    //let jsonUsuario = JSON.stringify(usuario);
    //return this.http.post(this.urlListaFlujo1, jsonUsuario).pipe(map(res => res.json()));

    return this.http
    .post<any>(this.urlListaFlujo1, usuario )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public obtenerDetalleCuestionarioFlujo1(folio: RecuperarUsuario) {
    /*let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonFolio = JSON.stringify(folio);
    return this.http.post(this.urlPrecargaFlujo1, jsonFolio, options).pipe(map(res => res.json()));
    */
    return this.http
    .post<any>(this.urlPrecargaFlujo1, folio )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
    
  }

  public aceptarCuestionarioUno(cuestionario: AceptarFUno) {
    /*let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonCuestionario = JSON.stringify(cuestionario);
    return this.http.post(this.urlAceptarFlujo1, jsonCuestionario, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlAceptarFlujo1, cuestionario )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public subirOpinionTecnica(documento: SubeDocumento) {
    /*let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonDocumento = JSON.stringify(documento);
    return this.http.post(this.urlOpinion, jsonDocumento, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlOpinion, documento )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public obtenerDetalleOpinionFlujo1(folio: RecuperarUsuario) {
    /*let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonFolio = JSON.stringify(folio);
    return this.http.post(this.urlDetalleOpinion, jsonFolio, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlDetalleOpinion, folio )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public riaCuestionarioUno(acceptarFdos: AceptarFUno) {
    /*let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonCuestionario = JSON.stringify(acceptarFdos);
    return this.http.post(this.urlRiaFlujo1, jsonCuestionario, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlRiaFlujo1, acceptarFdos )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public obtenerDetalleRiaFlujo1(folio: RecuperarUsuario) {
   /* let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonFolio = JSON.stringify(folio);
    return this.http.post(this.urlSRiaFlujo1, jsonFolio, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlSRiaFlujo1, folio )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public subirRiaRequerida(documento: SubeDocumento) {
    /*let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonDocumento = JSON.stringify(documento);
    return this.http.post(this.urlsubirRiaRequerida, jsonDocumento, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlsubirRiaRequerida, documento )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public obtenerDetalleRiaFlujo12(folio: RecuperarUsuario) {
    /*let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonFolio = JSON.stringify(folio);
    return this.http.post(this.urlSRiaFlujo12, jsonFolio, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlSRiaFlujo12, folio )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public obtenerDetalleRiaFlujo2(folio: RecuperarUsuario) {
    /*let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonFolio = JSON.stringify(folio);
    return this.http.post(this.urlSRiaFlujo2, jsonFolio, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlSRiaFlujo2, folio )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public aceptarRiaUno(cuestionario: AceptarFUno) {
    /*let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonCuestionario = JSON.stringify(cuestionario);
    console.log(jsonCuestionario);
    return this.http.post(this.urlAceptarRiaUno, jsonCuestionario, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlAceptarRiaUno, cuestionario )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public altaFlujo2(formPresentacion: Presentacion) {
    /*let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonPresentacion = JSON.stringify(formPresentacion);
    return this.http.post(this.urlPresentacion, jsonPresentacion, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlPresentacion, formPresentacion )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public obtenerListaFlujo2(usuario: UsuarioDTO) {
    /*let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonUsuario = JSON.stringify(usuario);
    return this.http.post(this.urlListaFlujo2, jsonUsuario, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlListaFlujo2, usuario )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public obtenerDetalleCuestionarioFlujo2(folio: RecuperarUsuario) {
    /*let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonFolio = JSON.stringify(folio);
    return this.http.post(this.urlPrecargaFlujo2, jsonFolio, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlPrecargaFlujo2, folio )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public aceptarCuestionarioDos(cuestionario: AceptarFUno) {
    /*let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonCuestionario = JSON.stringify(cuestionario);
    return this.http.post(this.urlAceptarFlujo2, jsonCuestionario, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlAceptarFlujo2, cuestionario )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public solicitarReunion(documento: SubeDocumento) {
   /* let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonDocumento = JSON.stringify(documento);
    return this.http.post(this.urlSolicitarReunion, jsonDocumento, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlSolicitarReunion, documento )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public obtenerListaReunion(documento: SubeDocumento) {
    /*let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonFolio = JSON.stringify(documento);
    return this.http.post(this.urlObtenerListaReunion, jsonFolio, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlObtenerListaReunion, documento )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public actualizarMinuta(cuestionario: AceptarFUno) {
   /* let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonCuestionario = JSON.stringify(cuestionario);
    return this.http.post(this.urlActualizarMinuta, jsonCuestionario, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlActualizarMinuta, cuestionario )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public subirRiesgos(documento: SubeDocumento) {
    /*let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonDocumento = JSON.stringify(documento);
    return this.http.post(this.urlRiesgos, jsonDocumento, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlRiesgos, documento )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public subirDictamen(documento: SubeDocumento) {
    /*let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonDocumento = JSON.stringify(documento);
    return this.http.post(this.urlDictamen, jsonDocumento, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlDictamen, documento )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public solicitarInforme(documento: SubeDocumento) {
    /*let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonDocumento = JSON.stringify(documento);
    return this.http.post(this.urlInforme, jsonDocumento, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlInforme, documento )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public subirInforme(documento: SubeDocumento) {
    /*let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonDocumento = JSON.stringify(documento);
    return this.http.post(this.urlSubirInforme, jsonDocumento, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlSubirInforme, documento )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public riaCuestionarioDos(acceptarFdos: AceptarFUno) {
    /*let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonCuestionario = JSON.stringify(acceptarFdos);
    return this.http.post(this.urlRiaFlujo2, jsonCuestionario, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlRiaFlujo2, acceptarFdos )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  
  public subirRiaRequerida2(documento: SubeDocumento) {
    /*let headers = new Headers({ 'Content-type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let jsonDocumento = JSON.stringify(documento);
    return this.http.post(this.urlsubirRiaRequerida2, jsonDocumento, options).pipe(map(res => res.json()));
*/
    return this.http
    .post<any>(this.urlsubirRiaRequerida2, documento )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public aceptarRiaDos(cuestionario: AceptarFUno) {
   
    return this.http
    .post<any>(this.urlAceptarRiaDos, cuestionario )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public notificarRiaNoPresentadaFu(documento: SubeDocumento) {
   
    return this.http
    .post<any>(this.urlNotificaRiaNoPresentadaFu, documento )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public obtenerDetalleRiaNoPresentadaFu(folio: RecuperarUsuario) {
  
    return this.http
    .post<any>(this.urlDetalleRiaNoPresentadaFu, folio )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public notificarRiaNoPresentada(documento: SubeDocumento) {
  
    return this.http
    .post<any>(this.urlNotificaRiaNoPresentada, documento )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public obtenerDetalleRiaNoPresentada(folio: RecuperarUsuario) {
   
    return this.http
    .post<any>(this.urlDetalleRiaNoPresentada, folio )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public subirAcuerdoAdmision(documento: SubeDocumento) {
    
    return this.http
    .post<any>(this.urlAcuerdoAdmision, documento )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public subirAcuerdoAdmisionGeneral(documento: SubeDocumento) {
    
    return this.http
    .post<any>(this.urlAcuerdoAdmisionGeneral, documento )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public terminarSolicitudRecomendacionesNoVinculantes(documento: SubeDocumento) {
    
    return this.http
    .post<any>(this.urlNovinculantes, documento )
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}
