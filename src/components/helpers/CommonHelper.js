import moment from 'moment'
import config from 'config'
import draftToHtml from 'draftjs-to-html'
import { convertToRaw } from 'draft-js'

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
	getLetterData(dataObj) {
		return draftToHtml(convertToRaw(dataObj.getCurrentContent()))
	},
	getHtmlFormattedLetterData(dataObj) {
		return draftToHtml(convertToRaw(dataObj.getCurrentContent())).replace(/<(?:.|\n)*?>/gm, '')
	},
	getLetterTrackingAbsolutePath(relativePath) {
		return `/servicePanel/letterTracking/${relativePath}`
	},
	getLetterStatusFromCode(code) {
		return LETTER_STATUS_CODE_MAPPING[code]
	}
}

export const FileRecord = {
	getFileStatusFromCode(code) {
		return FILE_STATUS_CODE_MAPPING[code]
	}
}