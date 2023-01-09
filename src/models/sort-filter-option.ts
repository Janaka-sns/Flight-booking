export interface SortFilterOption {
  sortyBy: string;
  stops: number;
  baggageOrRefunds : [{
    sTxt1: string,
    sTxt2: string,
    value: string,
    selected: boolean
  }]
  airlines : [{
    value: string,
    sTxt: string,
    selected: boolean
  }],
  times: [{
    sTxt: string,
    sValA: string,
    sValB: string,
    range: number[]
  }]
}
