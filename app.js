import express from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import { MovieModel } from "./models/mysql/movie.js";
import { createMovieRouter } from "./routes/movies.js";

export const createApp = ({ movieModel }) => {
    const app = express();
    app.disable("x-powered-by");
    app.use(express.json());
    app.use("/movies", createMovieRouter({ movieModel }));
    app.use(corsMiddleware()); // Cors solucionado debe ir debajo de las rutas
    // Listado de Direcciones de acceso permitidas para los CORS
    // const ACCEPTED_ORIGINS = [
    //     "https://api-movies-midu.vercel.app",
    // ];

    const PORT = process.env.PORT || 1234;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};
