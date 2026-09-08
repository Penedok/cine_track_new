import { useEffect, useMemo, useState } from "react";
import getSessions from "../../service/getSessions";
import deleteSession from "../../service/deleteSession";
import getCategorias from "../../service/getCategoria";
import { useSession } from "../context/SessionContext";
import type { Category } from "../types/movie";

type SessionMovie = {
  id: number;
  title: string;
  ano?: number;
  categoria?: number;
};

type CinemaSession = {
  id: number;
  descricao: string;
  filmes: SessionMovie[];
};

export default function Sessoes() {
  const { openSessionModal } = useSession();
  const [sessions, setSessions] = useState<CinemaSession[]>([]);
  const [categorias, setCategorias] = useState<Category[]>([]);

  const categoriaNomePorId = useMemo(
    () => new Map(categorias.map((item) => [item.id, item.categoria])),
    [categorias],
  );

  const nomeDaCategoria = (categoriaId?: number) =>
    categoriaId === undefined
      ? "Sem categoria"
      : categoriaNomePorId.get(categoriaId) ?? "Sem categoria";

  const loadSessions = async () => {
    const response = await getSessions();
    if (response) {
      setSessions(response);
    }
  };

  const loadCategorias = async () => {
    const response = await getCategorias();
    if (response) {
      setCategorias(response);
    }
  };

  const removeSession = async (id: number) => {
    const response = await deleteSession(id);
    if (response) {
      setSessions((prev) => prev.filter((session) => session.id !== id));
    } else {
      console.error("Erro ao remover sessão: não foi possível remover a sessão");
    }
  };

  useEffect(() => {
    loadSessions();
    loadCategorias();
  }, []);

  return (
    <main className="cine-app">
      <header className="cine-header">
        <div className="cine-header-top">
          <div className="cine-header-copy">
            <p className="cine-kicker">Planejamento</p>
            <h1>Sessões</h1>
            <p className="cine-subtitle">
              Veja as sessões montadas e os filmes de cada uma.
            </p>
          </div>
          <button
            type="button"
            className="session-open-button"
            onClick={openSessionModal}
          >
            Criar sessão
          </button>
        </div>
      </header>

      <section className="cine-list">
        <div className="panel-heading">
          <h2>Sessões criadas</h2>
          <p>{sessions.length} sessão(ões)</p>
        </div>

        {sessions.length === 0 ? (
          <p className="empty-state">Nenhuma sessão criada ainda.</p>
        ) : (
          <div className="session-grid">
            {sessions.map((session) => (
              <article key={session.id} className="session-card">
                <div className="session-card-heading">
                  <h3>{session.descricao}</h3>
                  <p>{session.filmes.length} filme(s)</p>
                </div>

                {session.filmes.length === 0 ? (
                  <p className="session-card-empty">
                    Nenhum filme nesta sessão.
                  </p>
                ) : (
                  <ul className="session-movie-list">
                    {session.filmes.map((movie) => (
                      <li key={movie.id} className="session-movie-item">
                        <div className="session-modal-poster" aria-hidden="true">
                          {movie.title.charAt(0)}
                        </div>
                        <div>
                          <strong>{movie.title}</strong>
                          <span>
                            {movie.ano} · {nomeDaCategoria(movie.categoria)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removeSession(session.id)}
                >
                  Remover sessão
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
