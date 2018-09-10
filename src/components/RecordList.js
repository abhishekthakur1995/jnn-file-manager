import React from 'react'
import { Grid, Table, Checkbox } from 'react-bootstrap'
import axios from 'axios'
import Record from './Record'
import { PageHead, LoadingSpinner, QuickSearchComponent, TableFunctionalityBase, FilterButton } from './uiComponents/CommonComponent'
import PaginationComponent from './uiComponents/PaginationComponent'
import FilterComponent from './uiComponents/FilterComponent'
import config from 'config'
import _ from 'lodash'

class RecordList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			records:[],
			currentPage: null,
			totalRecords: 0,
			quickSearchEnabled: false,
			searchTerm: null,
			showLoading: false,
			checkBoxDefaultStatus: false,
			showFilter: false,
			filterApplied: false
		}

		this.markedRecord = []

		this.handleRecordUpdate = this.handleRecordUpdate.bind(this)
		this.handleRecordDelete = this.handleRecordDelete.bind(this)
		this.handleRecordStatus = this.handleRecordStatus.bind(this)
		this.handleQuickSearch = this.handleQuickSearch.bind(this)
		this.handleInitialLoad = this.handleInitialLoad.bind(this)
		this.onPageChanged = this.onPageChanged.bind(this)
		this.handleMultiSelect = this.handleMultiSelect.bind(this)
		this.getRecordsMarkedForUpdate = this.getRecordsMarkedForUpdate.bind(this)
		this.handleMultiAction = this.handleMultiAction.bind(this)
		this.toggleFilter = this.toggleFilter.bind(this)
		this.applyFilter = this.applyFilter.bind(this)
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
		if (!this.state.quickSearchEnabled) {
			this.handleInitialLoad(data)
		} else {
			this.handleQuickSearch(this.state.searchTerm, data)
		}
	}

	handleInitialLoad(data) {
		this.setState({ showLoading: true })
		const { currentPage, pageLimit } = data
		const headers = { 'Authorization': localStorage.getItem('authToken') }
		axios.get(`${config.baseUrl}/getRecords?page=${currentPage}&limit=${pageLimit}`, {headers})
      	.then(res => {
	        this.setState({
	        	records: res.data.data,
	        	showLoading: false,
	        	currentPage
	        })
      	})
	}

	handleQuickSearch(searchTerm, data) {
		this.setState({ showLoading: true })
		const page = data && data.currentPage || this.state.currentPage
		const headers = { 'Authorization': localStorage.getItem('authToken') }
		axios.post(`${config.baseUrl}/getSearchResults`, {searchTerm: searchTerm, page, limit: config.pagination.pageSize}, {headers})
      	.then(res => {
	        this.setState({
	        	records: res.data.data,
	        	totalRecords: res.data.data.length,
	        	quickSearchEnabled: true,
	        	showLoading: false,
	        	searchTerm
	        })
      	})
	}

	applyFilter(filters, data) {
		this.setState({ showLoading: true })
		const page = data && data.currentPage || this.state.currentPage
		const headers = { 'Authorization': localStorage.getItem('authToken') }
		axios.post(`${config.baseUrl}/getFilteredData`, { page, limit: config.pagination.pageSize, filters }, {headers})
      	.then(res => {
	        this.setState({
	        	records: res.data.data,
	        	totalRecords: res.data.data.length,
	        	filterApplied: true,
	        	showLoading: false,
	        	showFilter: false
	        })
      	})
	}

	handleMultiSelect() {
		// callback is used for removing all marked records when the select all checkbox is set to false
		this.setState({ checkBoxDefaultStatus: !this.state.checkBoxDefaultStatus }, () => {
			if(!this.state.checkBoxDefaultStatus) {
				this.markedRecord = [];
			}
		})
	}

	getRecordsMarkedForUpdate(checked, id) {
		if (checked) {
			if(!_.includes(this.markedRecord, id)) {
				this.markedRecord.push(id)
			}
		} else {
			_.remove(this.markedRecord, function(recordId) {
			    return recordId === id
			})
		}
	}

	handleMultiAction(action) {
		if (!_.isEmpty(this.markedRecord)) {
			this.setState({ showLoading: true })
			const newStatus = action === 'approve' ? 1 : 2
			const headers = { 'Authorization': localStorage.getItem('authToken') }
			axios.put(`${config.baseUrl}/updateMultipleRecordStatus`, {markedRecords: this.markedRecord, status: newStatus}, {headers}).then(res => {
				if (res.data.saved === true) {
					this.markedRecord.map(markedRecordId => {
						this.setState(prevState => ({
							records: prevState.records.map(
								record => (record.ID !== markedRecordId) ? record : {...record, FILE_STATUS: newStatus }
							),
							showLoading: false
						}))
					})
	        	}
			})
		}
	}

	toggleFilter() {
		this.setState({ showFilter: !this.state.showFilter })
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
					onStatusChange={this.handleRecordStatus}
					checkBoxDefaultStatus={this.state.checkBoxDefaultStatus}
					handleMultiSelect={this.handleMultiSelect}
					getRecordsMarkedForUpdate={this.getRecordsMarkedForUpdate} />
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
			) : null

		const quickSearch = <QuickSearchComponent search={this.handleQuickSearch} />

		const filterBtn = <FilterButton onClick={this.toggleFilter} />

		const filterComponent = <FilterComponent onApply={this.applyFilter} />

		return (
			<Grid bsClass="record-list">
				{this.state.showLoading && <LoadingSpinner />}
				<PageHead
					title="Manage Record Status"
					pagination={pagination}
					quickSearch={quickSearch}
					filter={filterBtn}
				/>
				{this.state.showFilter && filterComponent}
				<Table hover bordered className="record-table margin-bottom-0x">
                    <thead>
                        <tr>
                        	<th>
                        		<Checkbox
                        			inline={true}
                        			onChange={this.handleMultiSelect}
                        			checked={this.state.checkBoxDefaultStatus} >
                    			</Checkbox>
                    		</th>
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
				<TableFunctionalityBase
					onValidate={this.handleValidateAll}
					onApprove={this.handleMultiAction}
					onReject={this.handleMultiAction}
				/>
			</Grid>
		)
	}
}

export default RecordList