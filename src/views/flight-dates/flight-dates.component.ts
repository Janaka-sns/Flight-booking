import { Component, OnInit, Input, HostListener, ElementRef, ViewChild, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BookingRequest } from '@app/models';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { DateType } from '@app/enums';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'flight-dates',
  templateUrl: './flight-dates.component.html',
  styleUrls: ['./flight-dates.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FlightDatesComponent implements OnInit {

  @ViewChild('DateContainer')
  private mainElementRef: ElementRef = undefined!;

  @ViewChild('SelectedDateContainer')
  private selectedDateContainerRef: ElementRef = undefined!;

  @Input()
  bookingRequest: BookingRequest = undefined!;

  @Input()
  selectedDateType: DateType = DateType.DEPARTURE;

  @Output()
  dateSelected: EventEmitter<null> = new EventEmitter<null>();

  dayOfWeeks: string[] = ["Mo","Tu","We","Th","Fr","Sa","Su"]
  closeIcon = faTimes;
  DateType = DateType;
  calendarContainerHeight: number = 0;

  flightsDates: any;

  monthStartDates: number[] = [];

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.calculatecontainerWidth();
  }

  constructor(private flightsService: FlightsService) {}

  ngOnInit() {
    this.flightsService.getAvailableDates().subscribe(
      flightsDates => this.flightsDates = flightsDates
    )

    if (!this.bookingRequest.departureDate) {
      setTimeout(() => {
        this.flightsDates.CalenderResponse.Departure.Month.find(
          month => {
            this.bookingRequest.departureDate = new Date(20+month.YY,month.MM - 1,month.DTE[0].DD,0,0,0,0).getTime();
            this.initDates();
            return true;
          }
        )
      }, 0);
    }else{
      this.initDates();
    }

    setTimeout(() => {
      this.calculatecontainerWidth();
    }, 0);

  }

  toggleSelectedDate(dateType: DateType) {

    if (this.selectedDateType == dateType) {
      return;
    }

    if (this.bookingRequest.returnDate == undefined && dateType == DateType.RETURN) {
      const departureDate: number = new Date(this.bookingRequest.departureDate).getTime();
      this.flightsDates.CalenderResponse.Return.Month.find(
        month => {
          let mon = month.DTE.find(
            dd => {
              if (departureDate <= new Date(20+month.YY,month.MM - 1,dd.DD,23,59,59,999).getTime()) {
                this.bookingRequest.returnDate = new Date(20+month.YY,month.MM - 1,dd.DD,23,59,59,999).getTime();
                return true;
              }
            }
          )
          return mon ? true : false;
        }
      )
    }

    this.selectedDateType = this.selectedDateType == DateType.DEPARTURE ? DateType.RETURN : DateType.DEPARTURE;
  }

  clearReturnDate(event : Event) {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.bookingRequest.returnDate = undefined!;
    this.toggleSelectedDate(DateType.DEPARTURE);
  }

  addRetunDate() {
    this.selectedDateType = DateType.RETURN;
    let retunDate : Date = new Date(this.bookingRequest.departureDate)
    retunDate.setDate(retunDate.getDate() + 2)
    this.bookingRequest.returnDate = retunDate.getTime();
  }

  private getMonthDiff(date: number): number {
    const fromDate: Date = new Date(new Date(date));
    const toDate: Date = new Date(fromDate);
    toDate.setDate(fromDate.getDate() + 365);

    let monthDiff: number = 0;
    monthDiff = (toDate.getFullYear() - fromDate.getFullYear()) * 12;
    monthDiff -= fromDate.getMonth();
    // monthDiff -= fromDate.getMonth() + 1;
    monthDiff += fromDate.getMonth();

    return monthDiff <= 0 ? 0 : monthDiff;
  }

  onDateSelected(date: number) {

    if (this.selectedDateType == DateType.DEPARTURE) {
      if (date > this.bookingRequest.returnDate){
        this.bookingRequest.returnDate = undefined!;
      }
      this.bookingRequest.departureDate = date;
    }else if (this.selectedDateType == DateType.RETURN) {
      if (date < this.bookingRequest.departureDate){
        this.bookingRequest.returnDate = undefined!;
        return;
      }
      this.bookingRequest.returnDate = date;
    }
  }

  proceedSelectedDate() {
    this.dateSelected.emit();
  }

  getDepartures(monthStartDate: number) {
    const startDate : Date = new Date(monthStartDate);
    const month: string = ("0" + (startDate.getMonth() + 1)).slice(-2);
    const year: string = startDate.getFullYear().toString().substr(-2);

    return this.flightsDates.CalenderResponse.Departure.Month.filter(
      depMonth => {
        return depMonth.MM == month && depMonth.YY == year
      }
    )
  }

  getReturns(monthStartDate: number) {
    const startDate : Date = new Date(monthStartDate);
    const month: string = ("0" + (startDate.getMonth() + 1)).slice(-2);
    const year: string = startDate.getFullYear().toString().substr(-2);

    return this.flightsDates.CalenderResponse.Return.Month.filter(
      depMonth => {
        return depMonth.MM == month && depMonth.YY == year
      }
    )
  }

  private initDates() {
    if (!this.bookingRequest.returnDate) {
      this.selectedDateType = DateType.DEPARTURE;
    }
    let toDate: Date = new Date();
    for(let month = 0 ; month < this.getMonthDiff(this.bookingRequest.departureDate) ; month++) {
      toDate = new Date();
      toDate.setMonth(toDate.getMonth() + month);
      toDate.setDate(1);
      this.monthStartDates = [...this.monthStartDates, toDate.getTime()]
    }

  }

  private calculatecontainerWidth() {
    this.calendarContainerHeight = this.mainElementRef.nativeElement.getBoundingClientRect().height - (this.selectedDateContainerRef.nativeElement.getBoundingClientRect().height + 100);
  }

}
