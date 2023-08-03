import * as Path from 'node:path'
import * as URL from 'node:url'
import express from 'express'
import hbs from 'express-handlebars'
import * as fs from 'node:fs/promises'

const __filename = URL.fileURLToPath(import.meta.url)
const __dirname = Path.dirname(__filename)

const filePath = Path.join(__dirname, 'data', 'data.json')
console.log('file path', filePath)
const data = await fs.readFile(filePath, 'utf-8')
console.log('task data', data)
const taskData = JSON.parse(data)
console.log('parsed data', taskData)
const taskList = taskData.tasks
console.log('task list', taskList)

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
server.get('/', (req, res) => {
  res.render('home', taskData)
})

export default server
