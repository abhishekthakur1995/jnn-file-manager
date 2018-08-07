import React from 'react'
import { Grid, ListGroupItem } from 'react-bootstrap'
import PropTypes from 'prop-types'

class Record extends React.Component {
	render() {
		return (
			<ListGroupItem>
				<Grid bsClass="record-info">
					<Grid componentClass="span"> {this.props.singleRecord.BUILDING_NAME} </Grid>
					<Grid componentClass="span"> {this.props.singleRecord.BUILDING_ADDRESS} </Grid>
				</Grid>
				<Grid bsClass="record-action">
					Approve
				</Grid>
			</ListGroupItem>
		)
	}
}

Record.propTypes = {
    singleRecord: PropTypes.object
}

export default Record