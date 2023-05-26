import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryModule } from  'ng-gallery';
import { NgxSpinnerModule } from "ngx-spinner";
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    FormsModule,
    BsDropdownModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    TabsModule.forRoot(),
    GalleryModule.withConfig({
      dots: true,
      imageSize: 'contain',
      loadingAttr: 'lazy',
      loadingStrategy: 'preload',
      autoPlay: true,
      nav: true
    }),
    NgxSpinnerModule,
    FileUploadModule
  ],
  
  exports: [
    BrowserAnimationsModule,
    CollapseModule,
    FormsModule,
    BsDropdownModule,
    ToastrModule,
    TabsModule,
    GalleryModule,
    NgxSpinnerModule,
    FileUploadModule
  ]
})
export class SharedModule { }
