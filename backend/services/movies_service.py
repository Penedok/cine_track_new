# A lista em memória dos filmes. Todas as funções abaixo leem ou alteram essa lista.
from data.movies_data import movies , sessao_cinema , criando_categoria
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
  





    
           


   