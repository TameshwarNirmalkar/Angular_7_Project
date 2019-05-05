import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterGuard } from 'app/shared/route-guard/router-guard';

import { LoginAsComponent } from './login-as.component';
import { RoleDetailsComponent } from './role-details/role-details.component';

export const childRoutes: Routes = [
  {
    path: 'role-details',
    component: RoleDetailsComponent,
    canActivate: [RouterGuard],
  }
];

export const LoginAsRoutes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'role-details'
  },
  {
    children: childRoutes,
    component: LoginAsComponent,
    path: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(LoginAsRoutes)],
  exports: [RouterModule],
  providers: [RouterGuard]
})
export class LoginAsRoutingModule { }
