import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import {Global} from '../global/global';
import {UsuarioDTO} from '../model/usuario';
import {map} from 'rxjs/operators';
import {Excencionrequest} from '../model/excencionrequest';
import { ResponseContentType } from '@angular/http';

@Injectable({
  providedIn: 'root'
})

export class ManualesService {
  private urlManuales: string;
  private urlBytesManuales: string;
  private urlFormato: string;
  

  constructor(private http: HttpClient,
    private htt: HttpClient) {
    this.urlManuales = Global.url + 'manuales/obtenerLista';
    this.urlBytesManuales = Global.url + 'manuales/descargaDocumento';
    this.urlFormato = Global.url + 'fichero/descargarFormatos';
  
  }

  public obtenerManuales() {
   
      return this.http
      .get<any>(this.urlManuales )
      .pipe(
        map((res: any) => {
          return res;
        })
      );
   }

  public obtenerBytesManuales(nombre:string) {
   
    return this.http
    .get<any>(this.urlBytesManuales+"?nombredocumento="+ nombre)
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public descargarFormato(nombre: string){
    const link = document.createElement('a');
    link.target = '_self';
    link.href = this.urlFormato+"?nombre="+nombre;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }

 
}
