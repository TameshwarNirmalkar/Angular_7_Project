import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { PermissionRoutingModule } from './permission-routing.module';

import { PermissionComponent } from './permission.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ViewResourceComponent } from './view-resource/view-resource.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { CopyPermissionComponent } from './copy-permission/copy-permission.component';
import { EncrptionDecryptionComponent } from './user-details/encrption-decryption/encrption-decryption.component';
import { ExpandCollapsedPanelComponent } from './view-resource/expand-collapsed-panel/expand-collapsed-panel.component';

import { DataSharedService } from './service/data-shared.service';

const MAIN_COMPONENT = [
  PermissionComponent, UserDetailsComponent,
  AddResourceComponent, ViewResourceComponent, CopyPermissionComponent,
  EncrptionDecryptionComponent, ExpandCollapsedPanelComponent
];

@NgModule({
  declarations: [
    ...MAIN_COMPONENT
  ],
  imports: [
    SharedModule,
    PermissionRoutingModule
  ]
})
export class PermissionModule { }
