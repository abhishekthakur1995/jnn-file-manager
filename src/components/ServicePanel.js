import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Panel, Row, Col } from 'react-bootstrap'
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
			<Panel bsStyle="primary" id="service-panel">
	    		<Panel.Heading>
	    			<Panel.Title componentClass="h3">
	    				<img className="margin-right-1x" src={dashboardIcon} /> Service Dashboard
	    			</Panel.Title>
	    		</Panel.Heading>
			    <Panel.Body>
			    		<Col xs={6}>
	    					<GetModuleLogo title="File Record Manager" logo={fileRecordModuleLogo} moduleUrl={`${this.props.match.url}/fileManager`} />
	    				</Col>

	    				<Col xs={6}>
	    					<GetModuleLogo title="Letter Tracking" logo={letterTrackingModuleLogo} moduleUrl={`${this.props.match.url}/letterTracking`} />
	    				</Col>
			    </Panel.Body>
		  	</Panel>
		)
	}
}

ServicePanel.propTypes = {
    match: PropTypes.object
}

export default ServicePanel