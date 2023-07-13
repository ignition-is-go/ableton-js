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
  mixer_device: RawMixerDevice[];
  mute: boolean;
  muted_via_solo: boolean;
  name: string;
  solo: number;
  note_out: string;
}

export interface TransformedProperties {
  devices: Device[];
  mixer_device: MixerDevice[];
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
  mixer_device: RawMixerDevice[];
  note_out: string;
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
        mixer_device.map((md) => new MixerDevice(ableton, md)),
    };

    this.cachedProps = {
      devices: true,
      mixer_device: true,
    };
  }
}
