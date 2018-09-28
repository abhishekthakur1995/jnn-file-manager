'use strict'

const FILE_STATUS_CODE_MAPPING = {
	'pending'  : 0,
	'approved' : 1,
	'rejected' : 2
}

const DB_FIELDS_CODE_MAPPING = {
	'buildingName'		: 	'BUILDING_NAME',
	'applicantName'		: 	'APPLICANT_NAME',
	'applicantContact'	: 	'APPLICANT_CONTACT',
	'applicantAddress'  : 	'APPLICANT_ADDRESS',
	'fileNumber'  		: 	'FILE_NUMBER',
	'dateCreated'  		: 	'CREATED'
}

const LETTER_FIELDS_CODE_MAPPING = {
	'DEPARTMENT' : 	'DEPARTMENT_NAME',
	'TAG'		 : 	'LETTER_TAG',
	'OFFICER'	 : 	'ASSIGNED_OFFICER',
	'TYPE'       :  'LETTER_TYPE'
}

class Helper {

	static getFileStatusCodeFromName(codeName) {
	    return FILE_STATUS_CODE_MAPPING[codeName];
	}

	static convertTimestampToUnixTimestamp(timestamp) {
	    return timestamp/1000;
	}

	static getDbFieldCodeFromName(codeName) {
	    return DB_FIELDS_CODE_MAPPING[codeName];
	}

	static getDepartmentTypeFromCode(codeName) {
		return LETTER_FIELDS_CODE_MAPPING[codeName];
	}

	static log(value, helpText="logger") {
		console.log(`================${helpText}===============`)
		console.log(value)
		console.log(`================END===============`)
	}
	
}

module.exports = Helper