import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, AnimationEvent } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { FlightsService } from '../../services/flights.service';
import { FlightSearchRequest, SegmentRecord, SegmentList, SortFilterOption, OptionBlockList, OptionBlock } from '../../models';
import { TravelOptions } from '../../util';
import { ProgressLoaderService } from "@ng-libraries/progress";
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { ViewDetailContainerComponent } from '../view-detail-container/view-detail-container.component';
import { SortFilterComponent } from '../sort-filter/sort-filter.component';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
  animations: [
    trigger('TranslateYIn', [
      transition(':enter', [
        style({ opacity: "0", transform: 'translateY(-1rem)' }),
        animate('2s 0s ease', style({ opacity: "1", transform: ' translateY(0rem)' }))
      ])
    ]),

    trigger('Slide', [
      transition('void => toRightEnter', [
        style({ position: "absolute", top: "*", width: "100%", height: "*", transform: 'translateX(-100%)', "z-index": "3", opacity: 0 }),
        animate('0.3s 0.2s', style({ transform: 'translateX(0rem)', top: "*", width: "100%", position: "absolute", "z-index": "3", opacity: 1 }))

      ]),
      transition('void => toLeftEnter', [
        style({ opacity: "0", "z-index": "5", transform: "scale(0.8)" }),
        animate('0.3s 0.4s', style({ opacity: "1", "z-index": "5", transform: "scale(1)" }))
      ]),

      transition('toLeftEnter => void', [
        style({ position: "absolute", top: "*", width: "100%", transform: 'translateX(0rem)', "z-index": "4" }),
        animate('0.5s 0s', style({ transform: 'translateX(-100%)', top: "*", width: "100%", position: "absolute", "z-index": "4" }))
      ]),
      transition('toRightEnter => void', [
        style({ position: "absolute", top: "0rem", width: "100%", opacity: "1", "z-index": "5", transform: "scale(1)", overflow: "hidden" }),
        animate('0.5s 0s', style({ opacity: "0", "z-index": "5", width: "100%", transform: "scale(0.2)" }))
      ]),
    ]),
  ]
})
export class FlightsComponent implements OnInit {

  iconPath: string = "assets/icons/";
  buttonPath: string = "assets/";
  isSwipe: boolean = false;
  isAnimationEnd: boolean = true;
  faCaretLeft = faCaretLeft;
  faCaretRight = faCaretRight;
  optionBlocks: OptionBlock[] = [];
  enterState: string = "toLeftEnter";
  OptBlockID: string;
  sortFilterOption: SortFilterOption;

  private travelOptions: TravelOptions = new TravelOptions();
  private apiResponse: OptionBlockList = undefined!;

  constructor(
    private dialog: MatDialog,
    private progressLoader: ProgressLoaderService,
    private flightsService: FlightsService
  ) {

  }

  ngOnInit() {
    const flightSearchRequest: FlightSearchRequest = {
      cabinCode: "Y",
      countADT: 1,
      countINF: 1,
      countCHD: 1,
      segmentList: {
        segmentRecord: [
          {
            segReference: 1,
            departureCity: "ALA",
            arrivalCity: "FRA",
            departureDate: 150721
          } as SegmentRecord,
          {
            segReference: 2,
            departureCity: "FRA",
            arrivalCity: "ALA",
            departureDate: 310721
          } as SegmentRecord
        ]
      } as SegmentList
    } as FlightSearchRequest

    this.progressLoader.toggle(true);
    this.flightsService.availabilitySearch(flightSearchRequest).subscribe(
      (optionBlockList: OptionBlockList) => {
        this.apiResponse = optionBlockList;
        this.addOptionBlock(this.travelOptions.generateDisplayTravelOptions(this.apiResponse, {}).OptionBlock);
        this.progressLoader.toggle(false);
      },
      error => {
        this.progressLoader.toggle(false);
      }
    )
  }

  fbaCarrIcon(icon: string) {
    return icon.indexOf(".png") > -1 ? icon : icon + ".png";
  }

  onOptionClickHandler(optionBlock: OptionBlock) {
    if (this.isSwipe) {
      return;
    }

    const innerWidth: number = (window.innerWidth - this.getScrollbarWidth());
    const dialogRef = this.dialog.open(
      ViewDetailContainerComponent,
      {
        width: innerWidth + 'px',
        height: window.innerHeight * 0.95 + "px",
        position: {
          top: window.innerHeight * 0.05 + "px"
        },
        data: {
          innerWidth,
          height: window.innerHeight * 0.95,
          optionBlock,
          sectionIndex: optionBlock.currentSectionIndex,
          response: this.apiResponse,
        }
      }
    );

  }

  onSortAndFilterClickHandler() {
    {
      if (this.isSwipe) {
        return;
      }

      const innerWidth: number = (window.innerWidth - this.getScrollbarWidth());
      const dialogRef = this.dialog.open(
        SortFilterComponent,
        {
          width: innerWidth + 'px',
          height: window.innerHeight * 0.95 + "px",
          position: {
            top: window.innerHeight * 0.05 + "px"
          },
          data: {
            innerWidth,
            sortFilterOption: this.sortFilterOption,
            height: window.innerHeight * 0.95,
            response: this.apiResponse,
            onSortAndFilter: this.onSortAndFilter.bind(this)
          }
        }
      );

    }
  }

  private onSortAndFilter(optionBlockList: OptionBlockList, sortFilterOption: SortFilterOption) {
    this.sortFilterOption = sortFilterOption;
    this.optionBlocks = [];
    this.addOptionBlock(optionBlockList.OptionBlock);
  }

  private getScrollbarWidth() {

    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    outer.parentNode.removeChild(outer);

    return scrollbarWidth;

  }

  private addOptionBlock(optionBlocks: OptionBlock[]) {

    if (this.optionBlocks.length == 0) {
      optionBlocks[0].currentSectionIndex = 0;
      this.optionBlocks.push(optionBlocks[0]);
    }

    if (optionBlocks.length > 1) {
      setTimeout(() => {
        optionBlocks.splice(0, 1);
        optionBlocks[0].currentSectionIndex = 0;
        this.optionBlocks.splice(this.optionBlocks.length, 0, optionBlocks[0]);
        if (optionBlocks.length > 0) {
          this.addOptionBlock(optionBlocks);
        }
      }, 300);
    }
  }

  navigationArrowClickHandler(optionBlock: OptionBlock, direction: string) {
    this.isAnimationEnd = false;
    this.OptBlockID = optionBlock.OptBlockID;

    this.enterState = direction == "ToLeft" ? "toLeftEnter" : "toRightEnter";

    setTimeout(() => {
      if (direction == "ToLeft") {
        if ((optionBlock.currentSectionIndex + 1) == optionBlock.lwrSegList.lwrOpt.length) {
          return;
        }
        optionBlock.currentSectionIndex++;
      } else if (direction == "ToRight") {
        if (optionBlock.currentSectionIndex == 0) {
          return;
        }
        optionBlock.currentSectionIndex--;
      }

      setTimeout(() => {
        this.isAnimationEnd = true;
      }, 600);
    }, 100);
  }

  // navigationSwipeHandler(event, optionBlock: OptionBlock) {
  //   const x = Math.abs(event.deltaX) > 40 ? (event.deltaX > 0 ? "Right" : "Left") : "";
  //   const y = Math.abs(event.deltaY) > 40 ? (event.deltaY > 0 ? "Down" : "Up") : "";

  //   this.isSwipe = true;
  //   setTimeout(() => {
  //     this.isSwipe = false;
  //   }, 200);

  //   if (x == "Right") {
  //     if (optionBlock.currentSectionIndex != 0) {
  //       this.navigationArrowClickHandler(optionBlock, "ToRight");
  //     }
  //   } else if (x == "Left") {
  //     if (optionBlock.lwrSegList.lwrOpt.length - 1 > optionBlock.currentSectionIndex) {
  //       this.navigationArrowClickHandler(optionBlock, "ToLeft");
  //     }
  //   }

  // }

  // logPan(event) {
  //   // console.log('logPan',event);
  // }


  private startClientY: number = 0;
  private startClientX: number = 0;
  private isMoving: boolean = false;
  private moveDirection: "UP" | "DOWN" | "LEFT" | "RIGHT";

  onTouchStart(event: TouchEvent) {
    this.isMoving = false;
    this.startClientY = event.touches[0].clientY;
    this.startClientX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent) {
    this.isMoving = false;
  }

  private getMoveDirection(event: TouchEvent): "UP" | "DOWN" | "LEFT" | "RIGHT" {
    if (this.isMoving) {
      return;
    }

    const touchClientY: number = event.changedTouches[0].clientY;
    const touchClientX: number = event.changedTouches[0].clientX;

    if (Math.abs(this.startClientY - touchClientY) > Math.abs(this.startClientX - touchClientX)) {
      if (this.startClientY > touchClientY) {
        this.moveDirection = "UP";
      } else {
        this.moveDirection = "DOWN";
      }
    } else {
      if (this.startClientX > touchClientX) {
        this.moveDirection = "LEFT";
      } else {
        this.moveDirection = "RIGHT";
      }
    }
    this.isMoving = true;
    return this.moveDirection;
  }

  onTouchMove(event: TouchEvent, optionBlock: OptionBlock) {
    if (this.isMoving) {
      return;
    }

    this.getMoveDirection(event);

    this.isSwipe = true;
    switch (this.moveDirection) {
      case "LEFT":
        if (optionBlock.lwrSegList.lwrOpt.length - 1 > optionBlock.currentSectionIndex) {
          this.navigationArrowClickHandler(optionBlock, "ToLeft");
        }
        break;
      case "RIGHT":
        if (optionBlock.currentSectionIndex != 0) {
          this.navigationArrowClickHandler(optionBlock, "ToRight");
        }
        break;
      default:
        break;
    }

    setTimeout(() => {
      this.isSwipe = false;
    }, 200);

  }

}
