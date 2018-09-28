import React from 'react'
import moment from 'moment'
import config from 'config'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Select from 'react-validation/build/select'
import Button from 'react-validation/build/button'
import Textarea from 'react-validation/build/textarea'
import AlertComponent from './../uiComponents/AlertComponent'
import { NewLetterEntryFormService } from './../services/ApiServices'
import { PageHead, LoadingSpinner } from './../uiComponents/CommonComponent'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import { required } from './..//helpers/ValidationHelper'
import { Grid, FormGroup, ControlLabel, Row, Col, Clearfix, Glyphicon } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'

class NewLetterEntryForm extends React.Component {
    constructor(props) {
        super(props)

        this.departmentList = []
        this.letterTypeList = []
        this.letterTagList = []
        this.assignedOfficerList = []

        // state
        this.state = {
            fields: {
                DEPARTMENT_NAME: '',
                ASSIGNED_OFFICER: '',
                LETTER_TYPE: '',
                LETTER_TAG: '',
                LETTER_ADDRESS: '',
                LETTER_SUBJECT: '',
                LETTER_REG_NO: '',
                LETTER_DATE: moment(),
                LETTER_STATUS: '',
                REMARK: '',
            },
            alertOptions: {
                text: '',
                type: 'danger',
                autoHide: false
            },
            showLOading: false,
            showAlert: false
        }

        // functions binding
        this.hideAlert = this.hideAlert.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this)
    }

    componentDidMount() {
        this.setState({ showLoading: true })
        NewLetterEntryFormService.getInputFieldsData().then(res => {
            const inputFieldsData = res.data.data
            this.departmentList = inputFieldsData.DEPARTMENT_NAME
            this.letterTypeList = inputFieldsData.LETTER_TYPE
            this.letterTagList = inputFieldsData.LETTER_TAG
            this.assignedOfficerList = inputFieldsData.ASSIGNED_OFFICER
            this.setState({ showLoading: false })
        }).catch(err => { console.log(err) })

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

    handleDatePickerChange(date) {
        this.setState((prevState) => ({
            ...prevState,
            fields: {
                ...prevState.fields,
                ['LETTER_DATE']: date
            }
        }))
    }

    handleSubmit(event) {
        event.preventDefault()
        const url = this.props.mode === 'edit' ? `${config.baseUrl}/updateRecord/${this.props.record.ID}` : `${config.baseUrl}/addNewLetterRecord`
        const method = this.props.mode === 'edit' ? 'put' : 'post'
        const data = this.state.fields
        NewLetterEntryFormService.addNewLetterRecord(method, url, data).then((res) => {
            this.setState({
                showAlert: true,
                alertOptions: {
                    text: res.data.message,
                    type: 'success',
                    autoHide: true
                }
            })
        }).catch(err => {
            this.setState({
                showAlert: true,
                alertOptions: {
                    text: err.response.data.message,
                    type: 'danger',
                    autoHide: true
                }
            })
        })

        // // to update the record list when a record is updated
        // if (this.props.mode === 'edit') this.props.onUpdate(this.state.fields)
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
                <BreadcrumbsItem glyph='file' to={'/servicePanel/fileManager/addNewRecord'}> Add New Record </BreadcrumbsItem>
                <PageHead title="Add New Record"/>
                {this.state.showLoading && <LoadingSpinner />}

                <Row className="margin-0x">
                    <AlertComponent options={this.state.alertOptions} showAlert={this.state.showAlert} hideAlert={this.hideAlert}/>
                    <Grid componentClass="section" bsClass="col-xs-12">
                        <Form onSubmit={this.handleSubmit}>
                            <fieldset className="custom-fieldset margin-bottom-2x">
                                <legend className="custom-legend">New Entry</legend>
                                <Col md={3}>
                                    <FormGroup className="required" >
                                        <ControlLabel htmlFor="LETTER_REG_NO">LETTER_REG_NO</ControlLabel>
                                        <Input
                                            type="text"
                                            autoComplete="on"
                                            name="LETTER_REG_NO"
                                            validations={[required]}
                                            className="form-control"
                                            value={this.state.fields.LETTER_REG_NO}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={3}>
                                    <FormGroup className="required" >
                                        <ControlLabel htmlFor="LETTER_STATUS">LETTER_STATUS</ControlLabel>
                                        <Select
                                        name="LETTER_STATUS"
                                        value={this.state.fields.LETTER_STATUS}
                                        validations={[required]}
                                        className="form-control"
                                        onChange={this.handleChange}>
                                            <option value="">Select</option>
                                            <option value="1">Incoming</option>
                                            <option value="2">Outgoing</option>
                                        </Select>
                                    </FormGroup>
                                </Col>

                                <Col md={4}>
                                    <FormGroup className="required" >
                                        <ControlLabel htmlFor="LETTER_DATE">SELECT_DATE</ControlLabel>
                                        <DatePicker
                                            name="LETTER_DATE"
                                            className="form-control"
                                            dateFormat={config.datePicker.dateFormat}
                                            placeholderText="Click to select a date"
                                            maxDate={moment()}
                                            selected={this.state.fields.LETTER_DATE}
                                            onChange={this.handleDatePickerChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Clearfix />

                                <Col md={3}>
                                    <FormGroup className="required" >
                                        <ControlLabel htmlFor="DEPARTMENT_NAME">DEPARTMENT_NAME</ControlLabel>
                                        <Select
                                        name="DEPARTMENT_NAME"
                                        value={this.state.fields.DEPARTMENT_NAME}
                                        validations={[required]}
                                        className="form-control"
                                        onChange={this.handleChange}>
                                            <option value="">Select</option>
                                            {this.departmentList.map((dept) => <option key={dept.CODE} value={dept.CODE}>{dept.NAME}</option>)}
                                        </Select>
                                    </FormGroup>
                                </Col>

                                <Col md={3}>
                                    <FormGroup className="required" >
                                        <ControlLabel htmlFor="LETTER_TYPE">LETTER_TYPE</ControlLabel>
                                        <Select
                                        name="LETTER_TYPE"
                                        value={this.state.fields.LETTER_TYPE}
                                        validations={[required]}
                                        className="form-control"
                                        onChange={this.handleChange}>
                                            <option value="">Select</option>
                                            {this.letterTypeList.map((letter) => <option key={letter.CODE} value={letter.CODE}>{letter.NAME}</option>)}
                                        </Select>
                                    </FormGroup>
                                </Col>

                                <Col md={3}>
                                    <FormGroup className="required" >
                                        <ControlLabel htmlFor="LETTER_TAG">LETTER_TAG</ControlLabel>
                                        <Select
                                        name="LETTER_TAG"
                                        value={this.state.fields.LETTER_TAG}
                                        validations={[required]}
                                        className="form-control"
                                        onChange={this.handleChange}>
                                            <option value="">Select</option>
                                            {this.letterTagList.map((tag) => <option key={tag.CODE} value={tag.CODE}>{tag.NAME}</option>)}
                                        </Select>
                                    </FormGroup>
                                </Col>

                                <Col md={3}>
                                    <FormGroup className="required" >
                                        <ControlLabel htmlFor="ASSIGNED_OFFICER">ASSIGNED_OFFICER</ControlLabel>
                                        <Select
                                        name="ASSIGNED_OFFICER"
                                        value={this.state.fields.ASSIGNED_OFFICER}
                                        validations={[required]}
                                        className="form-control"
                                        onChange={this.handleChange}>
                                            <option value="">Select</option>
                                            {this.assignedOfficerList.map((officer) => <option key={officer.CODE} value={officer.CODE}>{officer.NAME}</option>)}
                                        </Select>
                                    </FormGroup>
                                </Col>
                                <Clearfix />

                                <Col md={6}>
                                    <FormGroup className="required" >
                                        <ControlLabel htmlFor="LETTER_ADDRESS">LETTER_ADDRESS</ControlLabel>
                                        <Input
                                            type="text"
                                            autoComplete="on"
                                            name="LETTER_ADDRESS"
                                            validations={[required]}
                                            className="form-control"
                                            value={this.state.fields.LETTER_ADDRESS}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={6}>
                                    <FormGroup className="required" >
                                        <ControlLabel htmlFor="LETTER_SUBJECT">LETTER_SUBJECT</ControlLabel>
                                        <Input
                                            type="text"
                                            autoComplete="on"
                                            name="LETTER_SUBJECT"
                                            validations={[required]}
                                            className="form-control"
                                            value={this.state.fields.LETTER_SUBJECT}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Clearfix />

                                <Col md={12}>
                                    <FormGroup bsSize="large" >
                                        <ControlLabel htmlFor="REMARK">REMARK</ControlLabel>
                                        <Textarea
                                            autoComplete="on"
                                            name="REMARK"
                                            className="form-control"
                                            validations={[required]}
                                            value={this.state.fields.REMARK}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                </Col>
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

NewLetterEntryForm.propTypes = {
    record: PropTypes.object,
    mode: PropTypes.string,
    onUpdate: PropTypes.func
}

export default NewLetterEntryForm