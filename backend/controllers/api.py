from flask import Blueprint, render_template, flash, request, redirect, url_for, jsonify
from flask_login import login_user, logout_user, login_required
from flask_cors import CORS

from backend.extensions import cache
from backend.forms import LoginForm
from backend.models import User, Note

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

@api.route("/register", methods=["POST"])
def register():
    data = request.get_json() or dict()

    if not data:
        return jsonify(error='Fill all the fields!!')

    username = data.get('username')
    password = data.get('password')
    tags = data.get('tags')
    education_level = data.get('education_level')
    user = User(username, password, tags, education_level)
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
        user_data = dict()
        user_data['username'] = user.username
        return jsonify(user=user_data, success=True), 200
    return jsonify(error='Invalid credentials', success=False), 422


@api.route("/logout")
def logout():
    logout_user()
    return jsonify(success=True)


@api.route("/restricted")
@login_required
def restricted():
    return "You can only see this if you are logged in!", 200
