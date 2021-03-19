from typing import Dict

from flask_restful import Resource
from flask import jsonify, request

from sqlalchemy.exc import IntegrityError

from app.services.users import UsersService


class Users(Resource):
    service = UsersService()

    def get(self, user_id=None) -> Dict:
        if user_id:
            user = self.service.get_one(user_id)
            return {'user': user}
        users = self.service.get_all()
        return {'users': users}

    def put(self, user_id) -> Dict:
        payload = request.get_json()
        return self.service.update(payload, user_id)

    def post(self):
        try:
            payload = request.get_json()
            return self.service.create(payload)
        except IntegrityError as ex:
            return {"message": "Email exists, sign in."}, 406
        except Exception as ex:
            print(ex)

    def delete(self, user_id) -> Dict:
        return {'Deleted': user_id}
