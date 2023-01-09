import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faUser, faRepeat, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { BookingRequest, FlightSearchRequest, SegmentRecord, SegmentList, OptionBlockList } from '@app/models';
import { ClassType, DateType } from '@app/enums';
import { ProgressLoaderService } from "@ng-libraries/progress";

@Component({
  selector: 'bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent implements OnInit {
  calendarIcon = faCalendar;
  shiftIcon = faRepeat;
  pasengersIcon = faUser;
  closeIcon = faTimes;

  ClassType = ClassType;
  DateType = DateType;

  bookingRequest: BookingRequest = {} as BookingRequest;

  pasengers: string = '1 Adult';

  isShow: boolean = false;
  closePopup: boolean = false;
  selectedDateType: DateType = DateType.DEPARTURE;

  @Output()
  onSearchFlights : EventEmitter<OptionBlockList> = new EventEmitter<OptionBlockList>();

  constructor(private progressLoader: ProgressLoaderService,) {}

  ngOnInit() {
    this.bookingRequest.departure = 'Alma-Ata, Almaty';
    this.bookingRequest.departureCode = 'ALA';
    this.bookingRequest.destination = 'Colombo, Sri Lanka';
    this.bookingRequest.destinationCode = 'CMB';
    this.bookingRequest.classType = ClassType.ECONOMY;
  }

  shiftLocation() {
    const departure: string = this.bookingRequest.departure;
    const departureCode: string = this.bookingRequest.departureCode;
    this.bookingRequest.departure = this.bookingRequest.destination;
    this.bookingRequest.departureCode = this.bookingRequest.destinationCode;
    this.bookingRequest.destination = departure;
    this.bookingRequest.destinationCode = departureCode;
  }

  toggleClass(classType : ClassType) {
    if (this.bookingRequest.classType == classType) {
      return;
    }
    this.bookingRequest.classType = this.bookingRequest.classType == ClassType.ECONOMY ? ClassType.BUSINESS : ClassType.ECONOMY;
  }

  onFindClickHandler() {
    this.onSearchFlights.emit(null);
    // const flightSearchRequest: FlightSearchRequest = {
    //   cabinCode: "Y",
    //   countADT: 1,
    //   countINF: 1,
    //   countCHD: 1,
    //   segmentList: {
    //     segmentRecord: [
    //       {
    //         segReference: 1,
    //         departureCity: "ALA",
    //         arrivalCity: "FRA",
    //         departureDate: 150721
    //       } as SegmentRecord,
    //       {
    //         segReference: 2,
    //         departureCity: "FRA",
    //         arrivalCity: "ALA",
    //         departureDate: 310721
    //       } as SegmentRecord
    //     ]
    //   } as SegmentList
    // } as FlightSearchRequest

    // this.progressLoader.toggle(true);
    // this.flightsService.availabilitySearch(flightSearchRequest).subscribe(
    //   (optionBlockList: OptionBlockList) => {
    //     this.onSearchFlights.emit(optionBlockList);
    //     this.progressLoader.toggle(false);
    //   },
    //   error => {
    //     this.progressLoader.toggle(false);
    //   }
    // )
  }

  onClearReturnDate(event : Event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.bookingRequest.returnDate = undefined!;

  }

  onCalendarClickHandler(dateType: DateType) {
    this.selectedDateType = dateType;
    this.isShow = true;
  }
}
