from flask import request, jsonify, Blueprint

from services.sessions_service import (
    criar_sessao_service,
    comparar_movies,
    edit_session,
    delete_session,
)

sessions_routes = Blueprint("sessions", __name__)


@sessions_routes.route("/sessoes", methods=["POST"])
def sessao_by_id():
    nova_sessao = request.get_json()
    sessao_cinema = criar_sessao_service(nova_sessao)

    if isinstance(sessao_cinema,str):
         return {"mensagem": sessao_cinema}, 400

    return jsonify(sessao_cinema)



@sessions_routes.route("/sessoes", methods=["GET"])
def get_sessions_movies():
    pegar_filmes = comparar_movies()
    return jsonify(pegar_filmes)




@sessions_routes.route("/sessoes/<int:id>", methods=["PUT"])
def update_sessios_by_id(id):
    dados = request.get_json()
    sessao = edit_session(id,dados)

    return jsonify(sessao)

@sessions_routes.route("/sessoes/<int:id>", methods=["DELETE"])
def delete_session_by_id(id):
    sessao = delete_session(id)

    if sessao is None:
        return jsonify({"erro": "Sessão não encontrada"}),404

    return jsonify({"mensagem": "Sessão removida com sucesso"})
