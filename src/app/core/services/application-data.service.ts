import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable()
export class ApplicationDataService {

  private readonly orgName = 'srkexports';
  private readonly appName = 'solitaire-admin';
  private readonly searchResultLimit = 4;
  private readonly callingEntity = 'UI';
  private env: any;
  private applicationSettingList: any;
  public auditList: any;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.initEnvironments();
  }

  public getOrgName(): string {
    return this.orgName;
  }

  public getAppName(): string {
    return this.appName;
  }

  public getCallingEntity(): string {
    return this.callingEntity;
  }

  public getEnvironment(): any {
    return this.env;
  }

  public getSearchResultLimit(): number {
    return this.searchResultLimit;
  }

  public getApplicationSettingValue(settingName) {
    let settingValue;
    const applicationList = this.applicationSettingList || JSON.parse(localStorage.getItem('srk-application-setting'));
    for (const setting in applicationList) {
      if (applicationList.hasOwnProperty(setting) &&
        applicationList[setting].hasOwnProperty('entity_value') &&
        settingName === setting) {
        settingValue = applicationList[setting].entity_value;
      }
    }
    return settingValue;
  }

  initEnvironments(): any {
    if (this.env === undefined || this.env === 'undefined' || this.env === null) {
      return this.http.get('/assets/env/environment.json')
        .pipe(
          map((res: any) => {
            this.env = res;
            return this.env;
          })
        );
    } else {
      // return Observable.empty<Response>();
    }
  }

  initApplicationSetting() {
    return this.http.get(this.env.ApplicationApi
      + '/clientConfig/getDefaultConfiguration/' + this.env.ApplicationVersion
      + '/application_settings')
      .pipe(
        map((response: any) => {
          this.applicationSettingList = response.data.config_values;
          if (this.isDeviceSupportLocalStorage()) {
            window.localStorage.setItem('srk-application-setting', JSON.stringify(response.data.config_values));
          }
        }),
        catchError(err => this.errorHandler.handleError('Application setting', err))
      );
  }

  // This method is duplicate of UserDeviceService method. Kept coz of cyclic dependency.
  private isDeviceSupportLocalStorage(): boolean {
    let hasLocalStorage = false;
    try {
      hasLocalStorage = (window.localStorage || localStorage.getItem) ? true : false;
    } catch (err) {
      hasLocalStorage = false;
    }
    return hasLocalStorage;
  }

  initializeAuditSetting() {
    return this.http.get(this.env.AuditApi + '/exposed/audit/list/' + this.env.AuditApiVersion)
      .pipe(
        map((responseData: any) => {
          if (this.isDeviceSupportLocalStorage() && !responseData.error_status) {
            this.auditList = responseData.data;
            window.localStorage.setItem('srk-audit-setting', JSON.stringify(responseData.data));
          }
          return responseData;
        }),
        catchError(err => this.errorHandler.handleError('Audit setting', err))
      );
  }

  getAuditData() {
    return this.auditList;
  }

}
