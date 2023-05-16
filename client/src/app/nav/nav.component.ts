import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent {
  isCollapsed = true;
  isLogged: boolean = false;

  constructor(private accountService: AccountService) {}

  login(form:NgForm) {
    this.accountService.login(form.value).subscribe({
      next: (res) => {
        this.isLogged = true;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  logout() {
    this.isLogged = false;
  }
}
