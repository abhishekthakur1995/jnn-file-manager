'use strict'

const FILE_STATUS_CODE_MAPPING = {
	'pending'  : 0,
	'approved' : 1,
	'rejected' : 2
}

class Helper {

	static getFileStatusCodeFromName(codeName) {
		return FILE_STATUS_CODE_MAPPING[codeName]
	}
}

module.exports = Helper