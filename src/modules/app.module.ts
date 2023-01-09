import {
  BrowserModule,
  HammerModule,
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import * as Hammer from 'hammerjs';
import { FormsModule } from '@angular/forms';
import { NgModule, Injectable } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LayoutModule } from '@angular/cdk/layout';

import { NouisliderModule } from 'ng2-nouislider';

import { BootstrapComponent } from '../views/bootstrap/bootstrap.component';
import { FlightsComponent } from '../views/flights/flights.component';
import { ViewDetailContainerComponent } from '../views/view-detail-container/view-detail-container.component';
import { FareDetailsComponent } from '../views/fare-details/fare-details.component';
import { FlightDetailsComponent } from '../views/flight-details/flight-details.component';
import { SortFilterComponent } from '../views/sort-filter/sort-filter.component';
import { HomeComponent } from '../views/home/home.component';
import { BookingsComponent } from '../views/bookings/bookings.component';

import { PopupLayoutsComponent } from '../views/popup-layouts/popup-layouts.component';
import { FlightDatesComponent } from '../views/flight-dates/flight-dates.component';
import { CalendarComponent } from '../views/calendar/calendar.component';

import { ProgressModule } from '@ng-libraries/progress';
import { UtilityModule } from '@ng-libraries/utility';


import { Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    swipe: { direction: Hammer.DIRECTION_ALL },
    // 'pinch': { enable: false },
    // 'rotate': { enable: false }
  };
}

const entryComponents: any[] = [];

const declarations: any[] = [
  // Component
  BootstrapComponent,
  FlightsComponent,
  HomeComponent,
  ViewDetailContainerComponent,
  FlightDetailsComponent,
  SortFilterComponent,
  FareDetailsComponent,
  BookingsComponent,
  PopupLayoutsComponent,
  FlightDatesComponent,
  CalendarComponent,
  SortFilterComponent,
  FlightsComponent,

  ...entryComponents,

  // Pipe

  // Directive
];

const imports: any[] = [
  BrowserModule,
  HttpClientModule,
  BrowserAnimationsModule,
  FormsModule,
  FontAwesomeModule,
  HammerModule,
  MatDialogModule,
  MatButtonModule,
  MatRadioModule,
  MatRippleModule,
  MatExpansionModule,
  MatSlideToggleModule,
  MatBadgeModule,
  MatFormFieldModule,
  MatInputModule,
  LayoutModule,
  NouisliderModule,
  ProgressModule,
  UtilityModule,
];

const exports: any[] = [...imports, ...declarations];

const providers: any[] = [
  {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig,
  },
];

@NgModule({
  declarations,
  imports,
  exports,
  entryComponents,
  providers,
  bootstrap: [BootstrapComponent],
})
export class AppModule {

  isSmallDevice: boolean = false;
  scrollSlementId: string = "scrollaaaaa";

  constructor(
    private breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) private document: Document
  ) {

    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
    .subscribe(
      () =>
      {

        if(breakpointObserver.isMatched(Breakpoints.Small) || breakpointObserver.isMatched(Breakpoints.XSmall)) {
          this.isSmallDevice = true;
          this.loadScrollTheme();
        }else{
          this.isSmallDevice = false;
          this.loadScrollTheme();
        }

      }
   );

  }

  loadScrollTheme() {
    const headElement = this.document.getElementsByTagName("head")[0];
    const isUserCssElementExisting = this.document.getElementById(this.scrollSlementId) as HTMLLinkElement;

    if (isUserCssElementExisting && !this.isSmallDevice){
      // this.document.removeChild(isUserCssElementExisting);
      headElement.removeChild(isUserCssElementExisting);
      console.log('removeChild');
      return;
    }

    if (!isUserCssElementExisting && this.isSmallDevice){
      console.log('appendChild');
      const userCssElement = this.document.createElement("link");
      userCssElement.id = this.scrollSlementId;
      userCssElement.rel = "stylesheet";
      userCssElement.href = "scrollbar.css";
      headElement.appendChild(userCssElement);
    }




  }

}
