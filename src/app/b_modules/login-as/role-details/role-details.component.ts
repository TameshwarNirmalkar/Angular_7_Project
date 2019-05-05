import { Component, OnInit } from '@angular/core';
import { UserControlService } from '../../permission/service/user-control.service';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})
export class RoleDetailsComponent implements OnInit {

  public tableCol: Array<{}> = [];

  public tableData: any = [];
  public userSelected: any = null;
  public loader: boolean = false;
  public startFrom: any;

  public historyTableCol: Array<{}> = [
    { field: 'user_name', header: 'User Name' },
    { field: 'start_time', header: 'Start Time' },
    { field: 'no_of_hours', header: 'No. of Hours' },
    { field: 'given_time', header: 'Given Time' },
    { field: 'status', header: 'Status' }
  ];

  public histroyData: Array<{}> = [
    {
      user_name: 'BHAVESH SORATHIYA',
      start_time: '03/25/2019 11:59 PM',
      no_of_hours: 2,
      given_time: '03/22/2019 10:00 PM',
      status: 'Expired',
      isActive: false
    },
    {
      user_name: 'JITU SURESH MODI',
      start_time: '03/25/2019 11:59 PM',
      no_of_hours: 24,
      given_time: '03/22/2019 10:00 PM',
      status: 'Active',
      isActive: true
    },
    {
      user_name: 'BHAVESH SORATHIYA',
      start_time: '03/25/2019 11:59 PM',
      no_of_hours: 2,
      given_time: '03/22/2019 10:00 PM',
      status: 'Expired',
      isActive: false
    },
    {
      user_name: 'JITU SURESH MODI',
      start_time: '03/25/2019 11:59 PM',
      no_of_hours: 24,
      given_time: '03/22/2019 10:00 PM',
      status: 'Active',
      isActive: true
    },
    {
      user_name: 'BHAVESH SORATHIYA',
      start_time: '03/25/2019 11:59 PM',
      no_of_hours: 2,
      given_time: '03/22/2019 10:00 PM',
      status: 'Expired',
      isActive: false
    },
    {
      user_name: 'JITU SURESH MODI',
      start_time: '03/25/2019 11:59 PM',
      no_of_hours: 24,
      given_time: '03/22/2019 10:00 PM',
      status: 'Active',
      isActive: true
    }
  ];

  public historySelected: Array<{}> = [];

  constructor(private userControlService: UserControlService) { }

  ngOnInit() {
    this.tableCol = [{
      field: 'user_fullname',
      header: 'User Name'
    }];

    this.loader = false;
    this.userControlService.getDepartmentWiseList().subscribe((res: any) => {
      this.loader = false;
      const masterUser = this.getUserFromMaster(res.data[0].master_admin_category);
      const departmentUser = this.getUserFromDepartment(res.data[0].department_list);
      this.tableData = this.tableData.concat(masterUser, departmentUser);
    });
  }

  getUserFromMaster(data) {
    const mList = [];
    data.user_list.forEach((item: any) => {
      const { user_code, user_fullname } = item;
      mList.push({ user_code, user_fullname });
    });
    return mList;
  }

  getUserFromDepartment(data) {
    let dList = [];
    data.forEach((dt: any) => {
      dt.category_list.forEach((ele: any) => {
        dList = dList.concat(this.getUserFromMaster(ele));
      });
    });
    return dList;
  }

  trackByFunction(index, item: any) {
    return item.user_code;
  }

  showCurrentSelectedTime() {
    this.startFrom = new Date();
  }
}
