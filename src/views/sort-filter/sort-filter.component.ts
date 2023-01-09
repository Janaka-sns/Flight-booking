import { Component, OnInit, Inject, ElementRef, ViewChild, Renderer2, AfterViewInit, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';
import { SortFilterOption, OptionBlockList, OptionBlock } from '../../models';
import { TravelOptions } from '../../util';
import { NouisliderComponent } from 'ng2-nouislider';

@Component({
  selector: 'app-sort-filter',
  templateUrl: './sort-filter.component.html',
  styleUrls: ['./sort-filter.component.scss'],
  animations: [
    trigger('TranslateYIn', [
      transition(':enter', [
        style({ opacity: "0", transform: 'translateY(100%)' }),
        animate('0.5s 0s ease', style({ opacity: "1", transform: ' translateY(0rem)' }))
      ]),
      transition(':leave', [
        style({ opacity: "1", transform: 'translateY(0rem)' }),
        animate('0.5s 0s ease', style({ opacity: "0", transform: ' translateY(100%)' }))
      ])
    ]),
    trigger('Flights', [
      transition(':enter', [
        style({ "z-index": "0" }),
        animate('0s 0s ease', style({ "z-index": "0" }))
      ]),
      transition(':leave', [
        style({ position: "absolute", top: "0rem", width: "100%", transform: 'translateX(0rem)', "z-index": "4" }),
        animate('0.5s 0s', style({ transform: 'translateX(-100%)', top: "0rem", width: "100%", position: "absolute", "z-index": "4" }))
      ])
    ]),
    trigger('Fares', [
      transition(':enter', [
        style({ "z-index": "0" }),
        animate('0s 0s ease', style({ "z-index": "0" }))
      ]),
      transition(':leave', [
        style({ position: "absolute", top: "0rem", width: "100%", transform: 'translateX(0rem)', "z-index": "4" }),
        animate('0.5s 0s', style({ transform: 'translateX(100%)', top: "0rem", width: "100%", position: "absolute", "z-index": "4" }))
      ])
    ]),
  ]
})
export class SortFilterComponent implements OnInit, AfterViewInit {

  isShow: boolean = false;
  sortFilterResponseOptions: any;

  sortFilterOption: SortFilterOption;
  optionBlockList: OptionBlockList;
  isSliderShow: boolean = true;
  buttonPath: string = "assets/";
  buttonOverlayWidth: number = 0;

  timeConfig = {

  }

  @ViewChild('overlay')
  private elementRef: ElementRef;

  @ViewChild('MainContainer')
  private mainElementRef: ElementRef;

  @ViewChild('Container')
  private containerElementRef: ElementRef;

  private travelOptions: TravelOptions = new TravelOptions();
  private travelOptionsParameters: any;

  constructor(
    private dialog: MatDialog,
    private renderer: Renderer2,
    private dialogRef: MatDialogRef<SortFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    dialogRef.addPanelClass("dialog-p-0");
  }

  ngOnInit() {
    setTimeout(() => {
      this.isShow = true;
    }, 200);
    this.sortFilterResponseOptions = this.data.response.sortFilter;

    if (!this.data.sortFilterOption) {
      this.initSortFilterOption();
    } else {
      this.sortFilterOption = this.data.sortFilterOption;
      this.onModelChange();
    }

  }

  ngAfterViewInit() {
    this.buttonOverlayWidth = this.mainElementRef.nativeElement.getBoundingClientRect().width;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.buttonOverlayWidth = this.mainElementRef.nativeElement.getBoundingClientRect().width;
  }

  onCloseHandler() {
    this.isShow = false;

    setTimeout(() => {
      this.dialogRef.close();
    }, 500);
  }

  closeSwipeHandler(event) {
    const y = Math.abs(event.deltaY) > 40 ? (event.deltaY > 0 ? "Down" : "Up") : "";

    if (y == "Down") {
      this.onCloseHandler();
    }

  }

  clearAll() {
    this.initSortFilterOption();
  }

  clearBaggageOrRefunds() {
    this.sortFilterOption.baggageOrRefunds = this.sortFilterResponseOptions.s2Recs.s2Rec.map(
      baggage => {
        return {
          value: baggage.sVal,
          sTxt1: baggage.sTxt1,
          sTxt2: baggage.sTxt2,
          selected: false
        }
      }
    );
    this.onModelChange();
  }

  clearAirlines() {
    this.sortFilterOption.airlines = this.sortFilterResponseOptions.s4Recs.s4Rec.map(
      baggage => {
        return {
          value: baggage.sVal,
          sTxt: baggage.sTxt,
          selected: false
        }
      }
    );
    this.onModelChange();
  }

  clearTimes() {
    this.sortFilterOption.times = this.sortFilterResponseOptions.s5Recs.s5Rec.map(
      times => {
        return {
          sValA: times.sValA,
          sValB: times.sValB,
          sTxt: times.sTxt,
          range: [Number(times.sValA), Number(times.sValB)],
          selected: false
        }
      }
    )
    this.onModelChange();
  }

  onTimeChange(event: number[], time: { sValA: string, sValB: string, sTxt: string, range: number[], selected: boolean }, Nouislider: NouisliderComponent) {

    this.isSliderShow = false;

    time.selected = true;

    if (Number(time.sValA) > event[0]) {
      time.range[0] = Number(time.sValA);
    }

    if (Number(time.sValB) < event[1]) {
      time.range[1] = Number(time.sValB);
    }

    setTimeout(() => {
      this.isSliderShow = true;
    }, 0);

    this.onModelChange();
  }


  onModelChange() {

    const refunds = this.sortFilterOption.baggageOrRefunds.find(refund => refund.selected && refund.value == "R");
    const baggage = this.sortFilterOption.baggageOrRefunds.find(refund => refund.selected && refund.value == "B");


    let qryTime: any = {};

    this.sortFilterOption.times.map(
      (time, index) => {
        const suffix: string = (index % 2) == 0 ? "Dep" : "Arv";
        const pos: number = Math.ceil((index / 2) + 0.1);
        qryTime["qryTimeB" + pos + suffix] = time.range;
      }
    )

    this.travelOptionsParameters = {
      qryStops: this.sortFilterOption.stops,
      sortByParam: this.sortFilterOption.sortyBy,
      qryPrefCarrArr: this.sortFilterOption.airlines.map(airLine => airLine.selected ? airLine.value : null).filter(airLine => null != airLine),
      qryRFND: refunds ? refunds.value : null,
      qryFBA: baggage ? baggage.value : null,
      ...qryTime
    }
    this.optionBlockList = this.travelOptions.generateDisplayTravelOptions(this.data.response, this.travelOptionsParameters)

    // console.log('qryTime',qryTime);
    // console.log('times',this.sortFilterOption.times);

  }

  private startClientY: number = 0;
  private startClientX: number = 0;
  private isMoving: boolean = false;
  private moveDirection: "UP" | "DOWN" | "LEFT" | "RIGHT";

  onTouchStart(event: TouchEvent) {
    this.isMoving = false;
    this.startClientY = event.touches[0].clientY;
    this.startClientX = event.touches[0].clientX;
    this.renderer.removeClass(this.elementRef.nativeElement, 'translateTop');
  }

  onTouchEnd(event: TouchEvent) {
    this.isMoving = false;
    if (!this.renderer) {
      return;
    }
    this.renderer.addClass(this.elementRef.nativeElement, 'translateTop');
    setTimeout(() => {
      if (this.renderer && this.elementRef) {
        this.renderer.removeClass(this.elementRef.nativeElement, 'translateTop');
        this.renderer.setStyle(this.elementRef.nativeElement, 'transform', "translateY(0px)");
      }
    }, 450);
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

  onTouchMove(event: TouchEvent) {
    this.getMoveDirection(event);

    switch (this.moveDirection) {
      case "UP":
        break;
      case "DOWN":
        const touchClientY: number = event.changedTouches[0].clientY;
        if (this.containerElementRef.nativeElement.scrollTop == 0) {
          this.renderer.setStyle(this.elementRef.nativeElement, 'transform', "translateY(" + ((this.startClientY - touchClientY) * -1) + "px)");
          if ((100 / this.containerElementRef.nativeElement.clientHeight) * (this.containerElementRef.nativeElement.clientHeight - (this.startClientY - touchClientY) * -1) < 40) {
            this.dialogRef.close();
          }
        }
        break;
      default:
        break;
    }
  }

  showOptions() {

    if (!this.optionBlockList || this.optionBlockList.OptionBlock.length == 0) {
      return;
    }

    this.data.onSortAndFilter(this.optionBlockList, this.sortFilterOption);
    this.onCloseHandler();
  }

  private initSortFilterOption() {
    this.sortFilterOption = {
      sortyBy: undefined,
      stops: undefined,
    } as SortFilterOption;

    this.sortFilterOption.baggageOrRefunds = this.sortFilterResponseOptions.s2Recs.s2Rec.map(
      baggage => {
        return {
          value: baggage.sVal,
          sTxt1: baggage.sTxt1,
          sTxt2: baggage.sTxt2,
          selected: false
        }
      }
    )

    this.sortFilterOption.airlines = this.sortFilterResponseOptions.s4Recs.s4Rec.map(
      baggage => {
        return {
          value: baggage.sVal,
          sTxt: baggage.sTxt,
          selected: false
        }
      }
    )

    this.sortFilterOption.times = this.sortFilterResponseOptions.s5Recs.s5Rec.map(
      times => {
        return {
          sValA: times.sValA,
          sValB: times.sValB,
          sTxt: times.sTxt,
          range: [Number(times.sValA), Number(times.sValB)],
          selected: false
        }
      }
    )

    this.onModelChange();
  }


}
