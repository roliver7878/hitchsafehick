from typing import Dict

from app.models.tables import User


class UsersService:
    user_model = User

    def login(self, payload):
        return self.user_model.login_with_email(payload['email'])

    def get_one(self, user_id):
        return self.user_model.find_by_id(user_id)

    def get_all(self):
        return self.user_model.find_all()

    def create(self, payload) -> Dict:
        user = self.user_model(email=payload['email'], password=payload['password'], user_type=payload['user_type'])
        user.save()
        return user.to_dict()

    def update(self, payload, user_id):
        user = self.user_model.create_instance_with_id(user_id)
        user.update(email=payload['email'], password=payload['password'])
        return True
