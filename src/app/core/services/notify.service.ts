import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NotifyService {

  private showBlockUINotify = new Subject<any>();
  notifyShowBlockUIObservable$ = this.showBlockUINotify.asObservable();

  private hideBlockUINotify = new Subject<any>();
  notifyHideBlockUIObservable$ = this.hideBlockUINotify.asObservable();

  private showGrowlMsgNotify = new Subject<any>();
  notifyShowGrowlMsgObservable$ = this.showGrowlMsgNotify.asObservable();

  private translateNotify = new Subject<any>();
  notifyTranslateObservable$ = this.translateNotify.asObservable();

  private errorNotify = new Subject<any>();
  notifyErrorObservable$ = this.errorNotify.asObservable();

  private notifyToggleMenuBar = new Subject<any>();
  notifyMenuToggleObservable$ = this.notifyToggleMenuBar.asObservable();

  private notifyChangeScreen = new Subject<any>();
  notifyChangeScreenObservable$ = this.notifyChangeScreen.asObservable();

  private notifyAddTabList = new Subject<any>();
  notifyAddTabObservable$ = this.notifyAddTabList.asObservable();

  private permissionTabList = new Subject<any>();
  permissionTabListObservable$ = this.permissionTabList.asObservable();

  constructor() { }

  public showBlockUI(data: any) {
    if (data) {
      this.showBlockUINotify.next(data);
    }
  }

  public hideBlockUI() {
    this.hideBlockUINotify.next();
  }

  public showGrowlMsg(data: any) {
    if (data) {
      this.showGrowlMsgNotify.next(data);
    }
  }

  public notifyTranslate(data: any) {
    if (data) {
      this.translateNotify.next(data);
    }
  }

  public notifyErrorLogger(data: any) {
    if (data) {
      this.errorNotify.next(data);
    }
  }

  public notifyToggleMenu(data: any) {
    if (data) {
      this.notifyToggleMenuBar.next(data);
    }
  }

  public notifyScreen(data: any) {
    if (data) {
      this.notifyChangeScreen.next(data);
    }
  }

  public notifyAddTab(data: any) {
    if (data) {
      this.notifyAddTabList.next(data);
    }
  }

  public permissionTabs(data: any) {
    if (data) {
      this.permissionTabList.next(data);
    }
  }
}
