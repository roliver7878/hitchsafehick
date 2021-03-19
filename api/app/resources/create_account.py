from typing import Dict

from flask_restful import Resource
from flask import jsonify, request

from app.services.users import UsersService


class CreateAccount(Resource):
    service = UsersService()

    def get(self, user_id=None) -> Dict:
        user = self.service.get_one(user_id)
        return {'user': user}

    def post(self) -> Dict:
        try:
            payload = request.get_json()
            return self.service.create(payload)
        except Exception as ex:
            print(ex)
