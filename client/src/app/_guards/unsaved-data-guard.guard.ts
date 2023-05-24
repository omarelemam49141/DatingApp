import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlTree } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class unsavedDataGuardGuard {
  canDeactivate(component: MemberEditComponent):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      if (component.updateForm.dirty) {
        return confirm('Are you sure you want to leave this page? Any unsaved data will be lost!')
      }
      return true;
  }
}