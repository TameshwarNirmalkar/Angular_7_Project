import { Component, OnInit } from '@angular/core';

import { AppResourceService } from '../service/app-resource.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {

  public appResourceList: any[] = [];
  public selectedResource: any[] = [];
  public isLoading: boolean = false;

  constructor(private appResource: AppResourceService) { }

  ngOnInit() {
    this.getResource();
  }

  getResource() {
    this.isLoading = true;
    this.appResource.getApplicationResource().subscribe((res: any) => {
      console.log(res);
      this.appResourceList = this.changeResponseForView( res.data.resources );
    }, (error) => {
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }


  changeResponseForView(data) {
    const dataKey = Object.keys(data);
    const filterData = [];
    for (const orgData of dataKey) {
      filterData.push(data[orgData]);
    }
    console.log( filterData );
    return filterData;
  }

  saveResource() {
    console.log(this.selectedResource);
  }

}
