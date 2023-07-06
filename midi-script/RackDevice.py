from __future__ import absolute_import
from .Interface import Interface
from .Chain import Chain

class RackDevice (Interface):
    
    @staticmethod
    def serialize_rack(rack):
        if rack is None:
            return None
        rack_id = Interface.save_obj(rack)
        return {
            "id": rack_id,
            "name":rack.name,
            "class_name": rack.class_name,
            "chains": rack.chains,
            "return_chains": rack.return_chains,
            "has_macro_mappings": rack.has_macro_mappings
        }
    
    def get_chains(self, ns):
        return map(Chain.serialize_chain, ns.chains)

    def __init__(self, c_instance, socket):
        super(RackDevice, self).__init__(c_instance, socket)
