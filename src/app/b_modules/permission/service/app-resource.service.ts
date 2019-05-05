import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ApplicationDataService, AuthService } from '@srk/core';

@Injectable({
  providedIn: 'root'
})
export class AppResourceService {

  private apiH: string = this.appDataService.getEnvironment().CONTROL_CENTER.host;
  private apiV: string = this.appDataService.getEnvironment().CONTROL_CENTER.version;
  private userCode: number = this.authService.getUserCode();

  constructor(
    private http: HttpClient,
    private appDataService: ApplicationDataService,
    private authService: AuthService
  ) { }

  getApplicationResource() {
    return this.http.get(`${this.apiH}/applications/resources/${this.apiV}`);
  }
}
