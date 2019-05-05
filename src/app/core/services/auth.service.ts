import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApplicationDataService } from './application-data.service';
import { UserDeviceService } from './user-device.service';
import { ErrorHandlerService } from './error-handler.service';
import { SessionTimeoutService } from './session-timeout.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private token: any;
  private userRole: any;
  private userDetail: any;
  private elementList: any;
  private urlList = {};
  private login_name: any;
  private user_role: any;

  constructor(
    private errorHandler: ErrorHandlerService,
    private applicationData: ApplicationDataService,
    private userDeviceService: UserDeviceService,
    private http: HttpClient,
    private router: Router,
    private sessionTimeoutService: SessionTimeoutService
  ) {
    this.getLocalStoredValues();
  }

  getLocalStoredValues() {
    const paramLoginName = this.getUrlParameter('?loginName');
    const localStorageLoginName = this.getStringFromLocalStorage('login-name');
    this.login_name = paramLoginName || localStorageLoginName;
    if (this.login_name) {
      this.setStringInLocalStorage('login-name', this.login_name);
      this.token = this.getStringFromLocalStorage(this.login_name + '-auth-token');
      this.userRole = this.getObjectFromLocalStorage(this.login_name + '-user-role');
      this.userDetail = this.getObjectFromLocalStorage(this.login_name + '-user-detail');
      this.elementList = this.getObjectFromLocalStorage(this.login_name + '-element-list');
    }
  }


  getToken(): string {
    this.sessionTimeoutService.resetSessionTimeout();
    return this.token;
  }

  getUserDetail() {
    return this.userDetail;
  }

  getLoginName() {
    let login_name = null;
    if (this.userDetail && this.userDetail.user_loginname) {
      login_name = this.userDetail.user_loginname;
    } else {
      this.distroyUserSession();
    }
    return login_name;
  }

  isUserSessionAvailable(): boolean {
    return this.getLoginName() && this.token;
  }

  hasRoutePermission(url: string) {
    // TODO:- need to check the 'provided url' permission in user permission list.
    return true;
  }

  hasElementPermission(elementName: string) {
    const elements = this.elementList;
    const list = Object.keys(elements);
    let flag = false;
    list.forEach((element) => {
      if (!flag) {
        if (element === elementName) {
          flag = true;
        }
      }
    });
    return flag;
  }

  getApiLinkForKey(elementName: string, key: string) {
    let link;
    for (const element in this.elementList) {
      if (this.elementList.hasOwnProperty(element) && element === elementName) {
        if (this.elementList[element].action && this.elementList[element].action[key]) {
          link = this.elementList[element].action[key];
          link = this.replaceIdsInUrl(link);
        } else {
          link = this.elementList[element].action;
          link = this.replaceIdsInUrl(link);
        }
      }
    }
    return link;
  }

  private replaceIdsInUrl(link: string): string {
    if (link) {
      if (link.indexOf(':login_name') >= 0) {
        link = link.replace(':login_name', this.getLoginName());
      }
      if (link.indexOf(':party_id') >= 0) {
        link = link.replace(':party_id', this.userDetail.party_id);
      }
      if (link.indexOf(':StoneManagementApi') >= 0) {
        link = link.replace(':StoneManagementApi', this.applicationData.getEnvironment().StoneManagementApi);
      }
      if (link.indexOf(':StoneManagementApi') >= 0) {
        link = link.replace(':StoneManagementApiVersion', this.applicationData.getEnvironment().StoneManagementApiVersion);
      }
    }
    return link;
  }

  isValidUser(userName: string, password: string) {
    const loginData = this.createLoginData(userName, password);
    return this.http.post(this.applicationData.getEnvironment().AuthenticationApi
      + '/auth/login/' + this.applicationData.getEnvironment().AuthenticationVersion, loginData)
      .pipe(
        map((responseData: any) => {
          const token = responseData.headers.get('token');
          const status = responseData.error_status;
          if (!status) {
            this.setLocalStorageCredentials(responseData.data.user_payload.user_detail.login_name, token, responseData.data);
          }
          return responseData;
        }),
        catchError(err => this.errorHandler.handleError('Login', err))
      );
  }

  fetchPermissionList(list) {
    const htmlElementJson = {};
    const urlJson = {};
    for (const element in list) {
      if (list.hasOwnProperty(element)) {
        const listData = list[element];
        if (listData.resource_type === 'HTML-ELEMENT') {
          htmlElementJson[element] = listData;
        } else {
          urlJson[element] = listData;
        }
      }
    }
    this.elementList = htmlElementJson;
    this.setObjectInLocalStorage(this.login_name + '-element-list', htmlElementJson);
    this.urlList = urlJson;
  }

  createLoginData(userName: string, password: string): any {
    const orgName = this.applicationData.getOrgName();
    const appName = this.applicationData.getAppName();
    const deviceDetails: any = this.userDeviceService.fetchUserDeviceDetails();
    return JSON.stringify({
      login_name: userName,
      password,
      app_name: appName,
      org_name: orgName,
      device_details: deviceDetails,
      app_code: 13
    });
  }

  getUserRole() {
    const roleNames = Object.keys(this.userRole);
    this.fetchPermissionList(this.userRole[roleNames[0]]);
    return roleNames[0];
  }

  sendOtp(data) {
    data = JSON.stringify(data);
    return this.http.post(this.applicationData.getEnvironment().NotificationApi +
      '/notification/SMS/sendOTPSMSandMail/' + this.applicationData.getEnvironment().NotificationVersion, data)
      .pipe(
        catchError(err => this.errorHandler.handleError('AuthService:sendOtp', err))
      );
  }

  verifyOtp(payload) {
    return this.http.post(this.applicationData.getEnvironment().CONTROL_CENTER.host +
      '/SMS/verifyOTP/' + this.applicationData.getEnvironment().CONTROL_CENTER.version, payload)
      .pipe(
        map((res: any) => {
          if (!res.error_status) {
            const token = res.data.session_data.mapping.token;
            this.navigateToUserDashboard();
            this.setLocalStorageCredentials(res.data.user_payload.user_loginname, token, res.data);
          }
          return res;
        }),
        catchError(err => this.errorHandler.handleError('AuthService:verifyOtp', err))
      );
  }

  registerUser(userData) {
    const data = this.createRegistrationData(userData);
    return this.http.post(this.applicationData.getEnvironment().AuthenticationApi +
      '/auth/registration/' + this.applicationData.getEnvironment().AuthenticationVersion, data)
      .pipe(
        map((res: any) => {
          if (!res.error_status) {
            this.token = res.headers.get('token');
          }
          return res;
        }),
        catchError(err => this.errorHandler.handleError('AuthService:registerUser', err))
      );
  }

  uploadUserDocument(documentData) {
    const headerData = new HttpHeaders();
    headerData.append('enctype', 'multipart/form-data');
    headerData.append('Accept', 'application/json');
    headerData.append('calling_entity', 'UI');
    headerData.append('token', this.token);
    return this.http.post(this.applicationData.getEnvironment().AuthenticationApi +
      '/auth/ftp/file/upload/uploadFile/' + this.applicationData.getEnvironment().AuthenticationVersion,
      documentData, { headers: headerData })
      .pipe(
        catchError(err => {
        return this.errorHandler.handleError('AuthService:uploadUserDocument', err);
        })
      );
  }

  createRegistrationData(data: any): any {
    const orgName = this.applicationData.getOrgName();
    const appName = this.applicationData.getAppName();
    const deviceDetails: any = this.userDeviceService.fetchUserDeviceDetails();
    delete data.agree;
    const registrationData = data;
    registrationData.login_name = data.login_name.trim();
    registrationData.app_name = appName;
    registrationData.org_name = orgName;
    registrationData.device_details = deviceDetails;
    registrationData.zip_code = data.zip_code.toString();
    registrationData.recieve_notification = data.recieve_notification ? 1 : 0;
    registrationData.third_party_country = data.third_party_country ? data.third_party_country : 0;
    registrationData.third_party_state = data.third_party_state ? data.third_party_state : 0;
    registrationData.third_party_city = data.third_party_city ? data.third_party_city : 0;
    registrationData.third_party_zip_code = (data.third_party_zip_code ? data.third_party_zip_code : 0).toString();
    return JSON.stringify(registrationData);
  }

  logoutUser() {
    return this.http.get(this.applicationData.getEnvironment().LogoutApi
      + '/token/deletesession/' + this.applicationData.getEnvironment().LogoutVersion)
      .pipe(
        map((response: any) => {
          if (!response.error_status) {
            this.clearUserData();
            this.clearLocalStorageData();
            return response;
          }
        }),
        catchError(err => this.errorHandler.handleError('AuthService:logoutUser', err))
      );
  }

  destroyUnAuthorizedUserSession() {
    this.clearLocalStorageData();
    this.clearUserData();
    this.router.navigate(['/login'],
      { queryParams: { authorized: 'false' } }
    );
  }

  clearUserData() {
    this.token = null;
    this.userDetail = {};
    this.userRole = {};
    this.elementList = [];
  }

  clearLocalStorageData() {
    if (this.userDeviceService.isDeviceSupportLocalStorage()) {
      localStorage.removeItem(this.login_name + '-auth-token');
      localStorage.removeItem(this.login_name + '-user-detail');
      localStorage.removeItem(this.login_name + '-user-role');
      localStorage.removeItem(this.login_name + '-element-list');
      localStorage.removeItem(this.login_name + '-session-timeout');
      localStorage.removeItem('login-name');
      localStorage.removeItem('branch-code');
      localStorage.removeItem('organization-details');
      localStorage.removeItem('user-otp-start-time');
    }
  }

  distroyUserSession() {
    this.clearUserData();
    this.clearLocalStorageData();
    this.router.navigate(['']);
  }

  requestPasswordForgot(data) {
    const forgotJson = {
      email_id: data,
      org_name: this.applicationData.getOrgName(),
      app_name: this.applicationData.getAppName(),
      app_code: 13,
      device_details: this.userDeviceService.fetchUserDeviceDetails()
    };
    return forgotJson;
  }

  changePasswordJsonRequest(oldPassword, newPassword) {
    const changePasswordJson = {
      old_password: oldPassword,
      new_password: newPassword,
      org_name: this.applicationData.getOrgName(),
      app_name: this.applicationData.getAppName(),
      app_code: 13,
      device_details: this.userDeviceService.fetchUserDeviceDetails()
    };
    return changePasswordJson;
  }

  requestPasswordChange(payload, token) {
    return this.http.post(this.applicationData.getEnvironment().AuthenticationApi +
      '/auth/admin/change/password/' + this.applicationData.getEnvironment().AuthenticationVersion, JSON.stringify(payload))
      .pipe(
        catchError(err => this.errorHandler.handleError('AuthService:callResetPassword', err))
      );
  }

  requestPasswordReset(jsonValue, token) {
    return this.http.post(this.applicationData.getEnvironment().AuthenticationApi +
      '/auth/admin/reset/password/' + this.applicationData.getEnvironment().AuthenticationVersion, JSON.stringify(jsonValue))
      .pipe(
        catchError(err => this.errorHandler.handleError('AuthService:callResetPassword', err))
      );
  }

  forgotPasswordRequest(payload): any {
    return this.http.post(this.applicationData.getEnvironment().AuthenticationApi +
      '/auth/admin/forgot/password/' + this.applicationData.getEnvironment().AuthenticationVersion, JSON.stringify(payload))
      .pipe(
        catchError(err => this.errorHandler.handleError('AuthService:forgotPasswordRequest', err))
      );
  }

  public getStringFromLocalStorage(key): any {
    if (this.userDeviceService.isDeviceSupportLocalStorage()) {
      return window.localStorage.getItem(key);
    } else {
      return null;
    }
  }

  private setStringInLocalStorage(key, value) {
    if (this.userDeviceService.isDeviceSupportLocalStorage() && value !== undefined && value !== 'undefined') {
      window.localStorage.setItem(key, value);
    }
  }

  private getObjectFromLocalStorage(key): any {
    if (this.userDeviceService.isDeviceSupportLocalStorage()) {
      return window.localStorage.getItem(key) ? JSON.parse(window.localStorage.getItem(key)) : '';
    } else {
      return null;
    }
  }

  private setObjectInLocalStorage(key, value) {
    if (this.userDeviceService.isDeviceSupportLocalStorage() && value !== undefined && value !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  authenticateLoginAs(token, loginName) {
    this.token = token;
    return this.http.get(this.applicationData.getEnvironment().AdminApi + '/solitaire-admin/web/loginas/' +
      this.applicationData.getEnvironment().AdminVersion + '?login_name=' + loginName);
  }

  setLocalStorageCredentials(loginName, token, userData) {
    this.login_name = loginName;
    this.token = token;
    this.userDetail = userData.user_payload;
    this.clearLocalStorageData();
    this.setStringInLocalStorage('login-name', this.login_name);
    this.setStringInLocalStorage(loginName + '-auth-token', this.token);
    this.setObjectInLocalStorage(loginName + '-user-detail', userData.user_payload);
    // this part is for Role.
    // this.setObjectInLocalStorage(loginName + '-user-role', userData.roles);
    // this.userRole = userData.roles;
    // const roleNames = Object.keys(this.userRole);
    // this.fetchPermissionList(this.userRole[roleNames[0]]);
  }

  // a method to get user code
  getUserCode() {
    let user_code = null;
    if (this.userDetail && this.userDetail.user_code) {
      user_code = this.userDetail.user_code;
    } else {
      this.distroyUserSession();
    }
    return user_code;
  }

  getUrlParameter(name: string) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  navigateToOtp(token) {
    this.router.navigate([`login/${token}`]);
  }

  navigateToUserDashboard() {
    this.router.navigate(['/web/dashboard']);
  }

  controlCenterLogin(data: any) {
    const loginData = this.createLoginData(data.userName, data.userPassword);
    return this.http.post(this.applicationData.getEnvironment().CONTROL_CENTER.host
      + '/login/' + this.applicationData.getEnvironment().CONTROL_CENTER.version, loginData)
      .pipe(
        map((response: any) => {
          const token = response.data.session_data.mapping.token;
          const status = response.error_status;
          if (!status) {
            this.setLocalStorageCredentials(response.data.user_payload.user_loginname, token, response.data);
            // this.navigateToOtp(token);
            this.navigateToUserDashboard();
          }
          return response;
        }),
        catchError(err => {
          return this.errorHandler.handleError('Login', err);
        })
      );
  }

  assignModifiedLocationId(newBody) {
    if (newBody.hasOwnProperty('modified_iplocation_id')) {
      newBody.modified_iplocation_id = this.returnModificationIpLocationId();
    }
    return newBody;
  }

  returnModificationIpLocationId() {
    return 1;
  }
}
