import React from 'react'
import { Grid, ListGroupItem, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

class Record extends React.Component {
	constructor(props) {
		super(props)
		this.handleApproveBtnClick = this.handleApproveBtnClick.bind(this)
	}

	handleApproveBtnClick() {
	  this.props.onApprove(this.props.whichItem)
	}

	render() {
		return (
			<ListGroupItem>
				<Grid bsClass="record-info">
					<Grid componentClass="span" bsClass="item"> {this.props.singleRecord.BUILDING_NAME} </Grid>
					<Grid componentClass="span" bsClass="item"> {this.props.singleRecord.BUILDING_ADDRESS} </Grid>
				</Grid>
				<Button className={`btn btn-xs ${this.props.singleRecord.FILE_STATUS == 0 ? 'btn-success' : 'btn-danger'}`} onClick={this.handleApproveBtnClick}>
					{this.props.singleRecord.FILE_STATUS == 0 ? 'Approve' : 'Reject'}
				</Button>
			</ListGroupItem>
		)
	}
}

Record.propTypes = {
    singleRecord: PropTypes.object,
    whichItem: PropTypes.object,
    onApprove: PropTypes.func
}

export default Record