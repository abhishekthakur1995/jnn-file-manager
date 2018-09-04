const express = require('express')
const records = express.Router()
const connection = require('../../db/dbConnection')
const { check, validationResult } = require('express-validator/check')

/* 	path: /register
 *	type: POST 
 */

records.post('/addNewRecord',
	[
		check('applicant_name').not().isEmpty().withMessage('Applicant name cannot be empty').trim().escape(),
		check('applicant_type').not().isEmpty().withMessage('Please select an applicant type').trim().escape(),
		check('applicant_address').not().isEmpty().withMessage('Applicant address cannot be empty').trim().escape(),
		check('applicant_contact').not().isEmpty().withMessage('Applicant contact cannot be empty').trim().escape(),
		check('building_name').not().isEmpty().withMessage('Building name cannot be empty').trim().escape(),
		check('building_address').not().isEmpty().withMessage('Building Address cannot be empty').trim().escape(),
		check('building_area').not().isEmpty().withMessage('Building Area cannot be empty').trim().escape(),
		check('file_number').not().isEmpty().withMessage('File number cannot be empty').trim().escape(),
		check('remark').trim().escape()
	],
	function(req, res) {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array(), saved : false})
	  	}
		const fileRecordData = {
	        "APPLICANT_NAME": req.body.applicant_name,
	        "APPLICANT_TYPE": req.body.applicant_type,
	        "APPLICANT_ADDRESS": req.body.applicant_address,
	        "APPLICANT_CONTACT": req.body.applicant_contact,
	        "BUILDING_NAME": req.body.building_name,
	        "BUILDING_ADDRESS": req.body.building_address,
	        "BUILDING_AREA": req.body.building_area,
	        "FILE_NUMBER": req.body.file_number,
	        "REMARK": req.body.remark,
	    }
		connection.query(`INSERT INTO ${process.env.FILE_RECORD_TBL} SET ?`, fileRecordData, function(err, results, fields) {
			if (err) {
				return res.status(400).json({message : err, saved : false})
			}
			res.status(200).json({message : 'Record saved successfully', saved : true})
		})
	}
)

/* 	path: /getCountOfAllRecords
 *	type: GET
 */

records.get('/getCountOfAllRecords', function(req, res) {
	connection.query(`SELECT COUNT(*) as count FROM ${process.env.FILE_RECORD_TBL}`, function(err, results, fields) {
		if (err) {
			return res.status(400).json({data: [], message : err, success : false})
		}
		res.status(200).json({data : results, message : 'Records fetched successfully', success : true})
	})
})

/* 	path: /getAllRecords
 *	type: GET
 */

records.get('/getRecords',
	[
		check('page').not().isEmpty().withMessage('No page number was sent'),
		check('limit').not().isEmpty().withMessage('No limit was sent')
	],
	function(req, res) {
		const page = req.query.page
		const limit = req.query.limit
		const offset = (page - 1) * limit

		connection.query(`SELECT * FROM ${process.env.FILE_RECORD_TBL} LIMIT ${offset}, ${limit}`, function(err, results, fields) {
			if (err) {
				return res.status(400).json({data: [], message : err, success : false})
			}
			res.status(200).json({data : results, message : 'Records fetched successfully', success : true})
		})
	}
)

/* 	path: /getSearchResults
 *	type: GET
 */

records.post('/getSearchResults', 
	[
		check('searchTerm').not().isEmpty().withMessage('No search query was sent'),
		check('page').not().isEmpty().withMessage('No page number was sent'),
		check('limit').not().isEmpty().withMessage('No limit was sent')
	],
	function(req, res) {	
		const query = req.body.searchTerm
		const page = req.body.page
		const limit = req.body.limit
		const offset = (page - 1) * limit

		connection.query(`SELECT * FROM ${process.env.FILE_RECORD_TBL} WHERE APPLICANT_NAME LIKE '%${query}%' LIMIT ${offset}, ${limit}`, function(err, results, fields) {
			if (err) {
				return res.status(400).json({data: [], message : err, success : false})
			}
			res.status(200).json({data : results, message : 'Records fetched successfully', success : true})
		})
	}
)


/* 	path: /updateRecord/:id
 *	type: PUT
 */

records.put('/updateRecord/:id',
	[
		check('applicant_name').not().isEmpty().withMessage('Applicant name cannot be empty').trim().escape(),
		check('applicant_type').not().isEmpty().withMessage('Please select an applicant type').trim().escape(),
		check('applicant_address').not().isEmpty().withMessage('Applicant address cannot be empty').trim().escape(),
		check('applicant_contact').not().isEmpty().withMessage('Applicant contact cannot be empty').trim().escape(),
		check('building_name').not().isEmpty().withMessage('Building name cannot be empty').trim().escape(),
		check('building_address').not().isEmpty().withMessage('Building Address cannot be empty').trim().escape(),
		check('building_area').not().isEmpty().withMessage('Building Area cannot be empty').trim().escape(),
		check('file_number').not().isEmpty().withMessage('File number cannot be empty').trim().escape(),
		check('remark').trim().escape(),
		check('id').not().isEmpty().withMessage('No record id was sent')
	],
	(req, res) => {
		connection.query(`UPDATE ${process.env.FILE_RECORD_TBL} SET APPLICANT_NAME = ?, APPLICANT_TYPE = ?, APPLICANT_ADDRESS = ?, APPLICANT_CONTACT = ?, BUILDING_NAME = ?, BUILDING_ADDRESS = ?, BUILDING_AREA = ?, FILE_NUMBER = ?, REMARK = ? WHERE ID = ?`, [req.body.applicant_name, req.body.applicant_type, req.body.applicant_address, req.body.applicant_contact, req.body.building_name, req.body.building_address, req.body.building_area, req.body.file_number, req.body.remark, req.params.id], function(err, results, fields) {
			if (err) {
				return res.status(400).json({message : err, saved : false})
			}
			res.status(200).json({message : 'Record updated successfully', saved : true})
		})
	}
)

/* 	path: /updateRecordStatus/:id
 *	type: PUT
 */

records.put('/updateRecordStatus/:id',
	[
		check('id').not().isEmpty().withMessage('No record id was sent'),
		check('status').not().isEmpty().withMessage('Status cannot be empty')
	], 
	function(req, res) {
		const id = req.params.id
		const status = req.body.status
		connection.query(`UPDATE ${process.env.FILE_RECORD_TBL} SET FILE_STATUS = ? WHERE ID = ?`, [status, id], function(err, results, fields) {
			if (err) {
				return res.status(400).json({message : err, saved : false})
			}
			res.status(200).json({message : 'Record status updated successfully', saved : true})
		})
	}
)

/* 	path: /updateRecordStatus/:id
 *	type: PUT
 */

records.put('/updateMultipleRecordStatus',
	[
		check('markedRecords').not().isEmpty().withMessage('No record id was sent'),
		check('status').not().isEmpty().withMessage('Status cannot be empty')
	], 
	function(req, res) {
		const markedRecords = req.body.markedRecords
		const status = req.body.status
		connection.query(`UPDATE ${process.env.FILE_RECORD_TBL} SET FILE_STATUS = ? WHERE ID IN (${markedRecords})`, [status], function(err, results, fields) {
			if (err) {
				return res.status(400).json({message : err, saved : false})
			}
			res.status(200).json({message : 'Record status updated successfully', saved : true})
		})
	}
)

/* 	path: /deleteRecord/:id
 *	type: DELETE
 */

records.delete('/deleteRecord/:id',
	[
		check('id').not().isEmpty().withMessage('No record id was sent'),
	],
	(req, res) => {
		connection.query(`DELETE FROM ${process.env.FILE_RECORD_TBL} WHERE ID = ${req.params.id}`, function(err, results, fields) {
			if (err) {
				return res.status(400).json({message : err, saved : false})
			}
			res.status(200).json({message : 'Record deleted successfully', success : true})
		})
	}
)

/* 	path: /getDashboardData
 *	type: GET
 */

records.get('/getDashboardData', function(req, res) {
	connection.query(`SELECT COUNT(*) AS RECEIVED, COUNT(CASE WHEN FILE_STATUS = 0 THEN 1 END) AS PENDING, COUNT(CASE WHEN FILE_STATUS = 1 THEN 1 END) AS APPROVED FROM ${process.env.FILE_RECORD_TBL}`, function(err, results, fields) {
		if (err) {
			return res.status(400).json({data: [], message : err, success : false})
		}
		res.status(200).json({data : results, message : 'Records fetched successfully', success : true})
	})
})

module.exports = records