import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/User';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let userSaved: User;
    this.accountService.userEvent$.pipe(take(1)).subscribe({
      next: (user) => {
        userSaved = user;
      }
    })

    if (userSaved!) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userSaved.token}`
        }
      })
    }
    
    return next.handle(request);
  }
}
