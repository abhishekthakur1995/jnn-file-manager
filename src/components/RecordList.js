import React from 'react'
import { Grid, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import Record from './Record'

class RecordList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			records:[]
		}

		this.approveRecord = this.approveRecord.bind(this)
	}

	componentDidMount() {
		const headers = { 'Authorization': localStorage.getItem('authToken') }
		axios.get(`http://localhost:3001/getAllRecords`, {headers})
      	.then(res => {
	        this.setState(() => ({
	        	records: res.data.data
	        }))
      	})
	}

	approveRecord(rec) {
		const headers = { 'Authorization': localStorage.getItem('authToken') }
		axios.put(`http://localhost:3001/updateRecordStatus/${rec.ID}`, {
			status: +!rec.FILE_STATUS
		}, {headers}).then(res => {
        	if (res.data.success === true) {
        		this.setState(prevState => ({
        			records: prevState.records.map(
        				record => (record.ID !== rec.ID) ? record : {...record, FILE_STATUS: +!record.FILE_STATUS }
        			)
        		}))
        	}
      	})
	}

	render() {
		var filteredRecords = this.state.records
		filteredRecords = filteredRecords.map(function(record, index) {
			return (
				<Record key={index} whichItem={record} singleRecord={record} onApprove={this.approveRecord} />
			)
		}.bind(this))
		return (
			<Grid bsClass="record-list">
				<ListGroup componentClass="ul">
					{filteredRecords}
				</ListGroup>
			</Grid>
		)
	}
}

export default RecordList