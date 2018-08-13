const express = require('express')
const users = express.Router()
const connection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator/check')

/* 	path: /register
 *	type: POST 
 */

users.post('/register', 
	[
		check('user_name').not().isEmpty().withMessage('user name cannot be empty').trim().escape(),
		check('email').isEmail().withMessage('email is not a valid email').trim().escape(),
		check('password').isLength({ min: 8 }).withMessage('password must be atleast 8 characters in length'),
		check('role').not().isEmpty().withMessage('role cannot be empty').trim().escape()
	],
	function(req, res) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array()})
	  	}

		bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS)).then(function(hash) {
			const userData = {
		        "USER_NAME": req.body.user_name,
		        "EMAIL": req.body.email,
		        "PASSWORD": hash,
		        "ROLE": req.body.role,
		    }
			connection.query(`INSERT INTO ${process.env.USER_TBL} SET ?`, userData, function(err, results, fields) {
				if (err) {
					return res.status(400).json({message : err})
				}
				res.status(200).json({message : 'User Registered successfully'})
			})
		})
	}
)

/* 	path: /login
 *	type: POST 
 */

users.post('/login', 
	[
		check('email').not().isEmpty().withMessage('email cannot be empty'),
		check('password').not().isEmpty().withMessage('password cannot be empty')
	],
	function(req, res) {
		const email = req.body.email;
	    const password = req.body.password;
	    var token = '';
		connection.query(`SELECT * FROM ${process.env.USER_TBL} WHERE EMAIL = ?`, [email], function(err, results, fields) {
			if (err) {
				return res.status(400).json({message : err, token : token, success : false})
			}
			if (results.length > 0) {
				bcrypt.compare(password, results[0].PASSWORD).then(function(match) {
					if (match == true) {
						token = jwt.sign(JSON.parse(JSON.stringify(results[0])), process.env.SECRET_KEY, {
				 			expiresIn: parseInt(process.env.TOKEN_EXPIRY_TIME)
						})
						return res.status(200).json({message : 'User verified', token : token, validUpto : Date.now() + parseInt(process.env.TOKEN_EXPIRY_TIME), success : true})
					} else {
						return res.status(200).json({message : 'Email or Password does not match', token : token, success : false})
					}
				})
			} else {
				res.status(200).json({message : 'Email does not exists', token : token, success : false})
			}
		})
	}
)

users.use(function(req, res, next) {
	const token = req.headers.authorization
 	if (token) {
		jwt.verify(token, process.env.SECRET_KEY, function(err) {
			if (err) {
	 			res.status(400).json({message : err})
			} else {
				next();
	 		}
 		});
 	} else {
		res.status(400).json({message : 'Please send a token'})
 	}
})

module.exports = users