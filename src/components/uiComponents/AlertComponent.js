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
        if (this.props.options.autoHide) {
            setTimeout(function() {
                this.props.hideAlert()
            }.bind(this), 5000)
        }
        return (
            <Grid bsClass="alert-message">
                { !this.props.showAlert ? null :
                    <Alert bsStyle={this.props.options.type} onDismiss={this.handleDismiss}>
                        <p>{this.props.options.text}</p>
                    </Alert>
                }
            </Grid>
        )
    }
}

AlertComponent.propTypes = {
    options: PropTypes.object,
    showAlert: PropTypes.bool,
    hideAlert: PropTypes.func
}

export default AlertComponent