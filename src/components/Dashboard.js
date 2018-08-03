import React from 'react'
import NavBar from './NavBar.js'
import SideBar from './SideBar.js'
import EntryForm from './EntryForm.js'
import ErrorPage from './ErrorPage.js'
import { Switch, Route } from 'react-router-dom'

class Dashboard extends React.Component {
	render() {
		return (
			<div className="dashboard">
				<h3>Dashboard</h3>
			</div>
		)
	}
}

export default Dashboard