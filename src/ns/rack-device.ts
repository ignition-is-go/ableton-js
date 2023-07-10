import { Ableton } from "..";
import { Namespace } from ".";
import { Device, RawDevice } from "./device";
import { Chain, RawChain } from "./chain";
import { DrumChain } from "./drum-chain";
// import { ChainMixerDevice, RawChainMixerDevice } from "./chain-mixer-device";
import { DrumPad, RawDrumPad } from "./drum-pad";
import { RawDeviceParameter, DeviceParameter } from "./device-parameter";

export interface GettableProperties {
  can_have_chains: boolean;
  can_have_drum_pads: boolean;
  can_show_chains: boolean;
  canonical_parent: string;
  chains: RawChain[];
  class_display_name: string;
  class_name: string;
  drum_pads: RawDrumPad[];
  has_drum_pads: boolean;
  has_macro_mappings: boolean;
  is_active: boolean;
  is_showing_chains: boolean;
  macros_mapped: boolean;
  name: string;
  parameters: RawDeviceParameter[];
  return_chains: RawChain[];
  selected_variation_index: number;
  // type: string;
  variation_count: number;
  // view: string;
  // visible_drum_pads: DrumPad[];
}
export interface ObservableProperties {
  chains: RawChain[];
  drum_pads: RawDrumPad[];
  has_drum_pads: boolean;
  has_macro_mappings: boolean;
  is_active: boolean;
  is_showing_chains: boolean;
  macros_mapped: boolean;
  name: string;
  return_chains: RawChain[];
  // visible_drum_pads: DrumPad[];
}

export interface TransformedProperties {
  chains: Chain[];
  parameters: DeviceParameter[];
  drum_pads: DrumPad[];
  return_chains: Chain[];
}

export interface SettableProperties {
  name: string;
  is_active: boolean;
}

export interface RawRackDevice {
  id: string;
  name: string;
  // type: DeviceType;
  class_name: string;
}
export class RackDevice extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, public raw: RawRackDevice) {
    super(ableton, "rackDevice", raw.id);

    this.transformers = {
      parameters: (ps) => ps.map((p) => new DeviceParameter(ableton, p)),
      chains: (cs) => cs.map((c) => new Chain(ableton, c)),
      drum_pads: (ds) => ds.map((d) => new DrumPad(ableton, d)),
      return_chains: (cs) => cs.map((c) => new Chain(ableton, c)),
    };

    this.cachedProps = {
      parameters: true,
    };
  }
}
