import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DisplayInfo } from '../models/display-info';
import { Tile } from '../models/tile';
import { Section1 } from '../models/section1';
import { Section2 } from '../models/section2';
import { ButtonOverlay } from '../models/button-overlay';

@Injectable({
  providedIn: 'root'
})
export class DisplayDataService {

  constructor() {
  }

  getData(): Observable<DisplayInfo> {
    return new Observable(
      observable => {
        let displayInfo: DisplayInfo =
          {
            "TileList": [
              {
                "TileID": "1",
                "HeaderText1": "Tile1HeaderText1",
                "HeaderText2": "Tile1HeaderText2",
                "Section1ItemID": "1",
                "Section2ItemIDList": [
                  "5",
                  "1",
                  "2"
                ]
              },
              {
                "TileID": "2",
                "HeaderText1": "Tile2HeaderText1",
                "HeaderText2": "Tile2HeaderText2",
                "Section1ItemID": "4",
                "Section2ItemIDList": [
                  "3",
                  "4",
                  "6"
                ]
              },
              {
                "TileID": "3",
                "HeaderText1": "Tile3HeaderText1",
                "HeaderText2": "Tile3HeaderText2",
                "Section1ItemID": "5",
                "Section2ItemIDList": [
                  "2",
                  "1",
                  "3",
                  "5",
                  "6"
                ]
              },
              {
                "TileID": "4",
                "HeaderText1": "Tile4HeaderText1",
                "HeaderText2": "Tile4HeaderText2",
                "Section1ItemID": "3",
                "Section2ItemIDList": [
                  "4",
                  "1",
                  "5"
                ]
              },
              {
                "TileID": "5",
                "HeaderText1": "Tile5HeaderText1",
                "HeaderText2": "Tile5HeaderText2",
                "Section1ItemID": "2",
                "Section2ItemIDList": [
                  "5",
                  "3",
                  "6",
                  "1"
                ]
              }
            ],
            "Section1List": [
              {
                "Section1ItemID": "1",
                "Line1Text1": "Sect1*1Line1Txt1",
                "Line1Text2": "Sect1*1Line1Txt2",
                "Line1Text3": "Sect1*1Line1Txt3",
                "Line2Text1": "Sect1*1Line2Txt1",
                "Line2Text2": "Sect1*1Line2Txt2",
                "Line2Text3": "Sect1*1Line2Txt3",
                "SectionClickOverlayText": "This is the click/touch overlay module text for section1 item 1"
              },
              {
                "Section1ItemID": "2",
                "Line1Text1": "Sect1*2Line1Txt1",
                "Line1Text2": "Sect1*2Line1Txt2",
                "Line1Text3": "Sect1*2Line1Txt3",
                "Line2Text1": "Sect1*2Line2Txt1",
                "Line2Text2": "Sect1*2Line2Txt2",
                "Line2Text3": "Sect1*2Line2Txt3",
                "SectionClickOverlayText": "This is the click/touch overlay module text for section1 item 2"
              },
              {
                "Section1ItemID": "3",
                "Line1Text1": "Sect1*3Line1Txt1",
                "Line1Text2": "Sect1*3Line1Txt2",
                "Line1Text3": "Sect1*3Line1Txt3",
                "Line2Text1": "Sect1*3Line2Txt1",
                "Line2Text2": "Sect1*3Line2Txt2",
                "Line2Text3": "Sect1*3Line2Txt3",
                "SectionClickOverlayText": "This is the click/touch overlay module text for section1 item 3"
              },
              {
                "Section1ItemID": "4",
                "Line1Text1": "Sect1*4Line1Txt1",
                "Line1Text2": "Sect1*4Line1Txt2",
                "Line1Text3": "Sect1*4Line1Txt3",
                "Line2Text1": "Sect1*4Line2Txt1",
                "Line2Text2": "Sect1*4Line2Txt2",
                "Line2Text3": "Sect1*4Line2Txt3",
                "SectionClickOverlayText": "This is the click/touch overlay module text for section1 item 4"
              },
              {
                "Section1ItemID": "5",
                "Line1Text1": "Sect1*5Line1Txt1",
                "Line1Text2": "Sect1*5Line1Txt2",
                "Line1Text3": "Sect1*5Line1Txt3",
                "Line2Text1": "Sect1*5Line2Txt1",
                "Line2Text2": "Sect1*5Line2Txt2",
                "Line2Text3": "Sect1*5Line2Txt3",
                "SectionClickOverlayText": "This is the click/touch overlay module text for section1 item 5"
              }
            ],
            "Section2List": [
              {
                "Section2ItemID": "1",
                "Line1Text1": "Sect2*1Line1Txt1",
                "Line1Text2": "Sect2*1Line1Txt2",
                "Line1Text3": "Sect2*1Line1Txt3",
                "Line2Text1": "Sect2*1Line2Txt1",
                "Line2Text2": "Sect2*1Line2Txt2",
                "Line2Text3": "Sect2*1Line2Txt3",
                "SectionClickOverlayText": "This is the click/touch overlay module text for section2 item 1"
              },
              {
                "Section2ItemID": "2",
                "Line1Text1": "Sect2*2Line1Txt1",
                "Line1Text2": "Sect2*2Line1Txt2",
                "Line1Text3": "Sect2*2Line1Txt3",
                "Line2Text1": "Sect2*2Line2Txt1",
                "Line2Text2": "Sect2*2Line2Txt2",
                "Line2Text3": "Sect2*2Line2Txt3",
                "SectionClickOverlayText": "This is the click/touch overlay module text for section2 item 2"
              },
              {
                "Section2ItemID": "3",
                "Line1Text1": "Sect2*3Line1Txt1",
                "Line1Text2": "Sect2*3Line1Txt2",
                "Line1Text3": "Sect2*3Line1Txt3",
                "Line2Text1": "Sect2*3Line2Txt1",
                "Line2Text2": "Sect2*3Line2Txt2",
                "Line2Text3": "Sect2*3Line2Txt3",
                "SectionClickOverlayText": "This is the click/touch overlay module text for section2 item 3"
              },
              {
                "Section2ItemID": "4",
                "Line1Text1": "Sect2*4Line1Txt1",
                "Line1Text2": "Sect2*4Line1Txt2",
                "Line1Text3": "Sect2*4Line1Txt3",
                "Line2Text1": "Sect2*4Line2Txt1",
                "Line2Text2": "Sect2*4Line2Txt2",
                "Line2Text3": "Sect2*4Line2Txt3",
                "SectionClickOverlayText": "This is the click/touch overlay module text for section2 item 4"
              },
              {
                "Section2ItemID": "5",
                "Line1Text1": "Sect2*5Line1Txt1",
                "Line1Text2": "Sect2*5Line1Txt2",
                "Line1Text3": "Sect2*5Line1Txt3",
                "Line2Text1": "Sect2*5Line2Txt1",
                "Line2Text2": "Sect2*5Line2Txt2",
                "Line2Text3": "Sect2*5Line2Txt3",
                "SectionClickOverlayText": "This is the click/touch overlay module text for section2 item 5"
              },
              {
                "Section2ItemID": "6",
                "Line1Text1": "Sect2*6Line1Txt1",
                "Line1Text2": "Sect2*6Line1Txt2",
                "Line1Text3": "Sect2*6Line1Txt3",
                "Line2Text1": "Sect2*6Line1Txt1",
                "Line2Text2": "Sect2*6Line1Txt2",
                "Line2Text3": "Sect2*6Line1Txt3",
                "SectionClickOverlayText": "This is the click/touch overlay module text for section2 item 6"
              }
            ],
            "ButtonOverlayList": [
              {
                "ButtonOverlayID": "1",
                "OverlayHeaderText": "ButtonOverlayItem 1 Sample summary Text",
                "ButtonList": [
                  {
                    "ButtonID": "1",
                    "ButtonValue": "100",
                    "ButtonText": "This button is has a value of 100"
                  },
                  {
                    "ButtonID": "2",
                    "ButtonValue": "300",
                    "ButtonText": "This button is has a value of 300"
                  },
                  {
                    "ButtonID": "3",
                    "ButtonValue": "200",
                    "ButtonText": "This button is has a value of 200"
                  }
                ]
              },
              {
                "ButtonOverlayID": "2",
                "OverlayHeaderText": "ButtonOverlayItem 2 Sample summary Text",
                "ButtonList": [
                  {
                    "ButtonID": "1",
                    "ButtonValue": "400",
                    "ButtonText": "This button is has a value of 400"
                  },
                  {
                    "ButtonID": "2",
                    "ButtonValue": "800",
                    "ButtonText": "This button is has a value of 800"
                  },
                  {
                    "ButtonID": "3",
                    "ButtonValue": "350",
                    "ButtonText": "This button is has a value of 350"
                  }
                ]
              },
              {
                "ButtonOverlayID": "3",
                "OverlayHeaderText": "ButtonOverlayItem 3 Sample summary Text",
                "ButtonList": [
                  {
                    "ButtonID": "1",
                    "ButtonValue": "600",
                    "ButtonText": "This button is has a value of 600"
                  },
                  {
                    "ButtonID": "2",
                    "ButtonValue": "700",
                    "ButtonText": "This button is has a value of 700"
                  }
                ]
              }
            ],
            "ButtonTextArray": [
              {
                "Section1ItemID": "1",
                "Section2ItemID": "1",
                "ButtonTextValue": "B1B1Text",
                "ButtonOverlayID": "1"
              },
              {
                "Section1ItemID": "1",
                "Section2ItemID": "2",
                "ButtonTextValue": "B1B2Text",
                "ButtonOverlayID": "2"
              },
              {
                "Section1ItemID": "1",
                "Section2ItemID": "5",
                "ButtonTextValue": "B1B5Text",
                "ButtonOverlayID": "1"
              },
              {
                "Section1ItemID": "2",
                "Section2ItemID": "5",
                "ButtonTextValue": "B2B5Text",
                "ButtonOverlayID": "3"
              },
              {
                "Section1ItemID": "2",
                "Section2ItemID": "3",
                "ButtonTextValue": "B2B3Text",
                "ButtonOverlayID": "2"
              },
              {
                "Section1ItemID": "2",
                "Section2ItemID": "6",
                "ButtonTextValue": "B2B6Text",
                "ButtonOverlayID": "1"
              },
              {
                "Section1ItemID": "2",
                "Section2ItemID": "1",
                "ButtonTextValue": "B2B1Text",
                "ButtonOverlayID": "1"
              },
              {
                "Section1ItemID": "3",
                "Section2ItemID": "4",
                "ButtonTextValue": "B3B4Text",
                "ButtonOverlayID": "3"
              },
              {
                "Section1ItemID": "3",
                "Section2ItemID": "1",
                "ButtonTextValue": "B3B1Text",
                "ButtonOverlayID": "2"
              },
              {
                "Section1ItemID": "3",
                "Section2ItemID": "5",
                "ButtonTextValue": "B3B5Text",
                "ButtonOverlayID": "3"
              },
              {
                "Section1ItemID": "4",
                "Section2ItemID": "3",
                "ButtonTextValue": "B4B3Text",
                "ButtonOverlayID": "1"
              },
              {
                "Section1ItemID": "4",
                "Section2ItemID": "4",
                "ButtonTextValue": "B4B4Text",
                "ButtonOverlayID": "3"
              },
              {
                "Section1ItemID": "4",
                "Section2ItemID": "6",
                "ButtonTextValue": "B4B6Text",
                "ButtonOverlayID": "1"
              },
              {
                "Section1ItemID": "5",
                "Section2ItemID": "2",
                "ButtonTextValue": "B5B2Text",
                "ButtonOverlayID": "1"
              },
              {
                "Section1ItemID": "5",
                "Section2ItemID": "1",
                "ButtonTextValue": "B5B1Text",
                "ButtonOverlayID": "1"
              },
              {
                "Section1ItemID": "5",
                "Section2ItemID": "3",
                "ButtonTextValue": "B5B3Text",
                "ButtonOverlayID": "2"
              },
              {
                "Section1ItemID": "5",
                "Section2ItemID": "5",
                "ButtonTextValue": "B5B5Text",
                "ButtonOverlayID": "2"
              },
              {
                "Section1ItemID": "5",
                "Section2ItemID": "6",
                "ButtonTextValue": "B5B6Text",
                "ButtonOverlayID": "1"
              }
            ]
          } as DisplayInfo;

        observable.next(displayInfo);
        observable.complete();
      }
    )

  }

}
