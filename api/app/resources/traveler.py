from typing import Dict

from flask_restful import Resource
from flask import jsonify, request

from app.services.traveler import TravelerService


class Travelers(Resource):
    service = TravelerService()

    def get(self, traveler_id=None) -> Dict:
        if traveler_id:
            traveler = self.service.get_one(traveler_id)
            return {'traveler': traveler}
        travelers = self.service.get_all()
        return {'travelers': travelers}

    def post(self) -> Dict:
        payload = request.get_json()
        return self.service.create(payload)
