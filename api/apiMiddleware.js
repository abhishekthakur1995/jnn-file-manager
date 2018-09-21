const express = require('express')
const apiRouter = express.Router()
const jwt = require('jsonwebtoken')

function checkAuth (req, res, next) {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function(err) {
            if (err) {
                res.status(400).json({message : err})
            } else {
                next();
            }
        })
    } else {
        res.status(400).json({message : 'Please send a token'})
    }
}

apiRouter.use(require('./router/users'))
apiRouter.use(checkAuth, require('./router/records'))

module.exports = apiRouter