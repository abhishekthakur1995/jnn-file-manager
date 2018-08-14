import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Button from 'react-validation/build/button'
import Select from 'react-validation/build/select'
import Textarea from 'react-validation/build/textarea'
import AlertComponent from './uiComponents/AlertComponent'
import { Grid, FormGroup, ControlLabel, Row, Col, Clearfix, Glyphicon } from 'react-bootstrap'
import { required, phoneNumber } from './helpers/ValidationHelper'
import { PageHead } from './uiComponents/CommonComponent'

class EntryForm extends React.Component {
    constructor(props) {
        super(props)

        // state
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
            },
            alertOptions: {
                text: '',
                type: 'danger',
                autoHide: false
            },
            showAlert: false
        }

        // functions binding
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.hideAlert = this.hideAlert.bind(this)
    }

    componentDidMount() {
        if (this.props.record) {
            const record = this.props.record
            this.setState({
                fields: {
                    applicantName: record.APPLICANT_NAME,
                    applicantType: record.APPLICANT_TYPE,
                    applicantAddress: record.APPLICANT_ADDRESS,
                    applicantContact: record.APPLICANT_CONTACT,
                    buildingName: record.BUILDING_NAME,
                    buildingAddress: record.BUILDING_ADDRESS,
                    buildingArea: record.BUILDING_AREA,
                    fileNumber: record.FILE_NUMBER,
                    remark: record.REMARK,
                }
            })
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
        const apiUrl = this.props.mode === 'edit' ? `http://localhost:3001/updateRecord/${this.props.record.ID}` : 'http://localhost:3001/addNewRecord'
        axios({
            method: this.props.mode === 'edit' ? 'put' : 'post',
            url: apiUrl,
            data: {
                applicant_name: this.state.fields.applicantName,
                applicant_type: this.state.fields.applicantType,
                applicant_address: this.state.fields.applicantAddress,
                applicant_contact: this.state.fields.applicantContact,
                building_name: this.state.fields.buildingName,
                building_address: this.state.fields.buildingAddress,
                building_area: this.state.fields.buildingArea,
                file_number: this.state.fields.fileNumber,
                remark: this.state.fields.remark
            },
            headers: {'Authorization': localStorage.getItem('authToken')}
        }).then(res => {
            if (res.data.saved) {
                this.setState({
                    alertOptions: {
                        text: res.data.message,
                        type: 'success',
                        autoHide: true
                    }
                })
            } else {
                this.setState({
                    alertOptions: {
                        text: res.data.message,
                        type: 'danger',
                        autoHide: true
                    }
                })
            }
            this.setState({
                showAlert: true
            })
        })

        // to update the record list when a record is updated
        this.props.onUpdate(this.state.fields)
    }

    hideAlert() {
        this.setState({
            showAlert: false
        })
    }

    render() {
        const btnText = this.props.mode === 'edit' ? 'Update' : 'Save'
        return (
            <Grid bsClass="entry-form">
                { (this.props.showPageHead) && <PageHead title="Add New Record"/> }
                <Row className="margin-0x">
                    <AlertComponent options={this.state.alertOptions} showAlert={this.state.showAlert} hideAlert={this.hideAlert}/>
                    <Grid componentClass="section" bsClass="col-xs-12">
                        <Form onSubmit={this.handleSubmit}>
                            <Col md={4}>
                                <FormGroup md={4} bsSize="large" >
                                    <ControlLabel htmlFor="applicantName">Applicant Name</ControlLabel>
                                    <Input
                                        type="text"
                                        autoComplete="on"
                                        name="applicantName"
                                        validations={[required]}
                                        className="form-control"
                                        value={this.state.fields.applicantName}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup bsSize="large" >
                                    <ControlLabel htmlFor="applicantAddress">Applicant Address</ControlLabel>
                                    <Input
                                        type="text"
                                        autoComplete="on"
                                        name="applicantAddress"
                                        validations={[required]}
                                        className="form-control"
                                        value={this.state.fields.applicantAddress}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup bsSize="large" >
                                    <ControlLabel htmlFor="applicantContact">Applicant Contact</ControlLabel>
                                    <Input
                                        type="text"
                                        autoComplete="on"
                                        name="applicantContact"
                                        validations={[required, phoneNumber]}
                                        className="form-control"
                                        value={this.state.fields.applicantContact}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Clearfix />

                            <Col md={4}>
                                <FormGroup bsSize="large" >
                                    <ControlLabel htmlFor="buildingName">Building Name</ControlLabel>
                                    <Input
                                        type="text"
                                        autoComplete="on"
                                        name="buildingName"
                                        validations={[required]}
                                        className="form-control"
                                        value={this.state.fields.buildingName}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup bsSize="large" >
                                    <ControlLabel htmlFor="buildingAddress">Building Address</ControlLabel>
                                    <Input
                                        type="text"
                                        autoComplete="on"
                                        name="buildingAddress"
                                        validations={[required]}
                                        className="form-control"
                                        value={this.state.fields.buildingAddress}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup bsSize="large" >
                                    <ControlLabel htmlFor="buildingArea">Area</ControlLabel>
                                    <Select
                                    name="buildingArea"
                                    value={this.state.fields.buildingArea}
                                    validations={[required]}
                                    className="form-control"
                                    onChange={this.handleChange}>
                                        <option value="">Select</option>
                                        <option value="urban">Urban</option>
                                        <option value="rural">Rural</option>
                                    </Select>
                                </FormGroup>
                            </Col>
                            <Clearfix />

                            <Col md={4}>
                                <FormGroup bsSize="large" >
                                    <ControlLabel htmlFor="applicantType">Applicant Type</ControlLabel>
                                    <Select
                                    name="applicantType"
                                    value={this.state.fields.applicantType}
                                    className="form-control"
                                    onChange={this.handleChange}>
                                        <option value="">Select</option>
                                        <option value="permanent">Permanent</option>
                                        <option value="temporary">Temporary</option>
                                    </Select>
                                </FormGroup>
                            </Col>

                            <Col md={4}>
                                <FormGroup bsSize="large" >
                                    <ControlLabel htmlFor="fileNumber">File Number</ControlLabel>
                                    <Input
                                        type="text"
                                        autoComplete="on"
                                        name="fileNumber"
                                        className="form-control"
                                        validations={[required]}
                                        value={this.state.fields.fileNumber}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Clearfix />

                            <Col md={12}>
                                <FormGroup bsSize="large" >
                                    <ControlLabel htmlFor="remark">Remark</ControlLabel>
                                    <Textarea
                                        autoComplete="on"
                                        name="remark"
                                        className="form-control"
                                        validations={[required]}
                                        value={this.state.fields.remark}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Clearfix />

                            <Col md={12}>
                                <Button type="submit" className="btn btn-default">
                                    <Glyphicon className="padding-right-1x" glyph="saved" />{btnText}
                                </Button>
                            </Col>
                        </Form>
                    </Grid>
                </Row>
            </Grid>
        )
    }
}

EntryForm.propTypes = {
    showPageHead: PropTypes.bool,
    record: PropTypes.object,
    mode: PropTypes.string,
    onUpdate: PropTypes.func
}

export default EntryForm