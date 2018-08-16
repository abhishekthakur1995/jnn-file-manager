import React from 'react'
import { Grid } from 'react-bootstrap'

class ErrorPage extends React.Component {
	render() {
	    return (
	        <Grid className="jumbotron text-align-center">
	            <h1 className="display-3">404</h1>
	        </Grid>
	    )
	}
}
export default ErrorPage