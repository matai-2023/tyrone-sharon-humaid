import * as Path from 'node:path'
// import * as URL from 'node:url'

import express, { json } from 'express'
import hbs from 'express-handlebars'
import fsPromises from 'node:fs/promises'

const server = express()

// Server configuration
const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', Path.resolve('server/views'))

// Your routes/router(s) should go here

server.post('/', async (req, res) => {
  const body = req.body
  const filePath = Path.join(__dirname, 'data', 'data.jaosn')
  bodyArray = JSON.parse(body)
  let newData = bodyArray.map

  const data = await fsPromises.writeFile(filePath)
  const ViewData = JSON.parse(data)
  res.render('home', ViewData)
})

export default server
