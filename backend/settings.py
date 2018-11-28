import tempfile
db_file = tempfile.NamedTemporaryFile()


class Config(object):
    SECRET_KEY = 'secret key'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_ALLOWED_HOSTS = ['http://localhost:3005']
    # SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://postgres:password@127.0.0.1:5432/postgres'
    SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://stormcold:password@127.0.0.1:5432/noteplatform'

    # SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://stormcold:password@127.0.0.1:5432/noteplatform'
    #SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://postgres:password@127.0.0.1:5432/noteplatform'

    #sSQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://postgres:1234@127.0.0.1:5432/postgres'
    # SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://postgres:amoi9825049931@127.0.0.1:5432/postgres'

    #SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://postgres:1234@127.0.0.1:5432/postgres'
    # SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://postgres:password@127.0.0.1:5432/postgres'


class ProdConfig(Config):
    ENV = 'prod'
   # SQLALCHEMY_DATABASE_URI = 'sqlite:///../database.db'

    CACHE_TYPE = 'simple'


class DevConfig(Config):
    ENV = 'dev'
    DEBUG = True
    DEBUG_TB_INTERCEPT_REDIRECTS = False

    #SQLALCHEMY_DATABASE_URI = 'sqlite:///../database.db'

    CACHE_TYPE = 'null'
    ASSETS_DEBUG = True


class TestConfig(Config):
    ENV = 'test'
    DEBUG = True
    DEBUG_TB_INTERCEPT_REDIRECTS = False

    #SQLALCHEMY_DATABASE_URI = 'sqlite:///' + db_file.name
    SQLALCHEMY_ECHO = True

    CACHE_TYPE = 'null'
    WTF_CSRF_ENABLED = False