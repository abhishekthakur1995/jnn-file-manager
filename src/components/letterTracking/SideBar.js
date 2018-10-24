import React from 'react'
import PropTypes from 'prop-types'
import ErrorPage from './../ErrorPage'
import LetterBoard from './LetterBoard'
import LettersList from './LettersList'
import { FormattedMessage } from 'react-intl'
import { USERS } from './../helpers/Constants'
import ExportLetterData from './ExportLetterData'
import NewLetterEntryForm from './NewLetterEntryForm'
import { Link, Route, Switch } from 'react-router-dom'
import ManageLetterBoardInputs from './ManageLetterBoardInputs'
import { Grid, ListGroup, ListGroupItem } from 'react-bootstrap'
import { userAuth, SystemUserRoute, SystemAdminRoute } from './../services/AuthService'

class SideBar extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Grid bsClass="wrapper">
				<nav className="active" id="sidebar">
					{userAuth.getUserRole() === USERS.SYSUSER &&
						<ListGroup componentClass="ul" className="list-unstyled components">
						    <ListGroupItem className={`${this.props.location.pathname == '/servicePanel/letterTracking/addNewEntry' ? 'active' : ''}`} bsClass="list">
						        <Link to={`${this.props.match.url}/addNewEntry`}>
						            <i className="glyphicon glyphicon-pencil"></i>
						            <FormattedMessage id="letterTracking.sidebar.addNewEntry"
                                     	defaultMessage="Add New Entry" />
						        </Link>
						    </ListGroupItem>

						    <ListGroupItem className={`${this.props.location.pathname == '/servicePanel/letterTracking/manageLetters' ? 'active' : ''}`} bsClass="list">
						        <Link to={`${this.props.match.url}/manageLetters`}>
						            <i className="glyphicon glyphicon-briefcase"></i>
						            <FormattedMessage id="letterTracking.sidebar.manageLetters"
                                     	defaultMessage="Manage Letters" />
						        </Link>
						    </ListGroupItem>

						    <ListGroupItem className={`${this.props.location.pathname == '/servicePanel/letterTracking/exportData' ? 'active' : ''}`} bsClass="list">
						        <Link to={`${this.props.match.url}/exportData`}>
						            <i className="glyphicon glyphicon-export"></i>
						            <FormattedMessage id="letterTracking.sidebar.exportData"
						             	defaultMessage="Export Data" />
						        </Link>
						    </ListGroupItem>
						</ListGroup>
					}

					{userAuth.getUserRole() === USERS.SYSADMIN &&
						<ListGroup componentClass="ul" className="list-unstyled components">
						    <ListGroupItem className={`${this.props.location.pathname == '/servicePanel/letterTracking/manageApp' ? 'active' : ''}`} bsClass="list">
						        <Link to={`${this.props.match.url}/manageApp`}>
						            <i className="glyphicon glyphicon-cog"></i>
						            Manage
						        </Link>
						    </ListGroupItem>
						</ListGroup>
					}
				</nav>

				<Grid bsClass="app-background">
					<Switch>
						<SystemUserRoute  exact path={`${this.props.match.path}/addNewEntry`} component={NewLetterEntryForm} />
						<SystemUserRoute  exact path={`${this.props.match.path}/manageLetters`} component={LettersList} />
						<SystemUserRoute  exact path={`${this.props.match.path}/exportData`} component={ExportLetterData} />
						<SystemAdminRoute exact path={`${this.props.match.path}/manageApp`} component={ManageLetterBoardInputs} />
						<Route exact path={`${this.props.match.path}`} component={LetterBoard} />
						<Route component={ErrorPage} />
					</Switch>
				</Grid>
			</Grid>
		)
	}
}

SideBar.propTypes = {
    match: PropTypes.object,
    location: PropTypes.object
}

export default SideBar