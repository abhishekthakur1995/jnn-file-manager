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
                    <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                        <p>{this.props.message}</p>
                    </Alert>
                }
            </Grid>
        )
    }
}

AlertComponent.propTypes = {
    message: PropTypes.string,
    showAlert: PropTypes.bool,
    hideAlert: PropTypes.func
}

export default AlertComponent