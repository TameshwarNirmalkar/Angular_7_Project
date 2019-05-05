import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { IndexRoutingModule } from './index-routing.module';

import { DocsLayoutComponent } from './docs-layout.component';
import { IndexComponent } from './index.component';

const MAIN_COMPONENT = [
  DocsLayoutComponent, IndexComponent
];

@NgModule({
  declarations: [
    ...MAIN_COMPONENT,
  ],
  imports: [
    SharedModule,
    IndexRoutingModule
  ],
})
export class IndexModule { }
