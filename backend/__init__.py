#! ../env/bin/python
# -*- coding: utf-8 -*-

__author__ = 'Unnamed'
__email__ = ''
__version__ = '1.0.0'

from flask import Flask
from flask_cors import CORS
from webassets.loaders import PythonLoader as PythonAssetsLoader

from backend.controllers.api import api
from backend import assets
from backend.models import db

from backend.extensions import (
    cache,
    assets_env,
    debug_toolbar,
    login_manager,
    migrate,
)


def create_app(object_name):
    """
    An flask application factory, as explained here:
    http://flask.pocoo.org/docs/patterns/appfactories/

    Arguments:
        object_name: the python path of the config object,
                     e.g. {{cookiecutter.repo_name}}.settings.ProdConfig

        env: The name of the current environment, e.g. prod or dev
    """

    app = Flask(__name__)

    app.config.from_object(object_name)

    #initialize CORS
    CORS(app, resources={r"/*":{"origins":"*"}})

    # initialize the cache
    cache.init_app(app)

    # initialize the debug tool bar
    debug_toolbar.init_app(app)

    # initialize SQLAlchemy
    db.init_app(app)

    #initialize migration
    migrate.init_app(app, db)

    #initialize socket
    # socketio.init_app(app)

    login_manager.init_app(app)

    # Import and register the different asset bundles
    assets_env.init_app(app)
    assets_loader = PythonAssetsLoader(assets)
    for name, bundle in assets_loader.load_bundles().items():
        assets_env.register(name, bundle)

    # register our blueprints
    app.register_blueprint(api)

    return app
