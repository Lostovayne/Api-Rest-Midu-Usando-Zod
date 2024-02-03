// import { MovieModel } from '../models/local-file-system/movie.js'
import { validateMovie, validatePartialMovie } from "../schema/movies.js";

// Los controladores estan manejando la respuesta del Modelo => controladores y enviandolo => Vista

export class MovieController {
    constructor({ movieModel }) {
        this.movieModel = movieModel;
    }

    getAll = async (req, res) => {
        const { genre } = req.query;
        const movies = await this.movieModel.getAll({ genre });
        res.json(movies);
    };

    getById = async (req, res) => {
        const { id } = req.params;
        const movie = await this.movieModel.getById({ id });
        if (movie) return res.json(movie);
        res.status(404).json({ message: "Movie not found" });
    };

    create = async (req, res) => {
        const result = validateMovie(req.body); // => Validaciones de las propiedades
        if (result.error) return res.status(400).json(result.error.issues);
        const movie = await this.movieModel.create({ input: result.data });
        res.json(movie);
    };

    delete = async (req, res) => {
        const { id } = req.params;
        const response = await this.movieModel.delete({ id });
        if (!response) return res.status(404).json({ message: "Movie not found" });
        res.json({ message: "Movie deleted" });
    };

    update = async (req, res) => {
        const { id } = req.params;
        const result = validatePartialMovie(req.body); // => Validacion Parcial, si viene se valida!
        if (!result.success) return res.status(400).json(result.error.issues);
        const updatedMovie = await this.movieModel.update({ id, input: result.data });
        res.json(updatedMovie);
    };
}
