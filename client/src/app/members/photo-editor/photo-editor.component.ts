import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { skip, take } from 'rxjs';
import { User } from 'src/app/_models/User';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member: Member;

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean = false;
  baseUrl = environment.apiUrl;
  user: User;

  constructor(private accountService: AccountService, private memberService: MembersService) {
    this.accountService.userEvent$.pipe(take(1)).subscribe({
      next: (res) => {
        this.user = res;
      }
    })
  }

  ngOnInit(): void {
    this.imageUploading();
  }

  setMainPhoto(photo: Photo) {
    this.memberService.updateMainPhoto(photo.id).subscribe({
      next: () => {
        this.user.photoUrl = photo.url;
        this.accountService.emmitingUser(this.user);
        this.member.photos.forEach(p => {
          if (p.isMain) p.isMain = false;
          if (p.id == photo.id) p.isMain = true;  
        })
        this.member.mainPhotoUrl = photo.url;
      }
    })
  }

  deleteNotMainPhoto(photo: Photo) {
    this.memberService.deletePhoto(photo.id).subscribe({
      next: () => {
        this.member.photos = this.member.photos.filter(p => p.id != photo.id);
      }
    })
  }

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  imageUploading() {
    this.uploader = new FileUploader({
      url: this.baseUrl + "users/add-photo",
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.hasBaseDropZoneOver = false;

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo: Photo = JSON.parse(response);
        this.member.photos.push(photo);
        if(photo.isMain) {
          this.member.mainPhotoUrl = photo.url;
          this.user.photoUrl = photo.url;
          this.accountService.emmitingUser(this.user);
        }
      }
    }
  }
}
