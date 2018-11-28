const fs = require('fs')
const _ = require('lodash')
const excel = require('xlsx')
const express = require('express')
const records = express.Router()
const lang = require('../translate/lang.js')
const helper = require('../helper/Helper.js')
const connection = require('../../db/dbConnection')
const { check, validationResult } = require('express-validator/check')

/* 	path: /addNewRecord
 *	type: POST 
 */

records.post('/addNewRecord',
	[
		check('applicant_name').not().isEmpty().withMessage('Applicant name cannot be empty').trim().escape(),
		check('applicant_address').not().isEmpty().withMessage('Applicant address cannot be empty').trim().escape(),
		check('applicant_contact').not().isEmpty().withMessage('Applicant contact cannot be empty').trim().escape(),
		check('file_number').not().isEmpty().withMessage('File number cannot be empty').trim().escape(),
		check('file_date').not().isEmpty().withMessage('File date cannot be empty').trim().escape(),
		check('file_description').not().isEmpty().withMessage('File description cannot be empty').trim().escape(),
		check('department').not().isEmpty().withMessage('Please select a department').trim().escape(),
		check('ward').not().isEmpty().withMessage('Please select a ward').trim().escape(),
		check('zone').not().isEmpty().withMessage('Please select a zone').trim().escape(),
		check('remark').trim().escape()
	],
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array()[0].msg, saved : false})
	  	}
		const fileRecordData = {
	        "APPLICANT_NAME": req.body.applicant_name,
	        "APPLICANT_ADDRESS": req.body.applicant_address,
	        "APPLICANT_CONTACT": req.body.applicant_contact,
	        "FILE_NUMBER": req.body.file_number,
	        "FILE_DESCRIPTION": req.body.file_description,
	        "FILE_DATE": helper.convertDateTimeToMysqlFormat(req.body.file_date),
	        "DEPARTMENT": req.body.department,
	        "ZONE" : req.body.zone,
	        "WARD": req.body.ward,
	        "REMARK": req.body.remark
	    }
		connection.query(`INSERT INTO ${process.env.FILE_RECORD_TBL} SET ?`, fileRecordData, (err, results, fields) => {
			if (err) {
				if(err.code === 'ER_DUP_ENTRY') {
					return res.status(400).json({message : lang.convertMessage('duplicateFileNo'), saved : false})
				}
				return res.status(400).json({message : lang.convertMessage('recordAddUnsuccess'), saved : false})
			}
			res.status(200).json({message : lang.convertMessage('recordAddSuccess'), saved : true})
		})
	}
)

/* 	path: /getCountOfAllRecords
 *	type: GET
 */

records.get('/getCountOfAllRecords', (req, res) => {
	connection.query(`SELECT COUNT(*) as count FROM ${process.env.FILE_RECORD_TBL}`, (err, results, fields) => {
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
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array()[0].msg, saved : false})
	  	}

		const page = req.query.page
		const limit = req.query.limit
		const offset = (page - 1) * limit

		let totalCount = 0
		let results = ''

		let dataQuery = `SELECT * FROM ${process.env.FILE_RECORD_TBL} ORDER BY CREATED DESC LIMIT ${offset}, ${limit}`
		if(req.query.sortField && req.query.orderBy) {
			dataQuery = `SELECT * FROM ${process.env.FILE_RECORD_TBL} ORDER BY ${helper.getDbFieldCodeFromName(req.query.sortField)} ${req.query.orderBy.toUpperCase()} LIMIT ${offset}, ${limit}`
		}

		connection.query(`SELECT COUNT(*) as totalCount FROM ${process.env.FILE_RECORD_TBL}`, (err, results, fields) => {
			if (err) return res.status(400).json({data: [], message : err, success : false})
			totalCount = results[0].totalCount

			connection.query(dataQuery, (err, results, fields) => {
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

records.post('/getFilteredData',
	[
		check('page').not().isEmpty().withMessage('No page number was sent'),
		check('limit').not().isEmpty().withMessage('No limit was sent'),
		check('sortFilters').custom((array) => {
		  	for(let key in array) {
		  		if(array[key].length > 0) return true
		  	}
		  	return false
		}).withMessage('Please select a filter criteria')
	],
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array()[0].msg, saved : false})
	  	}
	  	
		const page = req.body.page
		const limit = req.body.limit
		const offset = (page - 1) * limit
		let { sortFilters, searchFilters } = req.body

		let totalCount = 0
		let results = ''

		let searchCriteria = ''
		let sortCriteria = ''
		let whereCriteria = ''
		let sortFiltersData = ''

		for (let key in sortFilters) {
			if (!_.isEmpty(sortFilters[key])) {
				sortFiltersData = sortFilters[key].map(val => `'${helper.getFileStatusCodeFromName(val)}'`)
				if(!_.isEmpty(searchFilters.searchTerm)) sortCriteria = 'AND '
				sortCriteria += `FILE_STATUS IN (${sortFiltersData})`
			}
		}

		if(!_.isEmpty(searchFilters.searchTerm)) {
			searchCriteria = `${helper.getDbFieldCodeFromName(searchFilters.queryField)} LIKE '%${searchFilters.searchTerm}%'`
		}

		whereCriteria = `WHERE ${searchCriteria} ${sortCriteria}`

		connection.query(`SELECT COUNT(*) as totalCount FROM ${process.env.FILE_RECORD_TBL} ${whereCriteria}`, (err, results, fields) => {
			if (err) return res.status(400).json({data: [], message : err, success : false})
			totalCount = results[0].totalCount

			connection.query(`SELECT * FROM ${process.env.FILE_RECORD_TBL} ${whereCriteria} LIMIT ${offset}, ${limit}`, (err, results, fields) => {
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

records.post('/getSearchResults',
	[
		check('searchTerm').not().isEmpty().withMessage('No search query was sent'),
		check('page').not().isEmpty().withMessage('No page number was sent'),
		check('limit').not().isEmpty().withMessage('No limit was sent')
	],
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array()[0].msg, saved : false})
	  	}

		const query = req.body.searchTerm
		const page = req.body.page
		const limit = req.body.limit
		const offset = (page - 1) * limit

		let totalCount = 0
		let results = ''

		connection.query(`SELECT COUNT(*) as totalCount FROM ${process.env.FILE_RECORD_TBL} WHERE APPLICANT_NAME LIKE '%${query}%'`, (err, results, fields) => {
			if (err) return res.status(400).json({data: [], message : err, success : false})
			totalCount = results[0].totalCount

			connection.query(`SELECT * FROM ${process.env.FILE_RECORD_TBL} WHERE APPLICANT_NAME LIKE '%${query}%' LIMIT ${offset}, ${limit}`, (err, results, fields) => {
				if (err) return res.status(400).json({data: [], message : err, success : false})
				results = results

				// send response		
				res.status(200).json({data : results, totalCount: totalCount , message : 'Records fetched successfully', success : true})
			})
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
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array()[0].msg, saved : false})
	  	}

		connection.query(`UPDATE ${process.env.FILE_RECORD_TBL} SET APPLICANT_NAME = ?, APPLICANT_TYPE = ?, APPLICANT_ADDRESS = ?, APPLICANT_CONTACT = ?, BUILDING_NAME = ?, BUILDING_ADDRESS = ?, BUILDING_AREA = ?, FILE_NUMBER = ?, REMARK = ? WHERE ID = ?`, [req.body.applicant_name, req.body.applicant_type, req.body.applicant_address, req.body.applicant_contact, req.body.building_name, req.body.building_address, req.body.building_area, req.body.file_number, req.body.remark, req.params.id], (err, results, fields) => {
			if (err) {
				return res.status(400).json({message : lang.convertMessage('recordUpdateUnsuccess'), saved : false})
			}
			res.status(200).json({message : lang.convertMessage('recordUpdateSuccess'), saved : true})
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
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array()[0].msg, saved : false})
	  	}

		const id = req.params.id
		const status = req.body.status
		connection.query(`UPDATE ${process.env.FILE_RECORD_TBL} SET FILE_STATUS = ? WHERE ID = ?`, [status, id], (err, results, fields) => {
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
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array()[0].msg, saved : false})
	  	}
		const markedRecords = req.body.markedRecords
		const status = req.body.status
		connection.query(`UPDATE ${process.env.FILE_RECORD_TBL} SET FILE_STATUS = ? WHERE ID IN (${markedRecords})`, [status], (err, results, fields) => {
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
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array()[0].msg, saved : false})
	  	}

	  	connection.query(`UPDATE ${process.env.FILE_RECORD_TBL} SET STATUS = ? WHERE ID = ?`, [0, req.params.id], (err, results, fields) => {
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

records.get('/getDashboardData', (req, res) => {
	connection.query(`SELECT COUNT(*) AS TOTAL, COUNT(CASE WHEN FILE_STATUS = 0 THEN 1 END) AS PENDING, COUNT(CASE WHEN FILE_STATUS = 1 THEN 1 END) AS APPROVED, COUNT(CASE WHEN FILE_STATUS = 2 THEN 1 END) AS REJECTED FROM ${process.env.FILE_RECORD_TBL}`, (err, results, fields) => {
		if (err) {
			return res.status(400).json({data: [], message : err, success : false})
		}
		res.status(200).json({data : results, message : 'Records fetched successfully', success : true})
	})
})

/* 	path: /getDataBasedOnSelectedMonth
 *	type: GET
 */

records.get('/getDataBasedOnSelectedMonth', 
 	[
 		check('month').not().isEmpty().withMessage('Please select a month'),
 		check('year').not().isEmpty().withMessage('Please select an year')
 	],
 	(req, res) => {
 		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array()[0].msg, saved : false})
	  	}

		const month = req.query.month
		const year = req.query.year

		connection.query(`SELECT APPLICANT_NAME AS '${lang.convertToHindi('applicantName')}', APPLICANT_ADDRESS AS '${lang.convertToHindi('applicantAddress')}', APPLICANT_CONTACT AS '${lang.convertToHindi('applicantContact')}', FILE_NUMBER AS '${lang.convertToHindi('fileNumber')}', FILE_STATUS AS '${lang.convertToHindi('fileStatus')}', FILE_DATE AS '${lang.convertToHindi('fileDate')}', DEPARTMENT AS '${lang.convertToHindi('department')}', FILE_DESCRIPTION AS '${lang.convertToHindi('fileDescription')}', ZONE AS '${lang.convertToHindi('zone')}', WARD AS '${lang.convertToHindi('ward')}', REMARK AS '${lang.convertToHindi('remark')}' FROM ${process.env.FILE_RECORD_TBL} WHERE MONTH(CREATED) = ? AND YEAR(CREATED) = ?`, [month, year], (err, results, fields) => {
			if (err) return res.status(400).json({data: [], message : err, success : false})

			results.map((data) => {
				data[lang.convertToHindi('fileStatus')] = lang.getFileStatusInHindi(data[lang.convertToHindi('fileStatus')])
				data[lang.convertToHindi('fileDate')] = helper.getDisplayFormatDate(data[lang.convertToHindi('fileDate')])
			})

			// send response
			res.status(200).json({data : results, message : 'Records fetched successfully', success : true})
		})
	}
)

 /* path: /getDataBasedOnSelectedDuration
  *	type: GET
  */

records.get('/getDataBasedOnSelectedDuration', 
  	[
  		check('startDate').not().isEmpty().withMessage('Please select a to date'),
  		check('endDate').not().isEmpty().withMessage('Please select a from date')
  	],
  	(req, res) => {
  		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array()[0].msg, saved : false})
	  	}
	  	
 		let { startDate, endDate } = req.query
 		startDate = helper.convertTimestampToUnixTimestamp(startDate)
 		endDate = helper.convertTimestampToUnixTimestamp(endDate)

 		connection.query(`SELECT APPLICANT_NAME AS '${lang.convertToHindi('applicantName')}', APPLICANT_ADDRESS AS '${lang.convertToHindi('applicantAddress')}', APPLICANT_CONTACT AS '${lang.convertToHindi('applicantContact')}', FILE_NUMBER AS '${lang.convertToHindi('fileNumber')}', FILE_STATUS AS '${lang.convertToHindi('fileStatus')}', FILE_DATE AS '${lang.convertToHindi('fileDate')}', DEPARTMENT AS '${lang.convertToHindi('department')}', FILE_DESCRIPTION AS '${lang.convertToHindi('fileDescription')}', ZONE AS '${lang.convertToHindi('zone')}', WARD AS '${lang.convertToHindi('ward')}', REMARK AS '${lang.convertToHindi('remark')}' FROM ${process.env.FILE_RECORD_TBL} WHERE CREATED BETWEEN FROM_UNIXTIME(${startDate}) AND FROM_UNIXTIME(${endDate})`, (err, results, fields) => {
 			if (err) return res.status(400).json({data: [], message : err, success : false})

			results.map((data) => {
				data[lang.convertToHindi('fileStatus')] = lang.getFileStatusInHindi(data[lang.convertToHindi('fileStatus')])
				data[lang.convertToHindi('fileDate')] = helper.getDisplayFormatDate(data[lang.convertToHindi('fileDate')])
			})

 			// send response
 			res.status(200).json({data : results, message : 'Records fetched successfully', success : true})
 		})
 	}
)



 /*path: /upload
  *type: POST
  */

records.post('/upload', (req, res) => {
	let uploadFile = req.files.file

	uploadFile.mv(`${__dirname}/../../upload/${req.body.filename}`, (err) => {
	    if (err) {
      		return res.status(500).json({file: '', message : err, success : false})
	    }

	    // send response		
	    res.status(200).json({file: `${req.body.filename}`, message : 'Records fetched successfully', success : true})
  	})
})

 /*path: /importDataToDB
  *type: POST
  */

records.post('/importDataToDB',
	[
		check('fileName').not().isEmpty().withMessage('No file name was sent')
	],
	(req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
		    return res.status(400).json({message: errors.array()[0].msg, saved : false})
	  	}

		var workbook = excel.readFileSync(`${__dirname}/../../upload/${req.body.fileName}`)
  		workbook.SheetNames.forEach((sheetName) => {
    		var data = excel.utils.sheet_to_row_object_array(workbook.Sheets[sheetName])
    		if (data.length > 0) {
    			let errorRecords = []
    			data.map((singleData, index) => {
    				connection.query(`INSERT INTO ${process.env.FILE_RECORD_TBL} SET ?`, singleData, (err, results, fields) => {
    					if (err) {
    						errorRecords.push(singleData.FILE_NUMBER)
    					}
    					if(index === data.length - 1) {
    						fs.unlink(`${__dirname}/../../upload/${req.body.fileName}`)
    						const recordsInserted = data.length - errorRecords.length
    						const totalRecords = data.length
    						return res.status(200).json({message : 'Record exported successfully', saved: true, totalRecords, recordsInserted, errorRecords})
    					}
    				})
    			})
	    	} else {
	    		return res.status(200).json({message : 'File contained no data', saved: true, totalRecords: 0, recordsInserted: 0, errorRecords: []})
	    	}
	  	})
	}
)

module.exports = records