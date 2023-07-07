import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Global } from "../global/global";

@Injectable({
    providedIn: 'root'
  })
export class TratamientoService {
    public url:string;

    constructor(private http:HttpClient) { 
        this.url = Global.url+"tratamientos/getLista";       
    }

    public getListaParticulares(){
        /*let headers = new Headers({'Content-type': 'application/json'});
        let options = new RequestOptions({ headers: headers});
        
        return this.http.post(this.url, '', options).pipe(map(res => res.json()));
*/
        return this.http
          .post<any>(this.url, "" )
          .pipe(
            map((res: any) => {
              return res;
            })
          );
        }
}