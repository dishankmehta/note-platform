import json
from flask import Blueprint, render_template, flash, request, redirect, url_for, jsonify, session
from flask_login import login_user, logout_user, login_required, current_user
from flask_cors import CORS
from backend.extensions import cache
from backend.forms import LoginForm
from backend.models import db, User, Note, PrivateNotes, UserGroupInfo, Group, PublicNotes, CheatSheet
import operator
from backend.models import db, User, Note, PrivateNotes, UserGroupInfo, Group, PublicNotes, CheatSheet, GroupNotes


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

@api.route('/edit_group_note', methods=['POST'])
def edit_group_note():
    data = request.get_json() or dict()

    if not data:
        return jsonify(success=False)
    
    data = request.get_json()
    title = data.get('title')
    note_id = data.get('note_id')
    user_id = data.get('user_id')
    note_type = data.get('note_type')
    note_body = data.get('note_body')
    note_text = data.get('note_text')
    upvotes = data.get('upvotes')
    downvotes = data.get('downvotes')
    views = data.get('views')
    tags = data.get('tags')
    color = data.get('color')
    group_user_ids = data.get('group_user_emails') 

    group_user_ids_list = group_user_ids.split(",")
    group_notes = GroupNotes.query.all()
    group_note_user_list = [item.user_id for item in group_notes]

    for item in group_note_user_list:
        note_ids = GroupNotes.query.filter_by(user_id=item).first().note_id.split(",")
        if item not in group_user_ids_list:
            for id in range(len(note_ids)):
                if note_ids[id] is not None and note_ids[id] == note_id:
                    del note_ids[id]
                    if len(note_ids) == 0:
                        note_ids = ""
                    note_ids = ",".join(note_ids)
                    group_obj = GroupNotes.query.filter_by(user_id=item)
                    group_obj.note_id = note_ids+","
                    db.session.commit()
        else:
            if note_id not in note_ids:
                group_obj = GroupNotes.query.filter_by(user_id=item)
                group_obj.note_id += str(note_id)+","
                db.session.commit()
           
    for item in group_user_ids_list:
        if item not in group_note_user_list:
            note_id = str(note_id)+","
            group_note = GroupNotes(item, note_id)
            db.session.add(group_note)
            db.session.commit()

    note.title = title
    note.note_body = note_body
    note.note_text = note_text
    note.upvotes = upvotes
    note.downvotes = downvotes
    note.views = views
    note.tags = tags
    note.color = color
    db.session.commit()
    
    return jsonify(note=[], success=True)

@api.route('/group_note', methods=['POST'])
def group_note():
    data = request.get_json() or dict()


    if not data:
        return jsonify(success=False)
    
    data = request.get_json()
    title = data.get('title')
    user_id = data.get('user_id')
    note_type = data.get('note_type')
    note_body = data.get('note_body')
    note_text = data.get('note_text')
    upvotes = data.get('upvotes')
    downvotes = data.get('downvotes')
    views = data.get('views')
    tags = data.get('tags')
    color = data.get('color')
    # user_email = data.get('email')
    group_user_ids = data.get('group_user_emails') 
    note = Note(title, note_type, note_body, note_text, upvotes, downvotes, views, tags, color)
    db.session.add(note)
    db.session.commit()

    user_email = User.query.filter_by(username=user_id).first().email
    user_list = []
    user_list.append(user_email)
    group_user_ids = group_user_ids.split(',')
    for item in group_user_ids:
        if item is not None:
            user_list.append(item)

    note_id = note.id
    del user_list[-1]
    print(user_list)
    for user in user_list:
        user = User.query.filter_by(email=user).first()
        group = GroupNotes.query.filter_by(user_id=user.username).first()
        if group is not None:
            group.note_id += str(note_id)+","
            db.session.commit()
        else:
            note_id = str(note_id)+","
            group_note = GroupNotes(user.username, note_id)
            db.session.add(group_note)
            db.session.commit()
        

    return jsonify(note=[], success=True)

@api.route("/get_group_notes", methods=["POST"])
def get_group_notes():

    data = request.get_json()
    group_note = GroupNotes.query.filter_by(user_id=data.get('user_id')).first()

    if group_note is None:
        return jsonify(notes={}, success=True)
    else:
        print(group_note.note_id)
        note_id_list = group_note.note_id
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
                    note_object[i]['note_text']= note.note_text
                    note_object[i]['upvotes'] = note.upvotes
                    note_object[i]['downvotes'] = note.downvotes
                    note_object[i]['views'] = note.views
                    note_object[i]['tags'] = note.tags
                    note_object[i]['color']= note.color
                    i += 1
        print(note_object)
        print(type(note_object))
        return jsonify(notes=note_object, success=True)

@api.route('/edit_note', methods=["POST"])
def edit_note():

        data = request.get_json()
        print("Incoming data in edit note:", data)

        note = Note.query.filter_by(id=data.get('note_id')).first()
        note.title = data.get('title')
        note.note_type = data.get('note_type')
        if data.get('note_type') == 1:
            public_note = PublicNotes.query.filter_by(user_id=str(data.get('user_id'))).first()
            if public_note is not None:
                note_list = public_note.note_id
                note_list = note_list.split(",")

                if data.get('note_id') in note_list:

                    # this means that the it was a public note and now it has become private
                    # deleting that entry from public notes
                    note_list.remove(str(data.get('note_id')))
                    print ("rdtfygvbhuinjrdctfgvybhjkndrxcfgvhb jn")
                    result = ""
                    for item in note_list:
                        if item is not '':
                            result += item + ","
                    public_note.note_id = result
                    db.session.commit()

                    # adding it to private note for that user.
                    user_id = str(data.get('user_id'))
                    user_data = PrivateNotes.query.filter_by(user_id=user_id).first()

                    print("User data; ", user_data)
                    if user_data is not None:
                        note_id = str(data.get('note_id')) + ","
                        user_data.note_id += note_id
                        db.session.commit()
                    else:
                        note_id = str(data.get('note_id')) + ","
                        private_note = PrivateNotes(user_id, note_id)
                        db.session.add(private_note)
                        db.session.commit()

        if data.get('note_type') == 2:

            private_note = PrivateNotes.query.filter_by(user_id=str(data.get('user_id'))).first()
            if private_note is not None:
                note_list = private_note.note_id
                print("Inside here")
                note_list = note_list.split(",")
                print(note_list)
                if str(data.get('note_id')) in note_list:
                    # this means that the it was a public note and now it has become private
                    # deleting that entry from public notes
                    print("Inside here")
                    note_list.remove(str(data.get('note_id')))
                    result = ""
                    for item in note_list:
                        if item is not '':
                            result += item + ","
                    private_note.note_id = result
                    db.session.commit()

                    # adding it to private note for that user.
                    user_id = str(data.get('user_id'))
                    user_data = PublicNotes.query.filter_by(user_id=user_id).first()
                    print("User data; ", user_data)
                    if user_data is not None:
                        note_id = str(data.get('note_id')) + ","
                        user_data.note_id += note_id
                        db.session.commit()
                    else:
                        note_id = str(data.get('note_id')) + ","
                        public_note = PublicNotes(user_id, note_id)
                        db.session.add(public_note)
                        db.session.commit()

        note.note_body = data.get('note_body')
        note.note_text = data.get('note_text')
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
    note_text = data.get('note_text')
    upvotes = data.get('upvotes')
    downvotes = data.get('downvotes')
    views = data.get('views')
    tags = data.get('tags')
    color = data.get('color')
    user_id = data.get('user_id')

    print(data)
    note = Note(title, note_type, note_body, note_text, upvotes, downvotes, views, tags, color)
    db.session.add(note)
    db.session.commit()
    if note_type is not '':
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
        return jsonify(notes={}, success=True)
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
                    note_object[i]['note_text']= note.note_text
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
        return jsonify(notes={}, success=True)
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
                    note_object[i]['note_text']= note.note_text
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
                    note_object[i]['note_text']= note.note_text
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


@api.route("/get_recommended_notes", methods=["POST"])
def get_recommended_notes():

    data = request.get_json()
    username = str(data.get('user_id'))
    counts = dict()

    # getting the notes for this user and appending the tags to tag list
    public_note = PublicNotes.query.filter_by(user_id=username).first()
    if public_note is not None:
            note_list = public_note.note_id
            note_list = note_list.split(",")
            print("Note list:", note_list)
            # getting a count for tags for the given user
            for note_id in note_list:
                if note_id is not '':
                        print("Note id:", note_id)
                        note = Note.query.filter_by(id=note_id).first()
                        tags_list = note.tags.split(",")
                        for tags in tags_list:
                            if tags in counts:
                                counts[tags] += 1
                            else:
                                counts[tags] = 1

            max_tag = max(counts.items(), key=operator.itemgetter(1))[0]
            print("Max Tag", max_tag)


            final_data = dict()
            # getting public notes of other users ordering by upvotes
            notes = Note.query.filter_by(note_type='2')
            for note in notes:
                if str(note.id) not in note_list:
                    tags_string = note.tags
                    if max_tag in tags_string:
                         final_data[note.id] = note.upvotes

            # now sorting notes by upvotes
            sorted_by_value = sorted(final_data.items(), key=lambda kv: kv[1])
            print(type(sorted_by_value))
            sorted_by_value.reverse()
            note_object = {}
            i = 0
            for items in sorted_by_value:

                note_id = items[0]
                note = Note.query.filter_by(id=note_id).first()
                note_object[i] = {}
                note_object[i]['id'] = note.id
                note_object[i]['title'] = note.title
                note_object[i]['note_type'] = note.note_type
                note_object[i]['note_body'] = note.note_body
                note_object[i]['upvotes'] = note.upvotes
                note_object[i]['downvotes'] = note.downvotes
                note_object[i]['views'] = note.views
                note_object[i]['tags'] = note.tags
                note_object[i]['color'] = note.color
                i += 1

            print(note_object)
            print(type(note_object))

    return jsonify(notes=note_object, success=True)


@api.route("/get_pie_data_user", methods=["POST"])
def get_pie_data_user():

    data = request.get_json()
    user_id = data.get('user_id')

    # getting count of private notes of user
    private_notes = PrivateNotes.query.filter_by(user_id=user_id).first()
    private_note_count = 0
    if private_notes is not None:
        note_list = private_notes.note_id.split(",")
        for item in note_list:
            if '' == item:
                note_list.remove(item)
        private_note_count = len(note_list)

    # getting count of notes of user
    public_notes = PublicNotes.query.filter_by(user_id=user_id).first()
    public_notes_count = 0
    if public_notes is not None:
        note_list = public_notes.note_id.split(",")
        for item in note_list:
            if '' == item:
                note_list.remove(item)
        public_notes_count = len(note_list)

    # getting count of notes of user
    cheatsheets = CheatSheet.query.filter_by(user_id=user_id).first()
    cheatsheet_count = 0
    if cheatsheets is not None:
        note_list = cheatsheets.note_id.split(",")
        for item in note_list:
            if '' == item:
                note_list.remove(item)
        cheatsheet_count = len(note_list)

    return_list = []
    private_object = dict()
    private_object['value'] = private_note_count
    private_object['name'] = 'Private Notes'
    return_list.append(private_object)

    private_object = dict()
    private_object['value'] = public_notes_count
    private_object['name'] = 'Public Notes'
    return_list.append(private_object)

    private_object = dict()
    private_object['value'] = cheatsheet_count
    private_object['name'] = 'CheatSheet'
    return_list.append(private_object)

    return jsonify(data=return_list, success=True)


@api.route("/get_pie_data_user_all", methods=["POST"])
def get_pie_data_user_all():

    data = request.get_json()
    user_id = data.get('user_id')

    final_private_count = 0
    final_public_count = 0
    final_cheatsheet_count = 0
    users = User.query.filter(id != 0).all()
    for user in users:
            user_id = user.name
            # getting count of private notes of user
            private_notes = PrivateNotes.query.filter_by(user_id=user_id).first()
            private_note_count = 0
            if private_notes is not None:
                note_list = private_notes.note_id.split(",")
                for item in note_list:
                    if '' == item:
                        note_list.remove(item)
                private_note_count = len(note_list)

            # getting count of notes of user
            public_notes = PublicNotes.query.filter_by(user_id=user_id).first()
            public_notes_count = 0
            if public_notes is not None:
                note_list = public_notes.note_id.split(",")
                for item in note_list:
                    if '' == item:
                        note_list.remove(item)
                public_notes_count = len(note_list)

            # getting count of notes of user
            cheatsheets = CheatSheet.query.filter_by(user_id=user_id).first()
            cheatsheet_count = 0
            if cheatsheets is not None:
                note_list = cheatsheets.note_id.split(",")
                for item in note_list:
                    if '' == item:
                        note_list.remove(item)
                cheatsheet_count = len(note_list)
            final_private_count += private_note_count
            final_public_count += public_notes_count
            final_cheatsheet_count += cheatsheet_count

    return_list = []
    private_object = dict()
    private_object['value'] = final_private_count
    private_object['name'] = 'Private Notes'
    return_list.append(private_object)

    private_object = dict()
    private_object['value'] = final_public_count
    private_object['name'] = 'Public Notes'
    return_list.append(private_object)

    private_object = dict()
    private_object['value'] = final_cheatsheet_count
    private_object['name'] = 'CheatSheet'
    return_list.append(private_object)

    return jsonify(data=return_list, success=True)


@api.route("/get_line_data_user_all", methods=["POST"])
def get_line_data_user_all():

    data = request.get_json()
    user_id = data.get('user_id')

    notes = Note.query.filter(id != 0).all()
    tags_dict = dict()
    for note in notes:
        tags_list = note.tags.split(",")
        for tags in tags_list:
            if tags in tags_dict:
                tags_dict[tags] += 1
            else:
                tags_dict[tags] = 1

    total_tags = 0
    for key, value in tags_dict.items():
        total_tags += value
 




    return_list = []
    first_element = []
    first_element.append("popularity index")
    first_element.append("popularity amount")
    first_element.append("Tag")
    return_list.append(first_element)
    for key, value in tags_dict.items():
        list_this = []
        list_this.append((value/total_tags)*100)
        list_this.append(value)
        list_this.append(key)
        return_list.append(list_this)

    print(return_list)
    return_dict = dict()
    return_dict['source'] = return_list
    return jsonify(dataset=return_dict, success=True)

