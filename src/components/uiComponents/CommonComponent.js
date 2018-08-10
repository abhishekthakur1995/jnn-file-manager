import React from 'react'
import { Grid } from 'react-bootstrap'
import PropTypes from 'prop-types'

export const PageHead = (props) => {
	return (
		<Grid bsClass="navbar">
            <Grid bsClass="container-fluid">
                <Grid bsClass="navbar-header">
                    <button type="button" id="sidebarCollapse" className="btn btn-info navbar-btn">
                        <span>{props.title}</span>
                    </button>
                </Grid>
            </Grid>
    	</Grid>
	)
}

PageHead.propTypes = {
	title: PropTypes.string
}