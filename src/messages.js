export default {
	'hi-IN': {
		common: {
			general: {
				select: 'चुनिए',
				approved: 'स्वीकृत',
				rejected: 'अस्वीकृत',
				pending: 'लंबित',
				total: 'कुल',
				incoming: 'आने वाला',
				outgoing: 'बाहर जाने वाला',
				dashboard: 'डैशबोर्ड',
				action: 'कार्य',
				noResult: 'कोई रिकॉर्ड नहीं मिला'
			},
			filter: {
				title: 'फ़िल्टर लगाए',
				mainHeading: 'चुनिए',
				searchPanelHeading: 'खोजे',
				searchBoxHeading: 'खोज शब्द',
				searchBoxPlaceholder: 'खोजने के लिए अपना मुख्य शब्द दर्ज करें',
				filterBtn: 'फ़िल्टर',
				resetBtn: 'रिसेट',
				quickSearchPlaceHolder: 'जल्दी खोज करे'
			},
			navbar: {
				servicePanelLink: 'एप्लीकेशन पोर्टल',
				resetPasswordLink: 'पासवर्ड रिसेट करे',
				logoutLink: 'लॉगआउट करे',
				welcomeText: 'स्वागत'
			},
			loginForm: {
				moduleTitle: 'रिकॉर्ड मैनेजमेंट सिस्टम',
				emailField: 'ईमेल',
				passwordField: 'पासवर्ड',
				loginBtn: 'लॉगिन करे'
			},
			errorPage: {
				msg1: 'यह पृष्ठ नहीं मिला',
				msg2: 'क्षमा करें लेकिन जो पेज आप खोज रहे हैं, वह पूर्ववत नहीं है, हटा दिया गया है, नाम बदल गया है या अनौपचारिक है',
				msg3: 'एप्लीकेशन पोर्टल पर वापस जाओ'
			},
			servicePanel: {
				title: 'एप्लीकेशन पोर्टल',
				fileRecordTitle: 'फाइल मैनेजर',
				letterRecordTitle: 'लेटर ट्रैकिंग'
			},
			resetPassword: {
				title: 'पासवर्ड रिसेट करे',
				currentPassword: 'वर्तमान पासवर्ड',
				newPassword: 'नया पासवर्ड',
				confirmPassword: 'नए पासवर्ड की पुष्टि करें',
				resetBtn: 'पासवर्ड रिसेट करे'
			}
		},
		fileManager: {
			sidebar: {
				addNewRecord: 'नया रिकॉर्ड जोड़े',
				manageRecords: 'रिकार्ड्स मैनेज करे',
				getRecords: 'रिकार्ड्स रिपोर्ट देखे',
				importExcel: 'एक्सेल से रिकॉर्ड डाटा डाले',
				manageSystemInputs: ''
			},
			infoboard: {
				chartHolderTitle: 'फाइल रिकॉर्ड सारांश'
			},
			getRecords: {
				byMonthSection: {
					title: 'महीनो के अनुसार देखे',
					year: 'साल',
					month: 'महीना',
					errMsg: 'कृपया साल और महीने दोनों का चयन करें'
				},
				specificPeriodSection: {
					title: 'विशिष्ट अवधि के अनुसार देखे',
					from: 'प्रारंभ',
					to: 'अंत',
					errMsg: ''
				},
				selectFormatSection: {
					title: 'रिपोर्ट फॉर्मेट का चयन करे',
					excel: 'एक्सेल',
					pdf: 'पीडीएफ',
					errMsg: 'कृपया रिपोर्ट फॉर्मेट का चयन करे'
				},
				fetchDataBtn: 'डाटा देखे',
				downloadExcelLink: 'एक्सेल डाउनलोड करे',
				downloadPdfLink: 'पीडीएफ डाउनलोड करे',
			},
			import: {
				dwnldSampleExcelMsg: 'सैंपल एक्सेल फाइल डाउनलोड करे',
				importDataBtn: 'डाटा सेव करे',
				dropzone: {
					msg1: 'फाइल ड्राप करे या क्लिक करके सेलेक्ट करे । ',
					msg2: 'केवल वैध एक्सेल फ़ाइलें (.xlsx) स्वीकार की जाएगी',
					uploadFileBtn: 'फाइल का चयन करें'
				}
			},
			record: {
				dropdown: {
					btn1: '',
					btn2: '',
					btn3: ''
				},
				editRecordModal: {
					title: ''
				},
				deleteRecordModal: {
					title: '',
					warning: '',
					closeBtn: '',
					deleteBtn: ''
				},
				manageRecordModal: {
					title: ''
				}
			}
		},
		letterTracking: {
			sidebar: {
				addNewEntry: 'नया पत्र जोड़े',
				manageLetters: 'पत्र प्रबंधित करें',
				exportData: 'पत्र रिपोर्ट देखे',
				manage: ''
			},
			letterboard: {
				chartHolderTitle: 'पत्र रिकॉर्ड सारांश'
			},
			newLetterEntryForm: {
				regNo: 'क्रमांक',
				status: 'पत्र स्थिति',
				date: 'दिनांक',
				deptName: 'संबंधित विभाग',
				type: 'पत्र प्रकार',
				tag: 'विषय में',
				assignedOfficer: 'नियुक्त अधिकारी',
				address: 'पत्र पता',
				subject: 'पत्र विषय',
				remark: 'टिप्पणी',
				submitBtnSaveText: 'सेव करे',
				submitBtnUpdateText: 'अपडेट करे',
				saveEntryFormLabel: 'नया रिकॉर्ड जोड़े',
				updateEntryFormLabel: 'रिकॉर्ड अपडेट करे',
				dropzone: {
					msg1: 'अपना पत्र यहां अपलोड करें । ',
					msg2: 'समर्थित फ़ाइल एक्सटेंशन .pdf, .doc, .docx, .jpg, .png हैं',
					uploadBtn: 'फाइल का चयन करें',
					uploadFileErrMsg1: 'फ़ाइल अपलोड करने में असफल । कृपया पुन: प्रयास करें।',
					uploadFileErrMsg2: 'फ़ाइल का साइज 100 केबी से अधिक है। कृपया एक छोटी फाइल अपलोड करें।',
					uploadFileErrMsg3: '{fileExtension} एक स्वीकार्य एक्सटेंशन नहीं है।',
					removeGlyphTitle: 'फ़ाइल को हटाएं'
				}
			},
			exportLetterData: {
				byMonthSection: {
					title: 'महीनो के अनुसार देखे',
					year: 'साल',
					month: 'महीना',
					errMsg: 'कृपया साल और महीने दोनों का चयन करें'
				},
				specificPeriodSection: {
					title: 'विशिष्ट अवधि के अनुसार देखे',
					from: 'प्रारंभ',
					to: 'अंत',
					errMsg: ''
				},
				byTagsSection: {
					title: 'अन्य'
				},
				selectFormatSection: {
					title: 'रिपोर्ट फॉर्मेट का चयन करे',
					excel: 'एक्सेल',
					pdf: 'पीडीएफ',
					errMsg: 'कृपया रिपोर्ट फॉर्मेट का चयन करे'
				},
				fetchDataBtn: 'डाटा देखे',
				downloadExcelLink: 'एक्सेल डाउनलोड करे',
				downloadPdfLink: 'पीडीएफ डाउनलोड करे',
			},
			letterList: {
				dropdown: {
					viewBtn: 'पत्र डेटा देखें',
					editBtn: 'पत्र डेटा संपादित करें',
					viewAttachmentBtn: 'संलग्न पत्र देखें'
				},
				resultsPerPageMsg: 'परिणाम प्रति पृष्ठ'
			}
		}
	},
}