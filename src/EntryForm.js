import React from 'react'
import './css/style.css'
import { Button, Grid, FormGroup, ControlLabel, FormControl, Row, Col, Label } from 'react-bootstrap'

class EntryForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            applicantName: '',
            applicantType: '',
            applicantAddress: '',
            applicantContact: '',
            buildingName: '',
            buildingAddress: '',
            area:'',
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            applicantName: this.refs.applicantName.value,
            applicantType: this.refs.applicantType.value,
            applicantAddress: this.refs.applicantAddress.value,
            applicantContact: this.refs.applicantContact.value,
            buildingName: this.refs.buildingName.value,
            buildingAddress: this.refs.buildingAddress.value,
            area: this.refs.area.value
        });
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
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup bsSize="small" >
                                <ControlLabel htmlFor="applicantName">Applicant Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    autoComplete="on"
                                    name="applicantName"
                                    ref="applicantName"
                                    value={this.state.applicantName}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup bsSize="small" >
                                <ControlLabel htmlFor="applicantAddress">Applicant Address</ControlLabel>
                                <FormControl
                                    type="text"
                                    autoComplete="on"
                                    name="applicantAddress"
                                    ref="applicantAddress"
                                    value={this.state.applicantAddress}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup bsSize="small" >
                                <ControlLabel htmlFor="applicantContact">Applicant Contact</ControlLabel>
                                <FormControl
                                    type="text"
                                    autoComplete="on"
                                    name="applicantContact"
                                    ref="applicantContact"
                                    value={this.state.applicantContact}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup bsSize="small" >
                                <ControlLabel htmlFor="applicantContact">Building Name</ControlLabel>
                                <FormControl
                                    type="text"
                                    autoComplete="on"
                                    name="buildingName"
                                    ref="buildingName"
                                    value={this.state.buildingName}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup bsSize="small" >
                                <ControlLabel htmlFor="applicantContact">Building Address</ControlLabel>
                                <FormControl
                                    type="text"
                                    autoComplete="on"
                                    name="buildingAddress"
                                    ref="buildingAddress"
                                    value={this.state.buildingAddress}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>

                            <FormGroup bsSize="small" >
                                <ControlLabel htmlFor="applicantContact">Area</ControlLabel>
                                <FormControl
                                componentClass="select"
                                name="area"
                                ref="area"
                                value={this.state.area}
                                onChange={this.handleChange}>
                                    <option value="">Select</option>
                                    <option value="urban">Urban</option>
                                    <option value="rural">Rural</option>
                                </FormControl>
                            </FormGroup>

                            <FormGroup bsSize="small" >
                                <ControlLabel htmlFor="applicantContact">Applicant Type</ControlLabel>
                                <FormControl
                                componentClass="select"
                                name="applicantType"
                                ref="applicantType"
                                value={this.state.applicantType}
                                onChange={this.handleChange}>
                                    <option value="">Select</option>
                                    <option value="urban">Permanent</option>
                                    <option value="rural">Temporary</option>
                                </FormControl>
                            </FormGroup>

                            <Button type="submit" className="btn btn-default">Submit</Button>
                        </form>
                    </section>
                </Row>
            </Grid>
        )
    }
}

export default EntryForm