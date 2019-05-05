import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterGuard } from 'app/shared/route-guard/router-guard';

import { PermissionComponent } from './permission.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { ViewResourceComponent } from './view-resource/view-resource.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CopyPermissionComponent } from './copy-permission/copy-permission.component';

export const childRoutes: Routes = [
  {
    path: 'user-details',
    component: UserDetailsComponent
  },
  {
    path: 'view-resource/:role_id/:user_id/:dept_id/:org_id/:role',
    component: ViewResourceComponent
  },
  {
    path: 'add-resource',
    component: AddResourceComponent
  },
  {
    path: 'copy-permission',
    component: CopyPermissionComponent
  }
];

export const PermissionRoutes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'user-details'
  },
  {
    children: childRoutes,
    component: PermissionComponent,
    path: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(PermissionRoutes)],
  exports: [RouterModule],
  providers: [RouterGuard]
})
export class PermissionRoutingModule { }
