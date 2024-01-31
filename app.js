const express = require("express");
const movies = require("./movies.json");
const crypto = require("crypto");
const { validateMovie, validatePartialMovie } = require("./schema/movies");
const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.get("/", (req, res) => res.json({ message: "Hello World!" }));

// Listado de Direcciones de acceso permitidas para los CORS
const ACCEPTED_ORIGINS = [
    "https://api-movies-midu.vercel.app",
    "http://localhost:3000",
    "http://localhost:1234",
    "http://localhost:1235",
    "http://localhost:1236",
];

app.get("/movies", (req, res) => {
    const { genre } = req.query;
    const origin = req.headers("origin"); // => CORS
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Credentials", true);
    }

    if (genre) {
        const filteredMovies = movies.filter((movie) =>
            movie.genre.some((g) => g.toLocaleLowerCase() === genre.toLocaleLowerCase())
        );
        return res.json(filteredMovies);
    }
    res.json(movies);
});

app.get("/movies/:id", (req, res) => {
    const { id } = req.params;
    const movie = movies.find((movie) => movie.id === id);
    if (movie) return res.json(movie);
    res.status(404).json({ message: "Movie not found" });
});

app.post("/movies", (req, res) => {
    const result = validateMovie(req.body); // => Validaciones de las propiedades
    if (result.error) return res.status(400).json(result.error.issues);
    // en base de datos
    const newMovie = { id: crypto.randomUUID(), ...result.data };
    movies.push(newMovie);
    res.status(201).json(newMovie); // => Actualiar la cache del cliente
});

app.patch("/movies/:id", (req, res) => {
    const { id } = req.params;
    const result = validatePartialMovie(req.body); // => Validacion Parcial, si viene se valida!
    if (!result.success) return res.status(400).json(result.error.issues);

    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return res.status(404).json({ message: "Movie not found" });

    const updatedMovie = { ...movies[movieIndex], ...result.data };
    movies[movieIndex] = updatedMovie;
    res.json(updatedMovie);
});

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
