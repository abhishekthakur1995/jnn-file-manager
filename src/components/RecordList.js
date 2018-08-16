import React from 'react'
import { Grid, Table } from 'react-bootstrap'
import axios from 'axios'
import Record from './Record'
import { PageHead } from './uiComponents/CommonComponent'

class RecordList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			records:[]
		}

		this.handleRecordUpdate = this.handleRecordUpdate.bind(this)
		this.handleRecordDelete = this.handleRecordDelete.bind(this)
		this.handleRecordStatus = this.handleRecordStatus.bind(this)
	}

	componentDidMount() {
		const headers = { 'Authorization': localStorage.getItem('authToken') }
		axios.get('http://localhost:3001/getAllRecords', {headers})
      	.then(res => {
	        this.setState(() => ({
	        	records: res.data.data
	        }))
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
		axios.delete(`http://localhost:3001/deleteRecord/${deletedRecordId}`, {headers}).then(res => {
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
		axios.put(`http://localhost:3001/updateRecordStatus/${rec.ID}`, {
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
		return (
			<Grid bsClass="record-list">
				<PageHead title="Manage Record Status"/>
				<Table hover>
                    <thead>
                        <tr>
                        	<th>#</th>
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