'use strict'

const FILE_STATUS_CODE_MAPPING = {
	'pending'  : 0,
	'approved' : 1,
	'rejected' : 2
}

class Helper {

	static getFileStatusCodeFromName = (codeName) => FILE_STATUS_CODE_MAPPING[codeName];

	static convertTimestampToUnixTimestamp = (timestamp) => timestamp/1000;
}

module.exports = Helper