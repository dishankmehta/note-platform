from flask_caching import Cache
from flask_debugtoolbar import DebugToolbarExtension
from flask_login import LoginManager
from flask_assets import Environment
from flask_migrate import Migrate
from flask_socketio import SocketIO

from backend.models import User

# Setup flask cache
cache = Cache()

# init flask assets
assets_env = Environment()

#init migration
migrate = Migrate()

#init socket
# socketio = SocketIO(message_queue='amqp://guest:guest@localhost:5672', async_mode='eventlet')
# socketio = SocketIO()

debug_toolbar = DebugToolbarExtension()

login_manager = LoginManager()
login_manager.login_view = "api.login"
login_manager.login_message_category = "warning"


@login_manager.user_loader
def load_user(userid):
    return User.query.get(userid)
