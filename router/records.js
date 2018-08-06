const express = require('express')
const records = express.Router()
const connection = require('../db/dbConnection')
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
		    res.status(200).json({message: errors.array(), saved : false})
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
				res.status(200).json({message : err, saved : false})
			}
			res.status(200).json({message : 'Record saved successfully', saved : true})
		})
		// connection.end(err => {
		// 	if(err) console.log(err);
		// })
	}
)

module.exports = records