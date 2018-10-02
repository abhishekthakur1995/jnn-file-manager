import axios from 'axios'
import config from 'config'
import { userAuth } from './AuthService'
axios.defaults.withCredentials = true

export const LoginService = {
	login(data) {
		return new Promise((resolves, rejects) => {
			axios.post(`${config.baseUrl}/login`, data)
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	}
}

export const NavBarService = {
	logout() {
		return new Promise((resolves, rejects) => {
			axios.post(`${config.baseUrl}/logout`)
			.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	}
}

export const GetRecordsService = {
	getDataBasedOnSelectedMonth(month, year) {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.get(`${config.baseUrl}/getDataBasedOnSelectedMonth?month=${month}&year=${year}`, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	},
	getDataForSpecificPeriod(startDate, endDate) {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.get(`${config.baseUrl}/getDataBasedOnSelectedDuration?startDate=${startDate}&endDate=${endDate}`, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
	  	})
	}
}

export const RecordsService = {
	getCountOfAllRecords() {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.get(`${config.baseUrl}/getCountOfAllRecords`, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	},
	getRecords(url) {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.get(url, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	},
	getSearchResults(data) {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.post(`${config.baseUrl}/getSearchResults`, data, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	},
	getFilteredData(data) {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.post(`${config.baseUrl}/getFilteredData`, data, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	},
	updateRecordStatus(recordId, data) {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.put(`${config.baseUrl}/updateRecordStatus/${recordId}`, data, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	},
	updateMultipleRecordStatus(data) {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.put(`${config.baseUrl}/updateMultipleRecordStatus`, data, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	},
	deleteRecord(deletedRecordId) {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.get(`${config.baseUrl}/deleteRecord/${deletedRecordId}`, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	}

}

export const DashboardService = {
	getDashboardData() {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.get(`${config.baseUrl}/getDashboardData`, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	}
}

export const EntryFormService = {
	addNewRecord(method, url, data) {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios({ method, url, data, headers })
			.then(res => resolves(res))
			.catch(err => rejects(Error(err)))
		})
	}
}

export const ImportService = {
	upload(data) {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios({
				method: 'post',
				url: `${config.baseUrl}/upload`,
				data: data,
				headers,
				config: { headers: {'Content-Type': 'multipart/form-data' }}
			})
			.then(res => resolves(res))
			.catch(err => rejects(Error(err)))
		})
	},
	importDataToDB(data) {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.post(`${config.baseUrl}/importDataToDB`, data, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	},
	downloadExcelFile() {
		window.open(`${config.baseUrl}/downloadSampleExcel`)
	}
}

export const LetterBoardService = {
	getDashboardData() {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.get(`${config.baseUrl}/letters/getLetterBoardData`, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	}
}

export const NewLetterEntryFormService = {
	getInputFieldsData() {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.get(`${config.baseUrl}/letters/getInputFieldsData`, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	},
	addNewLetterRecord(method, url, data) {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios({ method, url, data, headers })
			.then(res => resolves(res))
			.catch(err => rejects(err))
		})
	},
	uploadLetterFile(data) {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios({
				method: 'post',
				url: `${config.baseUrl}/letters/upload`,
				data: data,
				headers,
				config: { headers: {'Content-Type': 'multipart/form-data' }}
			})
			.then(res => resolves(res))
			.catch(err => rejects(Error(err)))
		})
	}
}

export const ManageLetterBoardInputsService = {
	addNewSettings(data) {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.post(`${config.baseUrl}/letters/addNewSettings`, data, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(err))
      	})
	}
}

export const LettersService = {
	getCountOfAllLetters() {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.get(`${config.baseUrl}/letters/getCountOfAllLetters`, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	},
	getRecords(url) {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.get(url, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	},
	getSearchResults(data) {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.post(`${config.baseUrl}/letters/getSearchResults`, data, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	},
	getFilteredData(data) {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.post(`${config.baseUrl}/letters/getFilteredData`, data, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	}
}

export const ExportLetterDataService = {
	exportDataByMonth(month, year) {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.get(`${config.baseUrl}/letters/getDataBasedOnSelectedMonth?month=${month}&year=${year}`, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	},
	exportDataBySpecificPeriod(startDate, endDate) {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.get(`${config.baseUrl}/letters/getDataBasedOnSelectedDuration?startDate=${startDate}&endDate=${endDate}`, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
	  	})
	},
	exportDataBySelectedTags(data) {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.post(`${config.baseUrl}/letters/getDataBasedOnSelectedTags`, data, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	}
}