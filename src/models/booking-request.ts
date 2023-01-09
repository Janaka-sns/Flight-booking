import { ClassType } from "@app/enums";

export interface BookingRequest {
  departure: string;
  departureCode: string;
  destination: string;
  destinationCode: string;
  departureDate: number;
  returnDate: number;
  classType: ClassType;
}
