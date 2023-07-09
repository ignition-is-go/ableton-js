from __future__ import absolute_import
from .Interface import Interface
from .Chain import Chain

class DrumPad(Interface):
    @staticmethod
    def serialize_DrumPad(DrumPad):
        if DrumPad is None:
            return None

        DrumPad_id = Interface.save_obj(DrumPad)
        return {
            "id": DrumPad_id,
            "name": DrumPad.name,
            # "type": str(DrumPad.type),
            "class_name": DrumPad.class_name,
        }

    def __init__(self, c_instance, socket):
        super(DrumPad, self).__init__(c_instance, socket)

    def getChains(self, ns):
        return map(Chain.serialize_chain, ns.chains)

    # def get_type(self, ns):
    #     return str(ns.type)
