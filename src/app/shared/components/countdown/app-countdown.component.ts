import { Component, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { timer, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-countdown',
  templateUrl: './app-countdown.component.html',
  styleUrls: ['./app-countdown.component.scss']
})
export class AppCountdownComponent implements OnDestroy {

  @Input() navigateUrl: string = 'login';

  public timerSub: Subscription;
  public value: number;

  constructor(private router: Router) { }

  public startTimer(startValue) {
    startValue = Math.trunc(startValue);
    this.timerSub = timer(0, 1000).pipe(
      take(startValue),
      map(value => startValue - value)
    ).subscribe(value => this.value = value,
      null,
      () => {
        this.timerSub = null;
        this.router.navigate([this.navigateUrl]);
      }
    );
  }

  ngOnDestroy() {
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }
  }

}
