import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoginAsRoutingModule } from './login-as-routing.module';

import { LoginAsComponent } from './login-as.component';
import { RoleDetailsComponent } from './role-details/role-details.component';

const MAIN_COMPONENT = [
  LoginAsComponent, RoleDetailsComponent
];

@NgModule({
  declarations: [
    ...MAIN_COMPONENT,
  ],
  imports: [
    SharedModule,
    LoginAsRoutingModule
  ]
})
export class LoginAsModule { }
