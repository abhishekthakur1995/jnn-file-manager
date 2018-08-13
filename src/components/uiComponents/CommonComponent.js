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

export const InfoBlock = (props) => {
    return (
        <Grid bsClass="boxes">
            <Grid bsClass="info-box">
                <Grid componentClass="span" bsClass="info-box-icon bg-green">
                    <img></img>
                </Grid>
                <Grid bsClass="info-box-content">
                    <Grid componentClass="span" bsClass="info-box-text">{props.title}</Grid>
                    <Grid componentClass="span" bsClass="info-box-number">{props.value}</Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

InfoBlock.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string
}