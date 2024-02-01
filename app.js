import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import movieRouter from './routes/movies.js'

const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})
app.use('/movies', movieRouter)
app.use(corsMiddleware()) // Cors solucionado debe ir debajo de las rutas
// Listado de Direcciones de acceso permitidas para los CORS
// const ACCEPTED_ORIGINS = [
//     "https://api-movies-midu.vercel.app",
// ];

const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
