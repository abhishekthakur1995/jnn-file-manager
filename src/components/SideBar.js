import React from 'react'
import Import from './Import'
import PropTypes from 'prop-types'
import EntryForm from './EntryForm'
import InfoBoard from './InfoBoard'
import ErrorPage from './ErrorPage'
import RecordList from './RecordList'
import GetRecords from './GetRecords'
import { USERS } from './helpers/Constants'
import { FormattedMessage } from 'react-intl'
import ManageSystemInputs from './ManageSystemInputs'
import { Link, Route, Switch } from 'react-router-dom'
import { Grid, ListGroup, ListGroupItem } from 'react-bootstrap'
import { userAuth, SystemUserRoute, SystemAdminRoute } from './services/AuthService'

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
						    <ListGroupItem className={`${this.props.location.pathname == '/servicePanel/fileManager/addNewRecord' ? 'active' : ''}`} bsClass="list">
						        <Link to={`${this.props.match.url}/addNewRecord`}>
						            <i className="glyphicon glyphicon-file"></i>
						            <FormattedMessage id="fileManager.sidebar.addNewRecord"
						             	defaultMessage="Add New Record" />
						        </Link>
						    </ListGroupItem>

						   	<ListGroupItem className={`${this.props.location.pathname == '/servicePanel/fileManager/manageRecords' ? 'active' : ''}`} bsClass="list">
						        <Link to={`${this.props.match.url}/manageRecords`}>
						            <i className="glyphicon glyphicon-lock"></i>
						            <FormattedMessage id="fileManager.sidebar.manageRecords"
						             	defaultMessage="Manage Records" />
						        </Link>
						    </ListGroupItem>

					    	<ListGroupItem className={`${this.props.location.pathname == '/servicePanel/fileManager/getRecords' ? 'active' : ''}`} bsClass="list">
						        <Link to={`${this.props.match.url}/getRecords`}>
					             	<i className="glyphicon glyphicon-download"></i>
						            <FormattedMessage id="fileManager.sidebar.getRecords"
						             	defaultMessage="Get Records" />
						        </Link>
						    </ListGroupItem>

				        	<ListGroupItem className={`${this.props.location.pathname == '/servicePanel/fileManager/import' ? 'active' : ''}`} bsClass="list">
				    	        <Link to={`${this.props.match.url}/import`}>
				                 	<i className="glyphicon glyphicon-import"></i>
				    	            <FormattedMessage id="fileManager.sidebar.importExcel"
				    	             	defaultMessage="Import Excel" />
				    	        </Link>
				    	    </ListGroupItem>
						</ListGroup>
					}

					{userAuth.getUserRole() === USERS.SYSADMIN &&
						<ListGroup componentClass="ul" className="list-unstyled components">
						    <ListGroupItem className={`${this.props.location.pathname == '/servicePanel/fileManager/manageSystemInputs' ? 'active' : ''}`} bsClass="list">
						        <Link to={`${this.props.match.url}/manageSystemInputs`}>
						            <i className="glyphicon glyphicon-cog"></i>
						            Manage System Inputs
						        </Link>
						    </ListGroupItem>
						</ListGroup>
					}
				</nav>

				<Grid bsClass="app-background">
					<Switch>
						<SystemUserRoute exact path={`${this.props.match.path}/addNewRecord`} component={EntryForm} />
						<SystemUserRoute exact path={`${this.props.match.path}/manageRecords`} component={RecordList} />
						<SystemUserRoute exact path={`${this.props.match.path}/getRecords`} component={GetRecords} />
						<SystemUserRoute exact path={`${this.props.match.path}/import`} component={Import} />
						<SystemAdminRoute exact path={`${this.props.match.path}/manageSystemInputs`} component={ManageSystemInputs} />
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