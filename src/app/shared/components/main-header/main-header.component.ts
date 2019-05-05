import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@srk/core';
import { interval } from 'rxjs/observable/interval';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent implements OnInit, OnDestroy {

  public loggedUserName: string;
  public showDateTime: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loggedUserName = this.authService.getLoginName();
    this.displayHeaderDate();
  }

  ngOnDestroy() {

  }

  public logout() {
    this.authService.logoutUser();
    this.authService.distroyUserSession();
  }

  displayHeaderDate() {
    this.showDateTime = formatDate(new Date(), 'dd-MMM-yyyy hh:mm a', 'en-US', '+0530');
    interval(1000).pipe(untilComponentDestroyed(this)).subscribe(res => {
      const d = new Date();
      this.showDateTime = formatDate(d, 'dd-MMM-yyyy hh:mm a', 'en-US', '+0530');
    });
  }

}
