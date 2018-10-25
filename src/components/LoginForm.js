import React from 'react'
import _ from 'underscore'
import config from 'config'
import Alert from 'react-s-alert'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Button from 'react-validation/build/button'
import { userAuth } from './services/AuthService'
import { LoginService } from './services/ApiServices'
import { required, email } from './helpers/ValidationHelper'
import { Grid, FormGroup, ControlLabel, Row, Col, Glyphicon } from 'react-bootstrap'
import loginImg from '../../public/img/loginImg.jpg'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'

class LoginForm extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
		    fields: {
		        email: '',
		        password: ''
		    },
		    redirectToReferrer: false
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	UNSAFE_componentWillMount() {
		if (userAuth.isUserAuthenticated()) {
			this.setState({redirectToReferrer: true})
		}
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

  	handleSubmit(event) {
		event.preventDefault()
		const loginData = {
			email: this.state.fields.email,
			password: this.state.fields.password
		}
		LoginService.login(loginData).then((res) => {
			if (!_.isEmpty(res.data.token)) {
			    userAuth.authenticate(res.data.token, res.data.validUpto, () => {
			    	localStorage.setItem('userRole', res.data.userRole)
			    	this.setState({ redirectToReferrer: true })
			    })
        	}
		}).catch(err => {
			Alert.error(err.response.data.message, config.alertGlobalSettings)
		})
  	}

	render() {
		const { redirectToReferrer } = this.state
	    if (redirectToReferrer === true) {
	      	return <Redirect to='/servicePanel' />
	    }
		return (
			<Grid bsClass="login-form-new">
				<Alert stack={{limit: 3}} html={true} />
				<Grid bsClass="login-title">
					<Grid componentClass="p" bsClass="bold text-align-center fs33">
						<FormattedMessage id="common.loginForm.moduleTitle" defaultMessage="Record Management System" />
					</Grid>
				</Grid>
				<Grid componentClass="section" bsClass="four-col">
			    	<Row>
				        <Col xs={6}>
				            <img src={loginImg} className="img-width" alt="Background" />
				        </Col>
				        <Col xs={6}>
				        	<Grid bsClass="mt50"></Grid>
				        	<Form onSubmit={this.handleSubmit}>
					            <Col xs={12}>
					            	<Col xs={8}>
	                    			    <FormGroup md={4} bsSize="large">
	                    			        <ControlLabel htmlFor="email">
	                    			        	<FormattedMessage id="common.loginForm.emailField" defaultMessage="Email" />
	                    			        </ControlLabel>
                        			        <Input
                        			            type="email"
                        			            autoComplete="on"
                        			            name="email"
                        			            validations={[required, email]}
                        			            className="form-control"
                        			            value={this.state.fields.email}
                        			            onChange={this.handleChange}
                        			        />
	                    			    </FormGroup>
					                </Col>

					                <Col xs={8}>
                        			    <FormGroup md={4} bsSize="large">
                        			        <ControlLabel htmlFor="password">
                        			        	<FormattedMessage id="common.loginForm.passwordField" defaultMessage="Password" />
                        			        </ControlLabel>
                        			        <Input
                        			            type="password"
                        			            autoComplete="on"
                        			            name="password"
                        			            validations={[required]}
                        			            className="form-control"
                        			            value={this.state.fields.password}
                        			            onChange={this.handleChange}
                        			        />
                        			    </FormGroup>
				                    </Col>

				                    <Col xs={8}>
				                        <Button type="submit" className="btn btn-default btn-block">
                            		    	<Glyphicon className="padding-right-1x" glyph="log-in" />
                            		    	<FormattedMessage id="common.loginForm.loginBtn" defaultMessage="Login" />
                            		    </Button>
				                    </Col>
					            </Col>
					        </Form>
				        </Col>
				    </Row>
				</Grid>
			</Grid>
		)
	}
}

LoginForm.propTypes = {
    callbackFromParent: PropTypes.func
}

export default LoginForm