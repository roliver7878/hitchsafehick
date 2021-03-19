from typing import Dict

from app.models.tables import Traveler


class TravelerService:
    traveler_model = Traveler

    def get_one(self, traveler_id):
        return self.traveler_model.find_by_id(traveler_id)

    def get_all(self):
        return self.traveler_model.find_all()

    def create(self, payload) -> Dict:
        # TODO mudar
        traveler = self.traveler_model(
            name=payload['name'],
            gender=payload['gender'],
            age=payload['age'],
            police_check=payload['police_check'],
            user_id=payload['user_id']
        )
        traveler.save()
        return traveler.to_dict()

    def update(self, payload, user_id):
        # TODO mudar
        traveler = self.traveler_model.create_instance_with_id(user_id)
        traveler.update(payload)
        return True
