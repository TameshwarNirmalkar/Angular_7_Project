import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApplicationDataService } from '@srk/core';

@Injectable({
  providedIn: 'root'
})
export class ResourceControlService {

  private apiH: string = this.appDataService.getEnvironment().CONTROL_CENTER.host;
  private apiV: string = this.appDataService.getEnvironment().CONTROL_CENTER.version;

  constructor(private http: HttpClient, private appDataService: ApplicationDataService) {
  }

  getResources(payload: any, getUrl: string) {
    const { role_id, user_id, org_id, dept_id, operation } = payload;
    const param = `?role_id=${role_id}&user_id=${user_id}&org_id=${org_id}&dept_id=${dept_id}&operation=${operation}`;;
    return this.http.get(`${this.apiH}${getUrl}${this.apiV}${param}`);
  }

  getUserResources(payload) {
    const { role_id, user_id, org_id, dept_id, operation} = payload;
    const param = `?role_id=${role_id}&user_id=${user_id}&org_id=${org_id}&dept_id=${dept_id}&operation=${operation}`;
    return this.http.get(`${this.apiH}/users/permissions/${this.apiV}${param}`);
  }

  addUserResource(payload, url, query) {
    const { role_id, user_id, org_id, dept_id, operation } = query;
    const param = `?role_id=${role_id}&user_id=${user_id}&org_id=${org_id}&dept_id=${dept_id}&operation=${operation}`;
    return this.http.put(`${this.apiH}${url}${this.apiV}${param}`, payload);
  }

  removeResource(payload, url, query) {
    const { role_id, user_id, org_id, dept_id, operation } = query;
    const param = `?role_id=${role_id}&user_id=${user_id}&org_id=${org_id}&dept_id=${dept_id}&operation=${operation}`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(payload)
    };
    return this.http.delete(`${this.apiH}${url}${this.apiV}${param}`, httpOptions);
  }

}
