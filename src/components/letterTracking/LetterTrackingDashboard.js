import React from 'react'
import SideBar from './SideBar.js'
import PropTypes from 'prop-types'
import { Grid } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'

class LetterTrackingDashboard extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Grid bsClass="dashboard">
				<BreadcrumbsItem glyph='dashboard' to={'/servicePanel/letterTracking'}>
					<Grid componentClass="span" bsClass="link">
						<FormattedMessage id="common.general.dashboard" defaultMessage="Dashboard" />
					</Grid>
				</BreadcrumbsItem>
				<SideBar match={this.props.match} location={this.props.location}/>
			</Grid>
		)
	}
}

LetterTrackingDashboard.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object
}

export default LetterTrackingDashboard