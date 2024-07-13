import express from 'express'

import identificador from './router/identificador.routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(identificador)

export default app;