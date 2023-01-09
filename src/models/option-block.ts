import { FbaCarrList } from './fba-carr-list';
import { LwrSegList } from './lwr-seg-list';
import { BndOptSumRec } from './bnd-opt-sum-rec';

export interface OptionBlock {
  OptBlockID: string;
  spltPrc: string;
  uprSeg: string;
  MinAmt: number;
  strMinAmt: string;
  fbaCarrList: FbaCarrList;
  lwrSegList: LwrSegList;
  bndOptSumRec: BndOptSumRec;
  //testH1: string; // comented  19Jun @@@@@@@@@@@@@@@@@@@@@@@@@ 
  EFT: number; ///added 19Jun  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  currentSectionIndex: number;
  strRefund: string;
  strStops: string;
}