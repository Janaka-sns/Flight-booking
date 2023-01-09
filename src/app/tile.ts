import { Section } from "./section";
import { SectionData } from "./section-data";

export interface Tile {
  HeaderText1: string;
  HeaderText2: string;
  Section1: Section,
  Section2Sets: SectionData[];
  currentSectionIndex: number;
}
