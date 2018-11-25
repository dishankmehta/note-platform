import json
from flask import Blueprint, render_template, flash, request, redirect, url_for, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from flask_cors import CORS
from backend.extensions import cache
from backend.forms import LoginForm
from backend.models import db, User, Note, PrivateNotes, UserGroupInfo, Group, PublicNotes, CheatSheet

api = Blueprint('api', __name__, url_prefix="/")
# CORS(api)

@api.after_request
def api_after_request(response):
    """
    Inject CORS header in the API response.
    """
    request_origin = request.headers.get('Origin', '')
    print("Origin: ", request_origin)
    response.headers['Access-Control-Allow-Origin'] = request_origin
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Headers'] = 'origin, content-type, accept, Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, DELETE'
    return response


@api.route('/')
def home():
    return render_template('index.html')

@api.route('/sample')
def sample():
    print('sample called')
    return jsonify(data='sample api')


@api.route('/edit_note', methods=["POST"])
def edit_note():

    print("fssars")
    data = request.get_json()
    print("Incoming data in edit note:", data)

    note = Note.query.filter_by(id=data.get('note_id')).first()
    note.title = data.get('title')
    note.note_type = data.get('note_type')
    note.note_body = data.get('note_body')
    note.upvotes = data.get('upvotes')
    note.downvotes = data.get('downvotes')
    note.views = data.get('views')
    note.tags = data.get('tags')
    note.color = data.get('color')
    db.session.commit()
    return jsonify(note=[], success=True)


@api.route('/add_note', methods=["POST"])
def add_note():

    data = request.get_json()
    title = data.get('title')
    note_type = data.get('note_type')
    note_body = data.get('note_body')
    upvotes = data.get('upvotes')
    downvotes = data.get('downvotes')
    views = data.get('views')
    tags = data.get('tags')
    color = data.get('color')
    user_id = data.get('user_id')

    print(data)
    note = Note(title, note_type, note_body, upvotes, downvotes, views, tags, color)
    db.session.add(note)
    db.session.commit()
    note_type = int(note_type)
    
    # if private note
    last_item = Note.query.order_by(Note.id.desc()).first()
    print("Last item is:", last_item.id)
    last = str(last_item.id)
    last += ","

    if note_type == 1:
        user_data = PrivateNotes.query.filter_by(user_id=user_id).first()
        print("User data; ", user_data)
        if user_data is not None:
            user_data.note_id += last
            db.session.commit()
        else:
            private_note = PrivateNotes(user_id, last)
            db.session.add(private_note)
            db.session.commit()

    # if public note
    if note_type == 2:
        user_data = PublicNotes.query.filter_by(user_id=user_id).first()
        if user_data is not None:
            user_data.note_id += last
            db.session.commit()
        else:
            public_notes = PublicNotes(user_id, last)
            db.session.add(public_notes)
            db.session.commit()

    if note_type == 3:
        user_data = CheatSheet.query.filter_by(user_id=user_id).first()
        if user_data is not None:
            user_data.note_id += last
            db.session.commit()
        else:
            cheatsheet = CheatSheet(user_id, last)
            db.session.add(cheatsheet)
            db.session.commit()

    return jsonify(note=[], success=True)


@api.route("/upvote", methods=["POST"])
def upvote():

    data = request.get_json()
    note = Note.query.filter_by(id=data.get('note_id')).first()
    note.upvotes += 1
    db.session.commit()
    return jsonify(note=[], success=True)


@api.route("/downvote", methods=["POST"])
def downvote():

    data = request.get_json()
    note = Note.query.filter_by(id=data.get('note_id')).first()
    note.downvotes += 1
    db.session.commit()
    return jsonify(note=[], success=True)



@api.route("/register", methods=["POST"])
def register():

    print("inside register")
    data = request.get_json()
    if not data:
        return jsonify(error='Fill all the fields!!')

    print(data)
    name = data.get('name')
    username = data.get('username')
    user = User.query.filter_by(username=username).first()
    print (user)
    if user is not None:
        return jsonify(error='Username already taken', success=False)
    password = data.get('password')
    email = data.get('email')
    user = User.query.filter_by(email=email).first()
    if user is not None:
        return jsonify(error='Email is already registered', success=False)

    tags = data.get('tags')
    major = data.get('major')
    user = User(name, username, password, email, tags, major)
    db.session.add(user)
    db.session.commit()
    return jsonify(success=True)

@api.route("/login", methods=["POST"])
def login():
    data = request.get_json() or dict()

    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify(error='Invalid credentials', success=False), 422

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        login_user(user)
        return jsonify(user=user.to_dict(), success=True), 200
    return jsonify(error='Invalid credentials', success=False), 422


@api.route("/logout")
def logout():
    logout_user()
    return jsonify(success=True)


@api.route("/restricted")
@login_required
def restricted():
    return "You can only see this if you are logged in!", 200


@api.route("/get_private_notes", methods=["POST"])
def get_private_notes():

    data = request.get_json()
    private_note = PrivateNotes.query.filter_by(user_id=data.get('user_id')).first()

    if private_note is None:
        return jsonify(note=None, success=True)
    else:
        print(private_note.note_id)
        note_id_list = private_note.note_id
        print("Note_id_list", note_id_list)
        note_object = {}
        note_id_list = note_id_list.split(",")
        i = 0

        for id in note_id_list:
                print("Note id:", id)
                if id != '':
                    note = Note.query.filter_by(id=id).first()
                    note_object[i] = {}
                    note_object[i]['id'] = note.id
                    note_object[i]['title'] = note.title
                    note_object[i]['note_type'] = note.note_type
                    note_object[i]['note_body']= note.note_body
                    note_object[i]['upvotes'] = note.upvotes
                    note_object[i]['downvotes'] = note.downvotes
                    note_object[i]['views'] = note.views
                    note_object[i]['tags'] = note.tags
                    note_object[i]['color']= note.color
                    i += 1
        print (note_object)
        print (type(note_object))
        return jsonify(notes=note_object, success=True)


@api.route("/get_public_notes", methods=["POST"])
def get_public_notes():

    data = request.get_json()
    public_note = PublicNotes.query.filter_by(user_id=data.get('user_id')).first()

    if public_note is None:
        return jsonify(note=None, success=True)
    else:
        print(public_note.note_id)
        note_id_list = public_note.note_id
        print("Note_id_list", note_id_list)
        note_object = {}
        note_id_list = note_id_list.split(",")
        i = 0

        for id in note_id_list:
                print("Note id:", id)
                if id != '':
                    note = Note.query.filter_by(id=id).first()
                    note_object[i] = {}
                    note_object[i]['id'] = note.id
                    note_object[i]['title'] = note.title
                    note_object[i]['note_type'] = note.note_type
                    note_object[i]['note_body']= note.note_body
                    note_object[i]['upvotes'] = note.upvotes
                    note_object[i]['downvotes'] = note.downvotes
                    note_object[i]['views'] = note.views
                    note_object[i]['tags'] = note.tags
                    note_object[i]['color']= note.color
                    i += 1
        print(note_object)
        print(type(note_object))
        return jsonify(notes=note_object, success=True)


@api.route("/get_cheatsheets", methods=["POST"])
def get_cheatsheets():

    data = request.get_json()
    public_note = CheatSheet.query.filter_by(user_id=data.get('user_id')).first()

    if public_note is None:
        return jsonify(note=None, success=True)
    else:
        print(public_note.note_id)
        note_id_list = public_note.note_id
        print("Note_id_list", note_id_list)
        note_object = {}
        note_id_list = note_id_list.split(",")
        i = 0

        for id in note_id_list:
                print("Note id:", id)
                if id != '':
                    note = Note.query.filter_by(id=id).first()
                    note_object[i] = {}
                    note_object[i]['id'] = note.id
                    note_object[i]['title'] = note.title
                    note_object[i]['note_type'] = note.note_type
                    note_object[i]['note_body']= note.note_body
                    note_object[i]['upvotes'] = note.upvotes
                    note_object[i]['downvotes'] = note.downvotes
                    note_object[i]['views'] = note.views
                    note_object[i]['tags'] = note.tags
                    note_object[i]['color'] = note.color
                    i += 1
        print (note_object)
        print (type(note_object))
        return jsonify(notes=note_object, success=True)


@api.route("/delete_note", methods=["POST"])
def delete_note():

    data = request.get_json()
    Note.query.filter_by(id=data.get('note_id')).delete()

    if data.get('note_type') == 1:
        private_note = PrivateNotes.query.filter_by(user_id=str(data.get('user_id'))).first()
        note_list = private_note.note_id

        note_list = note_list.split(",")
        print("Note list: ", note_list)
        note_list.remove(str(data.get('note_id')))
        result = ""
        for item in note_list:
            if item is not None:
                result += item + ","
        private_note.note_id = result
        db.session.commit()

    if data.get('note_type') == 1:
        private_note = PrivateNotes.query.filter_by(user_id=str(data.get('user_id'))).first()
        note_list = private_note.note_id

        note_list = note_list.split(",")
        print("Note list: ", note_list)
        note_list.remove(str(data.get('note_id')))
        result = ""
        for item in note_list:
            if item is not '':
                result += item + ","
        private_note.note_id = result
        db.session.commit()

    if data.get('note_type') == 2:
        public_note = PublicNotes.query.filter_by(user_id=str(data.get('user_id'))).first()
        note_list = public_note.note_id
        note_list = note_list.split(",")
        print("Note list: ", note_list)
        note_list.remove(str(data.get('note_id')))
        result = ""
        for item in note_list:
            if item is not '':
                result += item + ","

        public_note.note_id = result
        db.session.commit()

    if data.get('note_type') == 3:

        cheatsheet = CheatSheet.query.filter_by(user_id=str(data.get('user_id'))).first()
        note_list = cheatsheet.note_id
        note_list = note_list.split(",")
        print("Note list: ", note_list)
        note_list.remove(str(data.get('note_id')))
        result = ""
        for item in note_list:
            if item is not '':
                result += item + ","

        cheatsheet.note_id = result
        db.session.commit()

    return jsonify(notes=[], success=True)
