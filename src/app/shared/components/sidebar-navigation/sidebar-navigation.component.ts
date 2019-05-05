import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-navigation',
  templateUrl: './sidebar-navigation.component.html',
  styleUrls: ['./sidebar-navigation.component.scss']
})
export class SidebarNavigationComponent implements OnInit {

  public navigationList: INavigationItem[] = [
    {
      label: 'Dashboard',
      icon: 'fas fa-laptop',
      routerLink: ['/web/dashboard']
    },
    {
      label: 'Permission',
      icon: 'fas fa-user-shield',
      routerLink: ['/web/permission']
    },
    {
      label: 'Party Details',
      icon: 'fas fa-user-cog',
      routerLink: ['/web/party']
    },
    {
      label: 'Login As',
      icon: 'fas fa-user-lock',
      routerLink: ['/web/role']
    }
  ];

  public sidebarToggle: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleSlider() {
    this.sidebarToggle = !this.sidebarToggle;
  }

}

export interface INavigationItem {
  label?: string;
  icon?: string;
  routerLink?: Array<string>;
  queryParams?: object;
}
