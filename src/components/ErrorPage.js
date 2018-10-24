import React from 'react'
import { Grid } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

class ErrorPage extends React.Component {
	render() {
	    return (
	        <Grid bsClass="error-page">
	        	<Grid id="notfound">
	        		<Grid bsClass="notfound">
	        			<Grid bsClass="notfound-404">
	        				<Grid componentClass="h1" bsClass="">404</Grid>
	        			</Grid>
	        			<Grid componentClass="h2" bsClass="">
	        				<FormattedMessage id="common.errorPage.msg1" defaultMessage="Oops! This Page Could Not Be Found" />
	        			</Grid>
	        			<Grid componentClass="p" bsClass="">
	        				<FormattedMessage id="common.errorPage.msg2" defaultMessage="Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable" />
        				</Grid>
	        			<Link to="/servicePanel">
	        				<FormattedMessage id="common.errorPage.msg3" defaultMessage="Go Back To Service Panel" />
	        			</Link>
	        		</Grid>
	        	</Grid>
        	</Grid>
	    )
	}
}

export default ErrorPage