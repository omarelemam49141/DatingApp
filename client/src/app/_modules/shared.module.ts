import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    FormsModule,
    BsDropdownModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],

  exports: [
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    CollapseModule,
    FormsModule,
    BsDropdownModule,
    ToastrModule
  ]
})
export class SharedModule { }
