import { Ableton } from "..";
import { Namespace } from ".";
import { Device, RawDevice } from "./device";
import { Chain, RawChain } from "./chain";
import { DrumChain } from "./drum-chain";
import { ChainMixerDevice, RawChainMixerDevice } from "./chain-mixer-device";
// import { DrumPad } from "./DrumPad";
import { RawDeviceParameter, DeviceParameter } from "./device-parameter";

export interface GettableProperties {
  can_have_chains: boolean;
  can_have_drum_pads: boolean;
  can_show_chains: boolean;
  canonical_parent: string;
  chains: Chain[];
  class_display_name: string;
  class_name: string;
  // drum_pads: DrumPad[];
  has_drum_pads: boolean;
  has_macro_mappings: boolean;
  is_active: boolean;
  is_showing_chains: boolean;
  macros_mapped: boolean;
  name: string;
  parameters: RawChainMixerDevice[];
  return_chains: Chain[];
  selected_variation_index: number;
  // type: string;
  variation_count: number;
  // view: string;
  // visible_drum_pads: DrumPad[];
}
export interface ObservableProperties {
  chains: Chain[];
  // drum_pads: DrumPad[];
  has_drum_pads: boolean;
  has_macro_mappings: boolean;
  is_active: boolean;
  is_showing_chains: boolean;
  macros_mapped: boolean;
  name: string;
  parameters: RawChainMixerDevice[];
  // return_chains: Chain[];
  // visible_drum_pads: DrumPad[];
}

export interface TransformedProperties {}

export interface SettableProperties {
  name: string;
  is_active: boolean;
}

export interface RawRackDevice {
  id: string;
  name: string;
  // type: DeviceType;
  // class_name: string;
}
export class RackDevice extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, public raw: RawRackDevice) {
    super(ableton, "rackDevice", raw.id);

    // this.transformers = {
    //   parameters: (ps) => ps.map((p) => new DeviceParameter(ableton, p)),
    // };

    this.cachedProps = {
      parameters: true,
    };
  }
}
