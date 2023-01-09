import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, style, animate } from '@angular/animations';
import { ButtonText } from "../../models/button-text";
import { ButtonOverlay } from "../../models/button-overlay";
import { MatRadioChange  } from '@angular/material/radio';
import { Section2Extend } from "../../models/section2-extend";
import { TitleInfo } from "../../models/title-info";

@Component({
  selector: 'app-view-detail',
  templateUrl: './view-detail.component.html',
  styleUrls: ['./view-detail.component.scss'],
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
  ]
})
export class ViewDetailComponent implements OnInit {

  overlayText: string;
  innerWidth: number = window.innerWidth;
  buttonText: ButtonText;
  buttonOverlay: ButtonOverlay;
  tile: TitleInfo;
  buttonOverlayList: ButtonOverlay[];

  faCaretDown = faCaretDown;

  favoriteSeason: string;
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  isShow: boolean = false;
  currentButtonTextValue: string ;

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ViewDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
    dialogRef.addPanelClass("dialog-p-0");
  }

  ngOnInit() {
    this.overlayText = this.data.overlayText;
    this.tile = this.data.tile;
    this.innerWidth = this.data.innerWidth;
    this.buttonText = this.data.buttonText;
    this.buttonOverlayList = this.data.buttonOverlayList;

    setTimeout(() => {
      this.isShow = true;
    }, 200);

    if (this.buttonText) {
      this.buttonOverlay = this.buttonOverlayList.find(btn => btn.ButtonOverlayID == this.buttonText.ButtonOverlayID);
      this.currentButtonTextValue = this.buttonText.ButtonTextValue;
    }
  }

  onCloseHandler() {
    this.isShow = false;

    setTimeout(() => {
      this.dialogRef.close();
    }, 500);
  }

  swipeHandler(event) {
    const x = Math.abs(event.deltaX) > 40 ? (event.deltaX > 0 ? "Right" : "Left") : "";
    const y = Math.abs(event.deltaY) > 40 ? (event.deltaY > 0 ? "Down" : "Up") : "";

    if (y == "Down") {
      this.onCloseHandler();
    }

  }

  onRadioChange(changeEvent: MatRadioChange ){
    this.tile.Section2List[this.tile.currentSectionIndex].buttonText.ButtonTextValue = changeEvent.value;
  }
}
