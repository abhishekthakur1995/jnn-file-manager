'use strict'
const moment = require('moment')

const FILE_STATUS_CODE_MAPPING = {
	'pending'  : 0,
	'approved' : 1,
	'rejected' : 2
}

const LETTER_STATUS_CODE_MAPPING = {
	'incoming'  : 1,
	'outgoing' : 2
}

const DB_FIELDS_CODE_MAPPING = {
	'buildingName'		: 	'BUILDING_NAME',
	'applicantName'		: 	'APPLICANT_NAME',
	'applicantContact'	: 	'APPLICANT_CONTACT',
	'applicantAddress'  : 	'APPLICANT_ADDRESS',
	'fileNumber'  		: 	'FILE_NUMBER',
	'dateCreated'  		: 	'CREATED',
	'DEPARTMENT_NAME'   :   'DEPARTMENT_NAME',
	'ASSIGNED_OFFICER'  :   'ASSIGNED_OFFICER',
	'CREATED'           :   'CREATED'
}

const LETTER_FIELDS_CODE_MAPPING = {
	'DEPARTMENT' : 	'DEPARTMENT_NAME',
	'TAG'		 : 	'LETTER_TAG',
	'OFFICER'	 : 	'ASSIGNED_OFFICER',
	'TYPE'       :  'LETTER_TYPE'
}

const FILTER_FIELDS_CODE_MAPPING = {
	'departmentName'    :   'DEPARTMENT_NAME',
	'letterTag'         :	'LETTER_TAG',
	'letterType'        :	'LETTER_TYPE',
	'letterStatus'		:	'LETTER_STATUS',
	'assignedOfficer'	:   'ASSIGNED_OFFICER',
}

const MYSQL_DTM_FORMAT = 'YYYY-MM-DD HH:mm:ss'

class Helper {

	static getFileStatusCodeFromName(codeName) {
	    return FILE_STATUS_CODE_MAPPING[codeName]
	}

	static convertTimestampToUnixTimestamp(timestamp) {
	    return timestamp/1000
	}

	static getDbFieldCodeFromName(codeName) {
	    return DB_FIELDS_CODE_MAPPING[codeName]
	}

	static getDepartmentTypeFromCode(codeName) {
		return LETTER_FIELDS_CODE_MAPPING[codeName]
	}

	static getFilterFieldFromKey(codeName) {
		return FILTER_FIELDS_CODE_MAPPING[codeName]
	}

	static createCodeFromSettingsName(settingsName) {
		return settingsName.toLowerCase().trim().replace(/\s\s+/g, ' ').replace(/ /g,"_")
	}

	static getFileExtension(fileName) {
		const re = /(?:\.([^.]+))?$/
		return re.exec(fileName)[1]
	}

	static constructUniqueFileName(id, ext) {
		return `${id}.${ext}`
	}

	static convertDateTimeToMysqlFormat(dateTime) {
		return moment(dateTime).format(MYSQL_DTM_FORMAT)
	}

	static log(value, helpText="logger") {
		console.log(`================${helpText}===============`)
		console.log(value)
		console.log(`================END===============`)
	}
	
}

module.exports = Helper