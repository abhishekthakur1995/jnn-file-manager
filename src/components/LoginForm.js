import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Button from 'react-validation/build/button'
import { Grid, FormGroup, ControlLabel, Row, Col } from 'react-bootstrap'
import { required, email } from './helpers/ValidationHelper'
import { Redirect } from 'react-router-dom'
import { userAuth } from './services/AuthService'
import AlertComponent from './uiComponents/AlertComponent'
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
		    message: {
		    	text: '',
		    	type: 'danger'
		    },
		    showAlert: false
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.hideAlert = this.hideAlert.bind(this)
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
		axios.post(`http://localhost:3001/login`, {
			email: this.state.fields.email,
			password: this.state.fields.password
		}).then(res => {
        	if (!_.isEmpty(res.data.token)) {
        		this.authenticate(res.data.token, res.data.validUpto)
        	} else {
        		this.setState({
  	        		message: {
  	        		 	text: res.data.message,
  	        		 	type: 'danger'
  	        		},
        			showAlert: true
  	      		})
        	}
      	})
  	}

  	authenticate(authToken, validUpto) {
  	    userAuth.authenticate(authToken, validUpto, () => {
      		this.setState({
  	        	redirectToReferrer: true
  	      	})
  	    })
  	}

  	hideAlert() {
  		this.setState({
        	showAlert: false
      	})
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
			        		<Col md={12}>
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
			        		<Col md={6}>
			        		    <Button type="submit" className="btn btn-default">Login</Button>
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