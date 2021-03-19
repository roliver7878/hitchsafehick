from typing import Dict

from flask_restful import Resource
from flask import jsonify, request

from app.services.drivers import DriversServices


class Drivers(Resource):
    service = DriversServices()

    def get(self, driver_id=None) -> Dict:
        if driver_id:
            driver = self.service.get_one(driver_id)
            return {'driver': driver}
        drivers = self.service.get_all()
        return {'drivers': drivers}

    def post(self) -> Dict:
        payload = request.get_json()
        return self.service.create(payload)
