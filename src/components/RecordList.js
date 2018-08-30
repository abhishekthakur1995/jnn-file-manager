import React from 'react'
import { Grid, Table } from 'react-bootstrap'
import axios from 'axios'
import Record from './Record'
import { PageHead, LoadingSpinner, QuickSearchComponent } from './uiComponents/CommonComponent'
import PaginationComponent from './uiComponents/PaginationComponent'
import config from 'config'

class RecordList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			records:[],
			currentPage: null,
			totalRecords: 0,
			filterApplied: false,
			searchTerm: null
		}

		this.handleRecordUpdate = this.handleRecordUpdate.bind(this)
		this.handleRecordDelete = this.handleRecordDelete.bind(this)
		this.handleRecordStatus = this.handleRecordStatus.bind(this)
		this.handleQuickSearch = this.handleQuickSearch.bind(this)
		this.handleInitialLoad = this.handleInitialLoad.bind(this)
		this.onPageChanged = this.onPageChanged.bind(this)
	}

	componentDidMount() {
		const headers = { 'Authorization': localStorage.getItem('authToken') }
		axios.get(`${config.baseUrl}/getCountOfAllRecords`, {headers})
      	.then(res => {
	        this.setState({
	        	totalRecords: res.data.data[0].count
	        })
      	})
	}

	handleRecordUpdate(updatedRecord) {
		this.setState(prevState => ({
			records: prevState.records.map(
				record => (record.ID !== updatedRecord.ID) ? record : {...record,
					APPLICANT_NAME: updatedRecord.applicantName,
					APPLICANT_TYPE: updatedRecord.applicantType,
					APPLICANT_ADDRESS: updatedRecord.applicantAddress,
					APPLICANT_CONTACT: updatedRecord.applicantContact,
					BUILDING_NAME: updatedRecord.buildingName,
					BUILDING_ADDRESS: updatedRecord.buildingAddress,
					BUILDING_AREA: updatedRecord.buildingArea,
					FILE_NUMBER: updatedRecord.fileNumber,
					REMARK: updatedRecord.remark,
				}
			)
		}))
	}

	handleRecordDelete(deletedRecordId) {
		const headers = { 'Authorization': localStorage.getItem('authToken') }
		axios.delete(`${config.baseUrl}/deleteRecord/${deletedRecordId}`, {headers}).then(res => {
			if (res.data.success === true) {
				this.setState(prevState => ({
					records: prevState.records.filter(record => record.ID !== deletedRecordId)
				}))
			}
		})
	}

	handleRecordStatus(rec, action) {
		const headers = { 'Authorization': localStorage.getItem('authToken') }
		const newStatus = (action === 'approve') ? 1 : 2
		axios.put(`${config.baseUrl}/updateRecordStatus/${rec.ID}`, {
			status: newStatus
		}, {headers}).then(res => {
        	if (res.data.saved === true) {
        		this.setState(prevState => ({
        			records: prevState.records.map(
        				record => (record.ID !== rec.ID) ? record : {...record, FILE_STATUS: newStatus }
        			)
        		}))
        	}
      	})
	}

	onPageChanged(data) {
		if (!this.state.filterApplied) {
			this.handleInitialLoad(data)
		} else {
			this.handleQuickSearch(this.state.searchTerm, data)
		}
	}

	handleInitialLoad(data) {
		const { currentPage, pageLimit } = data
		const headers = { 'Authorization': localStorage.getItem('authToken') }
		axios.get(`${config.baseUrl}/getRecords?page=${currentPage}&limit=${pageLimit}`, {headers})
      	.then(res => {
	        this.setState({
	        	records: res.data.data,
	        	currentPage
	        })
      	})
	}

	handleQuickSearch(searchTerm, data) {
		const page = data && data.currentPage || this.state.currentPage
		const headers = { 'Authorization': localStorage.getItem('authToken') }
		axios.post(`${config.baseUrl}/getSearchResults`, {searchTerm: searchTerm, page, limit: config.pagination.pageSize}, {headers})
      	.then(res => {
	        this.setState({
	        	records: res.data.data,
	        	totalRecords: res.data.data.length,
	        	filterApplied: true,
	        	searchTerm
	        })
      	})
	}

	render() {
		var filteredRecords = this.state.records
		filteredRecords = filteredRecords.map(function(record, index) {
			return (
				<Record
					key={index}
					index={index}
					singleRecord={record}
					onUpdate={this.handleRecordUpdate}
					onDelete={this.handleRecordDelete}
					onStatusChange={this.handleRecordStatus}  />
			)
		}.bind(this))

		const pagination = this.state.totalRecords > 0 ?
			(
				<PaginationComponent
					totalRecords={this.state.totalRecords}
            		pageLimit={config.pagination.pageSize}
            		pageNeighbours={config.pagination.neighbourSize}
            		onPageChanged={this.onPageChanged}
				/>
			) : null;

		const quickSearch = <QuickSearchComponent search={this.handleQuickSearch} />

		return (
			<Grid bsClass="record-list">
				{this.state.showLoading && <LoadingSpinner />}
				<PageHead title="Manage Record Status" pagination={pagination} quickSearch={quickSearch}/>
				<Table hover>
                    <thead>
                        <tr>
                            <th>Applicant Name</th>
                            <th>Applicant Address</th>
                            <th>Applicant Contact</th>
                            <th>Building Name</th>
                            <th>File Number</th>
                            <th>Current State</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
						{filteredRecords}
					</tbody>
				</Table>
			</Grid>
		)
	}
}

export default RecordList