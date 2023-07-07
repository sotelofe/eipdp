import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {map} from 'rxjs/operators';
import { UsuarioDTO } from '../model/usuario';
import { Global } from '../global/global';
import { UsuarioAlta } from '../model/usuarioalta';
import { RecuperarUsuario } from '../model/recupera';
import { TokenRecupera } from '../model/tokenrecupera';
import { Preconsulta } from '../model/preconsulta';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class DescargaService {
  public urlDescargaCuestionarioF1:string;
  public urlDescargaDocumento:string;
  public urlDescargaDocumentoPorNombreF1:string;
  public urldescargaDocumentoPorNombreF1RiaSolicitada:string;
  public urlDescargaDocumentoPorNombreF1RiaEnviada:string;
  public urlDescargaCuestionarioF2:string;
  public urlDescargaDocumentoPorNombreF2:string;
  public urlDescargaDocumentoRiesgosF2:string;
  public urldescargaDocumentoPorNombreF1RiaSolicitada2:string;
  public urlDescargaDocumentoPorNombreF1RiaEnviada2:string;
  public urlDescargaArchivo:string;
  
  
 
  constructor(private http:HttpClient) { 
    this.urlDescargaCuestionarioF1 = Global.url+"fichero/descargarCuestionarioF1";
    this.urlDescargaDocumento = Global.url+"fichero/descargarArchivoPorRuta";
    this.urlDescargaDocumentoPorNombreF1 = Global.url+"fichero/descargaDocumentoPorNombreF1";
    this.urldescargaDocumentoPorNombreF1RiaSolicitada = Global.url+"fichero/descargaDocumentoPorNombreF1RiaSolicitada";
    this.urlDescargaDocumentoPorNombreF1RiaEnviada = Global.url+"fichero/descargaDocumentoPorNombreF1RiaEnviada";
    this.urlDescargaCuestionarioF2 = Global.url+"fichero/descargarCuestionarioF2";
    this.urlDescargaDocumentoPorNombreF2 = Global.url+"fichero/descargaDocumentoPorNombreF2";
    this.urlDescargaDocumentoRiesgosF2 = Global.url+"fichero/descargaDocumentoRiesgosF2";
    this.urldescargaDocumentoPorNombreF1RiaSolicitada2 = Global.url+"fichero/descargaDocumentoPorNombreF1RiaSolicitada2";
    this.urlDescargaDocumentoPorNombreF1RiaEnviada2 = Global.url+"fichero/descargaDocumentoPorNombreF1RiaEnviada2";
    this.urlDescargaArchivo = Global.url+"fichero/descargaArchivoRuta";
    
    
  }

  public descargaCuestionarioF1(folio: string){
    const link = document.createElement('a');
    link.target = '_self';
    link.href = this.urlDescargaCuestionarioF1+"?folio="+folio;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }

  public descargaDocumento(ruta: string, idFlujo:number, carpeta:string, pregunta:string){
    const link = document.createElement('a');
    link.target = '_self';
    link.href = this.urlDescargaDocumento+"?ruta="+ruta+"&idFlujo="+idFlujo+"&carpeta="+carpeta+"&pregunta="+pregunta;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }

  public descargaDocumentoPorNombreF1(folio: string){
    const link = document.createElement('a');
    link.target = '_self';
    link.href = this.urlDescargaDocumentoPorNombreF1+"?folio="+folio;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }

  public descargaDocumentoPorNombreF1RiaSolicitada(folio: string){
    const link = document.createElement('a');
    link.target = '_self';
    link.href = this.urldescargaDocumentoPorNombreF1RiaSolicitada+"?folio="+folio;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }

  public descargaDocumentoPorNombreF1RiaEnviada(folio: string){
    const link = document.createElement('a');
    link.target = '_self';
    link.href = this.urlDescargaDocumentoPorNombreF1RiaEnviada+"?folio="+folio;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }

  public descargaCuestionarioF2(folio: string){
    const link = document.createElement('a');
    link.target = '_self';
    link.href = this.urlDescargaCuestionarioF2+"?folio="+folio;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }
  
  public descargaDocumentoPorNombreF2(folio: string){
    const link = document.createElement('a');
    link.target = '_self';
    link.href = this.urlDescargaDocumentoPorNombreF2+"?folio="+folio;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }

  public descargaDocumentoRiesgosF2(folio: string){
    const link = document.createElement('a');
    link.target = '_self';
    link.href = this.urlDescargaDocumentoRiesgosF2+"?folio="+folio;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }

  public descargaDocumentoPorNombreF1RiaSolicitada2(folio: string){
    const link = document.createElement('a');
    link.target = '_self';
    link.href = this.urldescargaDocumentoPorNombreF1RiaSolicitada2+"?folio="+folio;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }

  public descargaDocumentoPorNombreF1RiaEnviada2(folio: string){
    const link = document.createElement('a');
    link.target = '_self';
    link.href = this.urlDescargaDocumentoPorNombreF1RiaEnviada2+"?folio="+folio;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }

  public descargaArchivoRuta(folio: any){

    return this.http
    .post<any>(this.urlDescargaArchivo, folio )
    .pipe(
      map((res: any) => {
        return res;
      })
    );   
  }

  public descarga(base64: string, nombre:string){
    const link = document.createElement('a');
        link.target = '_self';        
        link.href = base64;
        link.download = nombre;
        link.setAttribute('visibility', 'hidden');
        link.click();  
  }

}
