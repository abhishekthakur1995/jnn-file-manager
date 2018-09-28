import React from 'react'
import PropTypes from 'prop-types'
import ErrorPage from './../ErrorPage'
import LetterBoard from './LetterBoard'
import ManageLetterBoardInputs from './ManageLetterBoardInputs'
import NewLetterEntryForm from './NewLetterEntryForm'
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