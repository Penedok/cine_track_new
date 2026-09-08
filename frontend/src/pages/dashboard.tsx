import { useEffect, useState, useMemo} from 'react'
import getMovies from '../../service/getMovie'
import postMovie from '../../service/postMovie'
import deleteMovie from '../../service/deleteMovie'
import getCategorias from '../../service/getCategoria'
import type { Category } from '../types/movie'
import { useCategory } from '../context/CategoryContext'




export default function Dashboard() {
  const { openCategoryModal, lastCreatedCategory, clearLastCreatedCategory } = useCategory()
  const [movies, setMovies] = useState<any[]>([])
  const [categorias, setCategorias] = useState<Category[]>([])
  const [search, setSearch] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('')
  const [form, setForm] = useState({ano:'', categoria:'',id:'',avaliacao:'',review:'',status:'', title:''})



  // Mapa id -> nome da categoria, pra não precisar percorrer o array toda hora
  const categoriaNomePorId = useMemo(
    () => new Map(categorias.map((item) => [item.id, item.categoria])),
    [categorias],
  )

  const nomeDaCategoria = (categoriaId: unknown) =>
    categoriaNomePorId.get(Number(categoriaId)) ?? 'Sem categoria'


  const getAllMovies = async ()=>{
    const movies = await getMovies();
    if(movies){
    setMovies(movies);
    }else{
      console.log('Não foi possível carregar os filmes');
    }
  }

  const getAllCategorias = async () => {
    const response = await getCategorias();
    if (response) {
      setCategorias(response);
    } else {
      console.log('Não foi possível carregar as categorias');
    }
  }

  const addMovie = async (event?: React.FormEvent) => {
    if (event) event.preventDefault();

    const novoFilme = {
      title: form.title,
      ano: form.ano,
      categoria: form.categoria,
      status: form.status,
      avaliacao: form.avaliacao,
      review: form.review,
    };

    try {
      const response = await postMovie(
        novoFilme.title,
        novoFilme.ano,
        novoFilme.categoria,
        novoFilme.status,
        novoFilme.avaliacao,
        novoFilme.review
      );

      // O backend às vezes devolve uma string de erro (ex.: campo inválido) em vez
      // do filme criado. Só aceita a resposta se ela realmente parecer um filme.
      const filmeValido =
        response && typeof response === 'object' && typeof response.title === 'string';

      if (filmeValido) {
        setMovies(prev => [...prev, response]);
        setForm({ ano: '', categoria: '', id: '', avaliacao: '', review: '', status: '', title: '' });
      } else if (response) {
        console.error('Erro ao adicionar filme:', response);
        alert(typeof response === 'string' ? response : 'Não foi possível adicionar o filme.');
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
    getAllCategorias()
  },[]);

  // Quando o modal de nova categoria cria uma, já adiciona na lista local
  // e deixa pré-selecionada no formulário de filme, sem precisar recarregar tudo.
  useEffect(() => {
    if (lastCreatedCategory) {
      setCategorias(prev => [...prev, lastCreatedCategory])
      setForm(prev => ({ ...prev, categoria: String(lastCreatedCategory.id) }))
      clearLastCreatedCategory()
    }
  }, [lastCreatedCategory, clearLastCreatedCategory]);


  const watchedMovies = useMemo(() => {
    const query = search.trim().toLowerCase()

    return movies.filter((movie) => {
      const matchesStatus = movie.status === 'assistido'
      const matchesTitle = movie?.title?.toLowerCase().includes(query)
      const matchesCategoria =
        categoriaFiltro === '' || String(movie?.categoria) === categoriaFiltro
      return matchesStatus && matchesTitle && matchesCategoria
    })
  }, [movies, search, categoriaFiltro])



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
            value={categoriaFiltro}
            onChange={(event) => setCategoriaFiltro(event.target.value)}
            aria-label="Filtrar por categoria"
          >
            <option value="">Todas as categorias</option>
            {categorias.map((item) => (
              <option key={item.id} value={item.id}>
                {item.categoria}
              </option>
            ))}
          </select>
          <button type="submit">Filtrar por categoria</button>
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
            <span>Categoria</span>
            <div className="field-with-action">
              <select
                value={form.categoria}
                onChange={(event) =>
                  setForm({ ...form, categoria: event.target.value })
                }
                required
              >
                <option value="" disabled>
                  Selecione
                </option>
                {categorias.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.categoria}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="field-action-button"
                onClick={openCategoryModal}
                aria-label="Adicionar nova categoria"
                title="Adicionar nova categoria"
              >
                +
              </button>
            </div>
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
                    {movie.ano} · {nomeDaCategoria(movie.categoria)}
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
