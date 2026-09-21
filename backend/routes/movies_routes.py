# request: lê o body JSON da requisição (POST/PUT)
# jsonify: transforma dict/lista Python em resposta JSON
# Blueprint: agrupa rotas em um "módulo" para registrar no app.py
from flask import request, jsonify, Blueprint

# Funções do service: a rota não mexe na lista, só chama a regra de negócio
from services.movies_service import (
    get_movies,
    get_movie_by_id,
    create_movie,
    delete_movie,
    editar_filme,
)

# Cria o grupo de rotas. O nome 'movies' é só um identificador interno.
# __name__ ajuda o Flask a achar este arquivo.
movies_routes = Blueprint("movies", __name__)


# GET /movies → lista todos os filmes
@movies_routes.route("/movies", methods=["GET"])
def get_all_movies():
    movies=get_movies()

    resultado = []

    for movie in movies:
        resultado.append({
            "id": movie.id,
            "title": movie.title,
            "ano": movie.ano,
            "categoria": movie.categoria,
            "status": movie.status,
            "avaliacao": movie.avaliacao,
            "review": movie.review
        })
    return jsonify(resultado)


# GET /movies/2 → o <int:id> vira o argumento id (número) da função
@movies_routes.route("/movies/<int:id>", methods=["GET"])
def get_by_id(id):
    movie = get_movie_by_id(id)

    # Service devolve None quando não acha o filme
    if movie is None:
        return jsonify({"erro": "Filme não encontrado"}), 404


    return jsonify(movie)


# POST /movies → cria um filme. O JSON do body está em request.get_json()
@movies_routes.route("/movies", methods=["POST"])
def create_new_movie():
    dados = request.get_json()
    movie = create_movie(dados)
    if isinstance(movie,str):
          return {"mensagem": movie}, 400
    # 201 = Created (recurso novo)
    return jsonify({
        "id": movie.id,
        "title": movie.title,
        "ano": movie.ano,
        "categoria": movie.categoria,
        "status": movie.status,
        "avaliacao": movie.avaliacao,
        "review": movie.review
    }), 201


# DELETE /movies/2 → remove o filme da lista
@movies_routes.route("/movies/<int:id>", methods=["DELETE"])
def delete_by_id(id):
    movie = delete_movie(id)

    if movie is None:
        return jsonify({"erro": "Filme não encontrado"}), 404

    return jsonify({"mensagem": "Filme removido com sucesso"})


# PUT /movies/2 → substitui os campos do filme com o JSON enviado
@movies_routes.route("/movies/<int:id>", methods=["PUT"])
def update_by_id(id):
    dados = request.get_json()
    movie = editar_filme(id, dados)

    resultado = []

    if movie is None:
        return jsonify({"erro": "Filme não encontrado"}), 404

    resultado.append({
        "id": movie.id,
        "title": movie.title,
        "ano": movie.ano,
        "categoria": movie.categoria,
        "status": movie.status,
        "avaliacao": movie.avaliacao,
        "review": movie.review
    })

    return jsonify(resultado)
