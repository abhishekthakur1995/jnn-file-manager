const express = require('express')
const users = express.Router()
const connection = require('../db/dbConnection')

/* 	path: /register
 *	type: POST 
 */

users.post('/register', function(req, res) {
	const userData = {
        "USER_NAME": req.body.user_name,
        "EMAIL": req.body.email,
        "PASSWORD": req.body.password,
        "ROLE": req.body.role,
    }
	connection.query(`INSERT INTO ${process.env.USER_TBL} SET ?`, userData, function(err, results, fields) {
		if (err) {
			res.status(400).json({'message' : err})
		}
		res.status(400).json({'message' : 'User Registered successfully'})
	})
	connection.release()
})

/* 	path: /login
 *	type: POST 
 */

users.post('/login', function(req, res) {
	const email = req.body.email;
    const password = req.body.password;
    var token = '';
	connection.query(`SELECT * FROM ${process.env.USER_TBL} WHERE EMAIL = ?`, [email], function(err, results, fields) {
		if (err) {
			res.status(400).json({'message' : err, 'token' : token})
		}
		if (rows.length > 0) {
			if (rows[0].password == password) {
				token = jwt.sign(rows[0], process.env.SECRET_KEY, {
		 			expiresIn: 5000
				})
				res.status(200).json({'message' : 'User verified', 'token' : token})
			} else {
				res.status(204).json({'message' : 'Email or Password does not match', 'token' : token})
			}
		} else {
			res.status(204).json({'message' : 'Email does not exists', 'token' : token})
		}
	})
	connection.release()
})

users.use(function(req, res, next) {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];
 	if (token) {
		jwt.verify(token, process.env.SECRET_KEY, function(err) {
			if (err) {
	 			res.status(500).json({'message' : err})
			} else {
				next();
	 		}
 		});
 	} else {
		res.status(403).json({'message' : 'Please send a token'})
 	}
})

module.exports = users
