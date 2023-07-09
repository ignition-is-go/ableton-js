from __future__ import absolute_import
from .Interface import Interface
from .Device import Device
from .ChainMixerDevice import ChainMixerDevice

class Chain (Interface):
    
    @staticmethod
    def serialize_chain (chain): 
        if chain is None:
            return None
        chain_id = Interface.save_obj(chain)
        return {
            "id":chain_id,
            "name": chain.name,
            # "devices": chain.devices,
            # "mixer_device": chain.mixer_device,
            # "mute": chain.mute,
            # "muted_via_solo": chain.muted_via_solo,
            # "solo": chain.solo
        }
    
    def __init__(self, c_instance, socket):
      super(Chain, self).__init__(c_instance, socket)

    def get_devices(self, ns):
        return map(Device.serialize_device, ns.devices)
    
    def get_mixer_device(self, ns):
        return map(ChainMixerDevice.serialize_ChainMixerDevice, ns.mixer_device)