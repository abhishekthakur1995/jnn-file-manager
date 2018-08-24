const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const server = express()
require('dotenv').config()

// USE BODY PARSER 
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))

// USE CORS
server.use(cors())

// first callback invoked on every new request
server.use((req, res, next) => {
	console.log(`${req.method} request for ${req.url}`)
	next()
})

// serve public folders
server.use(express.static(__dirname + '/dist'))

//attach api middleware
server.use('/rest', require('./api/apiMiddleware'))

// send other requests to index.html
server.get('/*', (req, res) => {
  	res.sendFile(__dirname + '/dist/index.html')
})

server.listen(process.env.PORT, () => {
	console.info('Express listening on port', process.env.PORT)
})
