import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookingRequest } from '@app/models';
import { DatePipe } from '@angular/common';
import { DateType } from '@app/enums';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DatePipe],
})
export class CalendarComponent implements OnInit {

  @Input()
  bookingRequest: BookingRequest = undefined!;

  @Input()
  date: number = 0;

  @Input()
  departures: any;

  @Input()
  returns: any;

  @Input()
  selectedDateType: DateType = DateType.DEPARTURE;

  @Output()
  dateSelected: EventEmitter<number> = new EventEmitter<number>();

  dayOfWeeks: string[] = ["Mo","Tu","We","Th","Fr","Sa","Su"]
  datesOfMoth: number[] = [];
  DateType = DateType;

  currentDate: Date = undefined!;
  currentMonth: String = undefined!;
  firstAvailableDate: number = 0;
  firstDay: Date = undefined!;
  lastDay : Date = undefined!;
  isCurrentMonth: boolean = false;

  departureFlight:any;
  returnFlight:any;

  constructor(private datePipe: DatePipe,) { }

  ngOnInit() {

    this.currentDate = new Date(this.date);
    this.isCurrentMonth = this.currentDate.getMonth() == (new Date()).getMonth();
    if (this.isCurrentMonth) {
      this.firstAvailableDate = (new Date()).getDate();
    }

    this.firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    this.lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);

    const firstDayOfMonth: number = this.firstDay.getDay() - 1 >= 0 ? this.firstDay.getDay() - 1 : 6;
    const firstDay: string = this.dayOfWeeks[firstDayOfMonth];

    for(let prevDates = 0 ; prevDates < this.dayOfWeeks.findIndex(dow => dow == firstDay) ; prevDates++) {
      this.datesOfMoth = [...this.datesOfMoth , 0]
    }

    for(let dateOfMonth = 0 ; dateOfMonth < this.lastDay.getDate() ; dateOfMonth++) {
      this.datesOfMoth = [...this.datesOfMoth , (dateOfMonth + 1)]
    }

    this.currentMonth = this.datePipe.transform(this.currentDate,"-MM-YYYY");

  }

  isActiveDepartureDate(day: number): boolean {
    if (day == 0) {
      return false;
    }

    const currentDate : Date = new Date(this.date);
    currentDate.setDate(day)

    const departureDate: Date = new Date(this.bookingRequest.departureDate);
    const returnDate: Date = new Date(this.bookingRequest.returnDate);
    if (
      returnDate.getDay() == departureDate.getDay() &&
      returnDate.getDate() == departureDate.getDate() &&
      returnDate.getMonth() == departureDate.getMonth() &&
      returnDate.getFullYear() == departureDate.getFullYear()) {
      return false;
    }
    const isActive: boolean = (currentDate.getDay() == departureDate.getDay() && currentDate.getDate() == departureDate.getDate() && currentDate.getMonth() == departureDate.getMonth() && currentDate.getFullYear() == departureDate.getFullYear())
    return isActive;
  }

  isActiveRetundDate(day: number): boolean {
    if (day == 0) {
      return false;
    }

    const currentDate : Date = new Date(this.date);
    currentDate.setDate(day)

    const departureDate: Date = new Date(this.bookingRequest.departureDate);
    const returnDate: Date = new Date(this.bookingRequest.returnDate);
    if (
      returnDate.getDay() == departureDate.getDay() &&
      returnDate.getDate() == departureDate.getDate() &&
      returnDate.getMonth() == departureDate.getMonth() &&
      returnDate.getFullYear() == departureDate.getFullYear()) {
      return false;
    }
    const isActive: boolean = (currentDate.getDay() == returnDate.getDay() && currentDate.getDate() == returnDate.getDate() && currentDate.getMonth() == returnDate.getMonth() && currentDate.getFullYear() == returnDate.getFullYear())
    return isActive;
  }

  isActiveSelectedDate(day: number): boolean {
    if (day == 0) {
      return false;
    }

    const currentDate : Date = new Date(this.date);
    currentDate.setDate(day)

    const departureDate: Date = new Date(this.bookingRequest.departureDate);
    const returnDate: Date = new Date(this.bookingRequest.returnDate);

    const isActive: boolean = ((currentDate.getDay() == departureDate.getDay() && currentDate.getDate() == departureDate.getDate() && currentDate.getMonth() == departureDate.getMonth() && currentDate.getFullYear() == departureDate.getFullYear()) ||
        (currentDate.getDay() == returnDate.getDay() && currentDate.getDate() == returnDate.getDate() && currentDate.getMonth() == returnDate.getMonth() && currentDate.getFullYear() == returnDate.getFullYear())) &&
        (returnDate.getDay() == departureDate.getDay() &&
          returnDate.getDate() == departureDate.getDate() &&
          returnDate.getMonth() == departureDate.getMonth() &&
          returnDate.getFullYear() == departureDate.getFullYear());
    return isActive;
  }

  isActiveDatePeriod(day: number): boolean {
    if (day == 0 || this.bookingRequest.departureDate == undefined || this.bookingRequest.returnDate == undefined) {
      return false;
    }

    const currentDate : Date = new Date(this.date);
    currentDate.setDate(day);

    const departureDate: Date = new Date(this.bookingRequest.departureDate);
    const returnDate: Date = new Date(this.bookingRequest.returnDate);

    return currentDate > departureDate && currentDate < returnDate;
  }

  onDateSelect(day: number) {
    this.currentDate.setDate(day);
    this.dateSelected.emit(this.currentDate.getTime());

  }

  hasDepartureFlights(day : string) {
    if (this.departures.length == 0) {
      return null;

    }
    this.departureFlight = this.departures[0].DTE.find(date => date.DD == day);
  }

  hasReturnFlights(day : string) {
    if (this.returns.length == 0) {
      return null;

    }
    this.returnFlight = this.returns[0].DTE.find(date => date.DD == day);
  }

}
