export type MovieStatus = 'quero-ver' | 'assistindo' | 'assistido'

export type Category = {
  id: number
  categoria: string
}

export type Movie = {
  id: number
  title: string
  year: number
  categoria: number
  status: MovieStatus
  rating: number
  review: string
}
