import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as lodash from 'lodash';
import * as _ from 'underscore';
import { ApplicationDataService, AuthService } from '@srk/core';


@Injectable({
  providedIn: 'root'
})
export class UserControlService {
  static userList: Array<{}> = [];
  static departmentList: Array<{}> = [];
  static treeDataState: any;
  mastersPermissionUserList: any[] = [];

  private apiH: string = this.appDataService.getEnvironment().CONTROL_CENTER.host;
  private apiV: string = this.appDataService.getEnvironment().CONTROL_CENTER.version;

  constructor(
    private http: HttpClient,
    private appDataService: ApplicationDataService,
    private authService: AuthService
  ) {
  }

  getDepartmentWiseList() {
    return this.http.get(`${this.apiH}/user/${this.authService.getUserCode()}/${this.apiV}`);
  }

  getDepartmentList() {
    return this.http.get(`${this.apiH}/user/department/${this.authService.getUserCode()}/${this.apiV}`);
  }

  getRoleList() {
    return this.http.get(`${this.apiH}/user/role/${this.authService.getUserCode()}/${this.apiV}`);
  }

  createRole(payload) {
    return this.http.put(`${this.apiH}/user/role/${this.authService.getUserCode()}/${this.apiV}`, payload);
  }

  createUser(payload) {
    return this.http.put(`${this.apiH}/user/${this.authService.getUserCode()}/${this.apiV}`, payload);
  }

  setMastersPermissionUserList(data) {
    this.mastersPermissionUserList.forEach((element, index) => {
      if ((element.data.name === data.data.name) && (element.data.unique_code === data.data.unique_code)) {
        this.mastersPermissionUserList.splice(index, 1);
      }
    });
    this.mastersPermissionUserList.push(data);
  }

  getMastersPermissionUserList() {
    return this.mastersPermissionUserList;
  }

  setDropdownOptionList(mainArray: any, labelKey: string, valueKey: string) {
    const array = [];
    mainArray.forEach(element => {
      array.push({ label: element[labelKey], value: element[valueKey] });
    });
    return array;
  }

  upsertChangeDepartmentAndRole(payload) {
    return this.http.post(`${this.apiH}/user/changeDepartmentRole/${this.authService.getUserCode()}/${this.apiV}`, payload);
  }

  spliceElementFromArray(array, keyName, keyData) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][keyName] === keyData) {
        array.splice(i, 1);
        i--;
      }
    }
    return array;
  }

}
