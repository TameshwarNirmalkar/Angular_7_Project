import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-refresh-tab',
  templateUrl: './refresh-tab.component.html',
  styleUrls: ['./refresh-tab.component.scss']
})
export class RefreshTabComponent implements OnInit {

  @Output() refreshTabEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  refreshTab() {
    this.refreshTabEvent.emit();
  }

}
