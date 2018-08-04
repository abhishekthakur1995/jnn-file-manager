import React from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import AlertComponent from './uiComponents/AlertComponent.js'
import { Form, Button, Grid, FormGroup, ControlLabel, FormControl, Row, Col, Label } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { userAuth } from './services/AuthService.js'
import _ from 'lodash'

class LoginForm extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
		    fields: {
		        email: '',
		        password: ''
		    },
		    redirectToReferrer: false,
		    message: '',
		    showAlert: false
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.hideAlert = this.hideAlert.bind(this)
	}

	handleChange(event) {
        const element = event.nativeEvent.target;
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
		axios.post(`http://localhost:3001/login`, {
			email: this.state.fields.email,
			password: this.state.fields.password
		}).then(res => {
        	if (!_.isEmpty(res.data.token)) {
        		this.authenticate(res.data.token)
        	} else {
        		this.setState(() => ({
  	        		message: res.data.message,
  	        		showAlert: true
  	      		}))
        	}
      	})
  	}

  	authenticate(authToken) {
  	    userAuth.authenticate(authToken, () => {
      		this.setState(() => ({
  	        	redirectToReferrer: true
  	      	}))
  	    })
  	}

  	hideAlert() {
  		this.setState(() => ({
        	showAlert: false
      	}))
  	}

	render() {
		const { redirectToReferrer } = this.state
	    if (redirectToReferrer === true) {
	      	return <Redirect to='/dashboard' />
	    }
		return (
			<Grid>
			    <Row>
			    	<AlertComponent message={this.state.message} showAlert={this.state.showAlert} hideAlert={this.hideAlert}/>
			        <section className="col-xs-6">
			        	<Form onSubmit={this.handleSubmit}>
			        		<Col md={12}>
		        			    <FormGroup md={4} bsSize="large">
		        			        <ControlLabel htmlFor="email">Email</ControlLabel>
		        			        <FormControl
		        			            type="email"
		        			            autoComplete="on"
		        			            name="email"
		        			            value={this.state.fields.email}
		        			            onChange={this.handleChange}
		        			        />
		        			        <FormControl.Feedback />
		        			    </FormGroup>
			        		</Col>
			        		<Col md={12}>
		        			    <FormGroup md={4} bsSize="large">
		        			        <ControlLabel htmlFor="password">Password</ControlLabel>
		        			        <FormControl
		        			            type="password"
		        			            autoComplete="on"
		        			            name="password"
		        			            value={this.state.fields.password}
		        			            onChange={this.handleChange}
		        			        />
		        			    </FormGroup>
			        		</Col>
			        		<Col md={6}>
			        		    <Button type="submit" className="btn btn-default">Submit</Button>
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