import * as Path from 'node:path'
import * as URL from 'node:url'

import express from 'express'
import hbs from 'express-handlebars'
import * as fs from 'node:fs/promises'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const filePath = Path.join(__dirname, 'data', 'data.json')

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
server.get('/', async (req, res) => {
  const data = await fs.readFile(filePath, 'utf-8')
  const taskData = JSON.parse(data)
  res.render('home', taskData)
})

server.post('/deleteTask/:id', async (req, res) => {
  const data = await fs.readFile(filePath, 'utf-8')
  const taskData = JSON.parse(data)
  const taskList = taskData.tasks
  const id = Number(req.params.id)
  const indexOfObject = taskList.findIndex((obj) => {
    return obj.id === id
  })

  //Delete data from array
  taskList.splice(indexOfObject, 1)
  const stringedData = JSON.stringify(taskData, null, 2)
  await fs.writeFile(filePath, stringedData, 'utf-8')
  res.redirect('/')
})

server.post('/', async (req, res) => {
  const filePath = Path.join(__dirname, 'data', 'data.json')

  const data = JSON.parse(await fs.readFile(filePath, 'utf-8'))

  const i = data.tasks.length

  const newObject = Object.assign({}, req.body)

  newObject['id'] = i + 1

  const dataList = data.tasks

  dataList.push(newObject)

  dataList.forEach((task, index) => {
    task.id = index + 1
  })

  const strData = JSON.stringify(data, null, 2)

  await fs.writeFile(filePath, strData, 'utf-8')

  res.redirect('/')
})

export default server
