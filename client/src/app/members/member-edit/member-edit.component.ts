import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { User } from 'src/app/_models/User';
import { Member } from 'src/app/_models/member';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('updateForm') updateForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) checkIfUnsaved($event: any) {
    if (this.updateForm.dirty) {
      $event.returnValue = true;
    }
  }
  user: User;
  member: Member;
  
  constructor(private accountService: AccountService, private membersService: MembersService, private toastr: ToastrService) {
    accountService.userEvent$.pipe(take(1)).subscribe({
      next: (user) => {
        this.user = user;
      }
    })
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    this.membersService.getMember(this.user.username).subscribe({
      next: (member) => {
        this.member = member;
      }
    })
  }

  updateMember() {
    this.membersService.updateMember(this.member).subscribe({
      next: (res) => {
        this.toastr.success('Updated successfully!')
        this.updateForm.reset(this.member);
      }
    })
  }
}
