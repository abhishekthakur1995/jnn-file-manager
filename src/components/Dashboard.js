import React from 'react'
import EntryForm from './EntryForm.js'
import { Grid } from 'react-bootstrap'

class Dashboard extends React.Component {
	render() {
		return (
			<Grid bsClass="dashboard">
				<EntryForm />
			</Grid>
		)
	}
}

export default Dashboard