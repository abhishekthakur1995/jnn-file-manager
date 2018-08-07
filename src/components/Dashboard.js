import React from 'react'
// import EntryForm from './EntryForm.js'
import RecordList from './RecordList.js'
import { Grid } from 'react-bootstrap'

class Dashboard extends React.Component {
	render() {
		return (
			<Grid bsClass="dashboard">
				<RecordList />
			</Grid>
		)
	}
}

export default Dashboard