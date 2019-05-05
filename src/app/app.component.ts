import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'control-center UI';

  constructor(private route: ActivatedRoute) {
    // this.route.queryParams.subscribe((val: any) => {
    //   if (val.token) {
    //     console.log('validate token api call');
    //   } else {
    //     console.log('show login page.');
    //   }
    // });
  }

}
