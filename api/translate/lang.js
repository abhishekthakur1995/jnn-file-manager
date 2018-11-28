'use strict'

const hindiLangArr = {
	letterAddSuccess: 'पत्र रिकॉर्ड सफलतापूर्वक सेव किया गया',
	letterAddUnsuccess: 'पत्र डेटा सेव में असमर्थ। कृपया पुन: प्रयास करें',
	duplicateRegNo: 'यह क्रमांक संख्या पहले से मौजूद है। कृपया एक नया क्रमांक संख्या दें।',
	letterUpdateSuccess: 'पत्र रिकॉर्ड सफलतापूर्वक अपडेट किया गया',
	letterUpdateUnsuccess: 'पत्र डेटा अपडेट में असमर्थ। कृपया पुन: प्रयास करें',
	settingsAddSuccess: 'सफलतापूर्वक सेव किया गया',
	settingsAddUnsuccess: 'सेव करने में असमर्थ। कृपया दुबारा प्रयास करे',
	duplicateSettings: 'यह नाम पहले से ही मौजूद है। क्रियपा दूसरा नाम का उपयोग करे',
	resetPasswordSuccess: 'पासवर्ड सफलतापूर्वक रीसेट किया गया',
	resetPasswordUnsuccess: 'पासवर्ड रीसेट करने में असमर्थ। कृपया पुन: प्रयास करें',
	resetPasswordNoMatch: 'पासवर्ड और पासवर्ड की पुष्टि मेल नहीं खाते। सही पासवर्ड के साथ पुनः प्रयास करें',
	resetPasswordIncorrect: 'गलत पासवर्ड दर्ज किया गया। कृपया सही पासवर्ड दर्ज करें',
	resetPasswordNoUserFound: 'कोई यूजर नहीं मिला',
	recordAddSuccess: 'फ़ाइल रिकॉर्ड सफलतापूर्वक सेव किया गया',
	recordAddUnsuccess: 'फ़ाइल डेटा सेव में असमर्थ। कृपया पुन: प्रयास करें',
	duplicateFileNo: 'यह फ़ाइल नंबर पहले से मौजूद है। कृपया एक नया फ़ाइल नंबर दें।',
	recordUpdateSuccess: 'फ़ाइल रिकॉर्ड सफलतापूर्वक अपडेट किया गया',
	recordUpdateUnsuccess: 'फ़ाइल डेटा अपडेट में असमर्थ। कृपया पुन: प्रयास करें',
}

const EnglishLangArr = {
	letterAddSuccess: 'Letter record saved successfully',
	letterAddUnsuccess: 'Unable to save letter data. Please try again',
	duplicateRegNo: 'This registration number already exists. Kindly give a new registration number.',
	letterUpdateSuccess: 'Letter record updated successfully',
	letterUpdateUnsuccess: 'Unable to update letter data. Please try again',
	settingsAddSuccess: 'Setting added successfully',
	settingsAddUnsuccess: 'Unable to add Setting. Please try again',
	duplicateSettings: 'This setting already exists.',
	resetPasswordSuccess: 'User password resetted successfully',
	resetPasswordUnsuccess: 'Unable to reset password. Please try again',
	resetPasswordNoMatch: 'Password and confirm password do not match. Please try again with correct password',
	resetPasswordIncorrect: 'Incorrect password entered. Please enter the correct password',
	resetPasswordNoUserFound: 'No user found',
	recordAddSuccess: 'File record saved successfully',
	recordAddUnsuccess: 'Unable to save file record data. Please try again',
	duplicateFileNo: 'This file number already exists. Kindly give a new file number.',
	recordUpdateSuccess: 'File record updated successfully',
	recordUpdateUnsuccess: 'Unable to update file record data. Please try again',
}

class Lang {
	static convertMessage(code) {
	    return hindiLangArr[code]
	}
}

module.exports = Lang