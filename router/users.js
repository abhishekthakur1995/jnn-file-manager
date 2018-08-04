const express = require('express')
const users = express.Router()
const connection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* 	path: /register
 *	type: POST 
 */

users.post('/register', function(req, res) {
	bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
		const userData = {
	        "USER_NAME": req.body.user_name,
	        "EMAIL": req.body.email,
	        "PASSWORD": hash,
	        "ROLE": req.body.role,
	    }
		connection.query(`INSERT INTO ${process.env.USER_TBL} SET ?`, userData, function(err, results, fields) {
			if (err) {
				res.status(200).json({'message' : err})
			}
			res.status(200).json({'message' : 'User Registered successfully'})
		})
		connection.end(err => {
			if(err) console.log(err);
		})
	})
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
			res.status(200).json({'message' : err, 'token' : token, 'success':false})
		}
		if (results.length > 0) {
			bcrypt.compare(password, results[0].PASSWORD).then(function(match) {
				if (match == true) {
					token = jwt.sign(JSON.parse(JSON.stringify(results[0])), process.env.SECRET_KEY, {
			 			expiresIn: process.env.TOKEN_EXPIRY_TIME
					})
					res.status(200).json({'message' : 'User verified', 'token' : token, 'success':true})
				} else {
					res.status(200).json({'message' : 'Email or Password does not match', 'token' : token, 'success':false})
				}
			})
		} else {
			res.status(200).json({'message' : 'Email does not exists', 'token' : token, 'success':false})
		}
	})
	// connection.end(err => {
	// 	if(err) console.log(err);
	// })
})

users.use(function(req, res, next) {
	const token = req.headers.authorization
 	if (token) {
		jwt.verify(token, process.env.SECRET_KEY, function(err) {
			if (err) {
	 			res.status(200).json({'message' : err})
			} else {
				next();
	 		}
 		});
 	} else {
		res.status(200).json({'message' : 'Please send a token'})
 	}
})

module.exports = users