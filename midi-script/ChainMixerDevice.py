from __future__ import absolute_import
from .Interface import Interface
from .DeviceParameter import DeviceParameter



class ChainMixerDevice (Interface):

  @staticmethod
  def serialize_ChainMixerDevice (chainMixerDevice): 
      if chainMixerDevice is None:
          return None
      chainMixerDevice_id = Interface.save_obj(chainMixerDevice)
      return {
          "id":chainMixerDevice_id,
          "name": chainMixerDevice.name
        #   "chain_activator": chainMixerDevice.chain_activator,
        #   "panning": chainMixerDevice.panning,
        #   "sends": chainMixerDevice.sends,
        #   "volume": chainMixerDevice.volume
      }
  def __init__(self, c_instance, socket):
        super(ChainMixerDevice, self).__init__(c_instance, socket)

  def get_parameters(self, ns): 
        return map(DeviceParameter.serialize_device_parameter, ns.devices)