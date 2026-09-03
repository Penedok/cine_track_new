import { useEffect, useMemo, useState } from "react";
import { Movie } from "../../types/movie";
import getMovies from "../../../service/getMovie";
import { useSession } from "../../context/SessionContext";
import {postSession} from "../../../service/postSession";

type CatalogMovie = Movie & {
  ano?: number;
  genero?: string;
};

export default function ModalSessionMovie() {
  const { isSessionModalOpen, closeSessionModal } = useSession();
  const [movies, setMovies] = useState<CatalogMovie[]>([]);
  const [search, setSearch] = useState("");
  const [selectedMovies, setSelectedMovies] = useState<CatalogMovie[]>([]);
  const [description,setDescription] = useState("");



  const handleGetMovies = async () => {
    const response = await getMovies();
    if (response) {
      setMovies(response);
    } else {
      console.log("Não foi possível carregar os filmes");
    }
  };

  useEffect(() => {
    handleGetMovies();
  }, []);

  const handlePostSession = async(description:string,ids:number[])=>{
    const response = await postSession(description,ids)
   
    if(response){
      closeSessionModal();
      setDescription("");
      setSelectedMovies([]);
     
    } else {
      console.log("Não foi possível criar a sessão");
    }
  }

  const filteredMovies = useMemo(() => {
    const query = search.trim().toLowerCase();

    return movies.filter((movie) => movie.title?.toLowerCase().includes(query));
  }, [movies, search]);

  const selectedIds = useMemo(
    () => new Set(selectedMovies.map((movie) => movie.id)),
    [selectedMovies],
  );

  const addMovie = (movie: CatalogMovie) => {
    if (selectedIds.has(movie.id)) return;
    setSelectedMovies((current) => [...current, movie]);
  };

  const removeMovie = (id: number) => {
    setSelectedMovies((current) => current.filter((movie) => movie.id !== id));
  };

  if (!isSessionModalOpen) return null;

  return (
    <div className="session-modal-overlay" onClick={closeSessionModal}>
      <div
        className="session-modal"
        role="dialog"
        aria-labelledby="session-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="session-modal-header">
          <div>
            <h2 id="session-modal-title">Sessão cinema</h2>
            <p>Adicione os filmes que você quer ver neste final de semana.</p>
          </div>
          <button
            type="button"
            className="session-modal-close"
            onClick={closeSessionModal}
            aria-label="Fechar modal"
          >
            ×
          </button>
        </header>

        <div>
          <input value={description} onChange={(e) => setDescription(e.target.value)} className="session-modal-search" type="text" id="all" placeholder="Digite a descrição da sessão" />
        </div>


        <div className="session-modal-body">
          <section className="session-modal-column">
            <h3>Filmes disponíveis</h3>
            <input
              className="session-modal-search"
              type="text"
              placeholder="Pesquise por um filme"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Pesquise por um filme"
            />

            <div className="session-modal-list">
              {filteredMovies.length === 0 ? (
                <p className="session-modal-empty">
                  Nenhum filme encontrado para essa busca.
                </p>
              ) : (
                filteredMovies.map((movie) => {
                  const year = movie.ano ?? movie.year;
                  const genre = movie.genero ?? movie.genre;
                  const alreadySelected = selectedIds.has(movie.id);

                  return (
                    <button
                      type="button"
                      key={movie.id}
                      className={`session-modal-item${alreadySelected ? " is-selected" : ""}`}
                      onClick={() => addMovie(movie)}
                      disabled={alreadySelected}
                    >
                      <div className="session-modal-poster" aria-hidden="true">
                        {movie.title.charAt(0)}
                      </div>
                      <div>
                        <strong>{movie.title}</strong>
                        <span>
                          {year} · {genre}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </section>

          <section className="session-modal-column">
            <h3>Filmes selecionados</h3>
            <div className="session-modal-list">
              {selectedMovies.length === 0 ? (
               
                <p className="session-modal-empty">
                  Os filmes escolhidos para a sessão aparecem aqui.
                </p>
              ) : (
                selectedMovies.map((movie) => (
                  <article key={movie.id} className="session-modal-item">
                    <div className="session-modal-poster" aria-hidden="true">
                      {movie.title.charAt(0)}
                    </div>
                    <div className="session-modal-item-body">
                      <strong>{movie.title}</strong>
                    </div>
                    <button
                      type="button"
                      className="session-modal-remove"
                      onClick={() => removeMovie(movie.id)}
                      aria-label={`Remover ${movie.title}`}
                    >
                      ×
                    </button>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>

        <button
          className="session-modal-submit"
          type="button"
         
          onClick={()=>handlePostSession(description,selectedMovies.map((movie) => movie.id))}
        >
          Criar sessão cinema
        </button>
      </div>
    </div>
  );
}
