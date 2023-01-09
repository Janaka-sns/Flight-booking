import { FareRec } from "./fare-rec";

export interface FFnR {
  FFName: string;
  TotalAmt: string;
  grpID: string;
  ffID: string;
  mnrID: string;
  fbaID: string;
  prcID: string;
  isItemSelected: string;
  FareRec: FareRec[];
}
