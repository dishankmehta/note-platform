from flask import Blueprint, render_template, flash, request, redirect, url_for, jsonify
from flask_login import login_user, logout_user, login_required
from flask_cors import CORS

from backend.extensions import cache
from backend.forms import LoginForm
from backend.models import User

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
@cache.cached(timeout=1000)
def home():
    return render_template('index.html')

@api.route('/sample')
def sample():
    print('sample called')
    return jsonify(data='sample api')


@api.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()

    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).one()
        login_user(user)

        flash("Logged in successfully.", "success")
        return redirect(request.args.get("next") or url_for(".home"))

    return render_template("login.html", form=form)


@api.route("/logout")
def logout():
    logout_user()
    flash("You have been logged out.", "success")

    return redirect(url_for(".home"))


@api.route("/restricted")
@login_required
def restricted():
    return "You can only see this if you are logged in!", 200
