import os

from flask import Flask

from extensions import db
from models import Movie

from routes.movies_routes import movies_routes
from routes.sessions_routes import sessions_routes
from routes.categories_routes import categories_routes


app = Flask(__name__)


# =========================
# BANCO DE DADOS
# =========================

database_url = os.getenv(
    "DATABASE_URL",
    "sqlite:///cine_track.db"
)

# SQLAlchemy 2 não aceita o prefixo "postgres://"
if database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = database_url
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)

with app.app_context():
    db.create_all()


# =========================
# CORS
# =========================

@app.after_request
def liberar_cors(response):

    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = (
        "GET, POST, PUT, DELETE, OPTIONS"
    )

    return response


# =========================
# ROTAS
# =========================

app.register_blueprint(movies_routes)
app.register_blueprint(sessions_routes)
app.register_blueprint(categories_routes)


# =========================
# SERVIDOR LOCAL
# =========================

if __name__ == "__main__":
    app.run(
        port=int(os.getenv("PORT", 5000)),
        host="0.0.0.0",
        debug=True,
    )