from typing import Dict

from flask_restful import Resource
from flask import jsonify, request

from sqlalchemy.exc import IntegrityError

from app.services.trips import TripsService


class Trips(Resource):
    service = TripsService()

    def get(self, driver_id=None) -> Dict:
        if driver_id:
            trips = self.service.get_all_trips_with_driver_id(driver_id)
            return {'trips': trips}
        return {'trips': self.service.get_all_trips()}

    def put(self, trip_id) -> Dict:
        payload = request.get_json()
        return self.service.update(payload, trip_id)

    def post(self):
        try:
            payload = request.get_json()
            return self.service.create(payload)
        except IntegrityError as ex:
            return {"message": "Email exists, sign in."}, 406
        except Exception as ex:
            print(ex)

    def delete(self, trip_id) -> Dict:
        return {'Deleted': trip_id}
