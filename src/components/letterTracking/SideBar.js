import React from 'react'
import PropTypes from 'prop-types'
import ErrorPage from './../ErrorPage'
import LetterBoard from './LetterBoard'
import LettersList from './LettersList'
import ExportLetterData from './ExportLetterData'
import NewLetterEntryForm from './NewLetterEntryForm'
import ManageLetterBoardInputs from './ManageLetterBoardInputs'
import { Grid, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link, Route, Switch } from 'react-router-dom'
import { userAuth, SystemUserRoute, SystemAdminRoute } from './../services/AuthService'

class SideBar extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Grid bsClass="wrapper">
				<nav className="active" id="sidebar">
					{userAuth.getUserRole() === 'SYSTEMUSER' &&
						<ListGroup componentClass="ul" className="list-unstyled components">
						    <ListGroupItem className={`${this.props.location.pathname == '/servicePanel/letterTracking/addNewEntry' ? 'active' : ''}`} bsClass="list">
						        <Link to={`${this.props.match.url}/addNewEntry`}>
						            <i className="glyphicon glyphicon-pencil"></i>
						            Add New Entry
						        </Link>
						    </ListGroupItem>

						    <ListGroupItem className={`${this.props.location.pathname == '/servicePanel/letterTracking/manageLetters' ? 'active' : ''}`} bsClass="list">
						        <Link to={`${this.props.match.url}/manageLetters`}>
						            <i className="glyphicon glyphicon-pencil"></i>
						            Manage Letters
						        </Link>
						    </ListGroupItem>

						    <ListGroupItem className={`${this.props.location.pathname == '/servicePanel/letterTracking/exportData' ? 'active' : ''}`} bsClass="list">
						        <Link to={`${this.props.match.url}/exportData`}>
						            <i className="glyphicon glyphicon-pencil"></i>
						            Export Data
						        </Link>
						    </ListGroupItem>
						</ListGroup>
					}

					{userAuth.getUserRole() === 'SYSTEMADMIN' &&
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

				<Grid bsClass="container padding-2x">
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