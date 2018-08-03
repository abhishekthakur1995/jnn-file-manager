const express = require('express')
const records = express.Router()
const connection = require('../db/dbConnection')

/* 	path: /register
 *	type: POST 
 */

records.post('/addNewRecord', function(req, res) {
	//need to add jwt token in authorization header with this request.
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
			res.status(200).json({'message' : err, 'saved' : false})
		}
		res.status(200).json({'message' : 'Record saved successfully', 'saved' : true})
	})
	connection.end(err => {
		if(err) console.log(err);
	})
})

module.exports = records