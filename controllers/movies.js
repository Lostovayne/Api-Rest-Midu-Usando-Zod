import { MovieModel } from "../models/movie.js";
import { validateMovie, validatePartialMovie } from "../schema/movies.js";

// Los controladores estan manejando la respuesta del Modelo => controladores y enviandolo => Vista

export class MovieController {
    static async getAll(req, res) {
        const { genre } = req.query;
        const movies = await MovieModel.getAll({ genre });
        res.json(movies);
    }

    static async getById(req, res) {
        const { id } = req.params;
        const movie = await MovieModel.getById({ id });
        if (movie) return res.json(movie);
        res.status(404).json({ message: "Movie not found" });
    }

    static async create(req, res) {
        const result = validateMovie(req.body); // => Validaciones de las propiedades
        if (result.error) return res.status(400).json(result.error.issues);
        const movie = await MovieModel.create({ input: result.data });
        res.json(movie);
    }

    static async delete(req, res) {
        const { id } = req.params;
        const response = await MovieModel.delete({ id });
        if (!response) return res.status(404).json({ message: "Movie not found" });
        res.json({ message: "Movie deleted" });
    }

    static async update(req, res) {
        const { id } = req.params;
        const result = validatePartialMovie(req.body); // => Validacion Parcial, si viene se valida!
        if (!result.success) return res.status(400).json(result.error.issues);
        const updatedMovie = await MovieModel.update({ id, input: result.data });
        res.json(updatedMovie);
    }
}
