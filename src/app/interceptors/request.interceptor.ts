import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseContentType } from '@angular/http';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let documento = sessionStorage.getItem('avisoprivacidad');
    console.log("documento: "+documento);
    if(documento==null){
      let token = sessionStorage.getItem('token');
      if (token) {  
        console.log(token);
        request = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,          
          },
        });
      }
    }

    sessionStorage.removeItem('avisoprivacidad');

    return next.handle(request);
  }
}
