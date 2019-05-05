import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplicationDataService } from './application-data.service';
import { ErrorHandlerService } from './error-handler.service';
import { interval } from 'rxjs/internal/observable/interval';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class SessionTimeoutService {
  private sessionDuration: any;
  private remainingSessionDuration: any;
  private sessionObservable: any;
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private applicationData: ApplicationDataService
  ) { }

  getRemainingTimeout() {
    return this.remainingSessionDuration;
  }

  subscribeSessionTimeout() {
    this.sessionObservable = interval(1000).subscribe(x => {
      this.remainingSessionDuration = this.remainingSessionDuration - 1000;
    });
  }

  resetSessionTimeout() {
    this.remainingSessionDuration = JSON.parse(JSON.stringify(this.getSessionTimeout()));
    if (this.sessionObservable) {
      this.sessionObservable.unsubscribe();
    }
    this.subscribeSessionTimeout();
  }

  getSessionTimeout() {
    this.sessionDuration = this.sessionDuration || this.applicationData.getApplicationSettingValue('session_expiration');
    return (this.sessionDuration || 60 - 1) * 60000;
  }

  renewUserSession(token) {
    const tokenBody = {
      token
    };
    return this.http.post(this.applicationData.getEnvironment().LogoutApi
      + '/token/reset/expire/time/' + this.applicationData.getEnvironment().LogoutVersion, JSON.stringify(tokenBody))
      .pipe(
        map((response: any) => {
          if (!response.error_status) {
            this.resetSessionTimeout();
            return response;
          }
        }),
        catchError(err => this.errorHandler.handleError('SessionTimeoutService:renewUserSession', err))
      );
  }

}
