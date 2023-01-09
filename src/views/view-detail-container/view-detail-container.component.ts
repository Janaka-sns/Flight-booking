import { Component, OnInit, Inject, ElementRef, ViewChild, Renderer2, AfterViewInit, HostListener  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';
import { FltOptionList, FareGroupList } from '../../models';
import { TravelOptions } from '../../util';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-view-detail-container',
  templateUrl: './view-detail-container.component.html',
  styleUrls: ['./view-detail-container.component.scss'],
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
        style({ position: "absolute", top: "*", width: "100%", transform: 'translateX(0rem)', "z-index": "4" }),
        animate('0.5s 0s', style({ transform: 'translateX(-100%)', top: "*", width: "100%", position: "absolute", "z-index": "4" }))
      ])
    ]),
    trigger('Fares', [
      transition(':enter', [
        style({ "z-index": "0" }),
        animate('0s 0s ease', style({ "z-index": "0" }))
      ]),
      transition(':leave', [
        style({ position: "absolute", top: "1.5rem", width: "100%", transform: 'translateX(0rem)', "z-index": "4" }),
        animate('0.5s 0s', style({ transform: 'translateX(100%)', top: "1.5rem", width: "100%", position: "absolute", "z-index": "4" }))
      ])
    ]),
  ]
})
export class ViewDetailContainerComponent implements OnInit, AfterViewInit {

  faCaretLeft = faCaretLeft;
  faCaretRight = faCaretRight;

  isShow: boolean = false;
  buttonPath: string = "assets/";
  buttonOverlayWidth: number = 0;

  selectedTabIndex: number = 1;
  fltOptionList: FltOptionList;
  fareGroupList: FareGroupList;

  @ViewChild('overlay')
  private elementRef: ElementRef;

  @ViewChild('Container')
  private containerElementRef: ElementRef;
  
  @ViewChild('MainContainer')
  private mainElementRef: ElementRef;

  private travelOptions: TravelOptions = new TravelOptions();

  constructor(
    private dialog: MatDialog,
    private renderer: Renderer2,
    private dialogRef: MatDialogRef<ViewDetailContainerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    dialogRef.addPanelClass("dialog-p-0");
  }

  ngOnInit() {
    setTimeout(() => {
      this.isShow = true;
    }, 200);

    this.fltOptionList = this.travelOptions.generateDisplayFltDetailsList(this.data.optionBlock, this.data.sectionIndex, this.data.response);
    this.fareGroupList = this.travelOptions.generateDisplayFareGroupList(this.data.optionBlock, this.data.sectionIndex, this.data.response);
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
      case "LEFT":
        this.selectedTabIndex = 2;
        this.containerElementRef.nativeElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        break;
      case "RIGHT":
        this.selectedTabIndex = 1;
        this.containerElementRef.nativeElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        break;
      default:
        break;
    }
  }

  onSwipeLeft(event) {
    this.selectedTabIndex = 2;
    this.containerElementRef.nativeElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  onSwipeRight(event) {
    this.selectedTabIndex = 1;
    this.containerElementRef.nativeElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  proceedToNext(selectedTabIndex: number) {
    if (selectedTabIndex == 2) {
      this.onCloseHandler();
    }

    this.selectedTabIndex = selectedTabIndex + 1;
  }

}
