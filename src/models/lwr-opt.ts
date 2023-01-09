import { FbaCarrList } from './fba-carr-list';
import { BndOptSumRec } from './bnd-opt-sum-rec';

export interface LwrOpt {
  lwrSeg: string;
  amt: number;
  strAmt: string;
  PrcRef: string;
  PrcRef2: string;
  SgMxRf: string;
  SgMxRf2: string;
  sgMxRf2: string;
  fbaCarrList: FbaCarrList;
  sValRFN: string;
  sValRFN2: string;
  sValCH: string;
  sValCH2: string;
  bndOptSumRec: BndOptSumRec;
  EFT: number; ///added 19 Jun @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  sValRfnH: string;
  strRefund: string; 
  strStops: string;
}