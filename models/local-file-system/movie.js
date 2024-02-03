import crypto from 'crypto'
import { readJSON } from '../../utils.js'
const movies = readJSON('./movies.json')

// Modelos que pueden conectarse a la base de datos
export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const filteredMovies = movies.filter((movie) =>
        movie.genre.some((g) => g.toLocaleLowerCase() === genre.toLocaleLowerCase())
      )
      return filteredMovies
    }
    return movies
  }

  static async getById ({ id }) {
    return movies.find((movie) => movie.id === id)
  }

  static async create ({ input }) {
    const newMovie = { id: crypto.randomUUID(), ...input } // =>  Agregar en la BD
    movies.push(newMovie)
    return newMovie // => Actualiar la cache del cliente
  }

  static async delete ({ id }) {
    // Peticion a la base de datos
    const movieIndex = movies.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) return false
    movies.splice(movieIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) return false
    movies[movieIndex] = { ...movies[movieIndex], ...input }
    return {
      ...movies[movieIndex]
    }
  }
}
