import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotifyService } from '@srk/core';
import { Router } from '@angular/router';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit, OnDestroy {
  public tabListObservable: any;
  public tabList: TabLists[] = [
    { label: 'User Details', tabId: 'USER_DETAILS', tabIndex: 1, routerLink: ['user-details'], closeable: false },
  ];

  constructor(private notify: NotifyService, private route: Router) {}

  ngOnInit() {
    this.notify.notifyAddTabObservable$.pipe(untilComponentDestroyed(this)).subscribe(res => {
      const checkCurrentTab = this.tabList.find(ele => ele.tabId === res.tabId);
      if (!checkCurrentTab) {
        this.tabList.push(res);
      } else {
        const tabInd = this.tabList.findIndex(ele => ele.tabId === res.tabId);
        this.tabList[tabInd] = res;
      }
    });
  }

  ngOnDestroy() {

  }

  refreshPermission() {
    this.route.navigateByUrl('fake-url-to-make-fool-the-route', { skipLocationChange: true }).then(() => {
      this.route.navigate(['web/permission']);
    });
  }

  closeTabEvent(data) {
    this.tabList = data;
    this.route.navigate(['/web/permission/user-details']); // TODO: need to make dyanimic, this is temp fix for demo.
  }

}

export interface TabLists {
  label: string;
  tabId: string;
  tabIndex: number;
  routerLink?: Array<string>;
  closeable: boolean;
}
