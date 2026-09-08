# A lista em memória dos filmes. Todas as funções abaixo leem ou alteram essa lista.
from data.movies_data import movies , sessao_cinema , criando_categoria
from models import Movie
from extensions import db


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
    chaves_permitidas = {"id":int,
                        "title":str,
                        "ano":int,
                        "categoria":int,
                        "status":str,
                        "avaliacao":int,
                        "review":str}
     
    for key,valor in movie.items():
        if key not in chaves_permitidas:
             return "Solicitação negada! O campo solicitado é inexistente"
        
     # Recebe o dicionário que veio no JSON do POST e coloca no final da lista 
   
    db.session.add(movie)
    db.session.commit()
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
            movie["categoria"] = dados["categoria"]
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


def criar_categoria(dados):
    add_id = len(criando_categoria) + 1
    chaves_permitidas = {"categoria"}
    for key in dados:
        if key not in chaves_permitidas:
            return "Solicitação negada! O campo é mexistente"
            
    nova_categoria = {"id": add_id,
                      "categoria": dados["categoria"]
                   }
    criando_categoria.append(nova_categoria)
    return nova_categoria


def retornar_categoria():
    return criando_categoria


def pegando_categoria():
    categoria_com_filmes = []
    for categoria in criando_categoria:
        add_filmes = []

        for movie in movies:
           if movie["categoria"] == categoria["id"]:
                add_filmes.append(movie)
        categoria_com_filmes.append({"id":categoria["id"],
                                     "categoria":categoria["categoria"],
                                     "filmes":add_filmes
                                           })
   
    return categoria_com_filmes 
  





    
           


   