-- Active: 1706929329353@@127.0.0.1@3306@moviedb
DROP DATABASE IF EXISTS moviedb;

CREATE DATABASE moviedb;

-- usar
USE moviedb;

-- crear db
CREATE TABLE
    movie (
        id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN (UUID ())),
        title VARCHAR(255) NOT NULL,
        year INT NOT NULL,
        director VARCHAR(255) NOT NULL,
        duration INT NOT NULL,
        poster TEXT,
        rate DECIMAL(2, 1) UNSIGNED NOT NULL
    );

CREATE TABLE
    genre (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
    );

CREATE TABLE
    movie_genres (
        movie_id BINARY(16) REFERENCES movie (id),
        genre_id BINARY(16) REFERENCES genre (id),
        PRIMARY KEY (movie_id, genre_id)
    );

INSERT INTO
    genre (name)
VALUES
    ("Drama"),
    ("Action"),
    ("Crime"),
    ("Adventure"),
    ("Sci-Fi"),
    ("Romance"),
    ("Mystery");

INSERT INTO
    movie (id, title, year, director, duration, poster, rate)
VALUES
    (
        UUID_TO_BIN (UUID ()),
        "The Shawshank Redemption",
        1994,
        "Frank Darabont",
        142,
        "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp",
        9.3
    ),
    (
        UUID_TO_BIN (UUID ()),
        "The Dark Knight",
        2008,
        "Christopher Nolan",
        152,
        "https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg",
        9
    ),
    (
        UUID_TO_BIN (UUID ()),
        "Inception",
        2010,
        "Christopher Nolan",
        148,
        "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg",
        8.8
    ),
    (
        UUID_TO_BIN (UUID ()),
        "The Godfather",
        1972,
        "Francis Ford Coppola",
        175,
        "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        9.2
    ),
    (
        UUID_TO_BIN (UUID ()),
        "The Lord of the Rings: The Return of the King",
        2003,
        "Peter Jackson",
        201,
        "https://i.ebayimg.com/images/g/0hoAAOSwe7peaMLW/s-l1600.jpg",
        8.9
    ),
    (
        UUID_TO_BIN (UUID ()),
        "The Matrix",
        1999,
        "Lana Wachowski",
        136,
        "https://i.ebayimg.com/images/g/QFQAAOSwAQpfjaA6/s-l1200.jpg",
        8.7
    ),
    (
        UUID_TO_BIN (UUID ()),
        "Forrest Gump",
        1994,
        "Robert Zemeckis",
        142,
        "https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg",
        8.8
    ),
    (
        UUID_TO_BIN (UUID ()),
        "Gladiator",
        2000,
        "Ridley Scott",
        155,
        "https://img.fruugo.com/product/0/60/14417600_max.jpg",
        8.5
    ),
    (
        UUID_TO_BIN (UUID ()),
        "The Godfather: Part II",
        1974,
        "Francis Ford Coppola",
        202,
        "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        9
    ),
    (
        UUID_TO_BIN (UUID ()),
        "The Dark Knight Rises",
        2012,
        "Christopher Nolan",
        164,
        "https://m.media-amazon.com/images/S/pv-target-images/6f6945762d1a4b289ab6ae19bf8580498f614cc006ec092fdacb5ac7d3aabc19.jpg",
        8.4
    );

INSERT INTO
    movie_genres (movie_id, genre_id)
VALUES
    (
        (
            SELECT
                id
            FROM
                movie
            WHERE
                title = "The Shawshank Redemption"
        ),
        (
            SELECT
                id
            FROM
                genre
            WHERE
                name = "Drama"
        )
    ),
    (
        (
            SELECT
                id
            FROM
                movie
            WHERE
                title = "The Godfather"
        ),
        (
            SELECT
                id
            FROM
                genre
            WHERE
                name = "Drama"
        )
    ),
    (
        (
            SELECT
                id
            FROM
                movie
            WHERE
                title = "The Dark Knight"
        ),
        (
            SELECT
                id
            FROM
                genre
            WHERE
                name = "Action"
        )
    ),
    (
        (
            SELECT
                id
            FROM
                movie
            WHERE
                title = "The Dark Knight Rises"
        ),
        (
            SELECT
                id
            FROM
                genre
            WHERE
                name = "Action"
        )
    ),
    (
        (
            SELECT
                id
            FROM
                movie
            WHERE
                title = "Inception"
        ),
        (
            SELECT
                id
            FROM
                genre
            WHERE
                name = "Action"
        )
    ),
    (
        (
            SELECT
                id
            FROM
                movie
            WHERE
                title = "Inception"
        ),
        (
            SELECT
                id
            FROM
                genre
            WHERE
                name = "Sci-Fi"
        )
    ),
    (
        (
            SELECT
                id
            FROM
                movie
            WHERE
                title = "Inception"
        ),
        (
            SELECT
                id
            FROM
                genre
            WHERE
                name = "Mystery"
        )
    ),
    (
        (
            SELECT
                id
            FROM
                movie
            WHERE
                title = "Inception"
        ),
        (
            SELECT
                id
            FROM
                genre
            WHERE
                name = "Crime"
        )
    );

SELECT
    title,
    year,
    director,
    duration,
    poster,
    rate,
    BIN_TO_UUID (id)
FROM
    movie;