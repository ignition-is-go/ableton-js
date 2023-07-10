import { Ableton } from "..";
import { Namespace } from ".";
import { Chain, RawChain } from "./chain";

export interface GettableProperties {}

export interface TransformedProperties {}

export interface SettableProperties {
  name: string;
  is_active: boolean;
}

export interface ObservableProperties {
  is_active: boolean;
  name: string;
  parameters: string;
}

export interface RawDrumPad {
  id: string;
  name: string;
  // note: string;
  // type: DrumChainType;
  // class_name: string;
}

export class DrumPad extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, public raw: RawDrumPad) {
    super(ableton, "drum-pads", raw.id);

    // this.transformers = {
    //   parameters: (ps) => ps.map((p) => new DrumChainParameter(ableton, p)),
    // };

    // this.cachedProps = {
    //   parameters: true,
    // };
  }
}
