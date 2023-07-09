import { Ableton } from "..";
import { Namespace } from ".";
import { ChainMixerDevice, RawChainMixerDevice } from ".";
import { Device, RawDevice } from "./device";

export interface GettableProperties {
  // canonical_parent: string;
  color: number;
  // color_index: number;
  devices: RawDevice[];
  has_audio_input: boolean;
  has_audio_output: boolean;
  has_midi_input: boolean;
  has_midi_output: boolean;
  is_auto_colored: boolean;
  mixer_device: RawChainMixerDevice[];
  mute: number;
  muted_via_solo: boolean;
  name: string;
  solo: boolean;
}

export interface ObservableProperties {
  color: number;
  // color_index: number;
  devices: RawChainMixerDevice[];
  is_auto_colored: boolean;
  mixer_device: RawChainMixerDevice[];
  mute: number;
  muted_via_solo: boolean;
  name: string;
  solo: boolean;
}

export interface TransformedProperties {}

export interface SettableProperties {}

export class Chain extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, public raw: RawChain) {
    super(ableton, "Chain", raw.id);

    this.transformers = {
      parameters: (ps) => ps.map((p) => new DeviceParameter(ableton, p)),
    };

    this.cachedProps = {
      parameters: true,
    };
  }
}
