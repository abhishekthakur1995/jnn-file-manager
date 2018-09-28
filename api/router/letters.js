const express = require('express')
const letters = express.Router()
const connection = require('../../db/dbConnection')
const { check, validationResult } = require('express-validator/check')
const helper = require('../helper/Helper.js')
const _ = require('lodash')
const fs = require('fs')
const moment = require('moment')

/* 	path: /addNewLetterRecord
 *	type: POST 
 */

letters.post('/addNewLetterRecord',
	[
		check('DEPARTMENT_NAME').not().isEmpty().withMessage('Please select a department').trim().escape(),
		check('ASSIGNED_OFFICER').not().isEmpty().withMessage('Please select an assigned officer').trim().escape(),
		check('LETTER_TYPE').not().isEmpty().withMessage('Please select a letter type').trim().escape(),
		check('LETTER_TAG').not().isEmpty().withMessage('Please select a letter tag').trim().escape(),
		check('LETTER_ADDRESS').not().isEmpty().withMessage('Letter address cannot be empty').trim().escape(),
		check('LETTER_SUBJECT').not().isEmpty().withMessage('Letter subject cannot be empty').trim().escape(),
		check('LETTER_REG_NO').not().isEmpty().withMessage('Letter reg no  cannot be empty').trim().escape(),
		check('LETTER_DATE').not().isEmpty().withMessage('Letter date cannot be empty').trim().escape(),
		check('LETTER_STATUS').not().isEmpty().withMessage('Letter status cannot be empty').trim().escape(),
		check('REMARK').trim().escape()
	],
	function(req, res) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array(), saved : false})
	  	}
		const letterRecordData = req.body
		req.body.LETTER_DATE = moment(req.body.LETTER_DATE).format("YYYY-MM-DD HH:mm:ss")
		connection.query(`INSERT INTO ${process.env.LETTER_RECORD_TBL} SET ?`, letterRecordData, function(err, results, fields) {
			if (err) {
				if(err.code === 'ER_DUP_ENTRY') {
					return res.status(400).json({message : `This registration number (${req.body.LETTER_REG_NO}) already exists. Kindly give a new registration number.`, saved : false})
				}
				return res.status(400).json({message : 'Unable to save letter data. Please try again', saved : false})
			}
			res.status(200).json({message : 'Letter record saved successfully', saved : true})
		})
	}
)

/* 	path: /addNewSettings
 *	type: POST
 */

 letters.post('/addNewSettings',
	[
		check('SETTING_NAME').not().isEmpty().withMessage('Setting name found').trim().escape(),
		check('DEPARTMENT_CODE').not().isEmpty().withMessage('Setting code found').trim().escape(),
	],
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array(), saved : false})
	  	}

	  	const data = {
	  		'NAME' : req.body.SETTING_NAME.toUpperCase(),
	  		'CODE' : req.body.SETTING_NAME.toLowerCase(),
	  		'TYPE' : helper.getDepartmentTypeFromCode(req.body.DEPARTMENT_CODE)
	  	}

	  	connection.query(`INSERT INTO ${process.env.INPUTS_TBL} SET ?`, data, function(err, results, fields) {
	  		if (err) {
	  			if(err.code === 'ER_DUP_ENTRY') {
					return res.status(400).json({message : `This setting (${req.body.SETTING_NAME}) already exists.`, saved : false})
				}
	  			return res.status(400).json({message : err, saved : false})
	  		}
  			res.status(200).json({message : 'Setting added successfully', saved : true})
	  	})
	}
)

/* 	path: /getLetterBoardData
 *	type: GET
 */

letters.get('/getLetterBoardData', function(req, res) {
	connection.query(`SELECT COUNT(*) AS RECEIVED, COUNT(CASE WHEN LETTER_STATUS = 1 THEN 1 END) AS INCOMING, COUNT(CASE WHEN LETTER_STATUS = 2 THEN 1 END) AS OUTGOING FROM ${process.env.LETTER_RECORD_TBL}`, function(err, results, fields) {
		if (err) { return res.status(400).json({data: [], message : err, success : false}) }
		res.status(200).json({data : results, message : 'Records fetched successfully', success : true})
	})
})

/* path: /getInputFieldsData
 *	type: GET
*/

letters.get('/getInputFieldsData', function(req, res) {
	var inputFieldData = {}
	connection.query(`SELECT NAME, CODE FROM ${process.env.INPUTS_TBL} WHERE STATUS = ? AND TYPE = ?`, [1, 'DEPARTMENT_NAME'], (err, results, fields) => {
		if (err) { return res.status(400).json({data: [], message : err, success : false}) }
		inputFieldData['DEPARTMENT_NAME'] = results

		connection.query(`SELECT NAME, CODE FROM ${process.env.INPUTS_TBL} WHERE STATUS = ? AND TYPE = ?`, [1, 'LETTER_TYPE'], (err, results, fields) => {
			if (err) { return res.status(400).json({data: [], message : err, success : false}) }
			inputFieldData['LETTER_TYPE'] = results

			connection.query(`SELECT NAME, CODE FROM ${process.env.INPUTS_TBL} WHERE STATUS = ? AND TYPE = ?`, [1, 'ASSIGNED_OFFICER'], (err, results, fields) => {
				if (err) { return res.status(400).json({data: [], message : err, success : false}) }
				inputFieldData['ASSIGNED_OFFICER'] = results

				connection.query(`SELECT NAME, CODE FROM ${process.env.INPUTS_TBL} WHERE STATUS = ? AND TYPE = ?`, [1, 'LETTER_TAG'], (err, results, fields) => {
					if (err) { return res.status(400).json({data: [], message : err, success : false}) }
					inputFieldData['LETTER_TAG'] = results

					res.status(200).json({data : inputFieldData, message : 'Data returned successfully', success : true})
				})
			})
		})
	})
})

module.exports = letters