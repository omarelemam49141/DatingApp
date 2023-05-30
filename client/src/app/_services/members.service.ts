import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Member } from '../_models/member';
import { map, of, take } from 'rxjs';
import { PaginationResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  membersCach = new Map();
  userParams: UserParams;
  user: User;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.userEvent$.pipe(take(1)).subscribe({
      next: (res) => {
        this.user = res;
        this.userParams = new UserParams(this.user);
      }
    })
  }

  changeUserParams(newUserParams: UserParams, loggedInUser: User) {
    if (loggedInUser == this.user) {
      this.userParams = newUserParams;
    } else {
      this.user = loggedInUser;
      this.userParams = new UserParams(this.user);
    }
  }

  resetFilters() {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  getMembers(userParams: UserParams) {
    var response = this.membersCach.get(Object.values(userParams).join('-'));
    if (response) {
      return of(response);
    }

    let params = this.getPaginationParams(userParams.pageSize, userParams.pageNumber);

    params = params.append('gender', userParams.gender);
    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('orderBy', userParams.orderBy);

    return this.getPaginationResult<Member[]>(this.baseUrl + 'users', params)
    .pipe(map(response => {
      this.membersCach.set(Object.values(userParams).join('-'), response);
      return response;
    }));
  }

  //set the pagination params
  private getPaginationParams(pageSize: number, pageNumber: number) {
    let params = new HttpParams();

    params = params.append('pageSize', pageSize.toString());
    params = params.append('pageNumber', pageNumber.toString());

    return params;
  }

  //Generic method to get the pagination result
  private getPaginationResult<T>(url: any, params: any) {
    const paginationResult: PaginationResult<T> = new PaginationResult<T>();

    return this.http.get<T>(url, {observe: 'response', params}).pipe(
      map(response => {
        if (response.headers.get('Pagination')) {
          paginationResult.pagination = JSON.parse(response.headers.get('Pagination')!);
        }
        paginationResult.result = response.body!;
        console.log(paginationResult);
        return paginationResult;
      })
    )
  }

  getMember(username: string) {
    var member = [...this.membersCach.values()]
    .reduce((arr, current) => arr.concat(current.result), [])
    .find((member: Member) => member.userName == username);

    if (member) return of(member);

    return this.http.get<Member>(this.baseUrl + "users/" + username);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + "users/", member).pipe(
      map(() => {
        const memberIndex = this.members.indexOf(member);
        this.members[memberIndex] = member;
      })
    )
  }

  updateMainPhoto(photoId: number) {
    return this.http.put(this.baseUrl + "users/set-main-photo/" + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + "users/delete-photo/" + photoId);
  }
}
