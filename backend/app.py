# Flask: framework que cria o servidor HTTP e as rotas da API
from flask import Flask

# Importa o "pacote" de rotas de filmes (GET, POST, PUT, DELETE)
from routes.movies_routes import movies_routes

# Cria a aplicação Flask. __name__ indica o arquivo atual como ponto de partida.
app = Flask(__name__)


# Roda depois de CADA resposta. Libera o CORS para o frontend
# (ex.: localhost:5173) poder chamar esta API em outra porta.
@app.after_request
def liberar_cors(response):
    # Quem pode chamar a API: * = qualquer origem (ok em desenvolvimento)
    response.headers["Access-Control-Allow-Origin"] = "*"
    # Quais headers o navegador pode enviar (JSON usa Content-Type)
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    # Quais métodos HTTP o front pode usar
    response.headers["Access-Control-Allow-Methods"] = (
        "GET, POST, PUT, DELETE, OPTIONS"
    )
    return response


# Liga as rotas de /movies neste app. Sem isso, as URLs do blueprint não existem.
app.register_blueprint(movies_routes)


# Só executa se você rodar: python app.py
# (não executa se outro arquivo importar este módulo)
if __name__ == "__main__":
    # Sobe o servidor de desenvolvimento
    app.run(
        port=5000,  # porta: http://localhost:5000
        host="localhost",  # só aceita acesso nesta máquina
        debug=True,  # recarrega sozinho ao salvar e mostra erros no navegador
    )
