import { Ableton } from "..";
import { Namespace } from ".";

export interface GettableProperties {}

export interface TransformedProperties {}

export interface SettableProperties {
  // name: string;
  // is_active: boolean;
}

export interface ObservableProperties {
  // is_active: boolean;
  // name: string;
  // parameters: string;
}

export interface RawChain {
  id: string;
  name: string;
  // note: string;
  // type: DrumChainType;
  // class_name: string;
}

export class Chain extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, public raw: RawChain) {
    super(ableton, "chain", raw.id);

    // this.transformers = {
    //   parameters: (ps) => ps.map((p) => new DrumChainParameter(ableton, p)),
    // };

    // this.cachedProps = {
    //   parameters: true,
    // };
  }
}