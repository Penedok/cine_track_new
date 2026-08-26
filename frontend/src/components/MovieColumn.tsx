import type { Movie, MovieStatus } from '../types/movie'
import MovieCard from './MovieCard'

type MovieColumnProps = {
  title: string
  hint: string
  status: MovieStatus
  movies: Movie[]
  onMove: (id: number, status: MovieStatus) => void
  onRate: (id: number, rating: number) => void
  onReview: (id: number, review: string) => void
}

export default function MovieColumn({
  title,
  hint,
  status,
  movies,
  onMove,
  onRate,
  onReview,
}: MovieColumnProps) {
  return (
    <section className={`movie-column ${status}`}>
      <header className="column-header">
        <div>
          <h2>{title}</h2>
          <p>{hint}</p>
        </div>
        <span className="column-count">{movies.length}</span>
      </header>

      {movies.length === 0 ? (
        <p className="column-empty">Nenhum filme nesta lista.</p>
      ) : (
        <div className="column-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMove={onMove}
              onRate={onRate}
              onReview={onReview}
            />
          ))}
        </div>
      )}
    </section>
  )
}
