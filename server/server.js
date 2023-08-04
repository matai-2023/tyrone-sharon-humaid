import * as Path from 'node:path'
import * as URL from 'node:url'

import express from 'express'
import hbs from 'express-handlebars'
import * as fs from 'node:fs/promises'

const server = express()

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

// Server configuration
const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', Path.resolve('server/views'))

// Your routes/router(s) should go here

server.get('/', (req, res) => {
  res.render('home')
})

server.post('/', async (req, res) => {
  // const body = []

  const filePath = Path.join(__dirname, 'data', 'data.json')

  const data = JSON.parse(await fs.readFile(filePath, 'utf-8'))

  const i = data.tasks.length

  const newObject = Object.assign({}, req.body)

  newObject['id'] = i + 1

  const dataList = data.tasks

  dataList.push(newObject)

  const strData = JSON.stringify(data, null, 2)

  await fs.writeFile(filePath, strData)

  res.render('home')
})

export default server
