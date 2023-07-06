from __future__ import absolute_import
from .Interface import Interface
from .Device import Device
from.MixerDevice import MixerDevice

class ChainMixerDevice (Interface):

  @staticmethod
  def serialize_ChainMixerDevice (chainMixerDevice): 
      if chainMixerDevice is None:
          return None
      chainMixerDevice_id = Interface.save_obj(chainMixerDevice)
      return {
          "id":chainMixerDevice_id,
          "name": chainMixerDevice.name,
          "mixer_device": chainMixerDevice.mixer_device,
          "devices": chainMixerDevice.devices
      }
  def __init__(self, c_instance, socket):
        super(chainMixerDevice, self).__init__(c_instance, socket)

  def get_devices(self,ns):
      return map(Device.serialize_device, ns.devices)

#   def get_mixer_device(self, ns):
#     return MixerDevice.serialize_mixer_device(ns.mixer_device)



