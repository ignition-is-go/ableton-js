import { Ableton } from "..";
import { Namespace } from ".";
import { Device, RawDevice } from "./device";
import { Chain } from "./chain";
import { ChainMixerDevice, RawChainMixerDevice } from "./chain-mixer-device";
// import { DrumPad } from "./DrumPad";
import { RawDeviceParameter, DeviceParameter } from "./device-parameter";
import { Color } from "../util/color";

export interface GettableProperties {
  // canonical_parent: string;
  choke_group: string;
  color: number;
  color_index: number;
  has_audio_input: boolean;
  has_audio_output: boolean;
  has_midi_input: boolean;
  has_midi_output: boolean;
  is_auto_colored: boolean;
  devices: RawDevice[];
  mixerDevice: RawChainMixerDevice[];
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
  // parameters: RawChainMixerDevice[];
}

export interface SettableProperties {
  name: string;
  is_active: boolean;
}

export interface RawDrumChain {
  id: string;
  name: string;
  // type: DeviceType;
  // class_name: string;
}
export class DrumChain extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, public raw: RawDrumChain) {
    super(ableton, "DrumChain", raw.id);

    this.transformers = {
      parameters: (ps) => ps.map((p) => new DeviceParameter(ableton, p)),
    };

    this.cachedProps = {
      parameters: true,
    };
  }
}
