import { TranslateService } from '@ngx-translate/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';


@Injectable()
export class HttpErrorInterceptor  {
  constructor(
    private translate: TranslateService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errMsg = '';
          let errorType = 'Error';
          if (error.error instanceof ErrorEvent) {
            errMsg = `Error: ${error.error.message}`;
          } else {
            let mensajeErrores: any = {};
            this.translate.get('toast').subscribe((res: any) => {
              mensajeErrores = res;
            });
            if (error.status === 0) {
              errMsg = `${error.status}, ${mensajeErrores.sinConexion}`;
              errorType = mensajeErrores.errorGrave;
            } else {
              errMsg = `${error.error.message}`;
            }
            //this.toastrService.error(errMsg, errorType, { closeButton: true });
          }
          console.log(errMsg + ' ' + error.url);
          return throwError(() => errMsg);
        })
      );
  }


}
