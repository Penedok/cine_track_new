# models: descreve a "forma" de um filme (quais campos existem).
# Hoje a API ainda usa dicionários em data/movies_data.py.
# Esta classe serve de molde: um filme TEM id, title, ano, etc.


class Movie:
    # __init__ roda quando você faz Movie(...).
    # self = a instância que está sendo criada (este filme).
    def __init__(self, id, title, ano, categoria, status, avaliacao, review):
        self.id = id  # identificador único (1, 2, 3...)
        self.title = title  # nome do filme
        self.ano = ano  # ano de lançamento
        self.categoria = categoria  # ex.: Drama, Fantasia
        self.status = status  # ex.: "assistido", "quero ver"
        self.avaliacao = avaliacao  # nota (ex.: 4.5)
        self.review = review  # texto da opinião
