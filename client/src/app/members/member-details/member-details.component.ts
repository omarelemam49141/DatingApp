import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  member: Member;
  items: GalleryItem[];

  constructor(private memberService: MembersService, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.loadMember();
  }

  getitems() {
    let items = [];
    for(const photo of this.member.photos) {
      items.push(new ImageItem({
        src: photo?.url,
        thumb: photo?.url
      }))
    }

    return items;
  }

  loadMember() {
    this.memberService.getMember(this.route.snapshot.params['username']).subscribe({
      next: (member) => {
        this.member = member;
        this.items = this.getitems();
      }
    })
  }
}
