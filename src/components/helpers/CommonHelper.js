import moment from 'moment'
import config from 'config'

const FILE_STATUS_CODE_MAPPING = {
	'0' : 'Pending',
	'1' : 'Approved',
	'2' : 'Rejected'
}

const LETTER_STATUS_CODE_MAPPING = {
	'1' : 'Incoming',
	'2' : 'Outgoing'
}

export const Common = {
	getDisplayFormatDate(date) {
		return moment(date).format(config.defaultDateTimeFormat)
	}
}

export const LetterTracking = {
	getLetterTrackingAbsolutePath(relativePath) {
		return `/servicePanel/letterTracking/${relativePath}`
	},
	getLetterStatusFromCode(code) {
		return LETTER_STATUS_CODE_MAPPING[code]
	},
	createCodeFromSettingsName(settingsName) {
		return settingsName.toLowerCase().trim().replace(/\s\s+/g, ' ').replace(/ /g,"_")
	},
	createAttachmentName(ext) {
		return `${Math.floor((Math.random() * 10000000000) + 1)}${ext}`
	}
}

export const FileRecord = {
	getFileStatusFromCode(code) {
		return FILE_STATUS_CODE_MAPPING[code]
	}
}