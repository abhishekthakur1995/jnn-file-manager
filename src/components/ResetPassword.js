import React from 'react'
import config from 'config'
import Alert from 'react-s-alert'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Button from 'react-validation/build/button'
import { Common } from './helpers/CommonHelper'
import { required } from './helpers/ValidationHelper'
import { ResetPasswordService, NavBarService } from './services/ApiServices'
import { Grid, FormGroup, ControlLabel, Row, Col, Label, Glyphicon } from 'react-bootstrap'

class ResetPassword extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			fields: {
				'currentPassword': '',
				'newPassword': '',
				'confirmNewPassword': ''
			},
			redirectToHome: false
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.logoutUser = this.logoutUser.bind(this)
	}

	handleSubmit(event) {
		event.preventDefault()
		const data = {
			currentPassword: this.state.fields.currentPassword,
			newPassword: this.state.fields.newPassword,
			confirmNewPassword: this.state.fields.confirmNewPassword,
		}
		ResetPasswordService.resetPassword(data).then((res) => {
			Alert.success(res.data.message, {
				...config.alertGlobalSettings,
				timeout: 3000,
				onClose: function() {
					this.logoutUser()
				}.bind(this)
			})
		}).catch(err => {
			Alert.error(err.response.data.message, config.alertGlobalSettings)
		})
	}

	logoutUser() {
		NavBarService.logout().then((response) => {
			if (response.data.success === true) {
				Common.clearLocalStorageData()
				this.setState({ redirectToHome: true })
			}
		})
	}

	handleChange(event) {
		const element = event.nativeEvent.target
	        this.setState((prevState) => ({
	            ...prevState,
	            fields: {
	                ...prevState.fields,
	                [element.name]: element.value
	            }
	        }))
	}

	render() {
		const { redirectToHome } = this.state
	    if (redirectToHome === true) {
	      	return (
	      		<Redirect to='/' />
      		)
	    }
		return (
			<Grid bsClass="reset-password">
				<Grid bsClass="nest">
					<Row className="reset-password-container bg-white green-top">
						<Grid bsClass="nest">
							<Alert stack={{limit: 3}} html={true} />
							<Grid componentClass="section" bsClass="col-xs-12 margin-top-2x">
							    <Form onSubmit={this.handleSubmit}>
							    	<fieldset className="custom-fieldset margin-bottom-2x">
								    	<legend className="custom-legend">
								    	    <Label bsStyle="primary" className="padding-2x">Reset Password</Label>
								    	</legend>

								    	<Col xs={12}>
								    	    <FormGroup className="required">
								    	        <ControlLabel htmlFor="currentPassword">Current Password</ControlLabel>
								    	        <Input
								    	            type="password"
								    	            autoComplete="on"
								    	            name="currentPassword"
								    	            validations={[required]}
								    	            className="form-control"
								    	            value={this.state.currentPassword}
								    	            onChange={this.handleChange}
								    	        />
								    	    </FormGroup>
								    	</Col>

								    	<Col xs={12}>
								    	    <FormGroup className="required">
								    	        <ControlLabel htmlFor="newPassword">New Password</ControlLabel>
								    	        <Input
								    	            type="password"
								    	            autoComplete="on"
								    	            name="newPassword"
								    	            validations={[required]}
								    	            className="form-control"
								    	            value={this.state.newPassword}
								    	            onChange={this.handleChange}
								    	        />
								    	    </FormGroup>
								    	</Col>

								    	<Col xs={12}>
								    	    <FormGroup className="required">
								    	        <ControlLabel htmlFor="confirmNewPassword">Confirm New Password</ControlLabel>
								    	        <Input
								    	            type="password"
								    	            autoComplete="on"
								    	            name="confirmNewPassword"
								    	            validations={[required]}
								    	            className="form-control"
								    	            value={this.state.confirmNewPassword}
								    	            onChange={this.handleChange}
								    	        />
								    	    </FormGroup>
								    	</Col>
							    	</fieldset>

						    	    <Col className="padding-0x margin-bottom-2x" md={12}>
						    	        <Button type="submit" className="btn btn-default green-btn pull-right">
						    	            <Glyphicon className="padding-right-1x" glyph="refresh" />Reset Password
						    	        </Button>
						    	    </Col>
							    </Form>
							</Grid>
						</Grid>
					</Row>
				</Grid>
			</Grid>
		)
	}
}

ResetPassword.propTypes = {
    doRedirectToHome: PropTypes.func
}

export default ResetPassword