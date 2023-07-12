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
  crossfader: RawDeviceParameter[];
  cue_volume: RawDeviceParameter[];
  left_split_stereo: RawDeviceParameter[];
  panning: RawDeviceParameter[];
  // panning_mode: PanningMode;
  right_split_stereo: RawDeviceParameter[];
  sends: RawDeviceParameter[];
  song_tempo: RawDeviceParameter[];
  track_activator: RawDeviceParameter[];
  volume: RawDeviceParameter[];
}

export interface TransformedProperties {
  crossfader: DeviceParameter[];
  cue_volume: DeviceParameter[];
  left_split_stereo: DeviceParameter[];
  panning: DeviceParameter[];
  right_split_stereo: DeviceParameter[];
  sends: DeviceParameter[];
  song_tempo: DeviceParameter[];
  track_activator: DeviceParameter[];
  volume: DeviceParameter[];
}

export interface SettableProperties {
  crossfade_assign: CrossfadeAssignment;
  // panning_mode: string;
}

export interface ObservableProperties {
  crossfade_assign: CrossfadeAssignment;
  // panning_mode: string;
  sends: RawDeviceParameter[];
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
      crossfader: (vs) => vs.map((v) => new DeviceParameter(ableton, v)),
      cue_volume: (vs) => vs.map((v) => new DeviceParameter(ableton, v)),
      left_split_stereo: (vs) => vs.map((v) => new DeviceParameter(ableton, v)),
      panning: (vs) => vs.map((v) => new DeviceParameter(ableton, v)),
      right_split_stereo: (vs) =>
        vs.map((v) => new DeviceParameter(ableton, v)),
      sends: (vs) => vs.map((s) => new DeviceParameter(ableton, s)),
      song_tempo: (vs) => vs.map((v) => new DeviceParameter(ableton, v)),
      track_activator: (vs) => vs.map((v) => new DeviceParameter(ableton, v)),
      volume: (vs) => vs.map((v) => new DeviceParameter(ableton, v)),
    };
  }
}
