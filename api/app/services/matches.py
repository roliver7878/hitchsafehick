from typing import Dict

from app.models.tables import Match


class MatchesService:
    match_model = Match

    def get_one(self, match_id):
        return self.match_model.find_by_id(match_id)

    def get_matches_by_traveler_id(self, traveler_id):
        return self.match_model.find_all_by_traveler_id(traveler_id)

    def get_matches_by_driver_id(self, driver_id):
        return self.match_model.find_all_by_driver_id(driver_id)

    def get_all(self):
        return self.match_model.find_all()

    def create(self, payload) -> Dict:
        match = self.match_model(
            driver_id=payload['driver_id'],
            traveler_id=payload['traveler_id'],
            trip_id=payload['trip_id'])
        match.save()
        return match.to_dict()
