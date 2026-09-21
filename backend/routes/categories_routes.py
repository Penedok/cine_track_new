from flask import request, jsonify, Blueprint

from services.categories_service import (
    criar_categoria,
    retornar_categoria,
    pegando_categoria,
)

categories_routes = Blueprint("categories", __name__)


@categories_routes.route("/categoria", methods=["POST"])
def add_categoria():
    dados_categoria = request.get_json()
    categoria_criada = criar_categoria(dados_categoria)

    if isinstance(categoria_criada,str):
        return jsonify({"mensagem":categoria_criada})

    return jsonify(categoria_criada)

@categories_routes.route("/categoria", methods=["GET"])
def get_all_categoria():
    categorias = retornar_categoria()

    return jsonify(categorias)


@categories_routes.route("/categoria/filmes", methods=["GET"])
def get_movie_by_categoria():
    categorias = pegando_categoria()

    return jsonify (categorias)
