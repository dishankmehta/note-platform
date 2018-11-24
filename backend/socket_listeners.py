import os
import json
from backend import create_app
from .models import User, Note
from flask_socketio import  SocketIO, join_room, leave_room, emit, send

env = os.environ.get('BACKEND_ENV', 'dev')
app = create_app('backend.settings.%sConfig' % env.capitalize())

socketio = SocketIO(app)

ROOMS = dict()

GROUP_META_DATA = dict()

CONNECT = 'CONNECT'
TYPE_JOINED = 'JOINED'


@socketio.on('connect')
def connect():
    payload = dict(type=CONNECT)
    emit('connect', payload)

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
    user_id = data.get('user_id', None)
    if not note_id or not user_id:
        return
    socketio.join_room(user_id)
    payload = dict(type=TYPE_JOINED)
    socketio.emit('join_note', payload)

@socketio.on('note_body')
def note_body(data):
    print("spitting note content", data)
    note_id = data.get('note_id', None)
    note_body = data.get('note_body', None)
    selection = data.get('selection', None)
    if note_id:
        GROUP_META_DATA[note_id] = note_body
    payload = dict(note_body=note_body, selection=selection)
    socketio.emit('note_body', payload)

@socketio.on('selection')
def note_selection(data):
    selection = data.get('selection', None)
    if not selection:
        return
    payload = dict(selection=selection)
    socketio.emit('selection', payload)


@socketio.on("leave_note")
def leave_note(data):
    print("leaving note")
    note_id = data.get('note_id', None)
    socketio.leave_room(note_id)