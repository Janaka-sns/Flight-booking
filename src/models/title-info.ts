import { Section1 } from "./section1";
import { Section2Extend } from "./section2-extend";

export interface TitleInfo {
  TileID: string;
  HeaderText1: string;
  HeaderText2: string;
  Section1List: Section1;
  Section2List: Section2Extend[];
  currentSectionIndex?: number;
  buttonText: string;
}
