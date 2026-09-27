# A lista em memória dos filmes. Todas as funções abaixo leem ou alteram essa lista.
from data.movies_data import movies , sessao_cinema , criando_categoria
from models import Movie, Sessao , Category
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
    for key in dados:
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

    chaves_permitidas ={"descricao","filmes_ids"}

    for key in dados:
        if key not in chaves_permitidas:
            return "Solicitação negada! O campo solicitado é inexistente"
        
    if "descricao" not in dados or "filmes_ids" not in dados:
        return "Solicitação negada! Os campos 'descricao' e 'filmes_ids' são obrigatórios"
        
    nova_sessao = Sessao( 
                    descricao=dados["descricao"],
                     filmes_ids=dados["filmes_ids"]
    )

    db.session.add(nova_sessao)
    db.session.commit()
    return nova_sessao


def comparar_movies():
    sessoes = Sessao.query.all()
    movies = Movie.query.all()

    sessoes_com_filmes = []
    for sessao in sessoes:
        filmes_encontrados = []

        for movie in movies:
          if movie.id in sessao.filmes_ids:
              filmes_encontrados.append({"id": movie.id,
                              "title": movie.title,
                              "ano": movie.ano,
                              "categoria": movie.categoria,
                              "status": movie.status,
                              "avaliacao": movie.avaliacao,
                              "review": movie.review})
                  
        sessoes_com_filmes.append({
              "id": sessao.id,
              "descricao": sessao.descricao,
              "filmes_ids": filmes_encontrados
            })
    return sessoes_com_filmes


def edit_session(id,dados):
    sessao = db.session.get(Sessao,id)
    if not sessao:
         return None
              
    if "filmes_ids" in dados:
        sessao.filmes_ids = dados["filmes_ids"]
                  
    if "descricao" in dados:
        sessao.descricao = dados["descricao"]
    db.session.commit()
              
    return {"id":sessao.id,
            "descricao":sessao.descricao,
            "filmes_ids":sessao.filmes_ids
            }

    


def delete_session(id):
    sessao = db.session.get(Sessao,id)
    if sessao is None:
            return None
    db.session.delete(sessao)
    db.session.commit()
    return sessao


def criar_categoria(dados):
    chaves_permitidas = {"categoria"}

    for key in dados:
        if key not in chaves_permitidas:
            return "Solicitação negada! O campo é inexistente"
        
    if "categoria" not in dados:
        return "O campo 'categoria' é obrigatório"
            
    nova_categoria = Category(
                      categoria=dados["categoria"],
                    )
    
    db.session.add(nova_categoria)
    db.session.commit()
    return  {
        "id": nova_categoria.id,
        "categoria": nova_categoria.categoria
    }


def retornar_categoria():
    categoria = Category.query.all()

    if not categoria:
        return None

    return categoria


def filmes_por_categoria():
    categorias = Category.query.all()
    movies = Movie.query.all()
    categoria_com_filmes = []
    for categoria in categorias:
        add_filmes = []

        for movie in movies:
           if movie.categoria == categoria.id:
                add_filmes.append({
                    "id": movie.id,
                    "title": movie.title,
                    "ano": movie.ano,
                    "categoria": movie.categoria,
                    "status": movie.status,
                    "avaliacao": movie.avaliacao,
                    "review": movie.review
                })

        categoria_com_filmes.append({"id":categoria.id,
                                     "categoria":categoria.categoria,
                                     "filmes":add_filmes
                                           })
   
    return categoria_com_filmes 
  





    
           


   