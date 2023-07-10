import { Ableton } from "..";
import { Namespace } from ".";
import { DeviceParameter, RawDeviceParameter } from "./device-parameter";

export interface GettableProperties {
  panning: RawDeviceParameter;
  sends: RawDeviceParameter[];
  volume: RawDeviceParameter;
}

export interface TransformedProperties {
  panning: DeviceParameter;
  sends: DeviceParameter[];
  volume: DeviceParameter;
}

export interface SettableProperties {}

export interface ObservableProperties {
  panning: RawDeviceParameter;
  sends: RawDeviceParameter[];
  volume: RawDeviceParameter;
}

export interface RawChainMixerDevice {
  id: string;
  volume: string;
}

export class ChainMixerDevice extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, public raw: RawChainMixerDevice) {
    super(ableton, "chain-mixer-device", raw.id);

    this.transformers = {
      panning: (v) => new DeviceParameter(ableton, v),
      sends: (v) => v.map((s) => new DeviceParameter(ableton, s)),
      volume: (v) => new DeviceParameter(ableton, v),
    };
  }
}
