import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { PartyRoutingModule } from './party-routing.module';

import { PartyComponent } from '../party/party.component';
import { PartyDetailsComponent } from './party-details/party-details.component';

const MAIN_COMPONENTS = [
  PartyComponent, PartyDetailsComponent
];

@NgModule({
  declarations: [
    ...MAIN_COMPONENTS,
  ],
  imports: [
    SharedModule,
    PartyRoutingModule
  ]
})
export class PartyModule { }
