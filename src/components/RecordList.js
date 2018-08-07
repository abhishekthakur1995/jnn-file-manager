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

	render() {
		var filteredRecords = this.state.records
		filteredRecords = filteredRecords.map(function(record, index) {
			return (
				<Record key={index} singleRecord={record} />
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