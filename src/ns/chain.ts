import { Ableton } from "..";
import { Namespace } from ".";
import { Device, RawDevice } from "./device";
import { ChainMixerDevice, RawChainMixerDevice } from "./chain-mixer-device";

export interface GettableProperties {
  color: number;
  color_index: number;
  devices: RawDevice[];
  hase_audio_input: boolean;
  has_audio_output: boolean;
  has_midi_input: boolean;
  has_midi_output: boolean;
  is_auto_colored: boolean;
  mixer_device: RawChainMixerDevice;
  mute: boolean;
  muted_via_solo: boolean;
  name: string;
  solo: number;
}

export interface TransformedProperties {
  devices: Device[];
  mixer_device: ChainMixerDevice;
}

export interface SettableProperties {
  name: string;
  solo: number;
  mute: boolean;
}

export interface ObservableProperties {
  is_active: boolean;
  name: string;
  parameters: string;
}

export interface RawChain {
  id: string;
  name: string;
}

export class Chain extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, public raw: RawChain) {
    super(ableton, "chain", raw.id);

    this.transformers = {
      devices: (devices) => devices.map((d) => new Device(ableton, d)),
      mixer_device: (mixer_device) =>
        new ChainMixerDevice(ableton, mixer_device),
    };

    // this.cachedProps = {
    //   parameters: true,
    // };
  }
}
