import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() cancelRegisterFromChild = new EventEmitter<boolean>();

  constructor(private accountService: AccountService) {}

  register(form: NgForm) {
    this.accountService.register(form.value).subscribe({
      next: (res) => {
        this.cancel();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  cancel() {
    this.cancelRegisterFromChild.emit(false);
  }
}
