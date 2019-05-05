import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotifyService, MessageService } from '@srk/core';
import { DataSharedService } from '../service/data-shared.service';
import { ResourceControlService } from '../service/resource-control.service';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { changeResponse } from '../view-resource/view-resource-constant';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-copy-permission',
  templateUrl: './copy-permission.component.html',
  styleUrls: ['./copy-permission.component.scss']
})
export class CopyPermissionComponent implements OnInit, OnDestroy {

  public sourceUser: any;
  public destinationUser: Array<{}> = [];
  public encDecList: Array<{}> = [];
  public copySelected: boolean = false;
  public copyAll: boolean = false;
  public assignedResourceList: Array<{}> = [];
  public selectedEncDec: Array<{}> = [];
  public selectedResource: Array<{}> = [];

  constructor(
    private notify: NotifyService,
    private dataSharedService: DataSharedService,
    private resourceControl: ResourceControlService,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    if (this.dataSharedService.copyPermissionData) {
      this.notify.notifyAddTab({
        label: 'Copy Permission', tabId: 'COPY_PER', tabIndex: 4, routerLink: ['copy-permission'], closeable: true
      });
      this.sourceUser = this.dataSharedService.copyPermissionData.SRC;
      this.getAssignedResources(this.sourceUser);
      this.destinationForkJoin();
    } else {
      this.router.navigate(['/web/permission']);
    }
  }

  onCopySelected() {

    this.selectedResource.forEach((item: any) => item.is_disabled = true);

    this.destinationUser.forEach((item: any) => {
      for (const list of this.selectedEncDec) {
        item.comp.enc_dec_list.unshift(list);
      }
      for (const resource of this.selectedResource) {
        item.users.unshift(resource);
      }
    });
  }

  onCopyAll() {
    this.assignedResourceList.forEach((item: any) => item.is_disabled = true);
    this.destinationUser.forEach((item: any) => {
      for (const list of this.sourceUser.enc_dec_list) {
        item.comp.enc_dec_list.unshift(list);
      }
      for (const list of this.assignedResourceList) {
        item.users.unshift(list);
      }

    });
  }

  getAssignedResources(data) {
    this.getResources(data, (res) => {
      this.assignedResourceList = changeResponse(res.data, 'assigned', 'revoke', this.sourceUser);
    });
  }

  getResources(payload, callback = null) {
    const query = Object.assign({}, ...payload, { operation: 'assigned' });
    this.resourceControl.getUserResources(query).pipe(untilComponentDestroyed(this)).subscribe((res: any) => {
      if (callback && typeof (callback) === 'function') {
        return callback.call(null, res);
      }
    }, (err) => {
      return callback.call(null, err);
    });
  }

  destinationForkJoin() {
    const storeObs: Array<Observable<any>> = [];
    for (const item of this.dataSharedService.copyPermissionData.DNS) {
      const query = Object.assign({}, ...item, { operation: 'assigned' });
      storeObs.push(this.resourceControl.getUserResources(query).pipe(untilComponentDestroyed(this)));
    }
    forkJoin(storeObs).pipe(untilComponentDestroyed(this)).subscribe(res => {
      res.forEach((ele, ind) => {
        const dd = {
          users: changeResponse(ele.data, 'assigned', 'revoke', this.dataSharedService.copyPermissionData.DNS[ind]),
          comp: this.dataSharedService.copyPermissionData.DNS[ind]
        };
        this.destinationUser.push(dd);
      });
    });
  }

  ngOnDestroy() {

  }

  removeEncDec(item, data) {
    const findObj: any = this.destinationUser.find((ele: any) => ele.comp.user_id === data.user_id);
    const ind = findObj.comp.enc_dec_list.findIndex(
      (ele: any) => (ele.code === item.code) && (ele.has_checkbox === item.has_checkbox)
    );
    findObj.comp.enc_dec_list.splice(ind, 1);
  }

  removeResource(item, data) {
    const findObj: any = this.destinationUser.find((ele: any) => ele.comp.user_id === data.user_id);
    const ind = findObj.users.findIndex(
      (ele: any) => (ele.payload_key === item.payload_key) && (ele.is_disabled === item.is_disabled)
    );
    findObj.users.splice(ind, 1);
  }

  savePermission() {
    const destUsr: any = this.destinationUser[0];
    const encDec = destUsr.comp.enc_dec_list.filter(ele => ele.has_checkbox);
    const resource = destUsr.users.filter(ele => ele.is_disabled);

    if (encDec.length > 0 || resource.length > 0) {
      console.log('Api process should be here..');
    } else {
      this.messageService.showErrorGrowlMessage('Resources and permissions are not added');
    }

  }

}
