import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit{
  isCollapsed = true;

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {
  }

  login(form:NgForm) {
    this.accountService.login(form.value).subscribe({
      next: (res) => {
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  logout() {
    this.accountService.logout();
  }
}
