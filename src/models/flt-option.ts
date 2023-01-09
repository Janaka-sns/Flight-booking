import { LegList } from "./leg-list";

export interface FltOption {
  boundRef:	string;
  fltPropID:	string;
  eft: number;
  strEft: string;
  mcx: string;
  stops: number;
  legList: LegList;
}
