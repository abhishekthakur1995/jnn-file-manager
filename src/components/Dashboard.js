import React from 'react'
import NavBar from './NavBar.js'
import SideBar from './SideBar.js'
import EntryForm from './EntryForm.js'
import ErrorPage from './ErrorPage.js'
import { Redirect } from 'react-router-dom'
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