import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() cancelRegisterFromChild = new EventEmitter<boolean>();

  constructor(private accountService: AccountService, private router: Router, private toastr: ToastrService) {}

  register(form: NgForm) {
    this.accountService.register(form.value).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/members');
      },
      error: (err) => {
        console.log(err);
        this.toastr.error(err.error);
      }
    })
  }

  cancel() {
    this.cancelRegisterFromChild.emit(false);
  }
}
