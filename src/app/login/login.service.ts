import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@srk/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private authSerivce: AuthService
  ) {

  }

  validateLoginName(userData) {
    return this.authSerivce.controlCenterLogin(userData);
  }

  validateOtp(payload) {
    return this.authSerivce.verifyOtp(payload);
  }

  logOut() {
    this.authSerivce.logoutUser();
    this.authSerivce.distroyUserSession();
  }

}


