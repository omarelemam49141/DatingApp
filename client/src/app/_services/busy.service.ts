import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  requestCount = 0;

  constructor(private ngxSpinnerService: NgxSpinnerService) { }

  busy() {
    this.requestCount++;
    this.ngxSpinnerService.show(undefined, {
      type: "line-scale-pulse-out",
      size: "medium",
      bdColor: "rgba(255, 255, 255, 0)",
      color: "#9e3ea7",
    })
  }

  idle() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.ngxSpinnerService.hide();
    }
  }
}
