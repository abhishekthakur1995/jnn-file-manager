const express = require('express')
const apiRouter = express.Router()
const jwt = require('jsonwebtoken')

function checkAuth (req, res, next) {
    const token = req.headers.authorization
    const userRole = req.headers.userrole

    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function(err) {
            if (err) {
                return res.status(400).json({message : err})
            } else {
                if(req.session[token] === userRole) {
                    next()
                } else {
                    return res.status(400).json({message : 'Unauthorized user'})
                }
            }
        })
    } else {
        res.status(400).json({message : 'Please send a token'})
    }
}

apiRouter.use(require('./router/users'))
apiRouter.use(checkAuth, require('./router/records'))

module.exports = apiRouter