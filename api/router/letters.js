const express = require('express')
const letters = express.Router()
const connection = require('../../db/dbConnection')
const { check, validationResult } = require('express-validator/check')
const helper = require('../helper/Helper.js')
const _ = require('lodash')
const fs = require('fs')

/* 	path: /getLetterBoardData
 *	type: GET
 */

 letters.get('/getLetterBoardData', function(req, res) {
	connection.query(`SELECT COUNT(*) AS RECEIVED, COUNT(CASE WHEN LETTER_STATUS = 1 THEN 1 END) AS INCOMING, COUNT(CASE WHEN LETTER_STATUS = 2 THEN 1 END) AS OUTGOING FROM ${process.env.LETTER_RECORD_TBL}`, function(err, results, fields) {
		if (err) {
			return res.status(400).json({data: [], message : err, success : false})
		}
		res.status(200).json({data : results, message : 'Records fetched successfully', success : true})
	})
})

module.exports = letters