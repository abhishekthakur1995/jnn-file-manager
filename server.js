const express = require('express')
const server = express()
require('dotenv').config()
const cors = require('cors')
const redis = require("redis")
const helmet = require('helmet')
const client  = redis.createClient()
const bodyParser = require('body-parser')
const session = require('express-session')
const fileUpload = require('express-fileupload')
const redisStore = require('connect-redis')(session)

const redisOptions = {
	host: process.env.REDIS_HOST, 
	port: process.env.REDIS_PORT,
	ttl : process.env.TIME_TO_LIVE,
	client: client
}

server.use(helmet())
server.use(helmet.contentSecurityPolicy({
	directives: {
    	defaultSrc: ["'self'"],
    	reportUri: '/report-violation'
  	}
}))
server.use(helmet.referrerPolicy({ policy: 'same-origin' }))
server.use(helmet.frameguard({ action: 'deny' }))
server.use(helmet.permittedCrossDomainPolicies())
server.use(session({
	name: process.env.SESSION_NAME,
	secret: process.env.SESSION_SECRET,
	store: new redisStore(redisOptions),
	resave: false,
  	saveUninitialized: true
}))
server.use(bodyParser.json({
	type: ['json', 'application/csp-report']
}))
server.use(bodyParser.urlencoded({ extended: false }))
server.use(fileUpload())

// USE CORS
server.use(cors({
    origin:['http://localhost:8080'],
    methods:['GET', 'POST', 'PUT', 'DELETE'],
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

// enable it to disable unhandled rejection errors.
// process.on('unhandledRejection', (reason, promise) => {
// 	console.log('Unhandled Rejection at:', reason.stack || reason)
// })