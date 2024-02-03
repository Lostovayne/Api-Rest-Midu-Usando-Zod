import { Router } from "express";
import { MovieController } from "../controllers/movies.js";

const moviesRouter = Router();

export const createMovieRouter = ({ movieModel }) => {
    const movieController = new MovieController({ movieModel });
    moviesRouter.post("/", movieController.create);
    moviesRouter.patch("/:id", movieController.update);
    moviesRouter.get("/", movieController.getAll);
    moviesRouter.get("/:id", movieController.getById);
    moviesRouter.delete("/:id", movieController.delete);
    return moviesRouter;
};
