import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouterGuard } from 'app/shared/route-guard/router-guard';
import { DocsLayoutComponent } from './docs-layout.component';
import { IndexComponent } from './index.component';

export const childRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: '../b_modules/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'permission',
    loadChildren: '../b_modules/permission/permission.module#PermissionModule'
  },
  {
    path: 'party',
    loadChildren: '../b_modules/party/party.module#PartyModule'
  },
  {
    path: 'role',
    loadChildren: '../b_modules/login-as/login-as.module#LoginAsModule'
  }
];

export const mainRoutes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'dashboard'
  },
  {
    children: childRoutes,
    component: IndexComponent,
    path: ''
  },
  // {
  //     children: childRoutes,
  //     component: DocsLayoutComponent,
  //     path: 'docs'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule],
  providers: [RouterGuard]
})
export class IndexRoutingModule { }
