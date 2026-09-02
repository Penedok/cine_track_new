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
    criar_sessao_service,
    comparar_movies
    
)

# Cria o grupo de rotas. O nome 'movies' é só um identificador interno.
# __name__ ajuda o Flask a achar este arquivo.
movies_routes = Blueprint("movies", __name__)


# GET /movies → lista todos os filmes
@movies_routes.route("/movies", methods=["GET"])
def get_all_movies():
    movies = get_movies()
    return jsonify(movies)


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
    novo_filme = request.get_json()
    movie = create_movie(novo_filme)
    # 201 = Created (recurso novo)
    return jsonify(movie), 201


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

    if movie is None:
        return jsonify({"erro": "Filme não encontrado"}), 404

    return jsonify(movie)


@movies_routes.route("/sessoes", methods=["POST"])
def sessao_by_id():
    nova_sessao = request.get_json()
    sessao_cinema = criar_sessao_service(nova_sessao)

    return jsonify(sessao_cinema)

@movies_routes.route("/sessoes", methods=["GET"])
def get_sessions_movies():
    pegar_filmes = comparar_movies()
    return jsonify(pegar_filmes)







    
    
  
