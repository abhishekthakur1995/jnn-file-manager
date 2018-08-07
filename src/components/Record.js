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
				<Button className="pet-delete btn btn-xs btn-success" onClick={this.handleApproveBtnClick}>
					<Grid componentClass="span" bsClass="glyphicon glyphicon-ok"></Grid>
				</Button>
			</ListGroupItem>
		)
	}
}

Record.propTypes = {
    singleRecord: PropTypes.object,
    onApprove: PropTypes.func,
    whichItem: PropTypes.object
}

export default Record