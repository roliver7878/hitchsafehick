from typing import Dict

from flask_restful import Resource
from flask import jsonify, request

from sqlalchemy.exc import IntegrityError

from app.services.matches import MatchesService


class Matches(Resource):
    service = MatchesService()

    def get(self, id=None) -> Dict:
        if id:
            payload = request.get_json()
            if payload.get('travelers') is True:
                return self.service.get_matches_by_traveler_id(id)
            if payload.get('drivers') is True:
                return self.service.get_matches_by_driver_id(id)
        matches = self.service.get_all()
        return {'matches': matches}

    def post(self):
        try:
            payload = request.get_json()
            return self.service.create(payload)
        except IntegrityError as ex:
            return {"message": "Cant Match"}, 406
        except Exception as ex:
            print(ex)
