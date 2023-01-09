import { Tile } from "./tile";
import { Section1 } from "./section1";
import { Section2 } from "./section2";
import { ButtonOverlay } from "./button-overlay";
import { ButtonText } from "./button-text";

export interface DisplayInfo {
  TileList : Tile[],
  Section1List : Section1[],
  Section2List : Section2[],
  ButtonOverlayList : ButtonOverlay[],
  ButtonTextArray : ButtonText[],
}
