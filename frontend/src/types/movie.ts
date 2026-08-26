export type MovieStatus = 'quero-ver' | 'assistindo' | 'assistido'

export type Movie = {
  id: number
  title: string
  year: number
  genre: string
  status: MovieStatus
  rating: number
  review: string
}
