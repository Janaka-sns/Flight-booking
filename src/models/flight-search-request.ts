import { SegmentList } from "./segment-list";

export interface FlightSearchRequest {
  cabinCode: string;
  countADT: number;
  countINF: number;
  countCHD: number;
  segmentList: SegmentList;
}
