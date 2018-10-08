import React from 'react'
import config from 'config'
import Alert from 'react-s-alert'
import PropTypes from 'prop-types'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Select from 'react-validation/build/select'
import Button from 'react-validation/build/button'
import Textarea from 'react-validation/build/textarea'
import { EntryFormService } from './services/ApiServices'
import { PageHead } from './uiComponents/CommonComponent'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import { required, phoneNumber } from './helpers/ValidationHelper'
import { Grid, FormGroup, ControlLabel, Row, Col, Clearfix, Glyphicon, Label } from 'react-bootstrap'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'

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
            }
        }

        // functions binding
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        const url = this.props.mode === 'edit' ? `${config.baseUrl}/updateRecord/${this.props.record.ID}` : `${config.baseUrl}/addNewRecord`
        const method = this.props.mode === 'edit' ? 'put' : 'post'
        const data = {
            applicant_name: this.state.fields.applicantName,
            applicant_type: this.state.fields.applicantType,
            applicant_address: this.state.fields.applicantAddress,
            applicant_contact: this.state.fields.applicantContact,
            building_name: this.state.fields.buildingName,
            building_address: this.state.fields.buildingAddress,
            building_area: this.state.fields.buildingArea,
            file_number: this.state.fields.fileNumber,
            remark: this.state.fields.remark
        }
        EntryFormService.addNewRecord(method, url, data).then((res) => {
            Alert.success(res.data.message, config.alertGlobalSettings)
        }).catch(err => {
            Alert.error(err.response.data.message, config.alertGlobalSettings)
        })

        // to update the record list when a record is updated
        if (this.props.mode === 'edit') this.props.onUpdate(this.state.fields)
    }

    render() {
        const btnText = this.props.mode === 'edit' ? 'Update' : 'Save'
        return (
            <Grid bsClass="entry-form">
            {this.props.mode !== 'edit' && <BreadcrumbsItem to={'/servicePanel/fileManager/addNewRecord'}> Add New Record </BreadcrumbsItem>}
            {this.props.mode !== 'edit' && <PageHead />}
                <Row className="margin-0x bg-white">
                    <Alert stack={{limit: 3}} html={true} />
                    <Grid componentClass="section" bsClass="col-xs-12">
                        <Form onSubmit={this.handleSubmit}>
                            <fieldset className="custom-fieldset margin-bottom-2x">
                            <legend className="custom-legend">
                                <Label bsStyle="primary" className="padding-2x">{this.props.mode === 'edit' ? 'Update Entry' : 'New Entry'}</Label>
                            </legend>
                                <Col md={4}>
                                    <FormGroup>
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
                                    <FormGroup>
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
                                    <FormGroup>
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
                                    <FormGroup>
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
                                    <FormGroup>
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
                                    <FormGroup>
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
                                    <FormGroup>
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
                                    <FormGroup>
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
                            </fieldset>
                            <Col className="padding-0x" md={12}>
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
    record: PropTypes.object,
    mode: PropTypes.string,
    onUpdate: PropTypes.func,
}

export default EntryForm