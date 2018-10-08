import React from 'react'
import { Grid } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class ErrorPage extends React.Component {
	render() {
	    return (
	        <Grid bsClass="error-page">
	        	<Grid id="notfound">
	        		<Grid bsClass="notfound">
	        			<Grid bsClass="notfound-404">
	        				<h1>404</h1>
	        			</Grid>
	        			<h2>Oops! This Page Could Not Be Found</h2>
	        			<p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
	        			<Link to="/servicePanel">Go Back To Dashboard</Link>
	        		</Grid>
	        	</Grid>
        	</Grid>
	    )
	}
}

export default ErrorPage