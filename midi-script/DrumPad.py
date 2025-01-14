from __future__ import absolute_import
from .Interface import Interface

class DrumPad(Interface):
    @staticmethod
    def serialize_drum_pad(DrumPad):
        if DrumPad is None:
            return None

        DrumPad_id = Interface.save_obj(DrumPad)
        return {
            "id": DrumPad_id,
            "name": DrumPad.name,
            "note": DrumPad.note
        }

    def __init__(self, c_instance, socket):
        super(DrumPad, self).__init__(c_instance, socket)