from __future__ import absolute_import
from .Interface import Interface
from .Chain import Chain
from .DrumPad import DrumPad

class RackDevice (Interface):
    
    @staticmethod
    def serialize_rack(rack):
        if rack is None:
            return None
        rack_id = Interface.save_obj(rack)
        return {
            "id": rack_id,
            "name":rack.name,
            "class_name": rack.class_name
        }
    def __init__(self, c_instance, socket):
        super(RackDevice, self).__init__(c_instance, socket)

    def get_chains(self, ns):
        return map(Chain.serialize_chain, ns.chains)
    
    def get_drum_pads(self, ns):
        return map(DrumPad.serialize_drum_pad, ns.drum_pads)
    
    # def get_return_chains(self, ns): 
    #     return map(Chain.serialize_chain, ns.return_chains )
    

