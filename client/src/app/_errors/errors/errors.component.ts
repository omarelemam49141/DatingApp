import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent {
  baseUrl = 'http://localhost:5072/api/buggy/';
  validationErrors = [];

  constructor(private http: HttpClient) {}

  test500Error() {
    this.http.get(this.baseUrl + 'server-error').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  test400Error() {
    this.http.get(this.baseUrl + 'bad-request').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  test401Error() {
    this.http.get(this.baseUrl + 'auth').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  test404Error() {
    this.http.get(this.baseUrl + 'not-found').subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  test400ValidationError() {
    this.http.post('http://localhost:5072/api/account/register', {}).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
