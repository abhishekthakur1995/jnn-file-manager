import React from 'react'
import PropTypes from 'prop-types'
import ComposeLetter from './ComposeLetter'
import LetterBoard from './LetterBoard'
import ErrorPage from './../ErrorPage'
import { Grid, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link, Route, Switch } from 'react-router-dom'
import { userAuth, SystemUserRoute } from './../services/AuthService'

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
				</nav>

				<Grid bsClass="container padding-2x">
					<Switch>
						<SystemUserRoute exact path={`${this.props.match.path}/composeLetter`} component={ComposeLetter} />
						<SystemUserRoute exact path={`${this.props.match.path}`} component={LetterBoard} />
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