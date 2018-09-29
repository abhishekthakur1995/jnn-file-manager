import React from 'react'
import _ from 'underscore'
import PropTypes from 'prop-types'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Button from 'react-validation/build/button'
import { Redirect } from 'react-router-dom'
import { userAuth } from './services/AuthService'
import { LoginService } from './services/ApiServices'
import AlertComponent from './uiComponents/AlertComponent'
import { required, email } from './helpers/ValidationHelper'
import { Grid, FormGroup, ControlLabel, Row, Col, InputGroup, Glyphicon } from 'react-bootstrap'

class LoginForm extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
		    fields: {
		        email: '',
		        password: ''
		    },
		    redirectToReferrer: false,
		    alertOptions: {
		    	text: '',
		    	type: 'danger',
		    	autoHide: false
		    },
		    showAlert: false
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.hideAlert = this.hideAlert.bind(this)
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
        		localStorage.setItem('userRole', res.data.userRole)
        		this.authenticate(res.data.token, res.data.validUpto)
        	} else {
        		this.setState({
  	        		alertOptions: {
  	        		 	text: res.data.message,
  	        		 	type: 'danger',
  	        		 	autoHide: true
  	        		},
        			showAlert: true
  	      		})
        	}
		})
  	}

  	authenticate(authToken, validUpto) {
  	    userAuth.authenticate(authToken, validUpto, () => {
      		this.setState({ redirectToReferrer: true })
  	    })
  	}

  	hideAlert() {
        this.setState({ 
            showAlert: false ,
            alertOptions: {'autoHide': false}
        })
    }

	render() {
		const { redirectToReferrer } = this.state
	    if (redirectToReferrer === true) {
	      	return <Redirect to='/servicePanel' />
	    }
		return (
			<Grid id="login-form" className="mt50">
			    <Row>
			    	<AlertComponent options={this.state.alertOptions} showAlert={this.state.showAlert} hideAlert={this.hideAlert}/>
			        <section className="col-xs-6 col-xs-offset-3">
			        	<Form onSubmit={this.handleSubmit}>
			        		<Col md={12}>
		        			    <FormGroup md={4} bsSize="large">
		        			        <ControlLabel htmlFor="email">Email</ControlLabel>
    	        			        <InputGroup>
            			              	<InputGroup.Addon>@</InputGroup.Addon>
			        			        <Input
			        			            type="email"
			        			            autoComplete="on"
			        			            name="email"
			        			            validations={[required, email]}
			        			            className="form-control"
			        			            value={this.state.fields.email}
			        			            onChange={this.handleChange}
			        			        />
			        			    </InputGroup>
		        			    </FormGroup>
			        		</Col>
			        		<Col md={12}>
		        			    <FormGroup md={4} bsSize="large">
		        			        <ControlLabel htmlFor="password">Password</ControlLabel>
		        			        <InputGroup>
	        			              	<InputGroup.Addon>
	        			              		<Glyphicon glyph="lock" />
	        			              	</InputGroup.Addon>
			        			        <Input
			        			            type="password"
			        			            autoComplete="on"
			        			            name="password"
			        			            validations={[required]}
			        			            className="form-control"
			        			            value={this.state.fields.password}
			        			            onChange={this.handleChange}
			        			        />
			        			    </InputGroup>
		        			    </FormGroup>
			        		</Col>
			        		<Col md={12}>
			        		    <Button type="submit" className="btn btn-default btn-block">
			        		    	<Glyphicon className="padding-right-1x" glyph="log-in" />Login
			        		    </Button>
			        		</Col>
			        	</Form>
			        </section>
			    </Row>
			</Grid>
		)
	}
}

LoginForm.propTypes = {
    callbackFromParent: PropTypes.func
}

export default LoginForm