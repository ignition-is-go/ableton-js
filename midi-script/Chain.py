from __future__ import absolute_import
from .Interface import Interface
from .MixerDevice import MixerDevice


class Chain (Interface):
    
    @staticmethod
    def serialize_chain (chain): 
        if chain is None:
            return None
        chain_id = Interface.save_obj(chain)
        return {
            "id": chain_id,
            "name": chain.name
        }
    @staticmethod
    def serialize_device(device):
        if device is None:
            return None

        device_id = Interface.save_obj(device)
        return {
            "id": device_id,
            "name": device.name,
            "type": str(device.type),
            "class_name": device.class_name,
        }
    @staticmethod
    def serialize_mixer_device(mixer_device):
        if mixer_device is None:
            return None
        
        mixer_id = Interface.save_obj(mixer_device)
        return {"id": mixer_id, "name": 'chainMixer'}
        
    def __init__(self, c_instance, socket):
     super(Chain, self).__init__(c_instance, socket)

    def get_devices(self, ns):
        return map(Chain.serialize_device, ns.devices)

    def get_mixer_device(self, ns):
     return Chain.serialize_mixer_device, ns.mixer_device