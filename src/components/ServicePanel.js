import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Panel } from 'react-bootstrap'
import { GetModuleLogo } from './uiComponents/CommonComponent'
import dashboardIcon from './../../public/img/dashboard.png'
import fileRecordModuleLogo from './../../public/img/FileRecord.png'
import letterTrackingModuleLogo from './../../public/img/LetterTracking.png'

class ServicePanel extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Panel bsStyle="primary" className="margin-top-2x margin-left-2x margin-right-3x">
	    		<Panel.Heading>
	    			<Panel.Title componentClass="h3">
	    				<img className="margin-right-1x" src={dashboardIcon} /> Service Dashboard
	    			</Panel.Title>
	    		</Panel.Heading>
			    <Panel.Body>
		    		<Grid>
		    			<Grid className="padding-vert-5x">
		    				<GetModuleLogo title="File Record Manger" logo={fileRecordModuleLogo} moduleUrl={`${this.props.match.url}/fileManager`} />
		    				<GetModuleLogo title="Letter Tracking" logo={letterTrackingModuleLogo} moduleUrl={`${this.props.match.url}/letterTracking`} />
		    			</Grid>
		    		</Grid>
			    </Panel.Body>
		  	</Panel>
		)
	}
}

ServicePanel.propTypes = {
    match: PropTypes.object
}

export default ServicePanel