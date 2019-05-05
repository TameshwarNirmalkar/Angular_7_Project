import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardDetailsComponent } from './dashboard-details/dashboard-details.component';

const MAIN_COMPONENT = [
  DashboardComponent, DashboardDetailsComponent
];

@NgModule({
  declarations: [
    ...MAIN_COMPONENT
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
