import type { Movie, MovieStatus } from '../types/movie'

const NEXT_STATUS: Partial<Record<MovieStatus, MovieStatus>> = {
  'quero-ver': 'assistindo',
  assistindo: 'assistido',
}

const NEXT_LABEL: Partial<Record<MovieStatus, string>> = {
  'quero-ver': 'Começar a assistir',
  assistindo: 'Marcar como assistido',
}

type MovieCardProps = {
  movie: Movie
  onMove: (id: number, status: MovieStatus) => void
  onRate: (id: number, rating: number) => void
  onReview: (id: number, review: string) => void
}

export default function MovieCard({
  movie,
  onMove,
  onRate,
  onReview,
}: MovieCardProps) {
  const nextStatus = NEXT_STATUS[movie.status]
  const isWatched = movie.status === 'assistido'

  return (
    <article className={`movie-card ${movie.status}`}>
      <div className="movie-poster" aria-hidden="true">
        <span>{movie.title.charAt(0)}</span>
      </div>

      <div className="movie-body">
        <p className="movie-meta">
          {movie.year} · {movie.genre}
        </p>
        <h3>{movie.title}</h3>

        {nextStatus && (
          <button
            type="button"
            className="movie-action"
            onClick={() => onMove(movie.id, nextStatus)}
          >
            {NEXT_LABEL[movie.status]}
          </button>
        )}

        {isWatched && (
          <div className="movie-feedback">
            <div className="rating">
              <span className="feedback-label">Minha avaliação</span>
              <div className="stars" role="group" aria-label="Avaliação">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={star <= movie.rating ? 'star on' : 'star'}
                    onClick={() => onRate(movie.id, star)}
                    aria-label={`${star} estrela${star > 1 ? 's' : ''}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <label className="review">
              <span className="feedback-label">Minha review</span>
              <textarea
                value={movie.review}
                onChange={(event) => onReview(movie.id, event.target.value)}
                placeholder="O que você achou desse filme?"
                rows={3}
              />
            </label>
          </div>
        )}
      </div>
    </article>
  )
}
