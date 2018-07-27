import React, { Component } from 'react'
import { Form, Button, Grid, FormGroup, ControlLabel, FormControl, Row, Col, Label } from 'react-bootstrap'

class LoginForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
		    fields: {
		        email: '',
		        password: ''
		    }
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
        const element = event.nativeEvent.target;
        this.setState((prevState) => ({
            ...prevState,
            fields: {
                ...prevState.fields,
                [element.name]: element.value
            }
        }));
    }

  	handleSubmit(event) {
		event.preventDefault();
  	}

	render() {
		return (
			<Grid>
			    <Row>
			        <section className="col-xs-6">
			        	<Form onSubmit={this.handleSubmit}>
			        		<Col md={12}>
		        			    <FormGroup md={4} bsSize="large" >
		        			        <ControlLabel htmlFor="email">Email</ControlLabel>
		        			        <FormControl
		        			            type="text"
		        			            autoComplete="on"
		        			            name="email"
		        			            value={this.state.fields.email}
		        			            onChange={this.handleChange}
		        			        />
		        			    </FormGroup>
			        		</Col>
			        		<Col md={12}>
		        			    <FormGroup md={4} bsSize="large" >
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

export default LoginForm