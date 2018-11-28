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
	'applicantName'		: 	'APPLICANT_NAME',
	'applicantContact'	: 	'APPLICANT_CONTACT',
	'applicantAddress'  : 	'APPLICANT_ADDRESS',
	'fileNumber'  		: 	'FILE_NUMBER',
	'dateCreated'  		: 	'CREATED',
	'DEPARTMENT_NAME'   :   'DEPARTMENT_NAME',
	'ASSIGNED_OFFICER'  :   'ASSIGNED_OFFICER',
	'CREATED'           :   'CREATED',
	'LETTER_DATE'       :   'LETTER_DATE'
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
const UPLOAD_FILE_SIZE_LIMIT = 102400   //100 kb in bytes
const UPLOAD_FILE_VALID_EXTENSIONS = ['.jpg', '.png', '.doc', '.docx', '.pdf']
const DEFAULT_DATE_FORMAT = "DD/MM/YYYY"
const DEFAULT_DATE_TIME_FORMAT = "DD/MM/YYYY h:mm a"

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

	static constructUniqueFileName(id, ext) {
		return `${id}${ext}`
	}

	static convertDateTimeToMysqlFormat(dateTime) {
		return moment(dateTime).format(MYSQL_DTM_FORMAT)
	}

	static getFileUploadsizeLimit() {
		return UPLOAD_FILE_SIZE_LIMIT
	}

	static getUploadFileValidExtensions() {
		return UPLOAD_FILE_VALID_EXTENSIONS
	}

	static getDisplayFormatDateTime(date) {
		return moment(date).format(DEFAULT_DATE_TIME_FORMAT)
	}

	static getDisplayFormatDate(date) {
		return moment(date).format(DEFAULT_DATE_FORMAT)
	}

	static log(value, helpText="logger") {
		console.log(`================${helpText}===============`)
		console.log(value)
		console.log(`================END===============`)
	}
	
}

module.exports = Helper