# A lista em memória dos filmes. Todas as funções abaixo leem ou alteram essa lista.
from data.movies_data import movies , sessao_cinema


def get_movies():
    # Devolve a lista inteira (usada no GET /movies)
    return movies


def get_movie_by_id(id):
    # Percorre a lista até achar o filme com aquele id (GET /movies/<id>)
    for movie in movies:
        # .get('id') evita erro se algum filme não tiver a chave "id"
        if movie.get("id") == id:
            return movie
    # Se o for terminar sem return, o Python devolve None sozinho
    # (a rota trata isso como 404)


def create_movie(movie):
    # Recebe o dicionário que veio no JSON do POST e coloca no final da lista
    movies.append(movie)
    # Devolve o mesmo filme para a rota responder 201 com o JSON criado
    return movie


def delete_movie(id):
    # Procura o filme e tira da lista (DELETE /movies/<id>)
    for movie in movies:
        if movie.get("id") == id:
            movies.remove(movie)
            # Devolve o filme removido; se não achar, cai no None implícito
            return movie


def editar_filme(id, dados):
    # "dados" é o JSON do PUT (os campos novos do filme)
    for movie in movies:
        if movie["id"] == id:
            # Atualiza cada campo do filme encontrado com o que veio no body
            movie["title"] = dados["title"]
            movie["ano"] = dados["ano"]
            movie["genero"] = dados["genero"]
            movie["status"] = dados["status"]
            movie["avaliacao"] = dados["avaliacao"]
            movie["review"] = dados["review"]
            # Devolve o filme já alterado para a rota mandar no JSON
            return movie

    # Não achou o id: devolve mensagem + código 404
    # (normalmente o 404 fica na rota, não no service)
    return ({"mensagem": "Filme não encontrado!"}), 404


def criar_sessao_service(dados):
    novo_id = len(sessao_cinema) + 1
    nova_sessao = {
                    "id": novo_id,
                    "descricao": dados["descricao"],
                    "filmes_id": dados["filmes_id"]
    }
    
    sessao_cinema.append(nova_sessao)
    return nova_sessao

def comparar_movies():
    sessoes_com_filmes = []
    for sessao in sessao_cinema:
      
          filmes_encontrados = []

          for movie in movies:
            if movie["id"] in sessao["filmes_id"]:
                  filmes_encontrados.append(movie)
                  
          sessoes_com_filmes.append({
              "id": sessao["id"],
              "descricao": sessao["descricao"],
              "filmes": filmes_encontrados
            })
    return sessoes_com_filmes
  





    
           


   