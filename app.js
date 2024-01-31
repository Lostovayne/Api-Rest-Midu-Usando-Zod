import cors from "cors";
import express from "express";
import router from "./routes/movies.js";

const app = express();

app.disable("x-powered-by");
app.use(express.json());
app.use(cors());
app.use("movies/", router);

// Listado de Direcciones de acceso permitidas para los CORS
// const ACCEPTED_ORIGINS = [
//     "https://api-movies-midu.vercel.app",
// ];

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
