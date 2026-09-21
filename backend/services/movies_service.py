# A lista em memória dos filmes. Todas as funções abaixo leem ou alteram essa lista.
from data.movies_data import movies
from models import Movie
from extensions import db


def get_movies():
    # Devolve a lista inteira (usada no GET /movies)
    movies = Movie.query.all()

    print("FILMES NO BANCO:", movies)

    for movie in movies:
        print(
            "ID:", movie.id,
            "TITLE:", movie.title
        )
    return movies



def get_movie_by_id(id):

    # Percorre a lista até achar o filme com aquele id (GET /movies/<id>)
    movie = db.session.get(Movie,id)
    return movie


def create_movie(dados):
    chaves_permitidas = {
        "title",
        "ano",
        "categoria",
        "status",
        "avaliacao",
        "review",
    }

        # 1. Valida o dicionário
    for key,valor in dados.items():
        if key not in chaves_permitidas:
             return "Solicitação negada! O campo solicitado é inexistente"

         # 2. Transforma o dicionário em Movie
    novo_filme = Movie(
        title=dados["title"],
        ano=dados["ano"],
        categoria=dados["categoria"],
        status=dados["status"],
        avaliacao=dados["avaliacao"],
        review=dados["review"]
    )


    # 3. Adiciona o Movie ao banco
    db.session.add(novo_filme)
    # 4. Confirma a alteração
    db.session.commit()
     # Devolve o mesmo filme para a rota responder 201 com o JSON criado
    return novo_filme


def delete_movie(id):
    # Procura o filme e tira da lista (DELETE /movies/<id>)
    movie = db.session.get(Movie,id)

    for movie in movies:
        if movie.get("id") == id:
            movies.remove(movie)
            # Devolve o filme removido; se não achar, cai no None implícito

            db.session.delete(movie)
            db.session.commit()
            return movie


def editar_filme(id, dados):
    print("ID recebido:", id)
    print("Tipo do ID:", type(id))
    # "dados" é o JSON do PUT (os campos novos do filme)
    movie = db.session.get(Movie, id)
    print("Filme encontrado:", movie)
    if not movie:
        return ({"mensagem": "Filme não encontrado!"}), 404

    movie.title = dados["title"]
    movie.ano = dados["ano"]
    movie.categoria = dados["categoria"]
    movie.status = dados["status"]
    movie.avaliacao = dados["avaliacao"]
    movie.review = dados["review"]

    db.session.commit()
    return movie
