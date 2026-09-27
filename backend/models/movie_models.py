# models: descreve a "forma" de um filme (quais campos existem).
# Hoje a API ainda usa dicionários em data/movies_data.py.
# Esta classe serve de molde: um filme TEM id, title, ano, etc.


from extensions import db


class Movie(db.Model):
    __tablename__ = "movies"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    title = db.Column(
        db.String(200),
        nullable=False
    )

    ano = db.Column(
        db.Integer,
        nullable=False
    )

    categoria = db.Column(
        db.String(100),
        nullable=False
    )

    status = db.Column(
        db.String(50),
        default="não assistido"
    )

    avaliacao = db.Column(
        db.Float,
        nullable=True
    )

    review = db.Column(
        db.Text,
        nullable=True
    )


class Sessao(db.Model):
    __tablename__ = "sessoes"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    descricao = db.Column(
        db.String(200),
        nullable=False
    )

    filmes_ids = db.Column(
        db.JSON,
        nullable=True
    )

class Category(db.Model):
    __tablename__ = "categorias"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    categoria = db.Column(
        db.String(200),
        nullable=True
    )



