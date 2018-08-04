import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap'

class AlertComponent extends React.Component {
    constructor(props) {
        super(props)
        this.handleDismiss = this.handleDismiss.bind(this)
        this.state = {
            show: false
        }
    }

    handleDismiss() {
        this.setState({ show: false })
    }

    render() {
        return (
            <div className="alert-message">
                { !this.state.show ? null :
                    <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                        <p>{this.props.message}</p>
                    </Alert>
                }
            </div>
        )
    }
}

AlertComponent.propTypes = {
    message: PropTypes.string
}

export default AlertComponent