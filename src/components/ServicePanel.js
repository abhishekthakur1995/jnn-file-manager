import React from 'react'
import PropTypes from 'prop-types'
import { Panel, Col } from 'react-bootstrap'
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl'
import { GetModuleLogo } from './uiComponents/CommonComponent'
import fileRecordModuleLogo from './../../public/img/FileRecord.png'
import letterTrackingModuleLogo from './../../public/img/LetterTracking.png'

const messages = defineMessages({
    fileRecordTitle: {
		id: 'common.servicePanel.fileRecordTitle',
        defaultMessage: 'File Record Manager'
    },
    letterRecordTitle: {
		id: 'common.servicePanel.letterRecordTitle',
        defaultMessage: 'Letter Tracking'
    }
})

class ServicePanel extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const { intl } = this.props
		return (
			<Panel bsStyle="primary" id="service-panel">
	    		<Panel.Heading>
	    			<Panel.Title componentClass="h3" className="text-align-center fs33">
	    				<FormattedMessage id="common.servicePanel.title" defaultMessage="Service Dashboard" />
	    			</Panel.Title>
	    		</Panel.Heading>
			    <Panel.Body>
			    		<Col xs={6}>
	    					<GetModuleLogo title={intl.formatMessage(messages.fileRecordTitle)} logo={fileRecordModuleLogo} moduleUrl={`${this.props.match.url}/fileManager`} />
	    				</Col>

	    				<Col xs={6}>
	    					<GetModuleLogo title={intl.formatMessage(messages.letterRecordTitle)} logo={letterTrackingModuleLogo} moduleUrl={`${this.props.match.url}/letterTracking`} />
	    				</Col>
			    </Panel.Body>
		  	</Panel>
		)
	}
}

ServicePanel.propTypes = {
    match: PropTypes.object,
    intl: PropTypes.object
}

export default injectIntl(ServicePanel)