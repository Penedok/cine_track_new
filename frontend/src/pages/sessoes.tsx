import { useEffect, useState } from "react";
import getSessions from "../../service/getSessions";
import { useSession } from "../context/SessionContext";

type SessionMovie = {
  id: number;
  title: string;
  ano?: number;
  genero?: string;
};

type CinemaSession = {
  id: number;
  descricao: string;
  filmes: SessionMovie[];
};

export default function Sessoes() {
  const { openSessionModal } = useSession();
  const [sessions, setSessions] = useState<CinemaSession[]>([]);

  const loadSessions = async () => {
    const response = await getSessions();
    if (response) {
      setSessions(response);
    }
  };

  useEffect(() => {
    loadSessions();
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
                            {movie.ano} · {movie.genero}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
