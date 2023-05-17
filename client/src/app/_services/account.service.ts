import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, map } from 'rxjs';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'http://localhost:5072/api/';
  private userEvent = new ReplaySubject<any>(1);
  userEvent$ = this.userEvent.asObservable(); 

  constructor(private http: HttpClient) { }

  login(loginModel: any) {
    return this.http.post(this.baseUrl + 'account/login', loginModel).pipe(
      map ((res) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.userEvent.next(res);
      })
    );
  }

  register(registerModel: any) {
    return this.http.post(this.baseUrl + 'account/register', registerModel).pipe(
      map ((res) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.userEvent.next(res);
      })
    );
  }

  emmitingUser(user: User) {
    this.userEvent.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.userEvent.next(null);
  }
}
