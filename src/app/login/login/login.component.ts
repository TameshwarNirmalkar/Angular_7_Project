import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from '@srk/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public user: UserInterface = {
    userName: null,
    userPassword: null
  };
  public isLoading: boolean = false;

  constructor(
    private loginService: LoginService,
    private route: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loginService.logOut();
  }

  onLogin() {
    this.isLoading = true;
    this.loginService.validateLoginName(this.user).subscribe((res: any) => {},
      (error: any) => {
        this.isLoading = false;
        this.messageService.showErrorGrowlMessage('VM not started or some server issue.');
      },
      () => { this.isLoading = false; }
    );
  }

}


export interface UserInterface {
  userName: string;
  userPassword: string;
}
