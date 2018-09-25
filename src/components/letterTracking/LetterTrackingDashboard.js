import React from 'react'
import SideBar from './SideBar.js'
import { Grid } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

class LettertrackingDashboard extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Grid bsClass="dashboard">
				<BreadcrumbsItem glyph='dashboard' to={'/servicePanel/letterTracking'}>
					<span className="link">Dashboard</span>
				</BreadcrumbsItem>
				<SideBar match={this.props.match} location={this.props.location}/>
			</Grid>
		)
	}
}

LettertrackingDashboard.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object
}

export default LettertrackingDashboard