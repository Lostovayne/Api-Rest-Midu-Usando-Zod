import cors from 'cors'

export const corsMiddleware = () =>
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        'http://localhost:3000',
        'http://localhost:1234',
        'https://api-movies.com',
        'http://localhost:1234/movies'
      ]

      if (ACCEPTED_ORIGINS.includes(origin)) {
        callback(null, true)
      }

      if (!origin) {
        callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    }
  })
