import uuid
from typing import Dict

from flask_restful import Resource
from flask import jsonify, request
from sqlalchemy.orm.exc import NoResultFound

from app.services.users import UsersService


class Login(Resource):
    service = UsersService()

    def get(self, user_id=None) -> Dict:
        user = self.service.get_one(user_id)
        return {'user': user}

    def post(self):
        try:
            payload = request.get_json()
            login = self.service.login(payload)
            if login:
                login['token'] = str(uuid.uuid4())
                return login
        except NoResultFound:
            return {"data": "not authorized"}, 401
        except Exception as ex:
            print(ex)
