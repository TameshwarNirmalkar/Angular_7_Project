import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { NotifyService, MessageService } from '@srk/core';

import { ResourceControlService } from '../service/resource-control.service';
import { DataSharedService } from '../service/data-shared.service';
import { isEmpty } from 'lodash';
import { payloadForAddDeleteResource, ROLE_CONFIG, DISPLAY_TAB_NAME } from './view-resource-constant';

@Component({
  selector: 'app-view-resource',
  templateUrl: './view-resource.component.html',
  styleUrls: ['./view-resource.component.scss']
})

export class ViewResourceComponent implements OnInit, OnDestroy {
  public resourceParam;
  public revokedResource: Array<{}> = [];
  public revokedLoading: boolean = false;

  public assignNewResource: Array<{}> = [];
  public assignNewLoading: boolean = false;

  public assignedResourceList: Array<{}> = [];
  public deleteLoading: boolean = false;

  public assignedLoading: boolean = false;

  public viewResourcePannelObject = this.returnViewResourcePannelObject();
  public currentRoleView: any;

  constructor(
    private router: Router,
    private resourceControl: ResourceControlService,
    private route: ActivatedRoute,
    private dataSharedService: DataSharedService,
    private messageService: MessageService,
    private notifyService: NotifyService
  ) {
    this.route.params.subscribe(params => {
      if (isEmpty(params)) {
        this.resourceParam = null;
      } else {
        this.resourceParam = params;
      }
    });
  }

  ngOnInit() {
    if (this.dataSharedService.routesData) {
      const { role_id, user_id, org_id, role, dept_id } = this.resourceParam;

      this.notifyService.notifyAddTab({
        label: `${DISPLAY_TAB_NAME(this.dataSharedService.routesData)}`,
        tabId: 'VIEW_RESOURCE',
        tabIndex: 2,
        routerLink: [`view-resource/${role_id}/${user_id}/${dept_id}/${org_id}/${role}`],
        closeable: true
      });

      this.currentRoleView = this.viewResourcePannelObject[this.resourceParam.role];
      this.currentRoleView.viewPannels.forEach(element => {
        this.getResourceList(element.key, this.currentRoleView.get, element);
      });

    } else {
      this.router.navigate(['/web/permission']);
    }

  }

  ngOnDestroy() {
  }

  returnViewResourcePannelObject() {
    return ROLE_CONFIG;
  }

  getResourceList(operation: any, getUrl: any, element: any) {
    element.isLoading = true;
    const query = Object.assign({}, ...this.resourceParam, { operation });
    this.resourceControl.getResources(query, getUrl).subscribe((res: any) => {
      if (!res.error_status && res.data) {
        for (const obj in res.data) {
          if (res.data[obj]) {
            res.data[obj].resource_key = obj;
            element.data.push(res.data[obj]);
          }
        }
      }
    }, (err) => {
      element.isLoading = false;
    }, () => {
      element.isLoading = false;
    });
  }

  assignTo(eventData: any) {
    const payload = payloadForAddDeleteResource(eventData, this.resourceParam);
    this.resourceControl.addUserResource(payload,
      this.currentRoleView.get, this.resourceParam).pipe(untilComponentDestroyed(this)).subscribe((res: any) => {
        if (!res.error_status) {
          this.messageService.showSuccessGrowlMessage('Resource assigned successfully');
          // this.clearResource();
          for (const item of eventData) {
            this.viewResourcePannelObject[this.resourceParam.role].viewPannels[0].data.unshift(item);
            this.viewResourcePannelObject[this.resourceParam.role].viewPannels[1].data.splice(item, 1);
          }
        }
      });
  }

  deleteResource(data: any) {
    data.is_disabled = true;
    const { operation } = data;
    const payload = payloadForAddDeleteResource([data], this.resourceParam);
    this.resourceControl.removeResource(payload, this.currentRoleView.get,
      Object.assign({}, ...this.resourceParam, { operation }))
      .pipe(untilComponentDestroyed(this)).subscribe((res: any) => {
        if (!res.error_status) {
          this.clearResource();
          this.messageService.showSuccessGrowlMessage('Resource deleted successfully');
        }
      }, (err: any) => {
        data.is_disabled = false;
      }, () => {
        data.is_disabled = false;
      });
  }

  clearResource() {
    this.viewResourcePannelObject = this.returnViewResourcePannelObject();
    this.currentRoleView = this.viewResourcePannelObject[this.resourceParam.role];
    this.currentRoleView.viewPannels.forEach(element => {
      this.getResourceList(element.key, this.currentRoleView.get, element);
    });
  }


  // getResource(operation: any, callback = null) {
  //   const query = Object.assign({}, ...this.resourceParam, { operation });
  //   this.resourceControl.getUserResources(query).pipe(untilComponentDestroyed(this)).subscribe((res: any) => {
  //     if (callback && typeof (callback) === 'function') {
  //       return callback.call(null, res);
  //     }
  //   }, (err) => {
  //     return callback.call(null, err);
  //   });
  // }

  // getAssignedResources(operation) {
  //   if (!this.assignedResourceList.length) {
  //   this.assignedLoading = true;
  //   this.getResource(operation, (res) => {
  //     if (!res.error_status && res.data) {
  //       this.assignedResourceList = changeResponse(res.data, operation, 'revoke', this.resourceParam);
  //       this.assignedLoading = false;
  //     } else {
  //       this.assignedLoading = false;
  //     }
  //   });
  //   }
  // }

  // getRevokedResource(operation) {
  //   if (!this.revokedResource.length) {
  //     this.revokedLoading = true;
  //     this.getResource(operation, (res) => {
  //       if (!res.error_status && res.data) {
  //         this.revokedResource = changeResponse(res.data, operation, 'revoke', this.resourceParam);
  //         this.revokedLoading = false;
  //       } else {
  //         this.revokedLoading = false;
  //       }
  //     });
  //   }
  // }

  // getAssignableResource(operation) {
  //   if (!this.assignNewResource.length) {
  //     this.assignNewLoading = true;
  //     this.getResource(operation, (res) => {
  //       if (!res.error_status && res.data) {
  //         this.assignNewResource = changeResponse(res.data, operation, 'additional', this.resourceParam);
  //         this.assignNewLoading = false;
  //       } else {
  //         this.assignNewLoading = false;
  //       }
  //     });
  //   }
  // }

  // assignTo(eventData) {
  //   const payload = payloadForAddDeleteResource(eventData, this.resourceParam);
  //   this.resourceControl.addUserResources(payload).pipe(untilComponentDestroyed(this)).subscribe(res => {
  //     const dataForAssigned = Object.assign({}, ...eventData, { operation: 'assigned', type: 'revoke', is_disabled: false });
  //     this.assignedResourceList.unshift(dataForAssigned);
  //     for (const item of eventData) {
  //       this.assignNewResource = this.assignNewResource.filter((ele: any) => ele.payload_key !== item.payload_key);
  //     }
  //   });
  // }


  // deleteAssigned(data: any) {
  //   data.is_disabled = true;
  //   const operationParam = DELETE_OPERATION_QUERY[data.operation.toUpperCase()];
  //   const payload = payloadForAddDeleteResource([data], this.resourceParam);
  //   this.resourceControl.removeUserResources(payload, { operation: operationParam })
  //     .pipe(untilComponentDestroyed(this)).subscribe((res: any) => {
  //       switch (operationParam) {
  //         case 'addToRevoke':
  //           const dataForRevoke = Object.assign({}, ...data, { operation: 'revoked', type: 'revoke', is_disabled: false });
  //           this.assignedResourceList = this.assignedResourceList.filter((ele: any) => ele.payload_key !== data.payload_key);
  //           this.revokedResource.unshift(dataForRevoke);
  //           break;
  //         case 'removeFromRevoke':
  //           this.revokedResource = this.revokedResource.filter((ele: any) => ele.payload_key !== data.payload_key);
  //           const dataForAssignable = Object.assign({}, ...data, { operation: 'assigned', type: 'additional', is_disabled: false });
  //           this.assignNewResource.unshift(dataForAssignable);
  //           break;
  //         default:
  //           break;
  //       }
  //     }, (error) => {
  //       data.is_disabled = false;
  //     }, () => {
  //       data.is_disabled = false;
  //     });
  // }
}
