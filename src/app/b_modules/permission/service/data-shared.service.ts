import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharedService {
  public routesData: any;
  public copyPermissionData: any;
  constructor() { }
}
