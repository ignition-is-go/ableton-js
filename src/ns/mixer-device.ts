import { Ableton } from "..";
import { Namespace } from ".";
import { DeviceParameter, RawDeviceParameter } from "./device-parameter";

// export enum PanningMode {
//   Stereo,
//   StereoSplit,
// }

export enum CrossfadeAssignment {
  A,
  None,
  B,
}

export interface GettableProperties {
  // crossfade_assign: CrossfadeAssignment;
  crossfader: RawDeviceParameter;
  cue_volume: RawDeviceParameter;
  panning: RawDeviceParameter;
  // panning_mode: PanningMode;
  sends: RawDeviceParameter[];
  song_tempo: RawDeviceParameter;
  track_activator: RawDeviceParameter;
  volume: RawDeviceParameter;
}

export interface TransformedProperties {
  crossfader: DeviceParameter;
  cue_volume: DeviceParameter;
  panning: DeviceParameter;
  sends: DeviceParameter[];
  song_tempo: DeviceParameter;
  track_activator: DeviceParameter;
  volume: DeviceParameter;
}

export interface SettableProperties {
  crossfade_assign: CrossfadeAssignment;
  volume: DeviceParameter;
  panning: DeviceParameter;
  crossfader: DeviceParameter;
  cue_volume: DeviceParameter;
  sends: DeviceParameter[];
  song_tempo: DeviceParameter;
  track_activator: DeviceParameter;
}

export interface ObservableProperties {
  crossfade_assign: CrossfadeAssignment;
  sends: RawDeviceParameter[];
  volume: RawDeviceParameter;
  panning: RawDeviceParameter;
  cue_volume: RawDeviceParameter;
  crossfader: RawDeviceParameter;
  song_tempo: RawDeviceParameter;
  track_activator: RawDeviceParameter;
}

export interface RawMixerDevice {
  id: string;
  volume: string;
  name: string;
}

export class MixerDevice extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, public raw: RawMixerDevice) {
    super(ableton, "mixer-device", raw.id);

    this.transformers = {
      crossfader: (v) => new DeviceParameter(ableton, v),
      cue_volume: (v) => new DeviceParameter(ableton, v),
      panning: (v) => new DeviceParameter(ableton, v),
      sends: (vs) => vs.map((s) => new DeviceParameter(ableton, s)),
      song_tempo: (v) => new DeviceParameter(ableton, v),
      track_activator: (v) => new DeviceParameter(ableton, v),
      volume: (v) => new DeviceParameter(ableton, v),
    };
  }
}
