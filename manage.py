#!/usr/bin/env python
import os
from flask import current_app
from flask_script import Manager, Server
from flask_script.commands import ShowUrls, Clean
from flask_migrate import MigrateCommand
from backend.socket_listeners import socketio, app
from flask_socketio import join_room, leave_room, emit
from backend import create_app
from backend.models import db, User

# default to dev config because no one should use this in
# production anyway
# env = os.environ.get('BACKEND_ENV', 'dev')
# app = create_app('backend.settings.%sConfig' % env.capitalize())

manager = Manager(app)
manager.add_command("server", Server(threaded=True))
manager.add_command("show-urls", ShowUrls())
manager.add_command("clean", Clean())
manager.add_command("db", MigrateCommand)

@manager.shell
def make_shell_context():
    """ Creates a python REPL with several default imports
        in the context of the app
    """

    return dict(app=app, db=db, User=User)


@manager.command
def createdb():
    """ Creates a database with all of the tables defined in
        your SQLAlchemy models
    """
    db.drop_all()
    db.create_all()
    #user = User('user', 'user', 'user@gmail.com', 'tag', 'masters')
    #db.session.add(user)
    #db.session.commit()

@manager.command
def runsocket():
    socketio.run(
        app,
        host="0.0.0.0"
    )

if __name__ == "__main__":
    manager.run()
