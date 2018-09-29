import draftToHtml from 'draftjs-to-html'
import { convertToRaw } from 'draft-js'

export const letterTracking = {
	getLetterData(dataObj) {
		return draftToHtml(convertToRaw(dataObj.getCurrentContent()))
	},
	getHtmlFormattedLetterData(dataObj) {
		return draftToHtml(convertToRaw(dataObj.getCurrentContent())).replace(/<(?:.|\n)*?>/gm, '')
	},
	getLetterTrackingAbsolutePath(relativePath) {
		return `/servicePanel/letterTracking/${relativePath}`
	}
}