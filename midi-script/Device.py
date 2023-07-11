from __future__ import absolute_import
from .Interface import Interface
from .DeviceParameter import DeviceParameter
from .Chain import Chain
from .DrumPad import DrumPad
# from .DrumChain import DrumChain

class Device(Interface):
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

    def __init__(self, c_instance, socket):
        super(Device, self).__init__(c_instance, socket)

    def get_parameters(self, ns):
        return map(DeviceParameter.serialize_device_parameter, ns.parameters)
    
    def get_chains(self, ns):
        return map(Chain.serialize_chain, ns.chains)

    def get_type(self, ns):
        return str(ns.type)
    
    def get_class_name(self, ns):
        return str(ns.class_name)
    
    def get_name(self, ns):
        return str(ns.name)
        
    def get_drum_pads(self, ns):
        return map(DrumPad.serialize_drum_pad, ns.drum_pads)
    
    def get_return_chains(self, ns): 
        return map(Chain.serialize_chain, ns.return_chains )
    
