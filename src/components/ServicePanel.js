import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class ServicePanel extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<Link to={`${this.props.match.url}/fileManager`}>
		            File Manager
		        </Link>

        		<Link to={`${this.props.match.url}/letterTracking`}>
                    Letter Tracking
                </Link>
			</div>
		)
	}
}

ServicePanel.propTypes = {
    match: PropTypes.object
}

export default ServicePanel