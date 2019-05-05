import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppCountdownComponent } from '../../shared/components/countdown/app-countdown.component';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  @ViewChild(AppCountdownComponent) countDown: AppCountdownComponent;

  public validToken: boolean = false;
  public otpTxt: string;
  private token: null;

  constructor(private router: Router, private route: ActivatedRoute, private loginService: LoginService) { }

  ngOnInit() {
    this.route.params.subscribe((val: any) => {
      const { token } = val;
      if (!token) {
        this.loginService.logOut();
      } else {
        this.validToken = true;
        this.countDown.startTimer(60);
        this.token = token;
      }
    });
  }

  validateOtp() {
    const payload = {token: this.token, otp: this.otpTxt};
    this.loginService.validateOtp(payload).subscribe( res => {
      // console.log( res );
    });
  }

}
