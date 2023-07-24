import { Ableton } from "..";
import { Namespace } from ".";

export interface GettableProperties {
  // canonical_parent: string;
  mute: boolean;
  name: string;
  // note: string;
  solo: number;
}

export interface TransformedProperties {}

export interface SettableProperties {
  name: string;
  solo: number;
  mute: boolean;
}

export interface ObservableProperties {
  // chains: string; based on observable for device params in device.ts
  mute: boolean;
  solo: number;
  name: string;
}

export interface RawDrumPad {
  id: string;
  name: string;
  // note: string;
}

export class DrumPad extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, public raw: RawDrumPad) {
    super(ableton, "drum-pad", raw.id);

    // this.cachedProps = {
    // };
  }
}
