import React from 'react'
import _ from 'underscore'
import config from 'config'
import Alert from 'react-s-alert'
import PropTypes from 'prop-types'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Button from 'react-validation/build/button'
import { Redirect } from 'react-router-dom'
import { userAuth } from './services/AuthService'
import { LoginService } from './services/ApiServices'
import { required, email } from './helpers/ValidationHelper'
import { Grid, FormGroup, ControlLabel, Row, Col, InputGroup, Glyphicon } from 'react-bootstrap'
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
		this.redirectUserToDashboard = this.redirectUserToDashboard.bind(this)
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
			    	Alert.success(res.data.message, {
			    		...config.alertGlobalSettings,
			    		timeout: 3000,
			    		onClose: function() {
			    			this.redirectUserToDashboard()
			    		}.bind(this)
			    	})
			    })
        	}
		}).catch(err => {
			Alert.error(err.response.data.message, config.alertGlobalSettings)
		})
  	}

  	redirectUserToDashboard() {
  		this.setState({ redirectToReferrer: true })
  	}

	render() {
		const { redirectToReferrer } = this.state
	    if (redirectToReferrer === true) {
	      	return <Redirect to='/servicePanel' />
	    }
		return (
			<Grid bsClass="login-form-new">
				<Alert stack={{limit: 3}} html={true} />
				<Grid bsClass="login-title">Login</Grid>
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
	                    			        <ControlLabel htmlFor="email">Email</ControlLabel>
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
                        			        <ControlLabel htmlFor="password">Password</ControlLabel>
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
                            		    	<Glyphicon className="padding-right-1x" glyph="log-in" />Login
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