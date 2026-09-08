# Flask: framework que cria o servidor HTTP e as rotas da API
from flask import Flask

# Nossa instância do banco
from extensions import db

# Importa os models
from models import Movie

# Importa as rotas
from routes.movies_routes import movies_routes


app = Flask(__name__)


# =========================
# BANCO DE DADOS
# =========================

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///cine_track.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


# Conecta o SQLAlchemy ao Flask
db.init_app(app)


# Cria as tabelas que ainda não existem
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


# =========================
# SERVIDOR
# =========================

if __name__ == "__main__":
    app.run(
        port=5000,
        host="localhost",
        debug=True,
    )