import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-main-header-tab',
  templateUrl: './main-header-tab.component.html',
  styleUrls: ['./main-header-tab.component.scss']
})
export class MainHeaderTabComponent implements OnChanges {

  @Input() headingLabel: string;
  @Input() tabList: any[];

  @Output() refreshTabEvent = new EventEmitter();
  @Output() tabCloseEvent = new EventEmitter();

  constructor() { }

  ngOnChanges( changes ) {
  }

  onRefreshTabEvent() {
    this.refreshTabEvent.emit();
  }

  closeTabEvent(data) {
    this.tabCloseEvent.emit(data);
  }

}
