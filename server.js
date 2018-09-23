const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const server = express()
require('dotenv').config()

// USE BODY PARSER 
server.use(session({
	secret: 'bryanCranston',
	resave: false,
  	saveUninitialized: true
}))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false }))
server.use(fileUpload())

// USE CORS
server.use(cors({
    origin:['http://localhost:8080'],
    methods:['GET','POST'],
    credentials: true
}))

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

const PORT = process.env.PORT || 8080      //8080 for openshift

server.listen(PORT, () => {
	console.info('Express listening on port', PORT)
})