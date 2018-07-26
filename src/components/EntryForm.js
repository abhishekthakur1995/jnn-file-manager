import React from 'react'
import { Form, Button, Grid, FormGroup, ControlLabel, FormControl, Row, Col, Label } from 'react-bootstrap'

class EntryForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: {
                applicantName: '',
                applicantType: '',
                applicantAddress: '',
                applicantContact: '',
                buildingName: '',
                buildingAddress: '',
                area:'',
            }
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.myRef = new Array({ length: 7 }, React.createRef())
        // console.log(this.myRef)
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
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <Grid>
                <Row>
                    <section className="col-xs-12">
                        <Form onSubmit={this.handleSubmit}>
                            <Col md={4}>
                                <FormGroup md={4} bsSize="large" >
                                    <ControlLabel htmlFor="applicantName">Applicant Name</ControlLabel>
                                    <FormControl
                                        type="text"
                                        autoComplete="on"
                                        name="applicantName"
                                        ref={this.myRef.applicantName}
                                        value={this.state.fields.applicantName}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup bsSize="large" >
                                    <ControlLabel htmlFor="applicantAddress">Applicant Address</ControlLabel>
                                    <FormControl
                                        type="text"
                                        autoComplete="on"
                                        name="applicantAddress"
                                        ref={this.myRef.applicantAddress}
                                        value={this.state.fields.applicantAddress}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup bsSize="large" >
                                    <ControlLabel htmlFor="applicantContact">Applicant Contact</ControlLabel>
                                    <FormControl
                                        type="text"
                                        autoComplete="on"
                                        name="applicantContact"
                                        ref={this.myRef.applicantContact}
                                        value={this.state.fields.applicantContact}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup bsSize="large" >
                                    <ControlLabel htmlFor="applicantContact">Building Name</ControlLabel>
                                    <FormControl
                                        type="text"
                                        autoComplete="on"
                                        name="buildingName"
                                        ref={this.myRef.buildingName}
                                        value={this.state.fields.buildingName}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup bsSize="large" >
                                    <ControlLabel htmlFor="applicantContact">Building Address</ControlLabel>
                                    <FormControl
                                        type="text"
                                        autoComplete="on"
                                        name="buildingAddress"
                                        ref={this.myRef.buildingAddress}
                                        value={this.state.fields.buildingAddress}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup bsSize="large" >
                                    <ControlLabel htmlFor="applicantContact">Area</ControlLabel>
                                    <FormControl
                                    componentClass="select"
                                    name="area"
                                    ref={this.myRef.area}
                                    value={this.state.fields.area}
                                    onChange={this.handleChange}>
                                        <option value="">Select</option>
                                        <option value="urban">Urban</option>
                                        <option value="rural">Rural</option>
                                    </FormControl>
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup bsSize="large" >
                                    <ControlLabel htmlFor="applicantContact">Applicant Type</ControlLabel>
                                    <FormControl
                                    componentClass="select"
                                    name="applicantType"
                                    ref={this.myRef.applicantType}
                                    value={this.state.fields.applicantType}
                                    onChange={this.handleChange}>
                                        <option value="">Select</option>
                                        <option value="urban">Permanent</option>
                                        <option value="rural">Temporary</option>
                                    </FormControl>
                                </FormGroup>
                            </Col>

                            <Col md={12}>
                                <Button type="submit" className="btn btn-default">Submit</Button>
                            </Col>
                        </Form>
                    </section>
                </Row>
            </Grid>
        )
    }
}

export default EntryForm