import React from 'react'
import PropTypes from 'prop-types'
import EntryForm from './EntryForm'
import RecordList from './RecordList'
import InfoBoard from './InfoBoard'
import { Grid, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link, Route, Switch } from 'react-router-dom'

class SideBar extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Grid bsClass="wrapper">
				<nav className="active" id="sidebar">
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
						<Route path={`${this.props.match.path}/addNewRecord`} render={(props) => <EntryForm {...props} showPageHead={true} />} />
						<Route path={`${this.props.match.path}/manageRecordStatus`} component={RecordList} />
						<Route path={`${this.props.match.path}`} component={InfoBoard} />
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