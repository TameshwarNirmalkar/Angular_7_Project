import { Component, OnChanges, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { UserControlService } from '../../service/user-control.service';

const DELETE = {
  revoked: true,
  assigned: true,
};

const ASSIGN = {
  assignable: true,
};

@Component({
  selector: 'app-expand-collapsed-panel',
  templateUrl: './expand-collapsed-panel.component.html',
  styleUrls: ['./expand-collapsed-panel.component.scss']
})
export class ExpandCollapsedPanelComponent implements OnChanges {

  @Input() resourceData: Array<{}> = [];
  @Input() toggleable: boolean = true;
  @Input() collapsed: boolean = true;
  @Input() headerTitle: string = 'Header Title';
  @Input() loader: boolean = false;
  @Input() viewType: string;

  @Output() iconClickEvent = new EventEmitter();
  @Output() assignedClickEvent = new EventEmitter();

  public resourceSelected: Array<{}> = [];
  public DELETE_BTN = DELETE;
  public ASSIGN_BTN = ASSIGN;
  public departmentMap = new Map();
  public cols: Array<{}> = [];

  constructor() {
    UserControlService.departmentList.forEach((item: any) => {
      this.departmentMap.set(item.department_code, item.department_name);
    });

    this.cols = [
      { field: 'resource_key', header: 'Resource Name', pkey: true },
      { field: 'resource_name', header: 'Description' },
      { field: 'department_id', header: 'Department', colwidth: 'w150' },
    ];
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  deleteResource(data) {
    const delOpt = Object.assign({}, ...data, {operation: this.viewType});
    this.iconClickEvent.emit(delOpt);
  }

  assignTo() {
    this.assignedClickEvent.emit(this.resourceSelected);
    this.resourceSelected = []; // due to keep the reference of selected table records
  }
}
