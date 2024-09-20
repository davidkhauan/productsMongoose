const express = require ('express')
const expHandlebars = require ('express-handlebars')

const app = express()

const connection = require ('./db/connection')

const productsRoutes = require ('./routes/productsRoutes')

app.engine ('handlebars', expHandlebars.engine())
app.set ('view engine', 'handlebars')

app.use (express.urlencoded ({ extended: true }))
app.use (express.json ())
app.use (express.static ('public'))

app.use ('/products', productsRoutes)

app.listen (3000)