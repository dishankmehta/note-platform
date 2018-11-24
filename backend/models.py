from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, AnonymousUserMixin
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class Note(db.Model):
    __tablename__ = 'note'
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String())
    note_type = db.Column(db.String())
    note_body = db.Column(db.String())
    upvotes = db.Column(db.Integer())
    downvotes = db.Column(db.Integer())
    tags = db.Column(db.String())
    color = db.Column(db.String())
    views = db.Column(db.Integer())


    def __init__(self, title, note_type, note_body, upvotes, downvotes, views, tags, color):
        self.title = title
        self.note_type = note_type
        self.note_body = note_body
        self.upvotes = upvotes
        self.downvotes = downvotes
        self.views = views
        self.tags = tags
        self.color = color

    def to_dict(self):
        return dict(
            title = self.title,
            note_type = self.note_type,
            note_body = self.note_body,
            upvotes = self.upvotes,
            downvotes = self.downvotes,
            views = self.views,
            tags=self.tags,
            color = self.color
        )

class User(db.Model, UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String())
    username = db.Column(db.String())
    password = db.Column(db.String())
    email = db.Column(db.String())
    tags = db.Column(db.String())
    major = db.Column(db.String())

    def __init__(self, name, username, password, email, tags, major):
        self.username = username
        self.name = name
        self.set_password(password)
        self.email = email
        self.tags = tags
        self.major = major

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, value):
        return check_password_hash(self.password, value)

    def is_authenticated(self):
        if isinstance(self, AnonymousUserMixin):
            return False
        else:
            return True

    def is_active(self):
        return True

    def is_anonymous(self):
        if isinstance(self, AnonymousUserMixin):
            return True
        else:
            return False

    def get_id(self):
        return self.id

    def to_dict(self):
        return dict(
            username = self.username,
            email=self.email,
            tags = self.tags,
            major=self.major,
            password=self.password,
            name = self.name

        )

    def __repr__(self):
        return '<User %r>' % self.username


class PublicNotes(db.Model):
    __tablename__ = 'public_notes'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.String())
    note_id = db.Column(db.String())

    def __init__(self, user_id, note_id):
        self.user_id = user_id
        self.note_id = note_id

    def to_dict(self):
        return dict(
            user_id=self.user_id,
            note_id=self.note_id
        )


class PrivateNotes(db.Model):

    __tablename__ = 'private_notes'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.String())
    note_id = db.Column(db.String())

    def __init__(self, user_id, note_id):
        self.user_id = user_id
        self.note_id = note_id

    def to_dict(self):
        return dict(
            user_id=self.user_id,
            note_id=self.note_id
        )
        
class UserGroupInfo(db.Model):
    __tablename__ = 'user_group_info'
    id = db.Column(db.Integer(),primary_key=True)
    user_id = db.Column(db.String())
    group_id_list = db.Column(db.String())

    def __init__(self, user_id, group_id_list):
        self.user_id = user_id
        self.group_id_list = group_id_list

    def to_dict(self):
        return dict(
            user_id=self.user_id,
            group_id_list=self.group_id_list
        )

class Group(db.Model):
    __tablename__ = 'group'
    id = db.Column(db.Integer(), primary_key=True)
    note_id = db.Column(db.String())

