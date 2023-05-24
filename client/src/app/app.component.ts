import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Dating App';
  users: any;

  constructor(private http:HttpClient, private accountService: AccountService) {}

  ngOnInit() {
    this.setUser();
  }

  setUser() {
    let user = JSON.parse(localStorage.getItem('user')!);
    this.accountService.emmitingUser(user);
  }
}
