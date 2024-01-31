const express = require("express");
const movies = require("./movies.json");
const crypto = require("crypto");
const { validateMovie, validatePartialMovie } = require("./schema/movies");
const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.get("/", (req, res) => res.json({ message: "Hello World!" }));

app.get("/movies", (req, res) => {
    const { genre } = req.query;

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
    const result = validateMovie(req.body); // => Validaciones
    if (result.error) return res.status(400).json(result.error.issues);
    // en base de datos
    const newMovie = { id: crypto.randomUUID(), ...result.data };
    movies.push(newMovie);
    res.status(201).json(newMovie); // => Actualiar la cache del cliente
});

app.patch("/movies/:id", (req, res) => {
    const { id } = req.params;
    const result = validatePartialMovie(req.body);
    // validando
    if (!result.success) return res.status(400).json(result.error.issues);
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if (movieIndex === -1) return res.status(404).json({ message: "Movie not found" });
    console.log({ ...movies[movieIndex] });
    const updatedMovie = { ...movies[movieIndex], ...result.data };
    movies[movieIndex] = updatedMovie;
    res.json(updatedMovie);
});

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
