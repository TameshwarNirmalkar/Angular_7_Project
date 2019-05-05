import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterGuard } from 'app/shared/route-guard/router-guard';

import { DashboardComponent } from './dashboard.component';
import { DashboardDetailsComponent } from './dashboard-details/dashboard-details.component';

export const childRoutes: Routes = [
  {
    path: 'dashboard-details',
    component: DashboardDetailsComponent,
    canActivate: [RouterGuard],
  }
];

export const DashboardRoutes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'dashboard-details'
  },
  {
    children: childRoutes,
    component: DashboardComponent,
    path: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(DashboardRoutes)],
  exports: [RouterModule],
  providers: [RouterGuard]
})
export class DashboardRoutingModule { }
