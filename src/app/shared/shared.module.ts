import { NgModule } from '@angular/core';
import { AngularModule } from './angular/angular.module';
import { PrimengModule } from './primeng/primeng.module';

// All Servervice files add here to available.
import { HttpClientRequestOptionsProvider } from './../service/http-client-header-injector.service';
import { NotifyControlService } from '../service/notify-control-ui.service';

import { CommonMenuTabsComponent } from './components/common-menu-tabs/common-menu-tabs.component';
import { RefreshTabComponent } from './components/refresh-tab/refresh-tab.component';
import { MainHeaderTabComponent } from './components/main-header-tab/main-header-tab.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SidebarNavigationComponent } from './components/sidebar-navigation/sidebar-navigation.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { SearchPipe } from './pipes/filter.pipe';
import { TimeRemainingPipe } from './pipes/time-remaining.pipe';
import { AppCountdownComponent } from './components/countdown/app-countdown.component';

const COMMON_COMPONENTS = [
  CommonMenuTabsComponent,
  RefreshTabComponent,
  MainHeaderTabComponent,
  SpinnerComponent,
  SidebarNavigationComponent,
  MainHeaderComponent,
  AppCountdownComponent,
];

const COMMON_PIPES = [
  SearchPipe, TimeRemainingPipe
];

@NgModule({
  declarations: [
    ...COMMON_COMPONENTS, ...COMMON_PIPES
  ],
  imports: [
    AngularModule, PrimengModule
  ],
  exports: [
    AngularModule, PrimengModule, ...COMMON_COMPONENTS, ...COMMON_PIPES
  ],

  providers: [
    NotifyControlService,
    HttpClientRequestOptionsProvider,
    ...COMMON_PIPES
  ]

})
export class SharedModule { }
