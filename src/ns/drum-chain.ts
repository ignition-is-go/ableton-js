import { Ableton } from "..";
import { Namespace } from ".";
import { Device, RawDevice } from "./device";
import { ChainMixerDevice, RawChainMixerDevice } from "./chain-mixer-device";

export interface GettableProperties {
  // canonical_parent: string;
  // choke_group: string;
  // color: number;
  color_index: number;
  has_audio_input: boolean;
  has_audio_output: boolean;
  has_midi_input: boolean;
  has_midi_output: boolean;
  is_auto_colored: boolean;
  devices: RawDevice[];
  mixer_device: RawChainMixerDevice;
  mute: boolean;
  muted_via_solo: boolean;
  name: string;
  // out_note: string;
  solo: number;
}
export interface ObservableProperties {
  choke_group: string;
  color: number;
  color_index: number;
  devices: RawDevice[];
  is_auto_colored: boolean;
  mute: boolean;
  muted_via_solo: boolean;
  name: string;
  // out_note: string;
  solo: number;
}

export interface TransformedProperties {
  mixer_device: ChainMixerDevice;
  devices: Device[];
}

export interface SettableProperties {
  name: string;
  solo: number;
  mute: boolean;
}

export interface RawDrumChain {
  id: string;
  name: string;
}
export class DrumChain extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, public raw: RawDrumChain) {
    super(ableton, "drum-chain", raw.id);

    this.transformers = {
      devices: (ds) => ds.map((d) => new Device(ableton, d)),
      mixer_device: (mixer_device) =>
        new ChainMixerDevice(ableton, mixer_device),
    };

    // this.cachedProps = {
    //   parameters: true,
    // };
  }
}
