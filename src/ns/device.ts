import { Ableton } from "..";
import { Namespace } from ".";
import { RawDeviceParameter, DeviceParameter } from "./device-parameter";
import { RawChain, Chain } from "./chain";
import { RawDrumPad, DrumPad } from "./drum-pad";

export interface GettableProperties {
  can_have_chains: boolean;
  can_have_drum_pads: boolean;
  class_display_name: string;
  class_name: string;
  is_active: boolean;
  name: string;
  parameters: RawDeviceParameter[];
  type: DeviceType;
  chains: RawChain[];
  return_chains: RawChain[];
  drum_pads: RawDrumPad[];
}

export default interface TransformedProperties {
  parameters: DeviceParameter[];
  chains: Chain[];
  return_chains: Chain[];
  drum_pads: DrumPad[];
}

export interface SettableProperties {
  name: string;
  is_active: boolean;
}

export interface ObservableProperties {
  is_active: boolean;
  name: string;
  parameters: string;
  chains: RawChain[];
  drum_pads: RawDrumPad[];
  return_chains: RawChain[];
}

export interface RawDevice {
  id: string;
  name: string;
  type: DeviceType;
  class_name: string;
}

export enum DeviceType {
  AudioEffect = "audio_effect",
  Instrument = "instrument",
  MidiEffect = "midi_effect",
  Undefined = "undefined",
}

export class Device extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, public raw: RawDevice) {
    super(ableton, "device", raw.id);

    this.transformers = {
      parameters: (ps) => ps.map((p) => new DeviceParameter(ableton, p)),
      chains: (cs) => cs.map((c) => new Chain(ableton, c)),
      return_chains: (cs) => cs.map((c) => new Chain(ableton, c)),
      drum_pads: (ds) => ds.map((d) => new DrumPad(ableton, d)),
    };

    this.cachedProps = {
      parameters: true,
    };
  }
}
