import { Component, OnInit } from '@angular/core';
import { Progress } from "@ng-libraries/progress";
import { OptionBlockList } from '@app/models';

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.scss']
})
export class BootstrapComponent implements OnInit {

  progressType: Progress = Progress.STRETCH;
  selectedView: number = 0

  constructor() { }

  ngOnInit() {
  }

  onSearchFlights(optionBlockList: OptionBlockList) {
    this.selectedView = 1;
  }

}
