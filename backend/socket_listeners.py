import os
from backend import create_app
from flask_socketio import  SocketIO, join_room, leave_room, emit

env = os.environ.get('BACKEND_ENV', 'dev')
app = create_app('backend.settings.%sConfig' % env.capitalize())

socketio = SocketIO(app)

ROOMS = dict()

@socketio.on('connect')
def connect():
    print("Connected to socket!")
    emit('connect', {'data': "sample"})

@socketio.on('disconnect')
def disconnect():
    print("Disconnected to socket!")

@socketio.on('send_change_color')
def change_color(color):
    print("Color: ", color)
    socketio.emit('receive_change_color', color)