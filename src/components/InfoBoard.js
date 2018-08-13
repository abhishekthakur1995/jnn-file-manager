import React from 'react'
import { Grid } from 'react-bootstrap'
import { InfoBlock } from './uiComponents/CommonComponent'

class InfoBoard extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Grid bsClass="InfoBoard">
				<InfoBlock title="Received" value="100" />
				<InfoBlock title="Approved" value="60" />
				<InfoBlock title="Pending" value="40" />
			</Grid>
		)
	}
}

export default InfoBoard