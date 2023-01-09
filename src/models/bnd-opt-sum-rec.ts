import { MktList } from './mkt-list';

export interface BndOptSumRec {
  bndRef: string;
  fltOpt: string;
  depCityF: string;
  arvCityL: string;
  dtfDep: any;
  dtlArv: any;
  depDteF: string;
  depDteFStr: string;
  depTimeF: string;
  arvDteL: string;
  arvDteLStr: string;
  arvTimeL: string;
  stpCount: number;
  stpTxt: string;
  fltDur: number;
  fltDurStr: string;
  mktLst: MktList;
}