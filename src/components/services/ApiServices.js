import axios from 'axios'
import config from 'config'
axios.defaults.withCredentials = true

const headers = { 'Authorization': localStorage.getItem('authToken'), 'UserRole': localStorage.getItem('userRole') }

export const RecordsService = {
	getCountOfAllRecords() {
		return new Promise((resolves, rejects) => {
			axios.get(`${config.baseUrl}/getCountOfAllRecords`, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	},
	deleteRecord(deletedRecordId) {
		return new Promise((resolves, rejects) => {
			axios.get(`${config.baseUrl}/deleteRecord/${deletedRecordId}`, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	}

}

export const DashboardService = {
	getDashboardData() {
		return new Promise((resolves, rejects) => {
			axios.get(`${config.baseUrl}/getDashboardData`, {headers})
	      	.then(res => resolves(res))
	      	.catch(err => rejects(Error(err)))
      	})
	}
}