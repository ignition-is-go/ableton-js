import { Ableton } from "..";
import { Namespace } from ".";
import { Device, RawDevice } from "./device";
import { MixerDevice, RawMixerDevice } from "./mixer-device";

export interface GettableProperties {
  color: number;
  color_index: number;
  devices: RawDevice[];
  hase_audio_input: boolean;
  has_audio_output: boolean;
  has_midi_input: boolean;
  has_midi_output: boolean;
  is_auto_colored: boolean;
  mixer_device: RawMixerDevice;
  mute: boolean;
  muted_via_solo: boolean;
  name: string;
  solo: number;
  out_note: number;
  choke_group: string;
}

export interface TransformedProperties {
  devices: Device[];
  mixer_device: MixerDevice;
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
  color: number;
  color_index: number;
  is_auto_colored: boolean;
  mixer_device: RawMixerDevice;
  out_note: number;
  mute: boolean;
  muted_via_solo: boolean;
  solo: number;
  choke_group: string;
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
      mixer_device: (mixer) => {
        return new MixerDevice(ableton, mixer);
      },
    };

    // this.cachedProps = {
    //   devices: true,
    // };
  }
}
