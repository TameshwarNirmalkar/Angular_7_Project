import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  AuthService,
  ExceptionService,
  LoggerService,
  UserDeviceService,
  UserDetailService,
  DateTimeService,
  NotifyService,
  ApplicationDataService,
  ApplicationStorageService,
  ErrorHandlerService,
  UserPushNotificationService,
  SessionTimeoutService,
  MessageService
} from './services';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthService,
    ExceptionService,
    LoggerService,
    UserDeviceService,
    UserDetailService,
    DateTimeService,
    NotifyService,
    ApplicationDataService,
    ErrorHandlerService,
    UserPushNotificationService,
    SessionTimeoutService,
    SessionTimeoutService,
    MessageService,
    ApplicationStorageService
  ]
})
export class CoreModule {
}

