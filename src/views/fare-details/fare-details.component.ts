import { Component, OnInit, Input } from '@angular/core';
import { FareGroupList, FareGroup, FFnR } from '../../models';
import { faDotCircle, faCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'fare-details',
  templateUrl: './fare-details.component.html',
  styleUrls: ['./fare-details.component.scss']
})
export class FareDetailsComponent implements OnInit {

  @Input()
  fareGroupList: FareGroupList;

  @Input()
  height: number;

  faDotCircle = faDotCircle;
  faCircle = faCircle;

  selectedIndex: number = 0;

  iconPath: string = "assets/icons/";
  
  constructor() { }

  ngOnInit() {
    
  }

  onOptionSelected(isSelected: boolean, event, fareGroup: FareGroup, FnR: FFnR) {
    if (!isSelected) {
      return;
    }
    event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();

    fareGroup.FFnR.map(
      fnr => {
        fnr.isItemSelected = (fnr.ffID == FnR.ffID ? 'Y' : null)
      }
    )

  }

}
