import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Grid } from 'react-bootstrap'

class AlertComponent extends React.Component {
    constructor(props) {
        super(props)
        this.handleDismiss = this.handleDismiss.bind(this)
    }

    handleDismiss() {
        this.props.hideAlert()
    }

    render() {
        return (
            <Grid className="alert-message">
                { !this.props.showAlert ? null :
                    <Alert bsStyle={this.props.message.type} onDismiss={this.handleDismiss}>
                        <p>{this.props.message.text}</p>
                    </Alert>
                }
            </Grid>
        )
    }
}

AlertComponent.propTypes = {
    message: PropTypes.object,
    showAlert: PropTypes.bool,
    hideAlert: PropTypes.func
}

export default AlertComponent