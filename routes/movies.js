import { Router } from "express";
import { createRequire } from "module";
import { validateMovie, validatePartialMovie } from "../schema/movies.js";
const require = createRequire(import.meta.url);
const movies = require("../movies.json");

const router = Router();

router.get("/", (req, res) => {
    const { genre } = req.query;
    // const origin = req.headers("origin"); // => CORS
    // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    //     res.header("Access-Control-Allow-Origin", origin);
    //     res.header("Access-Control-Allow-Credentials", true);
    // }

    if (genre) {
        const filteredMovies = movies.filter((movie) =>
            movie.genre.some((g) => g.toLocaleLowerCase() === genre.toLocaleLowerCase())
        );
        return res.json(filteredMovies);
    }
    res.json(movies);
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const movie = movies.find((movie) => movie.id === id);
    if (movie) return res.json(movie);
    res.status(404).json({ message: "Movie not found" });
});

router.post("/", (req, res) => {
    const result = validateMovie(req.body); // => Validaciones de las propiedades
    if (result.error) return res.status(400).json(result.error.issues);
    const newMovie = { id: crypto.randomUUID(), ...result.data }; // =>  Agregar en la BD
    movies.push(newMovie);
    res.status(201).json(newMovie); // => Actualiar la cache del cliente
});

router.patch("/:id", (req, res) => {
    const { id } = req.params;
    const result = validatePartialMovie(req.body); // => Validacion Parcial, si viene se valida!
    if (!result.success) return res.status(400).json(result.error.issues);

    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return res.status(404).json({ message: "Movie not found" });

    const updatedMovie = { ...movies[movieIndex], ...result.data };
    movies[movieIndex] = updatedMovie;
    res.json(updatedMovie);
});

export default router;
