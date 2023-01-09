import { FFnR } from "./ff-nr";

export interface FareGroup {
  fareGrpID: string;
  segBound1: string;
  segBound2: string;
  FFnR: FFnR[];
}
