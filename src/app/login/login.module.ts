import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { LoginService } from './login.service';
import { PageNoFoundComponent } from './page-no-found/page-no-found.component';
import { OtpComponent } from './otp/otp.component';

@NgModule({
  declarations: [LoginComponent, PageNoFoundComponent, OtpComponent],
  imports: [
    SharedModule
  ],
  exports: [ LoginComponent ],
  providers: [ LoginService ]
})
export class LoginModule { }
