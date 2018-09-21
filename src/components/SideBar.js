import React from 'react'
import PropTypes from 'prop-types'
import EntryForm from './EntryForm'
import RecordList from './RecordList'
import InfoBoard from './InfoBoard'
import GetRecords from './GetRecords'
import Import from './Import'
import ErrorPage from './ErrorPage'
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

					   	<ListGroupItem className={`${this.props.location.pathname == '/dashboard/manageRecords' ? 'active' : ''}`} bsClass="list">
					        <Link to={`${this.props.match.url}/manageRecords`}>
					            <i className="glyphicon glyphicon-lock"></i>
					            Manage Records
					        </Link>
					    </ListGroupItem>

				    	<ListGroupItem className={`${this.props.location.pathname == '/dashboard/getRecords' ? 'active' : ''}`} bsClass="list">
					        <Link to={`${this.props.match.url}/getRecords`}>
				             	<i className="glyphicon glyphicon-download"></i>
					            Get Records
					        </Link>
					    </ListGroupItem>

			        	<ListGroupItem className={`${this.props.location.pathname == '/dashboard/import' ? 'active' : ''}`} bsClass="list">
			    	        <Link to={`${this.props.match.url}/import`}>
			                 	<i className="glyphicon glyphicon-import"></i>
			    	            Import
			    	        </Link>
			    	    </ListGroupItem>
					</ListGroup>
				</nav>

				<Grid bsClass="container padding-2x">
					<Switch>
						<Route exact path={`${this.props.match.path}/addNewRecord`} render={(props) => <EntryForm {...props} showPageHead={true} />} />
						<Route exact path={`${this.props.match.path}/manageRecords`} component={RecordList} />
						<Route exact path={`${this.props.match.path}/getRecords`} component={GetRecords} />
						<Route exact path={`${this.props.match.path}/import`} component={Import} />
						<Route exact path={`${this.props.match.path}`} component={InfoBoard} />
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