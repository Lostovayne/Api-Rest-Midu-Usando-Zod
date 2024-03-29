# API REST Midu

Este es un proyecto de API REST que utiliza Node.js y Express para proporcionar un servicio de consulta y modificación de una lista de películas.

## Instalación

Para ejecutar este proyecto, asegúrate de tener Node.js instalado. Luego, puedes seguir estos pasos:

1. Clona este repositorio en tu máquina local.
2. Abre una terminal en el directorio del proyecto y ejecuta el comando `npm install` para instalar las dependencias del proyecto.
3. Levantar el contenedor de Docker `docker compose up -d`
4. Una vez instaladas las dependencias, puedes ejecutar el servidor con el comando `npm run dev`.

## Uso de Linter Standard

-   Instalacion de Linter Standard: `npm install standard -D`
-   Configuracion de Linter Standard: `standard --fix`
-   Agregar el comando `"dev": "standard --fix && node --watch app.js"`
-   Ejecutar el servidor: `npm run dev`

## Uso

Una vez que el servidor esté en ejecución, puedes realizar las siguientes operaciones:

-   Consultar la lista completa de películas: `GET /movies`
-   Filtrar películas por género: `GET /movies?genre=your_genre`
-   Consultar detalles de una película por su ID: `GET /movies/:id`
-   Agregar una nueva película: `POST /movies`
-   Actualizar información de una película existente: `PATCH /movies/:id`

## Tecnologías utilizadas

-   Node.js
-   Express
-   Zod (para validación de esquemas)

## Estructura del proyecto

El proyecto sigue la siguiente estructura de archivos y directorios:

-   `app.js`: Archivo principal que configura el servidor Express y define las rutas de la API.
-   `movies.json`: Archivo que contiene la lista de películas en formato JSON.
-   `schema/movies.js`: Archivo que define el esquema de validación para las películas.

## Uso de Arquitectura MVC

-   Arquitectura MVC: `Express` es el servidor de API REST que utiliza Node.js para proporcionar una aplicación de consulta y modificación de una lista de peliculas.
-   Los Modelos de datos se definen en `models` y estos son Inyectados desde el archivo principal `server-with-mysql.js` o sus variantes
-   El modelo debe cumplir con el contrato de la interfaz `MovieModel` definida en `models/local-file-system/movie.js`
-   En este caso `MovieModel` es una clase que define los métodos `getAll`, `getById`, `create`, `delete` y `update`
-   La Clase perteneciente al Modelo es la encargada de ejecutar las Queries de la base de datos
-   CreateMovieRouter recibe el `movieModel` por parametro como inyeccion del modelo
-   Luego se Crea una instancia de la clase `MovieController({movieModel})`
-   `MovieController` recibe el parametro `movieModel` en su constructor y utiliza los metodos con el this.movieModel para interactuar con el modelo y su base de datos

## Contribuir

Si deseas contribuir a este proyecto, siéntete libre de bifurcar el repositorio y enviar solicitudes de extracción con tus mejoras.

¡Disfruta usando la API REST Midu!
