import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          if (evt.body && evt.body.success) {           
          }
        }
      }),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          debugger
          try {
            if (err.status == 401) {            
              sessionStorage.clear();  
              this.router.navigate(['/login']);
              setTimeout(() => {
                this.spinner.hide();
             
              }, 1000);
            }
          } catch (e) {}
          //log error
        }
        return next.handle(err);

        return of(err);
      })
    );
  }
}
