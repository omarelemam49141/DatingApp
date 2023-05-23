import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private route: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch(error.status) {
            case 400:
              if (error.error.errors) {
                const modalStatusErrors = [];
                for(let key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStatusErrors.push(error.error.errors[key]);
                  }
                }
                
                throw modalStatusErrors.flat();
              } else {
                this.toastr.error(error.statusText, error.status);
              }
              break;
            
            case 401:
              this.toastr.error(error.statusText, error.status);
              break;
            
            case 404:
              this.route.navigateByUrl('/not-found');
              break;
            
            case 500:
              const navigationExtras: NavigationExtras = {state: {error: error.error}};
              this.toastr.error('internal servere error');
              this.route.navigateByUrl('/server-error', navigationExtras);
              break;

            default:
              this.toastr.error('Unexpected error occured');
              console.log(error);
              break;
          }
        }

        return throwError(() => error);
      }) 
    );
  }
}
