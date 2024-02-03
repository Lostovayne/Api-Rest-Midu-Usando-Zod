import mysql from "mysql2/promise";

const config = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "moviedb",
    port: 3306,
};

const connection = await mysql.createConnection(config);
// console.log("Conectado", connection);

export class MovieModel {
    static async getAll({ genre }) {
        if (genre) {
            const lowerCaseGenre = genre.toLocaleLowerCase();
            const [genres] = await connection.query("SELECT id, name FROM genre WHERE LOWER(name) = ?;", [lowerCaseGenre]);

            if (genres.length === 0) return [];
            // get the id from the forst genre result
            const [{ id }] = genres;
            const [movie_id] = await connection.query("SELECT movie_id FROM movie_genres WHERE genre_id = ?;", [id]);
            const dataResponse = [];
            for (let i = 0; i < movie_id.length; i++) {
                const buffer = Buffer.from(movie_id[i].movie_id);
                const ids_movie = [buffer.toString("hex").replace(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/, "$1-$2-$3-$4-$5")];
                const response = await connection.query(
                    "SELECT title, year, director, duration, poster, rate, BIN_TO_UUID (id) FROM movie WHERE BIN_TO_UUID (id) = ?;",
                    ids_movie
                );
                dataResponse.push(response[0][0]);
            }
            return dataResponse;
        }

        const [movies] = await connection.query(
            "SELECT title, year, director, duration, poster, rate, BIN_TO_UUID (id) FROM movie;"
        );
        return movies;
    }

    static async getById({ id }) {
        const [movie] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID (id) id FROM movie WHERE id = UUID_TO_BIN(?);`,
            [id]
        );

        return movie[0];
    }

    static async create({ input }) {
        const { genre: genreInput, title, year, duration, director, rate, poster } = input;
        // Generar el UUID desde MySQL
        const [uuidResult] = await connection.query("SELECT UUID() uuid;"); // => Traer el UUID desde la base de datos
        const [{ uuid }] = uuidResult;
        try {
            await connection.query(
                `INSERT INTO movie (id,title, year, director, duration, poster, rate) 
                VALUES (UUID_TO_BIN("${uuid}"),?, ?, ?, ?, ?, ?);`,
                [title, year, director, duration, poster, rate]
            );
        } catch (error) {
            throw new Error("Error creating movie");
        }
        // Devolver la pelicula creada
        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID (id) id FROM movie WHERE id = UUID_TO_BIN(?);`,
            [uuid]
        );
        return movies[0];
    }

    static async delete({ id }) {
        const movieDelete = await connection.query("DELETE FROM movie WHERE BIN_TO_UUID(id) = ?", [id]);
        return movieDelete;
    }

    static async update({ id, input }) {
        try {
            await connection.query("UPDATE movie SET ? WHERE BIN_TO_UUID(id) = ?;", [input, id]);
            const [movie] = await connection.query(
                "SELECT title, year, director, duration, poster, rate, BIN_TO_UUID (id) FROM movie WHERE BIN_TO_UUID (id) = ?;",
                [id]
            );
            return movie[0];
        } catch (error) {
            throw new Error("Error updating movie");
        }
    }
}
