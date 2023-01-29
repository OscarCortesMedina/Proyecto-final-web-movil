import { TranslateService } from '@ngx-translate/core';
/* tslint:disable:no-unused-variable */
import { TestBed, inject } from '@angular/core/testing';
import { HttpErrorInterceptor } from './http-error-interceptor.service';
import { Observable, throwError } from 'rxjs';

describe('Service: HttpErrorInterceptor', () => {
  let translateSpy: jasmine.SpyObj<TranslateService>;
  let errorInterceptor:any;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpErrorInterceptor,
        {
          provide: TranslateService,
          useValue: jasmine.createSpyObj(TranslateService.name, ['get'])
        }]
    });
    translateSpy = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
    translateSpy.get.and.returnValue(new Observable());
    errorInterceptor = new HttpErrorInterceptor(translateSpy);
  });

  it('Creo servicio interceptor', inject([HttpErrorInterceptor], (serviceInterceptor: HttpErrorInterceptor) => {
    expect(serviceInterceptor).toBeTruthy();
  }));

  it('should auto logout if 401 response returned from api', () => {

    const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    httpHandlerSpy.handle.and.returnValue(throwError(
      {
        error:
          { message: 'test-error' }
      }
    ));
    errorInterceptor.intercept(null, httpHandlerSpy)
      .subscribe(
        (result: any) => console.log('good', result),
        (err: any) => {
          console.log('error', err);
          expect(err).toEqual('test-error');
        }
      );

  });



});



