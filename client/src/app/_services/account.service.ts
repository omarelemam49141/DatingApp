import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'http://localhost:5072/api/';

  constructor(private http: HttpClient) { }

  login(loginModel: any) {
    return this.http.post(this.baseUrl + 'account/login', loginModel);
  }
}
