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

export const RecordsService = {
	getCountOfAllRecords() {
		return new Promise((resolves, rejects) => {
			const headers = userAuth.getHeaders()
			axios.get(`${config.baseUrl}/getCountOfAllRecords`, {headers})
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