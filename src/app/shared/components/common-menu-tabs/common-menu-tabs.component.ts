import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-common-menu-tabs',
  templateUrl: './common-menu-tabs.component.html',
  styleUrls: ['./common-menu-tabs.component.scss']
})
export class CommonMenuTabsComponent implements OnChanges, OnDestroy {
  @Input() tabList: TabLists[];
  @Output() closeTabEvent = new EventEmitter();

  public activeItem: any;

  constructor(private router: Router) {}

  ngOnChanges(changes: any): void { }

  ngOnDestroy() { }

  closeItem(event, index) {
    this.tabList = this.tabList.filter((item, i) => i !== index);
    event.preventDefault();
    // this.activeItem = this.tabList[index - 1];
    // this.router.navigate([ this.tabList[index - 1].routerLink ]);
    this.closeTabEvent.emit(this.tabList);
  }
}

export interface TabLists {
  label: string;
  tabId: string;
  tabIndex?: number;
  routerLink?: Array<string>;
  closeable?: boolean;
}
