import {
  OptionBlockList,
  OptionBlock,
  LwrSegList,
  LwrOpt,
  DistinctAirlines,
  FltOption,
  FltOptionList,
  BndLegFBAList,
  BndLegFBA,
  DistBoundFltProp,
  LegList,
  LegRec,
  FareGroupList,
  FareGroup,
  FareRec,
  FFnR,
} from "../models";

export class TravelOptions {

  constructor() {
  }

  generateDisplayTravelOptions(
    data: any,
    {
      qryStops = 9, /// @@@@ values =  {null, 0, 1, 2, 3, 9}    1; // Filter parameter for Number of Stops. For the initial load qryStops = null
      qryFBA = null, /// @@@  values = { null, 'B'} 
      qryRFND = null, //// Added 06 Jun @@@@@@@@@@   values = {null, 'R'}
      qryPrefCarrArr = [], //// Added 06 Jun @@@@@@@@@@ e.g. ['EK', 'SU']
      qryTimeB1Dep = [0,24], //// Added 06 Jun @@@@@@@@@@ 
      qryTimeB1Arv = [0,24], //// Added 06 Jun @@@@@@@@@@
      qryTimeB2Dep = [0,24], //// Added 06 Jun @@@@@@@@@@
      qryTimeB2Arv = [0,24], //// Added 06 Jun @@@@@@@@@@
      //qryPrefCarrList = null,   //// comented 06 Jun @@@@@@@@@@
      //qryDateTimeFirstDepB1 = null, //// comented 06 Jun @@@@@@@@@@
      //qryDateTimeFirstDepB2 = null, //// comented 06 Jun @@@@@@@@@@
      //qryDateTimeLastArvB1 = null, //// comented 06 Jun @@@@@@@@@@
      //qryDateTimeLastArvB2 = null, //// comented 06 Jun @@@@@@@@@@
      sortByParam = 'P' //// Updated 'D' 06 Jun @@@@@@@@@@ Values = {'P', 'D'}
    }: {
      qryStops?: number,
      qryFBA?: string,
      qryRFND?: string, //// Added 06 Jun @@@@@@@@@@
      qryPrefCarrArr?: string[],  //// Added 06 Jun @@@@@@@@@@
      qryTimeB1Dep?: number[],  //// Added 06 Jun @@@@@@@@@@
      qryTimeB1Arv?: number[],  //// Added 06 Jun @@@@@@@@@@
      qryTimeB2Dep?: number[],  //// Added 06 Jun @@@@@@@@@@
      qryTimeB2Arv?: number[],  //// Added 06 Jun @@@@@@@@@@
      //qryPrefCarrList?: string, //// comented 06 Jun @@@@@@@@@@
      //qryDateTimeFirstDepB1?: string,  //// comented 06 Jun @@@@@@@@@@
      //qryDateTimeFirstDepB2?: string, //// comented 06 Jun @@@@@@@@@@
      //qryDateTimeLastArvB1?: string, //// comented 06 Jun @@@@@@@@@@
      //qryDateTimeLastArvB2?: string, //// comented 06 Jun @@@@@@@@@@
      sortByParam?: string
    }

  ): OptionBlockList {

    // console.log('qryStops',qryStops);
    // console.log('qryFBA',qryFBA);
    // console.log('qryRFND',qryRFND);
    // console.log('qryPrefCarrArr',qryPrefCarrArr);
    // console.log('sortByParam',sortByParam);
    // console.log('qryTimeB1Dep',qryTimeB1Dep);
    // console.log('qryTimeB1Arv',qryTimeB1Arv);
    // console.log('qryTimeB2Dep',qryTimeB2Dep);
    // console.log('qryTimeB2Arv',qryTimeB2Arv);
    

    //@@@@@@@@@@@@@@@@ New from here 06 Jun
    let prefCarrList : string; 
    prefCarrList = '';

    if (qryPrefCarrArr != null)
    {
        prefCarrList = '';
        qryPrefCarrArr.forEach
        (
            elmQryPrefCarrArr =>{ prefCarrList = prefCarrList + '_' + qryPrefCarrArr }
        )
    };    
    ///@@@@@@@@@@@@@@@@@@ new upto here 06 Jun

    let inTvlOptions = data.optionBlockList.optionBlock;
    let inSummaryTvlOptions = data.bndOptSummaryRecList.bndOptSumRec;
    let qtyBounds = data.boundCount;
    let strFareCurr = data.fareCurr;
    let inStrStops = ' ' + data.dictionary.constTxt.stpS;
    let inStrOneStop = ' ' + data.dictionary.constTxt.stp;
    let inStrDirect = data.dictionary.constTxt.direct;
    let inStrRefunds = data.dictionary.constTxt.rfnds;

    let countSelectionsVal = 0; //// @@@@@@@@@@@@@@@@  added 20 JUN for sort and filter

    if (qryStops == 0) { inSummaryTvlOptions = inSummaryTvlOptions.filter(a => a.stpCount == 0) };
    if (qryStops == 1) { inSummaryTvlOptions = inSummaryTvlOptions.filter(a => (a.stpCount == 0) || (a.stpCount == 1)) };

    /// @@@@@@@@@@@@@@@@@@@@@ add from here NEW 19JUN
    if (qryStops == 2){ inSummaryTvlOptions = inSummaryTvlOptions.filter(a => (a.stpCount == 0) || (a.stpCount == 1) || (a.stpCount == 2))}; //// @@@@@ ADDED 06JUN
    
    if (qtyBounds == 2)
    {
        var inSummaryTvlOptions1 = inSummaryTvlOptions.filter
        (a => 
            ( 
                //(a.bndRef === '1' &&  new Date(a.dtfDep).getHours() >= qryTimeB1Dep[0]) && (a.bndRef === '1' &&  new Date(a.dtfDep).getHours() <= qryTimeB1Dep[1]) &&
                //(a.bndRef === '1' &&  new Date(a.dtlArv).getHours() >= qryTimeB1Arv[0]) && (a.bndRef === '1' &&  new Date(a.dtlArv).getHours() <= qryTimeB1Arv[1]) 
                
                a.bndRef === '1' &&
                new Date(a.dtfDep).getHours() >= qryTimeB1Dep[0] &&
                new Date(a.dtfDep).getHours() <= qryTimeB1Dep[1] &&
                new Date(a.dtlArv).getHours() >= qryTimeB1Arv[0] &&
                new Date(a.dtlArv).getHours() <= qryTimeB1Arv[1]

            ) 
        );

        var inSummaryTvlOptions2 = inSummaryTvlOptions.filter
        (a => 
            ( 
                //(a.bndRef === '2' &&  new Date(a.dtlArv).getHours() >= qryTimeB2Arv[0]) && (a.bndRef === '2' &&  new Date(a.dtlArv).getHours() <= qryTimeB2Arv[1]) &&  
                //(a.bndRef === '2' &&  new Date(a.dtfDep).getHours() >= qryTimeB2Dep[0]) && (a.bndRef === '2' &&  new Date(a.dtfDep).getHours() <= qryTimeB2Dep[1]) 
                
                a.bndRef === '2' &&
                new Date(a.dtlArv).getHours() >= qryTimeB2Arv[0] &&
                new Date(a.dtlArv).getHours() <= qryTimeB2Arv[1] &&
                new Date(a.dtfDep).getHours() >= qryTimeB2Dep[0] &&
                new Date(a.dtfDep).getHours() <= qryTimeB2Dep[1]

            ) 
        );

        inSummaryTvlOptions = inSummaryTvlOptions1.concat(inSummaryTvlOptions2);

    }
    else
    {
        inSummaryTvlOptions = inSummaryTvlOptions.filter
        (a => 
            ( 
                (a.bndRef === '1' &&  new Date(a.dtfDep).getHours() >= qryTimeB1Dep[0]) && (a.bndRef === '1' &&  new Date(a.dtfDep).getHours() <= qryTimeB1Dep[1]) &&
                (a.bndRef === '1' &&  new Date(a.dtlArv).getHours() >= qryTimeB1Arv[0]) && (a.bndRef === '1' &&  new Date(a.dtlArv).getHours() <= qryTimeB1Arv[1])
            ) 
        );
    }

    
    /// @@@@@@@@@@@@@@@@@@ add upto here NEW 19JUN

    let genDistinctAirlines = {} as DistinctAirlines;
    genDistinctAirlines.distCarrier = [];

    let displayOptionsList = {} as OptionBlockList; //// THIS IS THE OUTPUT OF THIS SCRIPT WHICH SHOULD BE USED FOR THE DIPSLAY OBJECT
    displayOptionsList.OptionBlock = [];

    inTvlOptions.forEach
    (elmInTvlOptions => {

        let indexSummaryTvlOption = inSummaryTvlOptions.findIndex(o => o.bndRef === '1' && o.fltOpt === elmInTvlOptions.uprSeg)

        let tmpOptionBlock = {} as OptionBlock;
        tmpOptionBlock.lwrSegList = {} as LwrSegList;

        tmpOptionBlock.lwrSegList.lwrOpt = [];
        tmpOptionBlock.OptBlockID = elmInTvlOptions.optBlockID;
        tmpOptionBlock.spltPrc = elmInTvlOptions.spltPrc;
        tmpOptionBlock.uprSeg = elmInTvlOptions.uprSeg;
        tmpOptionBlock.MinAmt = elmInTvlOptions.minAmt;
        tmpOptionBlock.strMinAmt = elmInTvlOptions.strMinAmt;
        tmpOptionBlock.fbaCarrList = elmInTvlOptions.fbaCarrList;

        let okCarrierS1 = true;
        let okFBAS1 = true;

        if (qryFBA != null) {
          elmInTvlOptions.fbaCarrList.fbaCarr.forEach
            (elmFba => {
              if (elmFba.sfb === 'N') { okFBAS1 = false };
            }
            )
        };

        if (indexSummaryTvlOption > -1) {
          tmpOptionBlock.bndOptSumRec = inSummaryTvlOptions[indexSummaryTvlOption];
          tmpOptionBlock.EFT = tmpOptionBlock.bndOptSumRec.fltDur;    ////added 19 Jun @@@@@@@@@@@@@@@@@@@@

          tmpOptionBlock.bndOptSumRec.mktLst.mktAL.forEach
          (elmMktAL => 
            {
              if (genDistinctAirlines.distCarrier.findIndex(o => o === elmMktAL) == -1) { genDistinctAirlines.distCarrier.push(elmMktAL); };

              /// Updated from here @@@
              if (prefCarrList.length>1)  
              {
                if (!prefCarrList.includes(elmMktAL))
                {okCarrierS1 = false;};
              }
              /// Updated upto here @@@

            }
          );

          if (tmpOptionBlock.bndOptSumRec.stpCount = 0){tmpOptionBlock.strStops = inStrDirect } //// addded @@@@@@@@@@@@@@
          else if (tmpOptionBlock.bndOptSumRec.stpCount = 1){tmpOptionBlock.strStops = inStrOneStop } //// addded @@@@@@@@@@@@@@
          else {tmpOptionBlock.strStops = inStrStops }; //// addded @@@@@@@@@@@@@@

        };

        tmpOptionBlock.strRefund = inStrRefunds;
        //commented @@@@@@@ if (tmpOptionBlock.bndOptSumRec.stpCount = 0) { tmpOptionBlock.strStops = inStrDirect }
        //commented @@@@@@@ else if (tmpOptionBlock.bndOptSumRec.stpCount = 1) { tmpOptionBlock.strStops = inStrOneStop }
        //commented @@@@@@@ else { tmpOptionBlock.strStops = inStrStops };

        let tmpseg2Count = 0;


        if (okFBAS1 == true && okCarrierS1 == true) {
          elmInTvlOptions.lwrSegList.lwrOpt.forEach
            (elmBnd2Opt => {
              if (qtyBounds > 1) 
               //// comented @@@@@ { indexSummaryTvlOption = inSummaryTvlOptions.findIndex(o => o.bndRef === '2' && o.fltOpt === elmBnd2Opt.lwrSeg) }
               {var indexSummaryTvlOption2 = inSummaryTvlOptions.findIndex( o => o.bndRef === '2' && o.fltOpt ===  elmBnd2Opt.lwrSeg  )} /// Added @@@@
              else 
               //// comented @@@@@ { indexSummaryTvlOption = inSummaryTvlOptions.findIndex(o => o.bndRef === '1' && o.fltOpt === elmBnd2Opt.lwrSeg) };
               {var indexSummaryTvlOption2 = inSummaryTvlOptions.findIndex( o => o.bndRef === '1' && o.fltOpt ===  elmBnd2Opt.lwrSeg  )}; /// added @@@@@

              let okFBAS2 = true;
              let okCarrierS2 = true;

              if (qryFBA != null) {
                elmBnd2Opt.fbaCarrList.fbaCarr.forEach
                  (elmFba => {
                    if (elmFba.sfb === 'N') { okFBAS2 = false };
                  }
                  )
              };

              // comented @@@@@ if (indexSummaryTvlOption > -1 && okFBAS2 === true) 
              if ( indexSummaryTvlOption2 > -1 && okFBAS2 === true)
              {
                let tmpBnd2Opt = {} as LwrOpt;



                tmpBnd2Opt.lwrSeg = elmBnd2Opt.lwrSeg;
                tmpBnd2Opt.amt = elmBnd2Opt.amt;
                tmpBnd2Opt.strAmt = elmBnd2Opt.strAmt; //// ************
                tmpBnd2Opt.PrcRef = elmBnd2Opt.prcRef;
                tmpBnd2Opt.PrcRef2 = elmBnd2Opt.prcRef2;
                tmpBnd2Opt.SgMxRf = elmBnd2Opt.sgMxRf;
                tmpBnd2Opt.fbaCarrList = elmBnd2Opt.fbaCarrList;
                tmpBnd2Opt.sValRfnH = elmBnd2Opt.sValRfnH;
                tmpBnd2Opt.sValRFN = elmBnd2Opt.sValRFN;
                tmpBnd2Opt.sValRFN2 = elmBnd2Opt.sValRFN2;

                // comented @@@@@@  tmpBnd2Opt.bndOptSumRec = inSummaryTvlOptions[indexSummaryTvlOption];
                tmpBnd2Opt.bndOptSumRec =  inSummaryTvlOptions[indexSummaryTvlOption2]; //// add @@@@@@@@@@@@@@@@@@@ 
                tmpBnd2Opt.EFT = tmpBnd2Opt.bndOptSumRec.fltDur;            //// add @@@@@@@@@@@@@@@@@@@   

                tmpBnd2Opt.bndOptSumRec.mktLst.mktAL.forEach
                  (elmMktAL => {
                    if (genDistinctAirlines.distCarrier.findIndex(o => o === elmMktAL) == -1) { genDistinctAirlines.distCarrier.push(elmMktAL); };

                    /// Updated from here @@@
                    if (prefCarrList.length > 1)
                    {
                        if (!prefCarrList.includes(elmMktAL))
                        {okCarrierS2 = false;};
                    };
                    // Updated upto here @@@@

                  }
                  );

                tmpBnd2Opt.strRefund = inStrRefunds;
                if (tmpBnd2Opt.bndOptSumRec.stpCount = 0) { tmpBnd2Opt.strStops = inStrDirect }
                else if (tmpBnd2Opt.bndOptSumRec.stpCount = 1) { tmpBnd2Opt.strStops = inStrOneStop }
                else { tmpBnd2Opt.strStops = inStrStops };

                if (qryRFND === 'R'){var okRfnd = false}////Add @@@@@@@@@@@@@@@
                else {okRfnd = true};    ////Add @@@@@@@@@@@@@@@

                if (tmpBnd2Opt.sValRfnH != 'X' && tmpBnd2Opt.sValRFN != 'X' && tmpBnd2Opt.sValRFN2 != 'X' && qryRFND === 'R'){ okRfnd = true} ////Add @@@@@@@@@@@@@@@

                if (okCarrierS2 == true && okRfnd == true)  //modified @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                {
                    if (tmpBnd2Opt.amt < tmpOptionBlock.MinAmt)         //// Add @@@@@@@@@@@@@@@@
                    {                                                   //// Add @@@@@@@@@@@@@@@@
                        tmpOptionBlock.strMinAmt = tmpBnd2Opt.strAmt;    //// Add @@@@@@@@@@@@@@@@
                        tmpOptionBlock.MinAmt = tmpBnd2Opt.amt;         //// Add @@@@@@@@@@@@@@@@
                    };                                                  //// Add @@@@@@@@@@@@@@@@

                    tmpOptionBlock.lwrSegList.lwrOpt.push(tmpBnd2Opt);
                    countSelectionsVal = countSelectionsVal + 1; //// @@@@@@@@@@@@@@@@  added 20 JUN for sort and filter
                    tmpseg2Count = tmpseg2Count + 1;
                };

              };

            }

            );
        };


        /// comnted @@@@ tmpOptionBlock.lwrSegList.lwrOpt = tmpOptionBlock.lwrSegList.lwrOpt.sort((a, b) => (a.amt > b.amt) ? -1 : ((b.amt > a.amt) ? 1 : 0));

        /// comnted @@@@ if (tmpseg2Count > 0) {
          /// comnted @@@@ displayOptionsList.OptionBlock.push(tmpOptionBlock);
        /// comnted @@@@};

        //////////// Added from here @@@@@@@@@@@@@@@@@@@@@@@@@@@@
        if (sortByParam === 'D')
        {tmpOptionBlock.lwrSegList.lwrOpt = tmpOptionBlock.lwrSegList.lwrOpt.sort((a,b) => (a.EFT > b.EFT) ? 1 : ((b.EFT > a.EFT) ? -1 : 0))}
        else 
        {tmpOptionBlock.lwrSegList.lwrOpt = tmpOptionBlock.lwrSegList.lwrOpt.sort((a,b) => (a.amt > b.amt) ? 1 : ((b.amt > a.amt) ? -1 : 0))};
        
        if (tmpseg2Count > 0 && indexSummaryTvlOption > -1 && qtyBounds == 2)   
        {
            displayOptionsList.OptionBlock.push(tmpOptionBlock)
        }
        else if (tmpseg2Count > 0  && qtyBounds == 1)
        {
            displayOptionsList.OptionBlock.push(tmpOptionBlock)
        };

          //////////// Added upto here @@@@@@@@@@@@@@@@@@@@@@@@@@@@


      }


    )

          //////////// Add from here @@@@@@@@@@@@@@@@@@@@@@@@@@@@
    if (sortByParam === 'D' && qtyBounds == 2)
    {displayOptionsList.OptionBlock = displayOptionsList.OptionBlock.sort((a,b) => (a.EFT > b.EFT) ? 1 : ((b.EFT > a.EFT) ? -1 : 0))}
    else 
    {displayOptionsList.OptionBlock = displayOptionsList.OptionBlock.sort((a,b) => (a.MinAmt > b.MinAmt) ? 1 : ((b.MinAmt > a.MinAmt) ? -1 : 0))};
    ////// @@@@@@@@@@@@@@@@@   Add upto here

    displayOptionsList.countSelections =  countSelectionsVal; //// @@@@@@@@@@@@@@  Added on 20 Jun for sort and filter
    
    return displayOptionsList;
  }

  generateDisplayFltDetailsList(optionBlock: OptionBlock, optionIndex: number, data: any): FltOptionList {

    let qryBound1fltPropID = optionBlock.uprSeg
    let qryBound2fltPropID = optionBlock.lwrSegList.lwrOpt[optionIndex].lwrSeg
    let qryPrcRef = optionBlock.lwrSegList.lwrOpt[optionIndex].PrcRef
    let qryPrcRef2 = optionBlock.lwrSegList.lwrOpt[optionIndex].PrcRef2
    let qrySegMixRef = optionBlock.lwrSegList.lwrOpt[optionIndex].SgMxRf
    let qrySegMixRef2 = optionBlock.lwrSegList.lwrOpt[optionIndex].SgMxRf2


    // data is the response from the REST API    

    let inFltOption = data.fltOptionList.fltOption;
    let qtyBounds = data.boundCount;
    let inPrcItemList = data.prcItemList;
    let inFbaCoverageList = data.fbaCoverageList;
    let inFbaDetailsRecList = data.fbaDetailsRecList;
    let inListAptRecs = data.dictionary.aptRecs.apt;
    let inListAirlineRecs = data.dictionary.airlineRecs.airline;
    let inTxtConst = data.dictionary.constTxt

    if (qtyBounds == 1)  /// added @@@@@@
    {  /// added @@@@@@
      qryBound1fltPropID = qryBound2fltPropID; /// added @@@@@@
      qryBound2fltPropID = null; /// added @@@@@@
    }; /// added @@@@@@

    let displayFltDetailsList = {} as FltOptionList; // displayFltDetailsList is the output to be used for Flight Details screen


    displayFltDetailsList.strBound1Orgin = data.dictionary.bound1Orgin;
    displayFltDetailsList.strBound1Dest = data.dictionary.bound1Dest;
    displayFltDetailsList.strBound2Orgin = data.dictionary.bound2Orgin;
    displayFltDetailsList.strBound2Dest = data.dictionary.bound2Dest;
    displayFltDetailsList.strTvlTime = data.dictionary.constTxt.tvlTime;
    displayFltDetailsList.strBgs = data.dictionary.constTxt.bgs;
    //displayFltDetailsList.strTransf = data.dictionary.constTxt.transf;
    //displayFltDetailsList.strOprby = data.dictionary.constTxt.oprBy;

    displayFltDetailsList.fltOption = [];

    let arrBoundDistFltProp: DistBoundFltProp[] = [];

    if (qryBound1fltPropID != null) {
      let tmpBoundDistFltProp = {} as DistBoundFltProp;
      tmpBoundDistFltProp.bound = '1';
      tmpBoundDistFltProp.fltPropID = qryBound1fltPropID;
      arrBoundDistFltProp.push(tmpBoundDistFltProp);
    }

    if (qryBound2fltPropID != null) {
      let tmpBoundDistFltProp = {} as DistBoundFltProp;
      tmpBoundDistFltProp.bound = '2';
      tmpBoundDistFltProp.fltPropID = qryBound2fltPropID;
      arrBoundDistFltProp.push(tmpBoundDistFltProp);
    }

    arrBoundDistFltProp.forEach
      (elmBoundDistFltProp => {
        let tmpfltOption1 = inFltOption.filter(o => o.boundRef === elmBoundDistFltProp.bound && o.fltPropID === elmBoundDistFltProp.fltPropID)
        tmpfltOption1.forEach
          (elmTmpfltOption1 => {
            let tmpFltOption = {} as FltOption;

            tmpFltOption.boundRef = elmTmpfltOption1.boundRef;
            tmpFltOption.eft = elmTmpfltOption1.eft;
            tmpFltOption.fltPropID = elmTmpfltOption1.fltPropID;
            tmpFltOption.mcx = elmTmpfltOption1.mcx;
            tmpFltOption.stops = elmTmpfltOption1.stops;
            tmpFltOption.strEft = elmTmpfltOption1.strEFT;

            tmpFltOption.legList = {} as LegList;
            tmpFltOption.legList.legRec = [];

            elmTmpfltOption1.legList.legRec.forEach
              (elmLegRec => {
                let tmpLegRec = {} as LegRec;
                tmpLegRec.arvDT = elmLegRec.arvDT;
                tmpLegRec.bpCity = elmLegRec.bpCity;
                tmpLegRec.bpTmnl = elmLegRec.bpTmnl;
                tmpLegRec.cdsh = elmLegRec.cdsh;
                tmpLegRec.dateArv = elmLegRec.dateArv;
                tmpLegRec.dateDep = elmLegRec.dateDep;
                tmpLegRec.depDT = elmLegRec.depDT;
                tmpLegRec.dowArv = elmLegRec.dowArv;
                tmpLegRec.dowDep = elmLegRec.dowDep;
                tmpLegRec.eqpType = elmLegRec.eqpType;
                tmpLegRec.fbaStr = elmLegRec.fbaStr;
                tmpLegRec.fltNo = elmLegRec.fltNo;
                tmpLegRec.legNo = elmLegRec.legNo;
                tmpLegRec.lgFT = elmLegRec.lgFT;
                tmpLegRec.mktCarr = elmLegRec.mktCarr;
                tmpLegRec.offCity = elmLegRec.offCity;
                tmpLegRec.offTmnl = elmLegRec.offTmnl;
                tmpLegRec.oprCarr = elmLegRec.oprCarr;
                tmpLegRec.timeArv = elmLegRec.timeArv;
                tmpLegRec.timeDep = elmLegRec.timeDep;
                tmpLegRec.trns = elmLegRec.trns;

                tmpFltOption.legList.legRec.push(tmpLegRec);

              }
              )

            displayFltDetailsList.fltOption.push(tmpFltOption);

          }

          )

      }
      )

    let tmpPrcItem = inPrcItemList.prcItem.find(O => O.prcItemID === qryPrcRef);
    let tmpFbaRef = tmpPrcItem.prcRefRecList.prcRefRec.find(x => x.segMixID === qrySegMixRef).fbaRef;
    let tmpFbaCovGrp = inFbaCoverageList.fbaCoverage.find(x => x.fbaPrcID === tmpFbaRef).fbaCovGrp;
    let tmpBndLegFBAList = {} as BndLegFBAList;
    tmpBndLegFBAList.bndLegFBA = [];

    tmpFbaCovGrp.forEach
      (elmTmpFbaCovGrp => {
        let tmpFbAllwRef = elmTmpFbaCovGrp.fbAllwRef;
        let tmpFbaDetailsRec = inFbaDetailsRecList.fbaDetailsRec.find(x => x.fbaDetRecID === tmpFbAllwRef);
        let tmpBaggage = '';
        if (tmpFbaDetailsRec.fbaDetails.qtyCode === 'W') {
          tmpBaggage = tmpFbaDetailsRec.fbaDetails.qtyAllw + tmpFbaDetailsRec.fbaDetails.qtyUnit;
        }

        else if (tmpFbaDetailsRec.fbaDetails.qtyCode === 'N') {
          tmpBaggage = tmpFbaDetailsRec.fbaDetails.qtyAllw + 'N';
        };



        elmTmpFbaCovGrp.bndLegRefList.bndLegRef.forEach
          (elmBndLegRef => {
            let tmpFbaBndRef = elmBndLegRef.fbaBndRef;
            elmBndLegRef.fbaLegRef.forEach
              (elmFbaLegRef => {
                let tmpBndLegFBA = {} as BndLegFBA;
                tmpBndLegFBA.boundRef = tmpFbaBndRef;
                tmpBndLegFBA.LegRef = elmFbaLegRef;
                tmpBndLegFBA.baggage = tmpBaggage;
                tmpBndLegFBAList.bndLegFBA.push(tmpBndLegFBA);
              }
              );

          }
          );


      }
      )

    if (qryPrcRef2 != null && qrySegMixRef2 != null) {
      let tmpPrcItem2 = inPrcItemList.prcItem.find(O => O.prcItemID === qryPrcRef2);
      let tmpFbaRef2 = tmpPrcItem2.prcRefRecList.prcRefRec.find(x => x.segMixID === qrySegMixRef2).fbaRef;
      let tmpFbaCovGrp2 = inFbaCoverageList.fbaCoverage.find(x => x.fbaPrcID === tmpFbaRef2).fbaCovGrp;

      tmpFbaCovGrp2.forEach
        (elmTmpFbaCovGrp2 => {
          let tmpFbAllwRef2 = elmTmpFbaCovGrp2.fbAllwRef;
          let tmpFbaDetailsRec2 = inFbaDetailsRecList.fbaDetailsRec.find(x => x.fbaDetRecID === tmpFbAllwRef2);
          let tmpBaggage2 = '';
          if (tmpFbaDetailsRec2.fbaDetails.qtyCode === 'W') {
            tmpBaggage2 = tmpFbaDetailsRec2.fbaDetails.qtyAllw + tmpFbaDetailsRec2.fbaDetails.qtyUnit;
          }

          else if (tmpFbaDetailsRec2.fbaDetails.qtyCode === 'N') {
            tmpBaggage2 = tmpFbaDetailsRec2.fbaDetails.qtyAllw + 'N';
          };



          elmTmpFbaCovGrp2.bndLegRefList.bndLegRef.forEach
            (elmBndLegRef2 => {
              let tmpFbaBndRef2 = elmBndLegRef2.fbaBndRef;
              elmBndLegRef2.fbaLegRef.forEach
                (elmFbaLegRef2 => {
                  let tmpBndLegFBA2 = {} as BndLegFBA;
                  tmpBndLegFBA2.boundRef = tmpFbaBndRef2;
                  tmpBndLegFBA2.LegRef = elmFbaLegRef2;
                  tmpBndLegFBA2.baggage = tmpBaggage2;
                  tmpBndLegFBAList.bndLegFBA.push(tmpBndLegFBA2);
                }
                );

            }
            );


        }
        )


    };

    let indexFltOption = 0;


    displayFltDetailsList.fltOption.forEach
      (elmfltOption => {
        let indexLegRec = 0;


        elmfltOption.legList.legRec.forEach
          (elmLegRec => {
            let tmpBnd = elmfltOption.boundRef;
            let tmpLeg = elmLegRec.legNo;
            let tmpFbaStr = tmpBndLegFBAList.bndLegFBA.find(x => x.boundRef === tmpBnd && x.LegRef === tmpLeg).baggage;
            displayFltDetailsList.fltOption[indexFltOption].legList.legRec[indexLegRec].fbaStr = tmpFbaStr;

            let tmpBpCity = displayFltDetailsList.fltOption[indexFltOption].legList.legRec[indexLegRec].bpCity;
            tmpBpCity = inListAptRecs.find(x => x.code === tmpBpCity).name;
            displayFltDetailsList.fltOption[indexFltOption].legList.legRec[indexLegRec].bpCity = tmpBpCity;

            let tmpOffCity = displayFltDetailsList.fltOption[indexFltOption].legList.legRec[indexLegRec].offCity;
            tmpOffCity = inListAptRecs.find(x => x.code === tmpOffCity).name;
            displayFltDetailsList.fltOption[indexFltOption].legList.legRec[indexLegRec].offCity = tmpOffCity;

            //

            let tmpMktAirline = displayFltDetailsList.fltOption[indexFltOption].legList.legRec[indexLegRec].mktCarr;
            tmpMktAirline = inListAirlineRecs.find(x => x.code === tmpMktAirline).name;
            displayFltDetailsList.fltOption[indexFltOption].legList.legRec[indexLegRec].mktCarrTxt = tmpMktAirline;

            let tmpOprAirline = displayFltDetailsList.fltOption[indexFltOption].legList.legRec[indexLegRec].oprCarr;
            let tmpCodeshare = displayFltDetailsList.fltOption[indexFltOption].legList.legRec[indexLegRec].cdsh;

            if (tmpOprAirline != null && tmpCodeshare === 'Y') {
              tmpOprAirline = inTxtConst.oprBy + ': ' + inListAirlineRecs.find(x => x.code === tmpOprAirline).name;
              displayFltDetailsList.fltOption[indexFltOption].legList.legRec[indexLegRec].oprCarrTxt = tmpOprAirline;
            }
            else {
              displayFltDetailsList.fltOption[indexFltOption].legList.legRec[indexLegRec].oprCarr = null;
            }



            let tmpBpTml = displayFltDetailsList.fltOption[indexFltOption].legList.legRec[indexLegRec].bpTmnl;
            if (tmpBpTml != null) {
              displayFltDetailsList.fltOption[indexFltOption].legList.legRec[indexLegRec].bpTmnl = inTxtConst.terminal + ": " + tmpBpTml
            };

            let tmpOffTmnl = displayFltDetailsList.fltOption[indexFltOption].legList.legRec[indexLegRec].offTmnl;
            if (tmpOffTmnl != null) {
              displayFltDetailsList.fltOption[indexFltOption].legList.legRec[indexLegRec].offTmnl = inTxtConst.terminal + ": " + tmpOffTmnl;
            };

            let tmpTransfer = displayFltDetailsList.fltOption[indexFltOption].legList.legRec[indexLegRec].trns;
            if (tmpTransfer != null) {
              tmpTransfer = inTxtConst.transf + ' ' + tmpOffCity + ': ' + tmpTransfer;
              displayFltDetailsList.fltOption[indexFltOption].legList.legRec[indexLegRec].trns = tmpTransfer;
            }



            indexLegRec = indexLegRec + 1;
          }
          )

        indexFltOption = indexFltOption + 1;
      }


      )

    return displayFltDetailsList;


  }

  generateDisplayFareGroupList(optionBlock: OptionBlock, optionIndex: number, data: any): FareGroupList {

    const selectedOptBlockID: string = optionBlock.OptBlockID;
    const lwrOpt: LwrOpt = optionBlock.lwrSegList.lwrOpt[optionIndex];
    const selectedLwrSeg: string = lwrOpt.lwrSeg;
    const selectedPrcRef: string = lwrOpt.PrcRef;
    const selectedPrcRef2: string = lwrOpt.PrcRef2;

    // data is the response from the REST API    
    //let qtyBounds = data.boundCount;
    let inPrcItemList = data.prcItemList;
    let inFFitemList = data.fFitemList;
    let inFFitemDetailsList = data.fFitemDetailsList;
    let inCurrency = data.fareCurr;
    let inDictionary = data.dictionary;
    let inOptionBlockList = data.optionBlockList;

    let splitPrc: boolean;
    let qtyPrcGrp = 0;
    let qtyBounds = 0

    let selectedOptionBlock = inOptionBlockList.optionBlock.find(x => x.optBlockID === selectedOptBlockID)
    //let selectedLwrOpt = selectedOptionBlock.lwrSegList.lwrOpt.find(y => y.lwrSeg === selectedLwrSeg &&  );
    // selectedOptBlockID,  selectedLwrSeg, selectedPrcRef cannot be null

    let arrLwrOpt = [];
    if (selectedPrcRef2 != null) {
      splitPrc = true;
      qtyPrcGrp = 2;
      arrLwrOpt = selectedOptionBlock.lwrSegList.lwrOpt.filter(y => y.lwrSeg === selectedLwrSeg && y.prcRef2 != null);
    }
    else {
      splitPrc = false;
      qtyPrcGrp = 1;
      arrLwrOpt = selectedOptionBlock.lwrSegList.lwrOpt.filter(y => y.lwrSeg === selectedLwrSeg && y.prcRef2 == null);
    };

    //if selectedOptionBlock.uprSeg == '0'


    let displayFareGroupList = {} as FareGroupList;
    displayFareGroupList.FareGroup = [];

    let arrFFnR: FFnR[] = [];

    if (splitPrc == false) {  // Single carrier fares
      arrLwrOpt.forEach
        (elmLwrOpt => {
          let prcRef = elmLwrOpt.prcRef;
          let mnrRef = elmLwrOpt.mnrRef;
          let fbaRef = elmLwrOpt.fbaRef;

          let tmpPrcItem = inPrcItemList.prcItem.find(x => x.prcItemID === prcRef)
          let tmpTotalAmt = +tmpPrcItem.fareGT + +tmpPrcItem.taxGT;
          let tmpTotalAmtStr = tmpTotalAmt.toString();

          if (tmpPrcItem.boundFFList.ffRef.length != 0) {
            if (tmpPrcItem.boundFFList.ffRef.length == 2) {
              if (tmpPrcItem.boundFFList.ffRef[0] == tmpPrcItem.boundFFList.ffRef[1]) {
                // One Fare Family for both bounds
                let tmpFFnR = {} as FFnR;
                tmpFFnR.ffID = tmpPrcItem.boundFFList.ffRef[0];
                tmpFFnR.FFName = inFFitemList.fFitem.find(x => x.ffID === tmpPrcItem.boundFFList.ffRef[0]).ffDesc
                tmpFFnR.grpID = '1';
                tmpFFnR.fbaID = fbaRef;
                tmpFFnR.mnrID = mnrRef;
                tmpFFnR.prcID = prcRef;
                if (prcRef === selectedPrcRef) { tmpFFnR.isItemSelected = 'Y' }
                else { tmpFFnR.isItemSelected = null };

                tmpFFnR.TotalAmt = tmpTotalAmtStr;

                arrFFnR.push(tmpFFnR);
              }
              else {
                // Split Fare Family for each bound  /// Check with different FF
                let tmpFFnR = {} as FFnR;
                tmpFFnR.ffID = tmpPrcItem.boundFFList.ffRef[0];
                tmpFFnR.FFName = inFFitemList.fFitem.find(x => x.ffID === tmpPrcItem.boundFFList.ffRef[0]).ffDesc
                tmpFFnR.grpID = '1';
                tmpFFnR.fbaID = fbaRef;
                tmpFFnR.mnrID = mnrRef;
                tmpFFnR.prcID = prcRef;
                if (prcRef === selectedPrcRef) { tmpFFnR.isItemSelected = 'Y' }
                else { tmpFFnR.isItemSelected = null };

                tmpFFnR.TotalAmt = tmpTotalAmtStr;
                arrFFnR.push(tmpFFnR);

                let tmpFFnRB = {} as FFnR;
                tmpFFnRB.ffID = tmpPrcItem.boundFFList.ffRef[1];
                tmpFFnRB.FFName = inFFitemList.fFitem.find(x => x.ffID === tmpPrcItem.boundFFList.ffRef[1]).ffDesc
                tmpFFnRB.grpID = '2';
                tmpFFnRB.fbaID = fbaRef;
                tmpFFnRB.mnrID = mnrRef;
                tmpFFnRB.prcID = prcRef;
                if (prcRef === selectedPrcRef) { tmpFFnRB.isItemSelected = 'Y' }
                else { tmpFFnRB.isItemSelected = null };


                arrFFnR.push(tmpFFnRB);


              };

            }
            else if (tmpPrcItem.boundFFList.ffRef.length == 1) {
              // One Fare Family one bound
              let tmpFFnR = {} as FFnR;
              tmpFFnR.ffID = tmpPrcItem.boundFFList.ffRef[0];
              tmpFFnR.FFName = inFFitemList.fFitem.find(x => x.ffID === tmpPrcItem.boundFFList.ffRef[0]).ffDesc
              tmpFFnR.grpID = '1';
              tmpFFnR.fbaID = fbaRef;
              tmpFFnR.mnrID = mnrRef;
              tmpFFnR.prcID = prcRef;
              if (prcRef === selectedPrcRef) { tmpFFnR.isItemSelected = 'Y' }
              else { tmpFFnR.isItemSelected = null };
              tmpFFnR.FFName = null;

              arrFFnR.push(tmpFFnR);

            }

          }
          else {
            // Add only Fare Rules
            let tmpFFnR = {} as FFnR;
            tmpFFnR.ffID = null;
            tmpFFnR.grpID = '1';
            tmpFFnR.fbaID = fbaRef;
            tmpFFnR.mnrID = mnrRef;
            tmpFFnR.prcID = prcRef;
            if (prcRef === selectedPrcRef) { tmpFFnR.isItemSelected = 'Y' }
            else { tmpFFnR.isItemSelected = null };
            tmpFFnR.FFName = null;
            tmpFFnR.TotalAmt = tmpTotalAmtStr;
            arrFFnR.push(tmpFFnR);

          }

        }
        )

    };

    if (splitPrc == true) { // two carrier fares
      arrLwrOpt.forEach
        (elmLwrOpt => {
          let prcRef = elmLwrOpt.prcRef;
          let prcRef2 = elmLwrOpt.prcRef2;

          let mnrRef = elmLwrOpt.mnrRef;
          let mnrRef2 = elmLwrOpt.mnrRef2;

          let fbaRef = elmLwrOpt.fbaRef
          let fbaRef2 = elmLwrOpt.fbaRef2;

          let tmpPrcItem = inPrcItemList.prcItem.find(x => x.prcItemID === prcRef)
          let tmpPrcItem2 = inPrcItemList.prcItem.find(x => x.prcItemID === prcRef2)

          let tmpTotalAmt = +tmpPrcItem.fareGT + +tmpPrcItem.taxGT + +tmpPrcItem2.fareGT + +tmpPrcItem2.taxGT;
          let tmpTotalAmtStr = tmpTotalAmt.toString();

          if (tmpPrcItem.boundFFList.ffRef.length != 0) /// For bound 1
          {
            // Fare Family for bound 1
            let tmpFFnR = {} as FFnR;
            tmpFFnR.ffID = tmpPrcItem.boundFFList.ffRef[0];
            tmpFFnR.FFName = inFFitemList.fFitem.find(x => x.ffID === tmpPrcItem.boundFFList.ffRef[0]).ffDesc
            tmpFFnR.grpID = '1';
            tmpFFnR.fbaID = fbaRef;
            tmpFFnR.mnrID = mnrRef;
            tmpFFnR.prcID = prcRef;
            if (prcRef === selectedPrcRef) { tmpFFnR.isItemSelected = 'Y' }
            else { tmpFFnR.isItemSelected = null };

            tmpFFnR.TotalAmt = tmpTotalAmtStr;

            arrFFnR.push(tmpFFnR);

          }
          else {
            // Add only Fare Rules
            let tmpFFnR = {} as FFnR;
            tmpFFnR.ffID = null;
            tmpFFnR.grpID = '1';
            tmpFFnR.fbaID = fbaRef;
            tmpFFnR.mnrID = mnrRef;
            tmpFFnR.prcID = prcRef;
            if (prcRef === selectedPrcRef) { tmpFFnR.isItemSelected = 'Y' }
            else { tmpFFnR.isItemSelected = null };
            tmpFFnR.FFName = null;
            tmpFFnR.TotalAmt = tmpTotalAmtStr;
            arrFFnR.push(tmpFFnR);
          };

          if (tmpPrcItem2.boundFFList.ffRef.length != 0) /// For Bound 2
          {
            // Fare Family for bound 2
            let tmpFFnR = {} as FFnR;
            tmpFFnR.ffID = tmpPrcItem2.boundFFList.ffRef[0];
            tmpFFnR.FFName = inFFitemList.fFitem.find(x => x.ffID === tmpPrcItem2.boundFFList.ffRef[0]).ffDesc
            tmpFFnR.grpID = '2';
            tmpFFnR.fbaID = fbaRef2;
            tmpFFnR.mnrID = mnrRef2;
            tmpFFnR.prcID = prcRef2;
            if (prcRef2 === selectedPrcRef2) { tmpFFnR.isItemSelected = 'Y' }
            else { tmpFFnR.isItemSelected = null };

            tmpFFnR.TotalAmt = tmpTotalAmtStr;

            arrFFnR.push(tmpFFnR);

          }
          else {
            // Only Fare Rules for bound 2
            let tmpFFnR = {} as FFnR;
            tmpFFnR.ffID = null;
            tmpFFnR.grpID = '2';
            tmpFFnR.fbaID = fbaRef2;
            tmpFFnR.mnrID = mnrRef2;
            tmpFFnR.prcID = prcRef2;
            if (prcRef2 === selectedPrcRef2) { tmpFFnR.isItemSelected = 'Y' }
            else { tmpFFnR.isItemSelected = null };
            tmpFFnR.FFName = null;
            tmpFFnR.TotalAmt = tmpTotalAmtStr;
            arrFFnR.push(tmpFFnR);
          };

        }
        )

    };


    if (arrFFnR.length > 0) {
      let tmpArrFFnR1a = arrFFnR.filter(x => x.grpID === '1');
      let tmpArrFFnR2a = arrFFnR.filter(x => x.grpID === '2');

      let grpArrFFnR = [];
      if (tmpArrFFnR1a.length > 0) { grpArrFFnR.push(tmpArrFFnR1a) };
      if (tmpArrFFnR2a.length > 0) { grpArrFFnR.push(tmpArrFFnR2a) };



      for (let i = 0; i < grpArrFFnR.length; i++) {
        //let emlArrFFnR = [] ;
        let emlArrFFnR = grpArrFFnR[i];

        let tmpFareGroup = {} as FareGroup;
        tmpFareGroup.FFnR = [];

        tmpFareGroup.fareGrpID

        tmpFareGroup.fareGrpID = (i + 1).toString();
        tmpFareGroup.segBound1 = inDictionary.bound1Orgin + ' - ' + inDictionary.bound1Dest;

        if (grpArrFFnR.length == 1) { tmpFareGroup.segBound2 = null }
        else if (grpArrFFnR.length == 2) { tmpFareGroup.segBound2 = inDictionary.bound2Orgin + ' - ' + inDictionary.bound2Dest };

        emlArrFFnR.forEach
          (elmFFnR => {
            elmFFnR.FareRec = [];

            if (elmFFnR.ffID != null) {
              let tmpArrSvcItem = inFFitemList.fFitem.find(x => x.ffID === elmFFnR.ffID).ffSvcList.ffSvc;



              tmpArrSvcItem.forEach
                (elmSvcItem => {

                  let tmpFareRec = {} as FareRec;
                  let svcStatus = elmSvcItem.svcST;
                  tmpFareRec.icoRec = svcStatus + '.png';
                  tmpFareRec.txtRec = inFFitemDetailsList.fFitmDet.find(x => x.itmDetID === elmSvcItem.svcRef).itmDetTxt + ' : ';
                  tmpFareRec.valRec = svcStatus;

                  // look up the dictionary for SVC status Value (valRec)
                  elmFFnR.FareRec.push(tmpFareRec);

                }

                );


              tmpFareGroup.FFnR.push(elmFFnR);
            }


          }

          )


        displayFareGroupList.FareGroup.push(tmpFareGroup);
        //indexGrpArrFFnR + 1;

      }
    };

    return displayFareGroupList;
  }
}