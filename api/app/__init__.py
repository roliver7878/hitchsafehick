from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from app.ext import db, migrate

from app.models import tables

from app.resources.login import Login
from app.resources.matches import Matches
from app.resources.trips import Trips
from app.resources.users import Users
from app.resources.drivers import Drivers
from app.resources.traveler import Travelers
from app.resources.create_account import CreateAccount


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://docker:docker@127.0.0.1:5432/docker'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    api = Api(app)
    CORS(app)
    # Extensions
    db.configure(app)
    migrate.configure(app)
    # Routes
    api.add_resource(Login, '/login')
    api.add_resource(CreateAccount, '/create')
    api.add_resource(Users, '/users', '/users/<int:user_id>')
    api.add_resource(Travelers, '/travelers', '/travelers/<int:traveler_id>')
    api.add_resource(Drivers, '/drivers', '/drivers/<int:driver_id>')
    api.add_resource(Trips, '/trips', '/trips/<int:driver_id>')
    api.add_resource(Matches, '/matches', '/matches/<int:id>')

    return app
