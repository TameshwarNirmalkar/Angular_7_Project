import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterGuard } from 'app/shared/route-guard/router-guard';

import { PartyComponent } from './party.component';
import { PartyDetailsComponent } from './party-details/party-details.component';

export const childRoutes: Routes = [
  {
    path: 'party-details',
    component: PartyDetailsComponent,
    canActivate: [RouterGuard],
  }
];

export const PartyRoutes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'party-details'
  },
  {
    children: childRoutes,
    component: PartyComponent,
    path: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(PartyRoutes)],
  exports: [RouterModule],
  providers: [RouterGuard]
})

export class PartyRoutingModule { }
