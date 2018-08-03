import React from 'react'
import axios from 'axios';
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
                buildingArea: '',
                fileNumber: '',
                remark: '',
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
        event.preventDefault()
        const headers = { 'Authorization': localStorage.getItem('authToken') }
        axios.post(`http://localhost:3001/addNewRecord`, {
            applicant_name: this.state.fields.applicantName,
            applicant_type: this.state.fields.applicantType,
            applicant_address: this.state.fields.applicantAddress,
            applicant_contact: this.state.fields.applicantContact,
            building_name: this.state.fields.buildingName,
            building_address: this.state.fields.buildingAddress,
            building_area: this.state.fields.buildingArea,
            file_number: this.state.fields.fileNumber,
            remark: this.state.fields.remark
        }, {headers}).then(res => {
            if (res.data.saved) {
                console.log("record saved")
            } else {
                // show error here
            }
        })
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
                                        value={this.state.fields.applicantContact}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup bsSize="large" >
                                    <ControlLabel htmlFor="buildingName">Building Name</ControlLabel>
                                    <FormControl
                                        type="text"
                                        autoComplete="on"
                                        name="buildingName"
                                        value={this.state.fields.buildingName}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup bsSize="large" >
                                    <ControlLabel htmlFor="buildingAddress">Building Address</ControlLabel>
                                    <FormControl
                                        type="text"
                                        autoComplete="on"
                                        name="buildingAddress"
                                        value={this.state.fields.buildingAddress}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup bsSize="large" >
                                    <ControlLabel htmlFor="buildingArea">Area</ControlLabel>
                                    <FormControl
                                    componentClass="select"
                                    name="buildingArea"
                                    value={this.state.fields.buildingArea}
                                    onChange={this.handleChange}>
                                        <option value="">Select</option>
                                        <option value="urban">Urban</option>
                                        <option value="rural">Rural</option>
                                    </FormControl>
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup bsSize="large" >
                                    <ControlLabel htmlFor="applicantType">Applicant Type</ControlLabel>
                                    <FormControl
                                    componentClass="select"
                                    name="applicantType"
                                    value={this.state.fields.applicantType}
                                    onChange={this.handleChange}>
                                        <option value="">Select</option>
                                        <option value="permanent">Permanent</option>
                                        <option value="temporary">Temporary</option>
                                    </FormControl>
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup bsSize="large" >
                                    <ControlLabel htmlFor="fileNumber">File Number</ControlLabel>
                                    <FormControl
                                        type="text"
                                        autoComplete="on"
                                        name="fileNumber"
                                        value={this.state.fields.fileNumber}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup bsSize="large" >
                                    <ControlLabel htmlFor="remark">Remark</ControlLabel>
                                    <FormControl
                                        type="textarea"
                                        autoComplete="on"
                                        name="remark"
                                        value={this.state.fields.remark}
                                        onChange={this.handleChange}
                                    />
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