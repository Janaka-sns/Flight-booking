import { Injectable } from '@angular/core';
import { RestService } from '@ng-libraries/utility';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { FlightSearchRequest } from '../models/flight-search-request';
import { OptionBlockList } from "../models";

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(
    private restService: RestService,
  ) {
  }

  availabilitySearch(flightSearchRequest: FlightSearchRequest): Observable<OptionBlockList> {
    const headers: HttpHeaders = new HttpHeaders();
    const params: HttpParams = new HttpParams();
    const httpOptions = {
      params,
      headers
    }

    return this.restService.post<OptionBlockList>(`https://extwebapi20210510214341.azurewebsites.net/api/Availability/TravelSearch`, flightSearchRequest, httpOptions)
  }

getMonhs() {
  const amountArry: string[] = ["1,200","1,300","1,400","1,500"];

  let toDay: Date = new Date();
  let toDate: Date = new Date();
  let DepartureMonths: any[] = [];

  let returnObject : any = new Object();

  for(let month = 0 ; month < 12 ; month++) {
    toDate = new Date();
    toDate.setMonth(toDate.getMonth() + month);
    toDate.setDate(1);
    if (toDay.getMonth() == toDate.getMonth() && toDay.getFullYear() == toDate.getFullYear() ) {
      toDate.setDate(toDay.getDate());
    }

    let Month: any = new Object();
    Month.MM = String(toDate.getMonth()+1).padStart(2, '0');
    Month.YY = toDate.getFullYear().toString().substr(-2);
    Month.DTE = [];

    let lastDay = new Date(toDate.getFullYear(), toDate.getMonth() + 1, 0);

    for (let day = toDate.getDate() ; day <= lastDay.getDate() ; day++) {
      const randomAmtIndex: number = Math.floor(Math.random() * ((amountArry.length-1) - 0 + 1) + 0)
      let Day: any = new Object();
      Day.DD = String(day).padStart(2, '0');
      Day.AMT = amountArry[randomAmtIndex];
      if (0 == randomAmtIndex) {
        Day.Min = "Y";
      }
      Month.DTE = [...Month.DTE , Day];
    }

    for (let index = 0 ; index <= 5 ; index++) {
      const randomIndex: number =  Math.floor(Math.random() * (Month.DTE.length - 0 + 1) + 0)
      Month.DTE.splice(randomIndex, 1);
    }

    DepartureMonths = [...DepartureMonths , Month];

  }
  return DepartureMonths;
}

  getAvailableDates(): Observable<any> {

    let returnObject : any = new Object();

    returnObject.CalenderResponse = new Object();
    returnObject.CalenderResponse.Departure = new Object();
    returnObject.CalenderResponse.Departure.Month = this.getMonhs()

    returnObject.CalenderResponse.Return = new Object();
    returnObject.CalenderResponse.Return.Month = this.getMonhs()

    return of(returnObject)

  }
}
