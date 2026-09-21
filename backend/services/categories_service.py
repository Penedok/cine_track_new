from data.categories_data import criando_categoria
from data.movies_data import movies


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
