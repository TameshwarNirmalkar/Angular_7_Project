import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { MessageService, NotifyService } from '@srk/core';
import { timer } from 'rxjs';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { AppCountdownComponent } from '../shared/components/countdown/app-countdown.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(AppCountdownComponent) countDown: AppCountdownComponent;

  public selectedDisplayName: string;
  public msgs: string[] = [];

  public startValue: number = 3600;

  constructor(
    private messageService: MessageService,
    private notify: NotifyService
  ) {
  }

  public ngOnInit() {
    this.notify.notifyShowGrowlMsgObservable$.pipe(untilComponentDestroyed(this)).subscribe(data => {
      this.msgs = [];
      this.messageService.invokeGrowlMessage(data.severity, data.messageCode, this.msgs);
      timer(3000).pipe(untilComponentDestroyed(this)).subscribe(res => {
        this.msgs = [];
      });
    });
  }

  ngOnDestroy() {

  }

  ngAfterViewInit() {
    const oldtime = localStorage.getItem('user-otp-start-time');
    if (!oldtime) {
      this.setUserOtpTime();
    } else {
      this.updateTime();
    }
    console.log( this.countDown );
  }

  updateTime() {
    const finishTime: number = +localStorage.getItem('user-otp-start-time');
    const dt = +(new Date());
    const timeLeft = finishTime - dt;
    this.countDown.startTimer(timeLeft / 1000);
  }

  setUserOtpTime() {
    const ts = ((new Date()).getTime() + this.startValue * 1000);
    localStorage.setItem('user-otp-start-time', ts.toString());
    this.updateTime();
  }

}
