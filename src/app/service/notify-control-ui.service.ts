import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class NotifyControlService {
  private notifyTabChange = new Subject<any>();
  notifyTabChangeObservable$ = this.notifyTabChange.asObservable();

  private notifyCopyPermission = new Subject<any>();
  notifyCopyPermissionObservable = this.notifyCopyPermission.asObservable();

  constructor() { }

  public notifyTabChangeEvent(data: any) {
    this.notifyTabChange.next(data);
  }

  public notifyCopyPermissionData(data: any) {
    if (data) {
      this.notifyCopyPermission.next(data);
    }
  }

}
