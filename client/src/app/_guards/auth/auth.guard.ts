import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private toastr: ToastrService, private route: Router) { }
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      if (localStorage.getItem('user')) {
        return true;
      }
      this.toastr.error('You shall not pass!');
      this.route.navigateByUrl('/');
      return false;
  }
}