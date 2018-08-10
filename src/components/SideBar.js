import React from 'react'
import { Grid, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link, Route, Switch } from 'react-router-dom'
import EntryForm from './EntryForm'
import RecordList from './RecordList'
import PropTypes from 'prop-types'

class SideBar extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Grid bsClass="wrapper">
				<nav id="sidebar">
					<Grid bsClass="sidebar-header">
						<h3>Dashboard</h3>
						<strong>DB</strong>
					</Grid>

					<ListGroup componentClass="ul" className="list-unstyled components">
					    <ListGroupItem className={`${this.props.location.pathname == '/dashboard/addNewRecord' ? 'active' : ''}`} bsClass="list">
					        <Link to={`${this.props.match.url}/addNewRecord`}>
					            <i className="glyphicon glyphicon-file"></i>
					            Add New Record
					        </Link>
					    </ListGroupItem>

					   	<ListGroupItem className={`${this.props.location.pathname == '/dashboard/manageRecordStatus' ? 'active' : ''}`} bsClass="list">
					        <Link to={`${this.props.match.url}/manageRecordStatus`}>
					            <i className="glyphicon glyphicon-lock"></i>
					            Manage Record Status
					        </Link>
					    </ListGroupItem>
					</ListGroup>
				</nav>

				<Grid bsClass="container padding-2x">
					<Switch>
						<Route path={`${this.props.match.path}/addNewRecord`} component={EntryForm} />
						<Route path={`${this.props.match.path}/manageRecordStatus`} component={RecordList} />
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