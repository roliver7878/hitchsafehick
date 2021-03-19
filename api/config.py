import os
import random
import string

from decouple import config


class Config(object):
    DEBUG = True
    DEVELOPMENT = True
    SECRET_KEY = 'do-i-really-need-this'
    FLASK_HTPASSWD_PATH = '/secret/.htpasswd'
    FLASK_SECRET = SECRET_KEY
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://username:password@127.0.0.1:5432/db_name'
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class ProductionConfig(Config):
    DEVELOPMENT = False
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://username:password@127.0.0.1:5432/db_name'
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://username:password@127.0.0.1:5432/db_name'
    SQLALCHEMY_TRACK_MODIFICATIONS = True


BASE_DIR = os.path.abspath('.')

# DEBUG = True
#
# SECRET_KEY = 'teste'
#
# SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://rafael_rotiroti:123456@127.0.0.1:5432/crud'

# SQLALCHEMY_TRACK_MODIFICATIONS = True
