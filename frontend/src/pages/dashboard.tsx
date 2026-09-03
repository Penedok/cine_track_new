import { useEffect, useState, useMemo} from 'react'
import getMovies from '../../service/getMovie'
import postMovie from '../../service/postMovie'
import deleteMovie from '../../service/deleteMovie'




export default function Dashboard() {
  const [movies, setMovies] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('')
  const [form, setForm] = useState({ano:'', genero:'',id:'',avaliacao:'',review:'',status:'', title:''})



   const genres = useMemo(
    () => [...new Set(movies.map((movie) => movie.genero))].sort(),
    [movies],
  ) 


  const getAllMovies = async ()=>{
    const movies = await getMovies();
    if(movies){
    setMovies(movies);
    }else{
      console.log('Não foi possível carregar os filmes');
    }
  }

  const addMovie = async (event?: React.FormEvent) => {
    if (event) event.preventDefault();

    const novoFilme = {
      title: form.title,
      ano: form.ano,
      genero: form.genero,
      status: form.status,
      avaliacao: form.avaliacao,
      review: form.review,
    };

    try {
      const response = await postMovie(
        novoFilme.title,
        novoFilme.ano,
        novoFilme.genero,
        novoFilme.status,
        novoFilme.avaliacao,
        novoFilme.review
      );
      if (response) {
        setMovies(prev => [...prev, response]);
        setForm({ ano: '', genero: '', id: '', avaliacao: '', review: '', status: '', title: '' });
      }
    } catch (error) {
      console.error("Erro ao adicionar filme:", error);
    }
  }


  const removeMovie = async(id:string)=>{
    try{
      const response = await deleteMovie(id)
      if(response){
        setMovies(prev=>prev.filter(movie=>movie.id !== id))
      }else{
        console.error('Erro ao remover filme: não foi possível remover o filme')
      }
    }catch(error){
      console.error('Erro ao remover filme:', error)
    }
  }

  useEffect(()=>{
    getAllMovies()
  },[]);


  const watchedMovies = useMemo(() => {
    const query = search.trim().toLowerCase()

    return movies.filter((movie) => {
      const matchesStatus = movie.status === 'assistido'
      const matchesTitle = movie?.title?.toLowerCase().includes(query)
      const matchesGenre = genre === '' || movie?.genero === genre
      return matchesStatus && matchesTitle && matchesGenre
    })
  }, [movies, search, genre])



  return (
   
    <main className="cine-app">
      <header className="cine-header">
        <div className="cine-header-top">
          <div className="cine-header-copy">
            <p className="cine-kicker">Biblioteca pessoal</p>
            <h1>Cine Tracker</h1>
            <p className="cine-subtitle">
              Pesquise, filtre, adicione e avalie os filmes que você já assistiu.
            </p>
          </div>
          <img
            className="cine-logo"
            src="/cine_tracker_logo.png"
            alt="Cine Tracker"
          />
        </div>
       
      </header>

      <section className="cine-toolbar" aria-label="Busca e filtros">
        <form
          className="toolbar-group"
          onSubmit={(event) => event.preventDefault()}
        >

          <input
            type="text"
            placeholder="Pesquisar filme"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label="Pesquisar filme"
          />
          <button type="submit">Pesquisar</button>
        </form>

        <form
          className="toolbar-group"
          onSubmit={(event) => event.preventDefault()}
        >
          <select
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            aria-label="Filtrar por gênero"
          >
            <option value="">Todos os gêneros</option>
            {genres.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button type="submit">Filtrar por gênero</button>
        </form>
      </section>

      <section className="cine-panel">
        <div className="panel-heading">
          <h2>Adicionar filme</h2>
          <p>Inclua um novo título na sua lista.</p>
        </div>

        <form className="movie-form" onSubmit={addMovie}>
          <label className="field field-wide">
            <span>Título</span>
            <input
              type="text"
              placeholder="Nome do filme"
              value={form.title}
              onChange={(event) =>
                setForm({ ...form, title: event.target.value })
              }
              required
            />
          </label>

          <label className="field">
            <span>Ano</span>
            <input
              type="number"
              placeholder="2024"
              min="1888"
              max="2100"
              value={form.ano}
              onChange={(event) =>
                setForm({ ...form, ano: event.target.value })
              }
            />
          </label>

          <label className="field">
            <span>Gênero</span>
            <input
              type="text"
              placeholder="Drama, terror..."
              value={form.genero}
              onChange={(event) =>
                setForm({ ...form, genero: event.target.value })
              }
            />
          </label>

          <label className="field">
            <span>Status</span>
            <select
              value={form.status}
              onChange={(event) =>
                setForm({ ...form, status: event.target.value })
              }
            >
              <option value="quero-ver">Quero ver</option>
              <option value="assistido">Assistido</option>
            </select>
          </label>

          <label className="field">
            <span>Avaliação</span>
            <input
              type="number"
              placeholder="1 a 5"
              min="0"
              max="5"
              value={form.avaliacao}
              onChange={(event) =>
                setForm({ ...form, avaliacao: event.target.value })
              }
            />
          </label>

          <label className="field field-wide">
            <span>Review</span>
            <textarea
              placeholder="O que você achou?"
              rows={3}
              value={form.review}
              onChange={(event) =>
                setForm({ ...form, review: event.target.value })
              }
            />
          </label>

          <div className="form-actions">
            <button type="submit" onClick={addMovie}>Adicionar filme</button>
          </div>
        </form>
      </section>

      <section className="cine-list">
        <div className="panel-heading">
          <h2>Filmes assistidos</h2>
          <p>{watchedMovies.length} título(s) nesta lista</p>
        </div>

        {watchedMovies.length === 0 ? (
          <p className="empty-state">Nenhum filme assistido encontrado.</p>
        ) : (
          <div className="movie-grid">
            {watchedMovies.map((movie) => (
              <article key={movie.id} className="watched-card">
                <div className="watched-poster" aria-hidden="true">
                  <span>{movie.title.charAt(0)}</span>
                </div>

                <div className="watched-body">
                  <p className="watched-meta">
                    {movie.ano} · {movie.genero}
                  </p>
                  <h3>{movie.title}</h3>
                  <p className="watched-status">
                   {/*  {STATUS_LABEL[movie.status]} */}
                  </p>
                  <p className="watched-rating">
                    {'★'.repeat(movie.avaliacao)}
                    {'☆'.repeat(Math.max(0, 5 - movie.avaliacao))}
                  </p>
                  <p className="watched-review">
                    {movie.review || 'Sem review ainda.'}
                  </p>
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeMovie(movie.id) }  
                  >
                    Remover filme
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main> 
  )
}
