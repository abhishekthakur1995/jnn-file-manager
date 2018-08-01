const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const database = require('../db/dbConnection');

//POST REQUEST
router.post('/register', function(req, res) {
	console.log('req', req);
	connection.query('INSERT INTO users SET ?', userData, function(err, results, fields) {
		if (err) {
			res.status(400).json(err);
		}
		console.log(results);
		console.log(fields);
		res.status(400).json('User Registered successfully');
	});
	connection.release();
}

module.exports = router
