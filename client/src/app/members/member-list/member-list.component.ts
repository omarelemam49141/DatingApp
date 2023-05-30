import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { User } from 'src/app/_models/User';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  genderList = [{value: 'male', displayValue: 'Male'}, {value: 'female', displayValue: 'Female'}];
  user: User;

  constructor(private membersService: MembersService, private accountService: AccountService) {
    this.userParams = membersService.userParams;
  }
  
  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.accountService.userEvent$.pipe(take(1)).subscribe({
      next: (res) => {
        this.user = res;
        this.membersService.changeUserParams(this.userParams, this.user);
        this.userParams = this.membersService.userParams;
      }
    })

    this.membersService.getMembers(this.userParams).subscribe({
      next: (res) => {
        this.members = res.result;
        this.pagination = res.pagination;
      }
    });
  }

  resetFilters() {
    this.userParams = this.membersService.resetFilters();
    this.loadMembers();
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.membersService.changeUserParams(this.userParams, this.user);
    this.loadMembers();
  }
}
