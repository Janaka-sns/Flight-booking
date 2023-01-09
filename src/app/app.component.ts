import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { FlightsService } from '../services/flights.service';
import { FlightSearchRequest, SegmentRecord, SegmentList } from '../models';
import { TravelOptions } from '../util';
import { OptionBlockList, OptionBlock } from "../models";
import { ProgressLoaderService } from "@ng-libraries/progress";

import { DisplayDataService } from "../services/display-data.service";
import { DisplayInfo } from "../models/display-info";
import { ButtonText } from "../models/button-text";
import { Tile } from "../models/tile";
import { Section1 } from "../models/section1";
import { Section2 } from "../models/section2";
import { Section2Extend } from "../models/section2-extend";
import { TitleInfo } from "../models/title-info";

import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { ViewDetailComponent } from './view-detail/view-detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('TranslateYIn', [
      transition(':enter', [
        style({ opacity: "0", transform: 'translateY(-1rem)' }),
        animate('2s 0s ease', style({ opacity: "1", transform: ' translateY(0rem)' }))
      ])
    ]),

    trigger('Slide', [
      transition('void => *', [
        style({ opacity: "0", "z-index": "5", transform: "scale(0.8)" }),
        animate('0.4s 0.5s', style({ opacity: "1", "z-index": "5", transform: "scale(1)" }))
      ]),

      transition('toLeftEnter => void', [
        style({ position: "absolute", transform: 'translateX(0rem)', "z-index": "0" }),
        animate('0.5s 0s', style({ transform: 'translateX(-100%)', position: "absolute", "z-index": "0" }))
      ]),
      transition('toRightEnter => void', [
        style({ position: "absolute", transform: 'translateX(0rem)', "z-index": "0" }),
        animate('0.5s 0s', style({ transform: 'translateX(100%)', position: "absolute", "z-index": "0" }))
      ]),
    ]),
  ]
})
export class AppComponent implements OnInit {

  iconPath: string = "assets/icons/";

  containerWidth: number = 0;
  cardWidth: number = 18 * 16;
  cardMargin: number = 2 * 16;
  isSwipe: boolean = false;

  faCaretLeft = faCaretLeft;
  faCaretRight = faCaretRight;

  enterState: string = "toLeftEnter";
  startDirection: string;

  private readonly tileWidth: number = (this.cardWidth + (this.cardMargin * 2));

  private travelOptions: TravelOptions = new TravelOptions();

  optionBlocks: OptionBlock[] = [];

  constructor(
    private dialog: MatDialog,
    private progressLoader: ProgressLoaderService,
    private displayDataService: DisplayDataService,
    private flightsService: FlightsService
  ) {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.containerWidth = (Math.floor((window.innerWidth - this.getScrollbarWidth()) / this.tileWidth) * this.tileWidth);
  }

  ngOnInit() {
    this.onResize(null);

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
        console.log('ddd', this.travelOptions.generateDisplayTravelOptions(optionBlockList, {}).OptionBlock);

        this.addOptionBlock(this.travelOptions.generateDisplayTravelOptions(optionBlockList, {}).OptionBlock);
        this.progressLoader.toggle(false);
      },
      error => {
        this.progressLoader.toggle(false);
      }
    )
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
    if (!this.startDirection) {
      this.startDirection = direction;// ToLeft or ToRight;
    }
    this.enterState = direction == "ToLeft" ? "toLeftEnter" : "toRightEnter";

    setTimeout(() => {
      if (this.startDirection == direction && direction == "ToLeft") {
        if ((optionBlock.currentSectionIndex + 1) == optionBlock.lwrSegList.lwrOpt.length) {
          return;
        }
        optionBlock.currentSectionIndex++;
      } else if (this.startDirection != direction && direction == "ToRight") {
        if (optionBlock.currentSectionIndex == 0) {
          return;
        }
        optionBlock.currentSectionIndex--;
      } else if (this.startDirection == direction && direction == "ToRight") {
        if ((optionBlock.currentSectionIndex + 1) == optionBlock.lwrSegList.lwrOpt.length) {
          return;
        }
        optionBlock.currentSectionIndex++;
      } else if (this.startDirection != direction && direction == "ToLeft") {
        if (optionBlock.currentSectionIndex == 0) {
          return;
        }
        optionBlock.currentSectionIndex--;
      }

    }, 100);
  }

  navigationSwipeHandler(event, optionBlock: OptionBlock) {
    const x = Math.abs(event.deltaX) > 40 ? (event.deltaX > 0 ? "Right" : "Left") : "";
    const y = Math.abs(event.deltaY) > 40 ? (event.deltaY > 0 ? "Down" : "Up") : "";

    this.isSwipe = true;
    setTimeout(() => {
      this.isSwipe = false;
    }, 200);

    if (x == "Right") {
      this.navigationArrowClickHandler(optionBlock, "ToRight");
    } else if (x == "Left") {
      this.navigationArrowClickHandler(optionBlock, "ToLeft");
    }

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

  logPan(event) {
    // console.log('logPan',event);
  }


  // onSection1ClickHandler(overlayText: string) {
  //   const dialogRef = this.dialog.open(
  //     ViewDetailComponent,
  //     {
  //       width: (window.innerWidth - this.getScrollbarWidth()) + 'px',
  //       height: window.innerHeight * 0.75 + "px",
  //       position: {
  //         top: window.innerHeight * 0.25 + "px"
  //       },
  //       data: {
  //         overlayText,
  //         innerWidth: (window.innerWidth - this.getScrollbarWidth()),
  //       }
  //     }
  //   );
  // }

  // onSection2ClickHandler(overlayText: string) {
  //   if (this.isSwipe) {
  //     return;
  //   }

  //   this.onSection1ClickHandler(overlayText);
  // }

  // onButtonClickHandler(tile: TitleInfo) {
  //   // console.log('tile',tile.Section2List[tile.currentSectionIndex].buttonText.ButtonOverlayID);

  //   const dialogRef = this.dialog.open(
  //     ViewDetailComponent,
  //     {
  //       width: (window.innerWidth - this.getScrollbarWidth()) + 'px',
  //       height: window.innerHeight * 0.75 + "px",
  //       position: {
  //         top: window.innerHeight * 0.25 + "px"
  //       },
  //       data: {
  //         tile,
  //         buttonText: tile.Section2List[tile.currentSectionIndex].buttonText,
  //         buttonOverlayList: this.displayInfo.ButtonOverlayList,
  //         innerWidth: (window.innerWidth - this.getScrollbarWidth()),
  //       }
  //     }
  //   );
  // }

  // arrowClickHandler(tile: TitleInfo, direction: string) {
  //   if (!this.startDirection) {
  //     this.startDirection = direction;// ToLeft or ToRight;
  //   }
  //   this.enterState = direction == "ToLeft" ? "toLeftEnter" : "toRightEnter";

  //   setTimeout(() => {
  //     if (this.startDirection == direction && direction == "ToLeft") {
  //       if ((tile.currentSectionIndex + 1) == tile.Section2List.length) {
  //         return;
  //       }
  //       tile.currentSectionIndex++;
  //     } else if (this.startDirection != direction && direction == "ToRight") {
  //       if (tile.currentSectionIndex == 0) {
  //         return;
  //       }
  //       tile.currentSectionIndex--;
  //     } else if (this.startDirection == direction && direction == "ToRight") {
  //       if ((tile.currentSectionIndex + 1) == tile.Section2List.length) {
  //         return;
  //       }
  //       tile.currentSectionIndex++;
  //     } else if (this.startDirection != direction && direction == "ToLeft") {
  //       if (tile.currentSectionIndex == 0) {
  //         return;
  //       }
  //       tile.currentSectionIndex--;
  //     }

  //   }, 100);
  // }

  // swipeHandler(event, tile: TitleInfo) {
  //   const x = Math.abs(event.deltaX) > 40 ? (event.deltaX > 0 ? "Right" : "Left") : "";
  //   const y = Math.abs(event.deltaY) > 40 ? (event.deltaY > 0 ? "Down" : "Up") : "";

  //   this.isSwipe = true;
  //   setTimeout(() => {
  //     this.isSwipe = false;
  //   }, 200);

  //   if (x == "Right") {
  //     this.arrowClickHandler(tile, "ToRight");
  //   } else if (x == "Left") {
  //     this.arrowClickHandler(tile, "ToLeft");
  //   }

  // }

  // private buildTitleInfo() {
  //   this.titleInfoes = [];

  //   this.displayInfo.TileList.map(
  //     (tile: Tile) => {
  //       let titleInfo: TitleInfo = {} as TitleInfo;
  //       titleInfo.TileID = tile.TileID
  //       titleInfo.HeaderText1 = tile.HeaderText1;
  //       titleInfo.HeaderText2 = tile.HeaderText2;
  //       titleInfo.Section1List = this.displayInfo.Section1List.find(section => tile.Section1ItemID == section.Section1ItemID);
  //       titleInfo.Section2List = [];
  //       tile.Section2ItemIDList.map(
  //         (itemID) => {
  //           titleInfo.Section2List.push({ ...this.displayInfo.Section2List.find(section => itemID == section.Section2ItemID), buttonText: this.displayInfo.ButtonTextArray.find(butn => butn.Section1ItemID == tile.Section1ItemID && butn.Section2ItemID == itemID) });
  //         }
  //       )
  //       titleInfo.currentSectionIndex = 0;

  //       this.titleInfoes.push(titleInfo);
  //     }
  //   )

  //   this.addTiles(this.titleInfoes);
  // }

  // private addTiles(tiles: TitleInfo[]) {

  //   if (this.tiles.length == 0) {
  //     this.tiles.push(tiles[0]);
  //   }

  //   setTimeout(() => {
  //     tiles[this.tiles.length].currentSectionIndex = 0;
  //     this.tiles.push(tiles[this.tiles.length]);
  //     if (this.tiles.length != tiles.length) {
  //       this.addTiles(tiles);
  //     }

  //   }, 300);
  // }


}