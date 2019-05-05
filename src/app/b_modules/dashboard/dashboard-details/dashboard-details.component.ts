import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-details',
  templateUrl: './dashboard-details.component.html',
  styleUrls: ['./dashboard-details.component.scss']
})
export class DashboardDetailsComponent implements OnInit {

  public dashboardList: Array<{}> = [];

  constructor() { }

  ngOnInit() {
    this.dashboardList = [
      { heading: 'Dashbaord'},
      { heading: 'Permission' },
      { heading: 'Party Details' },
      { heading: 'Login As' }
    ];
  }

}
