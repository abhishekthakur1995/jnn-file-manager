const express = require('express')
const users = express.Router()
const connection = require('../../db/dbConnection')
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
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array()})
	  	}

		const email = req.body.email;
	    const password = req.body.password;
	    var token = '';
		connection.query(`SELECT * FROM ${process.env.USER_TBL} WHERE EMAIL = ? AND STATUS = 1`, [email], function(err, results, fields) {
			if (err) { return res.status(400).json({message : err, token : token, success : false}) }

			if (results.length > 0) {
				bcrypt.compare(password, results[0].PASSWORD).then(function(match) {
					if (match == true) {
						token = jwt.sign(JSON.parse(JSON.stringify(results[0])), process.env.SECRET_KEY, {
				 			expiresIn: parseInt(process.env.TOKEN_EXPIRY_TIME)
						})
						req.session[token] = results[0].ROLE
						return res.status(200).json({message : 'User verified', 'userRole': results[0].ROLE , token: token, validUpto : Date.now() + parseInt(process.env.TOKEN_EXPIRY_TIME), success : true})
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

/* 	path: /logout
 *	type: POST 
 */

users.post('/logout', (req, res) => {
	req.session.destroy(function(err) {
	  	if (err) {
    		return res.status(200).json({message : 'Unable to logout', err, success : false})
    	}
    	res.status(200).json({message : 'user successfully logout', success : true})
	})
})

/*	path: /downloadSampleExcel
 *	type: GET
 */

users.get('/downloadSampleExcel', (req, res) => {
	const sampleExcel = `${__dirname}/../../upload/sampleExcel/data.xlsx`
	res.setHeader('Content-disposition', 'attachment; filename=data.xlsx')
	res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
	res.download(sampleExcel)
})

/*	path: /userAuth/resetPassword
 *	type: POST
 */

users.post('/resetPassword', 
	[
		check('currentPassword').not().isEmpty().withMessage('currentPassword cannot be empty'),
		check('newPassword').not().isEmpty().withMessage('newPassword cannot be empty'),
		check('newPassword').isLength({ min: 8 }).withMessage('New password must be atleast 8 characters in length'),
		check('confirmNewPassword').not().isEmpty().withMessage('confirmNewPassword cannot be empty')
	],
	(req,res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array()})
	  	}

	  	const { currentPassword, newPassword, confirmNewPassword } = req.body
	  	const userRole = req.headers.userrole

	  	if(newPassword === confirmNewPassword) {
		  	connection.query(`SELECT PASSWORD FROM ${process.env.USER_TBL} WHERE ROLE = ? AND STATUS = 1`, [userRole], (err, results, fields) => {
				if (err) { return res.status(400).json({message : 'Unable to reset password. Please try again', success : false}) }

				if (results.length > 0) {
					bcrypt.compare(currentPassword, results[0].PASSWORD).then(function(match) {
						if (match == true) {
							bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS)).then(function(hashedPassword) {
								connection.query(`UPDATE ${process.env.USER_TBL} SET PASSWORD = ?`, [hashedPassword], (err, results, fields) => {
									if (err) { return res.status(400).json({message : 'Unable to reset password. Please try again', success : false}) }
									res.status(200).json({message : 'User password resetted successfully', success: true})	
								})
							})
						} else {
							return res.status(400).json({message : 'Incorrect password sent. Please enter the correct password', success : false})
						}
					})
				} else {
					return res.status(400).json({message : 'No user exists', success : false})
				}
		  	})
	  	} else {
	  		res.status(400).json({message : 'Password and confirm password do not match. Please try again', success : false})
	  	}
	}
)

module.exports = users