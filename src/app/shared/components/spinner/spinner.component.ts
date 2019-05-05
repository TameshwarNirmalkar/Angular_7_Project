import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnChanges {

  @Input() isLoading: boolean = false;

  constructor() { }

  ngOnChanges(changes) {
  }

}
