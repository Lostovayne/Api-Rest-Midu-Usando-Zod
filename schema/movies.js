const z = require("zod");
const movieSchema = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string",
    }),
    year: z.number().int({ message: "Year must be an integer" }).min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    poster: z.string().url({
        message: "Invalid URL",
        invalid_type_error: "Poster must be a string",
        required_error: "Poster is required",
    }),
    genre: z.array(
        z.enum(["Action", "Adventure", "Crime", "Comedy", "Drama", "Fantasy", "Horror", "Romance", "Thriller", "Sci-Fi"]),
        {
            invalid_type_error: "Genre must be an array",
            required_error: "Genre is required",
        }
    ),
    rate: z.number().min(0).max(10).default(5),
});

function validateMovie(movie) {
    return movieSchema.safeParse(movie);
}

function validatePartialMovie(input) {
    return movieSchema.partial().safeParse(input);
}

module.exports = { validateMovie, validatePartialMovie };
