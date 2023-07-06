from __future__ import absolute_import
from .Interface import Interface
from .Device import Device
from.MixerDevice import MixerDevice

class DrumChain (Interface):

  @staticmethod
  def serialize_drumChain (drumChain): 
      if drumChain is None:
          return None
      drumChain_id = Interface.save_obj(drumChain)
      return {
          "id":drumChain_id,
          "name": drumChain.name,
          "mixer_device": chain.mixer_device,
          "devices": drumChain.devices
      }
  def __init__(self, c_instance, socket):
        super(DrumChain, self).__init__(c_instance, socket)

  def get_devices(self,ns):
      return map(Device.serialize_device, ns.devices)

  def get_mixer_device(self, ns):
    return MixerDevice.serialize_mixer_device(ns.mixer_device)



