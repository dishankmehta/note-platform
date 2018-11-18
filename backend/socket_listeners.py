import os
import json
from backend import create_app
from models import User, Note
from flask_socketio import  SocketIO, join_room, leave_room, emit

env = os.environ.get('BACKEND_ENV', 'dev')
app = create_app('backend.settings.%sConfig' % env.capitalize())

socketio = SocketIO(app)

ROOMS = dict()

CONNECT = 'CONNECT'
TYPE_JOINED = 'JOINED'


@socketio.on('connect')
def connect():
    print("Connected to socket!")
    payload = dict(type=CONNECT)
    socketio.emit(CONNECT, payload)

@socketio.on('disconnect')
def disconnect():
    print("Disconnected to socket!")

@socketio.on('send_change_color')
def change_color(color):
    print("Color: ", color)
    socketio.emit('receive_change_color', color)

@socketio.on('join_note')
def join_note(data):
    print("joining note")
    note_id = data.get('note_id', None)
    user_id = data.get('user_id', None)
    if not note_id or not user_id:
        return
    # room = ROOMS.get(note_id, None)
    # if not room:
    #     ROOMS[note_id] = []
    socketio.join_room(note_id)
    payload = dict(type=TYPE_JOINED)
    socketio.emit(TYPE_JOINED, payload)

@socketio.on("leave_note")
def leave_note(data):
    print("leaving note")
    note_id = data.get('note_id', None)
    socketio.leave_room(note_id)