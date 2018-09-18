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
	
}

module.exports = Helper