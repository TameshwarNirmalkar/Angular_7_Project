import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';
import { AuthService } from './auth.service';
import { ApplicationDataService } from './application-data.service';
import { LoggerService } from './logger.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserPushNotificationService {

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private authService: AuthService,
    private applicationDataService: ApplicationDataService,
    private logger: LoggerService
  ) { }


  fetchMessage(isAll) {
    const data = {
      login_name: this.authService.getLoginName(),
      email_count: isAll
    };

    return this.http.post(this.applicationDataService.getEnvironment().NotificationApi
      + '/notification/socket/email/' + this.applicationDataService.getEnvironment().NotificationVersion, data)
      .pipe(
        catchError(err => {
          this.logger.logInfo('fetchMessage', 'getAll message list for logged in user :- ' + JSON.stringify(err));
          return this.errorHandler.handleError('fetchMessage', err);
        })
      );
  }

}
