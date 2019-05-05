import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { TreeNode, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { timer } from 'rxjs/observable/timer';
import * as lodash from 'lodash';
import * as _ from 'underscore';

import { MessageService } from '@srk/core';
import { UserControlService } from '../service/user-control.service';
import {
  POPUP_HEADER,
  USER_TABLE_COLUMN,
  getEncDecModifiedData,
  generateDepartment,
  generateRoleList,
  SRC_DEST,
  CLASS_CSS
} from './../service/service.constant';
import { UserModel } from './user.model';
import { DataSharedService } from '../service/data-shared.service';
import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent implements OnInit, OnDestroy {

  @ViewChild('newRoleTemplate') newRoleTemplate: TemplateRef<any>;
  @ViewChild('newUserTemplate') newUserTemplate: TemplateRef<any>;
  @ViewChild('encryptionDecryptionTemplate') encryptionDecryptionTemplate: TemplateRef<any>;

  public userDetailObject: any;
  public permissionList: any[] = [];
  public mastersPermissionUserList: TreeNode[] = [];
  public popupData: any = {
    popupHeader: 'Add New Role',
    popupBody: {
      role_name: null,
      role_key: null
    },
    isPoupuVisible: false,
    currentSelect: null
  };

  private userModel = new UserModel();
  public newUserPayload: any[] = [];
  public userRole: any;

  public treeLoading: boolean = false;
  public buttonIconLoader: boolean = false;

  public searchFilterText: string;
  public sourceDestination: Array<{}> = JSON.parse(JSON.stringify(SRC_DEST));
  public categoryPermissionSelected: Array<{}> = [];
  public classCls = CLASS_CSS;
  public disabledCopyPermission: boolean = true;
  public copyPermissionData: any = {};
  public viewTypeSource: string = null;
  public windowHeight = window.innerHeight * (60 / 100) + 'px';

  public categorySource: string;
  public categoryDestination: Array<string> = [];
  public maxDestination: number = 2;

  public departmentAndRolePopupObject = {
    visibleFlag: false,
    data: null,
    department_list: [],
    selectedDepartment: null,
    role_list: [],
    selectedRole: null,
    selectedUserData: []
  };
  public copyPermissionObject = {
    sourceElement: [],
    destinationElement: []
  };

  constructor(
    private userControlService: UserControlService,
    private messageService: MessageService,
    private router: Router,
    private dataSharedService: DataSharedService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.userDetailObject = this.returnUserDetailObjects();
    this.fetchUserDetailList();
    this.getDepartmentList();
    this.getRoleList();
  }

  ngOnDestroy() { }

  returnUserDetailObjects() {
    return {
      columnList: USER_TABLE_COLUMN,
      height: window.innerHeight * (60 / 100) + 'px'
    };
  }

  fetchUserDetailList() {
    this.mastersPermissionUserList = [];
    this.treeLoading = true;
    this.userControlService.getDepartmentWiseList().pipe(untilComponentDestroyed(this)).subscribe((res: any) => {
      UserControlService.userList = res.data;
      this.createMasterPermissionTreeTableListArray(res.data);
    }, (error) => {
      this.treeLoading = false;
    }, () => {
      this.treeLoading = false;
    });
  }

  // The Permission - treetable array generation code starts
  createMasterPermissionTreeTableListArray(array) {
    array.forEach(element => {
      let mainObj = {
        data: {
          name: element.company_name,
          key: element.company_key,
          unique_code: element.company_code,
          is_permitted: false,
          mainHeader: true,
          type: 'ORG',
          org_id: element.company_code
        },
        children: [],
        expanded: false
      };
      mainObj.expanded = this.getExpandedState(mainObj.data);
      mainObj = this.setChildrenMasterAdminWiseOfPermissionList(element, mainObj);
      mainObj = this.setChildrenDepartmentWiseOfPermissionList(element, mainObj);
      this.mastersPermissionUserList.push(mainObj);
    });
  }

  setChildrenMasterAdminWiseOfPermissionList(element: any, mainObj: any) {
    if (element.master_admin_category) {
      const row = {
        data: {
          company_name: element.company_name,
          name: 'Master Admin',
          org_id: element.company_code,
          role_id: element.master_admin_category.category_code,
          key: element.master_admin_category.category_key,
          unique_code: element.company_code,
          mainHeader: false,
          enc_dec_list: getEncDecModifiedData(element.master_admin_category.enc_dec_list),
          type: 'CATEGORY',
          role: 'org-role'
        },
        children: [],
        expanded: false
      };
      row.expanded = this.getExpandedState(row.data);
      element.master_admin_category.user_list.forEach((dept, index) => {
        const abc = {
          data: {
            company_name: element.company_name,
            role_name: 'Master Admin',
            role_id: element.category_code,
            org_id: element.company_code,
            user_id: dept.user_code,
            index: index + 1,
            name: dept.user_fullname,
            key: dept.user_short_name,
            unique_code: element.company_code,
            enc_dec_list: getEncDecModifiedData(dept.enc_dec_list),
            type: 'USER',
            role: 'org-role'
          },
          children: [],
          expanded: true
        };
        row.children.push(abc);
      });
      mainObj.children.push(row);
      return mainObj;
    } else {
      return mainObj;
    }
  }

  setChildrenDepartmentWiseOfPermissionList(element: any, mainObj: any) {
    const row = {
      data: {
        name: 'Departments',
        unique_code: element.company_code,
        mainHeader: true,
        type: 'DEPARTMENT',
        org_id: element.company_code
      },
      children: [],
      expanded: false
    };
    row.expanded = this.getExpandedState(row.data);
    element.department_list.forEach((dept, index) => {
      const abcd = {
        data: {
          dept_id: dept.department_code,
          org_id: element.company_code,
          name: dept.department_name,
          key: dept.department_key,
          unique_code: element.company_code,
          subHeader: true,
          type: 'DEPARTMENT'
        },
        children: [],
        expanded: false
      };
      abcd.expanded = this.getExpandedState(abcd.data);
      row.children.push(abcd);
      row.children[index] = this.setRoleWiseChildrenInPermissionList(dept, row.children[index], element);
    });
    mainObj.children.push(row);
    return mainObj;
  }

  setRoleWiseChildrenInPermissionList(element: any, mainObj: any, mainElement: any) {
    element.category_list.forEach(category => {
      const obj = {
        data: {
          company_name: mainElement.company_name,
          department_name: element.department_name,
          role_id: category.category_code,
          dept_id: element.department_code,
          org_id: mainElement.company_code,
          name: category.category_name,
          key: category.category_key,
          unique_code: mainElement.department_code,
          mainHeader: false,
          enc_dec_list: getEncDecModifiedData(category.enc_dec_list),
          type: 'CATEGORY',
          user_list: category.user_list,
          role: 'dept-role'
        },
        children: [],
        expanded: false
      };
      obj.expanded = this.getExpandedState(obj.data);
      category.user_list.forEach((user, index) => {
        obj.children.push({
          data: {
            company_name: mainElement.company_name,
            department_name: element.department_name,
            role_id: category.category_code,
            dept_id: element.department_code,
            org_id: mainElement.company_code,
            user_id: user.user_code,
            index: index + 1,
            name: user.user_fullname,
            unique_code: category.category_code,
            display_name: user.user_short_name,
            type: 'USER',
            show_component: true,
            enc_dec_list: getEncDecModifiedData(user.enc_dec_list),
            role: 'user-role'
          },
          children: [],
          expanded: false
        });
      });
      mainObj.children.push(obj);
    });
    return mainObj;
  }

  newRole() {
    this.popupData.isPoupuVisible = true;
    this.popupData.popupHeader = POPUP_HEADER.ROLE;
    this.popupData.templateName = this.newRoleTemplate;
    this.userRole = this.userModel.getDefualtRole();
  }

  saveRoleEvent() {
    this.buttonIconLoader = true;
    const payload = {
      role_key: this.userRole.roleKey,
      role_name: this.userRole.roleName
    };
    this.userControlService.createRole(payload).pipe(untilComponentDestroyed(this)).subscribe((res: any) => {
      if (!res.error_status) {
        this.messageService.showSuccessGrowlMessage('Role created successfully');
        this.userModel.addUserList({ ...res.data });
      }
    }, (error) => {
      this.buttonIconLoader = false;
    }, () => {
      this.buttonIconLoader = false;
      this.popupData.isPoupuVisible = false;
    });
  }

  addUser() {
    this.popupData.isPoupuVisible = true;
    this.popupData.popupHeader = POPUP_HEADER.USER;
    this.popupData.templateName = this.newUserTemplate;
    this.newUserPayload = [this.userModel.getDefaultUserModel()];
  }

  saveUserEvent() {
    const userPayload = this.userModel.getUserPayload(this.newUserPayload[0]);
    this.userControlService.createUser(userPayload).pipe(untilComponentDestroyed(this)).subscribe((res: any) => {
      if (!res.error_status) {
        this.messageService.showSuccessGrowlMessage('User created successfully');
      }
    }, () => {
      this.messageService.showErrorGrowlMessage('User created Unsuccessfully');
      this.popupData.isPoupuVisible = false;
    }, () => {
      this.popupData.isPoupuVisible = false;
    });

  }

  copyPermission() {
    this.copyPermissionObject.destinationElement.forEach((item: any) => {
      item.enc_dec_list.forEach((ele: any) => ele.has_checkbox = false);
    });
    this.copyPermissionObject.sourceElement[0].enc_dec_list.forEach((item: any) => item.has_checkbox = true);
    this.dataSharedService.copyPermissionData = {
      DNS: this.copyPermissionObject.destinationElement,
      SRC: this.copyPermissionObject.sourceElement[0]
    };
    this.router.navigate(['/web/permission/copy-permission']);
  }

  openEDPopup(data) {
    this.popupData.currentSelect = data;
    this.popupData.isPoupuVisible = true;
    this.popupData.popupHeader = POPUP_HEADER.ENC_DEC;
    this.popupData.templateName = this.encryptionDecryptionTemplate;
  }

  removeEncDec(rowData, item) {
    const source = timer(500);
    this.treeLoading = true;
    source.pipe(untilComponentDestroyed(this)).subscribe(res => {
      rowData.enc_dec_list = rowData.enc_dec_list.filter(ele => ele.code !== item.code);
    }, (error) => {
      this.treeLoading = false;
    }, () => {
      this.treeLoading = false;
    });
  }

  navigateTo(data) {
    const { role_id, user_id, org_id, dept_id, role, name, user_fullname, department_name, company_name } = data;
    this.dataSharedService.routesData = { user_fullname, name, department_name, company_name };
    this.router.navigate([`/web/permission/view-resource/${role_id}/${user_id}/${dept_id}/${org_id}/${role}`]);
  }

  getDepartmentList() {
    if (!UserControlService.departmentList.length) {
      this.userControlService.getDepartmentList().pipe(untilComponentDestroyed(this)).subscribe((res: any) => {
        UserControlService.departmentList = res.data;
        this.departmentAndRolePopupObject.department_list =
          this.userControlService.setDropdownOptionList(res.data, 'department_name', 'department_code');
        this.userModel.setDepartmentList(generateDepartment(UserControlService.departmentList));
      });
    } else {
      this.userModel.setDepartmentList(generateDepartment(UserControlService.departmentList));
    }
  }

  getRoleList() {
    this.userControlService.getRoleList().pipe(untilComponentDestroyed(this)).subscribe((res: any) => {
      this.departmentAndRolePopupObject.role_list =
        this.userControlService.setDropdownOptionList(res.data, 'category_name', 'category_code');
      this.userModel.setUserList(generateRoleList(res.data));
    });
  }

  onDialogHide(eventData) {
    this.popupData.currentSelect = null;
  }

  sourceDestinationChange(event: any, rowData: any) {
    this.disabledCopyPermission = true;
    const row = lodash.cloneDeep(rowData);
    if (this.copyPermissionObject.sourceElement.length > 0) {
      if ((this.copyPermissionObject.sourceElement[0].user_id === rowData.user_id) && (event.value !== 'SRC')) {
        this.sourceDestination.splice(1, 0, { label: 'Source', value: 'SRC' });
        this.userControlService.spliceElementFromArray(this.copyPermissionObject.sourceElement, 'user_id', rowData.user_id);
      }
    }
    if ((_.findWhere(this.copyPermissionObject.destinationElement, { user_id: rowData.user_id })) && (event.value !== 'DNS')) {
      this.userControlService.spliceElementFromArray(this.copyPermissionObject.destinationElement, 'user_id', rowData.user_id);
    }
    if (event.value === 'SRC') {
      if (this.copyPermissionObject.sourceElement.length === 0) {
        this.copyPermissionObject.sourceElement.push(row);
        this.userControlService.spliceElementFromArray(this.sourceDestination, 'value', 'SRC');
      }
    } else if (event.value === 'DNS') {
      if (this.copyPermissionObject.destinationElement.length < this.maxDestination) {
        this.copyPermissionObject.destinationElement.push(row);
      } else {
        this.messageService.showInfoGrowlMessage(`Only one source and ${this.maxDestination} destinations for a category has allowed.`);
        rowData.view_type = event.value = null;
        rowData = JSON.parse(JSON.stringify(rowData));
        if ((this.copyPermissionObject.sourceElement.length === 1) && (this.copyPermissionObject.destinationElement.length > 0)) {
          this.disabledCopyPermission = false;
        }
        return false;
      }
    }
    if ((this.copyPermissionObject.sourceElement.length === 1) && (this.copyPermissionObject.destinationElement.length > 0)) {
      this.disabledCopyPermission = false;
    }
  }

  expandOn(data) {
    this.userControlService.setMastersPermissionUserList(lodash.cloneDeep(data.node));
  }

  collapseOff(data) {
    this.userControlService.setMastersPermissionUserList(lodash.cloneDeep(data.node));
  }

  getExpandedState(mainObj: any) {
    const list = this.userControlService.getMastersPermissionUserList();
    return this.callBackExpandedRowEvent(list, mainObj);
  }

  callBackExpandedRowEvent(list, mainObj) {
    let count = 0;
    for (const item of list) {
      if (_.isEqual(mainObj, item.data)) {
        count++;
        return item.expanded;
      }
    }
    if (count === 0) {
      return false;
    }
  }

  toggleChangeDepartmentAndRolePopup(rowData: any, flag: boolean) {
    this.departmentAndRolePopupObject.visibleFlag = flag;
    if (flag) {
      const data = JSON.parse(JSON.stringify(rowData));
      this.departmentAndRolePopupObject.data = data;
      const { name, user_fullname, department_name, company_name } = data;
      this.departmentAndRolePopupObject.selectedUserData =
        Object.values(JSON.parse(JSON.stringify({ user_fullname, name, department_name, company_name })));
      this.departmentAndRolePopupObject.selectedDepartment = data.dept_id;
      this.departmentAndRolePopupObject.selectedRole = data.role_id;
    }
  }

  returnPayloadForDepartmentAndRoleChange() {
    const payload = {
      category_code: this.departmentAndRolePopupObject.selectedRole,
      company_code: this.departmentAndRolePopupObject.data.org_id,
      country_phone_code: null,
      department_code: this.departmentAndRolePopupObject.selectedDepartment,
      email: null,
      is_active: true,
      is_allowed_visit: true,
      is_auth_sync: true,
      is_delete: true,
      is_grading_allowed: true,
      phone_number: null,
      user_code: this.departmentAndRolePopupObject.data.user_id,
      user_fullname: null,
      user_loginname: null,
      user_name: null,
      user_password: null,
      user_short_name: null
    };
    return payload;
  }

  saveChangeDepartmentAndRole() {
    if ((this.departmentAndRolePopupObject.data.dept_id === this.departmentAndRolePopupObject.selectedDepartment)
      && (this.departmentAndRolePopupObject.data.role_id === this.departmentAndRolePopupObject.selectedRole)) {
      this.messageService.showSuccessGrowlMessage('No changes found to update');
    } else {
      const payload = this.returnPayloadForDepartmentAndRoleChange();
      this.userControlService.upsertChangeDepartmentAndRole(payload).subscribe((response: any) => {
        if ((response.code === 'USER_REQUEST_SUCCESS') && !response.error_status) {
          this.fetchUserDetailList();
          this.toggleChangeDepartmentAndRolePopup(null, false);
          this.messageService.showSuccessGrowlMessage('User department and role updated successfully');
        } else if (response.error_status) {
          this.messageService.showErrorGrowlMessage('Error fulfilling the request');
        }
      });
    }
  }

  resetPassword() {
    this.confirmationService.confirm({
      message: 'Do you really want to Reset Password [ Confirmation Permission ] for User right now ?',
      header: 'Reset Password Permission [Confirmation]',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
      },
      reject: () => {
      }
    });
  }
}
