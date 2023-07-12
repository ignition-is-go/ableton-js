from __future__ import absolute_import
from .Interface import Interface
from .Device import Device
from .MixerDevice import MixerDevice


class Chain (Interface):
    
    @staticmethod
    def serialize_chain (chain): 
        if chain is None:
            return None
        chain_id = Interface.save_obj(chain)
        return {
            "id":chain_id,
            "name": chain.name
        }
    
    def __init__(self, c_instance, socket):
      super(Chain, self).__init__(c_instance, socket)

    def get_devices(self, ns):
        return map(Device.serialize_device, ns.devices)
    
    def get_mixer_device(self, ns):
        return map(MixerDevice.serialize_MixerDevice, ns.mixer_device)