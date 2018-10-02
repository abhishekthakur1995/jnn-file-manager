const fs = require('fs')
const express = require('express')
const letters = express.Router()
const connection = require('../../db/dbConnection')
const helper = require('../helper/Helper.js')
const _ = require('lodash')
const moment = require('moment')
const { check, validationResult } = require('express-validator/check')

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
			res.status(200).json({message : 'Letter record saved successfully', saved : true, id: results.insertId})
		})
	}
)

/* 	path: /updateRecord/:id
 *	type: PUT
 */

letters.put('/updateRecord/:id',
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
		check('REMARK').trim().escape(),
		check('id').not().isEmpty().withMessage('No record id was sent')
	],
	(req, res) => {
		connection.query(`UPDATE ${process.env.LETTER_RECORD_TBL} SET DEPARTMENT_NAME = ?, ASSIGNED_OFFICER = ?, LETTER_TYPE = ?, LETTER_TAG = ?, LETTER_ADDRESS = ?, LETTER_SUBJECT = ?, LETTER_REG_NO = ?, LETTER_DATE = ?, LETTER_STATUS = ?, REMARK = ? WHERE ID = ?`, [req.body.DEPARTMENT_NAME, req.body.ASSIGNED_OFFICER, req.body.LETTER_TYPE, req.body.LETTER_TAG, req.body.LETTER_ADDRESS, req.body.LETTER_SUBJECT, req.body.LETTER_REG_NO, req.body.LETTER_DATE, req.body.LETTER_STATUS, req.body.REMARK, req.params.id], function(err, results, fields) {
			if (err) {
				return res.status(400).json({message : err, saved : false})
			}
			res.status(200).json({message : 'Letter data updated successfully', saved : true, id: req.params.id})
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
	  		'CODE' : helper.createCodeFromSettingsName(req.body.SETTING_NAME),
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

/* 	path: /getCountOfAllLetters
 *	type: GET
 */

letters.get('/getCountOfAllLetters', function(req, res) {
	connection.query(`SELECT COUNT(*) as count FROM ${process.env.LETTER_RECORD_TBL}`, function(err, results, fields) {
		if (err) {
			return res.status(400).json({data: [], message : err, success : false})
		}
		res.status(200).json({data : results, message : 'Data fetched successfully', success : true})
	})
})

/* 	path: /getRecords
 *	type: GET
 */

letters.get('/getRecords',
	[
		check('page').not().isEmpty().withMessage('No page number was sent'),
		check('limit').not().isEmpty().withMessage('No limit was sent')
	],
	function(req, res) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array(), saved : false})
	  	}

		const page = req.query.page
		const limit = req.query.limit
		const offset = (page - 1) * limit

		let totalCount = 0
		let results = ''

		let dataQuery = `SELECT * FROM ${process.env.LETTER_RECORD_TBL} ORDER BY CREATED DESC LIMIT ${offset}, ${limit}`
		if(req.query.sortField && req.query.orderBy) {
			dataQuery = `SELECT * FROM ${process.env.LETTER_RECORD_TBL} ORDER BY ${helper.getDbFieldCodeFromName(req.query.sortField)} ${_.upperCase(req.query.orderBy)} LIMIT ${offset}, ${limit}`
		}

		connection.query(`SELECT COUNT(*) as totalCount FROM ${process.env.LETTER_RECORD_TBL}`, function(err, results, fields) {
			if (err) return res.status(400).json({data: [], message : err, success : false})
			totalCount = results[0].totalCount

			connection.query(dataQuery, function(err, results, fields) {
				if (err) return res.status(400).json({data: [], message : err, success : false})
				results = results

				// send response		
				res.status(200).json({data : results, totalCount: totalCount , message : 'Records fetched successfully', success : true})
			})
		})
	}
)

/* 	path: /getSearchResults
 *	type: POST
 */

letters.post('/getSearchResults',
	[
		check('searchTerm').not().isEmpty().withMessage('No search query was sent'),
		check('page').not().isEmpty().withMessage('No page number was sent'),
		check('limit').not().isEmpty().withMessage('No limit was sent')
	],
	function(req, res) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array(), saved : false})
	  	}

		const query = req.body.searchTerm
		const page = req.body.page
		const limit = req.body.limit
		const offset = (page - 1) * limit

		let totalCount = 0
		let results = ''

		connection.query(`SELECT COUNT(*) as totalCount FROM ${process.env.LETTER_RECORD_TBL} WHERE DEPARTMENT_NAME LIKE '%${query}%'`, function(err, results, fields) {
			if (err) return res.status(400).json({data: [], message : err, success : false})
			totalCount = results[0].totalCount

			connection.query(`SELECT * FROM ${process.env.LETTER_RECORD_TBL} WHERE DEPARTMENT_NAME LIKE '%${query}%' LIMIT ${offset}, ${limit}`, function(err, results, fields) {
				if (err) return res.status(400).json({data: [], message : err, success : false})
				results = results

				// send response		
				res.status(200).json({data : results, totalCount: totalCount , message : 'Records fetched successfully', success : true})
			})
		})
	}
)

/* 	path: /getFilteredData
 *	type: POST
 */

letters.post('/getFilteredData',
	[
		check('page').not().isEmpty().withMessage('No page number was sent'),
		check('limit').not().isEmpty().withMessage('No limit was sent'),
		check('sortFilters').not().isEmpty().withMessage('No filter data was sent')
	],
	function(req, res) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array(), saved : false})
	  	}

		const page = req.body.page
		const limit = req.body.limit
		const offset = (page - 1) * limit
		let { sortFilters, searchFilters } = req.body

		let totalCount = 0
		let results = ''

		let whereCriteria = ''
		let sortFiltersData = ''

		for (var key in sortFilters) {
			if (!_.isEmpty(sortFilters[key])) {
				sortFiltersData = sortFilters[key].map(val => `'${val}'`)

				if (_.isEmpty(whereCriteria)) {
					if(sortFiltersData.length > 1) {
						whereCriteria += `WHERE ${helper.getFilterFieldFromKey(key)} IN (${sortFiltersData})`
					} else {
						whereCriteria += `WHERE ${helper.getFilterFieldFromKey(key)} = ${sortFiltersData}`
					}
				} else {
					if(sortFiltersData.length > 1) {
						whereCriteria += ` AND ${helper.getFilterFieldFromKey(key)} IN (${sortFiltersData})`
					} else {
						whereCriteria += ` AND ${helper.getFilterFieldFromKey(key)} = ${sortFiltersData}`
					}
				}
			}
		}

		connection.query(`SELECT COUNT(*) as totalCount FROM ${process.env.LETTER_RECORD_TBL} ${whereCriteria}`, function(err, results, fields) {
			if (err) return res.status(400).json({data: [], message : err, success : false})
			totalCount = results[0].totalCount

			connection.query(`SELECT * FROM ${process.env.LETTER_RECORD_TBL} ${whereCriteria} LIMIT ${offset}, ${limit}`, function(err, results, fields) {
				if (err) return res.status(400).json({data: [], message : err, success : false})
				results = results

				// send response		
				res.status(200).json({data : results, totalCount: totalCount , message : 'Records fetched successfully', success : true})
			})
		})
	}
)

 /*path: /upload
  *type: POST
  */

letters.post('/upload', (req, res) => {
	let uploadFile = req.files.file
	const { id } = req.body
	const extension = helper.getFileExtension(req.body.filename)
	const fileName = helper.constructUniqueFileName(id, extension)

	if(!fs.existsSync(`${__dirname}/../../upload/letters/${fileName}`)) {
		uploadFile.mv(`${__dirname}/../../upload/letters/${fileName}`, function(err) {
	    	if (err) { return res.status(400).json({message : 'Error uploading file', success : false}) }

		  	connection.query(`UPDATE ${process.env.LETTER_RECORD_TBL} SET LETTER_FILE = ? WHERE ID = ?`, [fileName, id], function(err, results, fields) {
		  		if (err) { return res.status(400).json({message : 'Error saving file path to db', success : false})}
		  	})
	    	return res.status(200).json({message : 'Letter uploaded successfully', success : true})
  		})
	} else {
		return res.status(400).json({message : 'File already exists', success : true})
	}
})

/* 	path: /getDataBasedOnSelectedMonth
 *	type: GET
 */

letters.get('/getDataBasedOnSelectedMonth', 
 	[
 		check('month').not().isEmpty().withMessage('Please select a month'),
 		check('year').not().isEmpty().withMessage('Please select an year')
 	],
 	function(req, res) {
 		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array(), saved : false})
	  	}

		const month = req.query.month
		const year = req.query.year

		connection.query(`SELECT * FROM ${process.env.LETTER_RECORD_TBL} WHERE MONTH(CREATED) = ? AND YEAR(CREATED) = ?`, [month, year], function(err, results, fields) {
			if (err) return res.status(400).json({data: [], message : err, success : false})

			// send response		
			res.status(200).json({data : results, message : 'Data fetched successfully', success : true})
		})
	}
)

 /* path: /getDataBasedOnSelectedDuration
  *	type: GET
  */

letters.get('/getDataBasedOnSelectedDuration', 
  	[
  		check('startDate').not().isEmpty().withMessage('Please select a to date'),
  		check('endDate').not().isEmpty().withMessage('Please select a from date')
  	],
  	function(req, res) {
  		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array(), saved : false})
	  	}

 		let { startDate, endDate } = req.query
 		startDate = helper.convertTimestampToUnixTimestamp(startDate)
 		endDate = helper.convertTimestampToUnixTimestamp(endDate)

 		connection.query(`SELECT * FROM ${process.env.LETTER_RECORD_TBL} WHERE CREATED BETWEEN FROM_UNIXTIME(${startDate}) AND FROM_UNIXTIME(${endDate})`, function(err, results, fields) {
 			if (err) return res.status(400).json({data: [], message : err, success : false})

 			// send response		
 			res.status(200).json({data : results, message : 'Data fetched successfully', success : true})
 		})
 	}
)

/* 	path: /getDataBasedOnSelectedTags
 *	type: POST
 */

letters.post('/getDataBasedOnSelectedTags', 
	[
		check('selectedTags').not().isEmpty().withMessage('No data was sent')
	],
	function(req, res) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array(), saved : false})
	  	}

	  	let whereCriteria = ''
		let selectedTagsData = ''

		let { selectedTags } = req.body

	  	for (var key in selectedTags) {
			if (!_.isEmpty(selectedTags[key])) {
				selectedTagsData = selectedTags[key].map(val => `'${val}'`)

				if (_.isEmpty(whereCriteria)) {
					if(selectedTagsData.length > 1) {
						whereCriteria += `WHERE ${helper.getFilterFieldFromKey(key)} IN (${selectedTagsData})`
					} else {
						whereCriteria += `WHERE ${helper.getFilterFieldFromKey(key)} = ${selectedTagsData}`
					}
				} else {
					if(selectedTagsData.length > 1) {
						whereCriteria += ` AND ${helper.getFilterFieldFromKey(key)} IN (${selectedTagsData})`
					} else {
						whereCriteria += ` AND ${helper.getFilterFieldFromKey(key)} = ${selectedTagsData}`
					}
				}
			}
		}

		connection.query(`SELECT * FROM ${process.env.LETTER_RECORD_TBL} ${whereCriteria}`, function(err, results, fields) {
			if (err) return res.status(400).json({data: [], message : err, success : false})

			// send response
			res.status(200).json({data : results, message : 'Data fetched successfully', success : true})	
		})
  	}
)

module.exports = letters