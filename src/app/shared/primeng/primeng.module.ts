import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DataTableModule } from 'primeng/datatable';
import { MultiSelectModule } from 'primeng/multiselect';
import { GrowlModule } from 'primeng/growl';
import { CheckboxModule } from 'primeng/checkbox';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { ListboxModule } from 'primeng/listbox';
import { GalleriaModule } from 'primeng/galleria';
import { ProgressBarModule } from 'primeng/progressbar';
import { DataListModule } from 'primeng/datalist';
import { ChipsModule } from 'primeng/chips';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { KeyFilterModule } from 'primeng/keyfilter';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CarouselModule } from 'primeng/carousel';
import { TreeTableModule } from 'primeng/treetable';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { BlockUIModule } from 'primeng/blockui';

const PRIMENG_COMPONENTS = [
  InputTextModule, InputTextareaModule, PanelModule, PasswordModule, ButtonModule, DialogModule,
  DropdownModule, RadioButtonModule, SelectButtonModule, DataTableModule, MultiSelectModule, GrowlModule, CheckboxModule,
  OverlayPanelModule, CalendarModule, AccordionModule, ConfirmDialogModule, InputSwitchModule, TooltipModule, ListboxModule,
  GalleriaModule, ProgressBarModule, DataListModule, ProgressSpinnerModule,
  ChipsModule, TableModule, ToggleButtonModule, KeyFilterModule, AutoCompleteModule, CarouselModule, TreeTableModule, ScrollPanelModule,
  TabMenuModule, MenuModule, CardModule, MessagesModule, MessageModule, ToastModule, InputMaskModule, TriStateCheckboxModule, BlockUIModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...PRIMENG_COMPONENTS
  ],
  exports: [
    ...PRIMENG_COMPONENTS
  ],
  providers: [
    ConfirmationService, MessageService
  ]
})
export class PrimengModule { }
