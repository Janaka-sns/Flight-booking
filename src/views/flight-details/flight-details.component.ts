import { Component, OnInit, Input } from '@angular/core';
import { OptionBlock, OptionBlockList, FltOptionList } from '../../models';

@Component({
  selector: 'flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss']
})
export class FlightDetailsComponent implements OnInit {

  @Input()
  fltOptionList: FltOptionList;

  constructor() { }

  ngOnInit() {
  }

}
