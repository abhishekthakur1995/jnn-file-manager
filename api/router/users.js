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
		check('user_name').not().isEmpty().withMessage('User name cannot be empty').trim().escape(),
		check('email').isEmail().withMessage('Email is not a valid email').trim().escape(),
		check('password').isLength({ min: 8 }).withMessage('Password must be atleast 8 characters in length'),
		check('role').not().isEmpty().withMessage('Role cannot be empty').trim().escape()
	],
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array()[0].msg, saved: false})
	  	}

		bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS)).then((hash) => {
			const userData = {
		        "USER_NAME": req.body.user_name,
		        "EMAIL": req.body.email,
		        "PASSWORD": hash,
		        "ROLE": req.body.role,
		    }
			connection.query(`INSERT INTO ${process.env.USER_TBL} SET ?`, userData, (err, results, fields) => {
				if (err) {
					if(err.code === 'ER_DUP_ENTRY') {
						return res.status(400).json({message: 'User already exists.', saved: false})
					} else {
						return res.status(400).json({message: 'Unable to create user. Please try again', saved: false})
					}
				}
				res.status(200).json({message: 'User Registered successfully', saved: true})
			})
		})
	}
)

/* 	path: /login
 *	type: POST 
 */

users.post('/login',
	[
		check('email').not().isEmpty().withMessage('Email address cannot be empty. Please enter an email address'),
		check('password').not().isEmpty().withMessage('Password cannot be empty. Please enter your password')
	],
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array()[0].msg, success: false})
	  	}

		const email = req.body.email;
	    const password = req.body.password;
	    let token = '';
		connection.query(`SELECT * FROM ${process.env.USER_TBL} WHERE EMAIL = ? AND STATUS = 1`, [email], (err, results, fields) => {
			if (err) { return res.status(400).json({message: err, token: token, success: false}) }

			if (results.length > 0) {
				bcrypt.compare(password, results[0].PASSWORD).then((match) => {
					if (match == true) {
						token = jwt.sign(JSON.parse(JSON.stringify(results[0])), process.env.SECRET_KEY, {
				 			expiresIn: parseInt(process.env.TOKEN_EXPIRY_TIME)
						})
						req.session[token] = results[0].ROLE
						return res.status(200).json({message: 'Login Successful. You will be redirected to the dashboard.', userRole: results[0].ROLE , token: token, validUpto: Date.now() + parseInt(process.env.TOKEN_EXPIRY_TIME), success: true})
					} else {
						return res.status(400).json({message: 'Email or Password is incorrect', success: false})
					}
				})
			} else {
				res.status(400).json({message: 'Email does not exists', success: false})
			}
		})
	}
)

/* 	path: /logout
 *	type: POST 
 */

users.post('/logout', (req, res) => {
	req.session.destroy((err) => {
	  	if (err) { return res.status(200).json({message: 'Unable to logout', err, success: false}) }
    	res.status(200).json({message: 'User successfully logout', success: true})
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
		check('currentPassword').not().isEmpty().withMessage('Current password cannot be empty. Please enter your current password'),
		check('newPassword').not().isEmpty().withMessage('New password cannot be empty. Please enter your new password'),
		check('newPassword').isLength({ min: 8 }).withMessage('New password must be atleast 8 characters in length'),
		check('confirmNewPassword').not().isEmpty().withMessage('Confirm new password cannot be empty. Please enter your confirm new password')
	],
	(req,res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array()[0].msg, success: false})
	  	}

	  	const { currentPassword, newPassword, confirmNewPassword } = req.body
	  	const userRole = req.headers.userrole

	  	if(newPassword === confirmNewPassword) {
		  	connection.query(`SELECT PASSWORD FROM ${process.env.USER_TBL} WHERE ROLE = ? AND STATUS = 1`, [userRole], (err, results, fields) => {
				if (err) { return res.status(400).json({message: 'Unable to reset password. Please try again', success: false}) }

				if (results.length > 0) {
					bcrypt.compare(currentPassword, results[0].PASSWORD).then((match) => {
						if (match == true) {
							bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS)).then((hashedPassword) => {
								connection.query(`UPDATE ${process.env.USER_TBL} SET PASSWORD = ?`, [hashedPassword], (err, results, fields) => {
									if (err) { return res.status(400).json({message: 'Unable to reset password. Please try again', success: false}) }
									res.status(200).json({message: 'User password resetted successfully', success: true})	
								})
							})
						} else {
							return res.status(400).json({message: 'Incorrect password sent. Please enter the correct password', success: false})
						}
					})
				} else {
					return res.status(400).json({message: 'No user exists', success: false})
				}
		  	})
	  	} else {
	  		res.status(400).json({message:  'Password and confirm password do not match. Please try again', success: false})
	  	}
	}
)

module.exports = users