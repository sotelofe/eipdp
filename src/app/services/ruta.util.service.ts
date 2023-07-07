
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RutaUtilService {

    constructor() {
    }

    public ruta(f){
        let folio =f.split('/').join('_');  
        folio = folio.replace("-","_");
        return folio;
      }

    public rutaEx(f){
      console.log("folio:"+f);
        let folio =f.split('/').join('');  
        console.log("folio:"+folio);
        //folio = folio.replace("-","_");
        return folio;
     }
      
}