from data.sessions_data import sessao_cinema
from data.movies_data import movies


def criar_sessao_service(dados):
    novo_id = len(sessao_cinema) + 1

    chaves_permitidos ={"descricao","filmes_id"}

    for key in dados:
        if key not in chaves_permitidos:
            return "Solicitação negada! O campo solicitado é inesistente"

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


def edit_session(id,dados):
    for sessao in sessao_cinema:
        if sessao["id"] == id:

              if "filmes_id" in dados:
                  sessao["filmes_id"] = dados["filmes_id"]

              if "descricao" in dados:
                  sessao["descricao"] = dados["descricao"]

              return sessao

    return({"mensagem": "sessao não encontrado!"}), 404


def delete_session(id):
    for sessao in sessao_cinema:
        if sessao["id"] == id:
            sessao_cinema.remove(sessao)
            return sessao
