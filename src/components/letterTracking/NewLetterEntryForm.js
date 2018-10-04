import React from 'react'
import moment from 'moment'
import config from 'config'
import Alert from 'react-s-alert'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import DatePicker from 'react-datepicker'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Select from 'react-validation/build/select'
import Button from 'react-validation/build/button'
import Textarea from 'react-validation/build/textarea'
import { required } from './..//helpers/ValidationHelper'
import { LetterTracking } from './../helpers/CommonHelper'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import { NewLetterEntryFormService } from './../services/ApiServices'
import { PageHead, LoadingSpinner } from './../uiComponents/CommonComponent'
import { Grid, FormGroup, ControlLabel, Row, Col, Clearfix, Glyphicon, Label, Button as Btn } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'

class NewLetterEntryForm extends React.Component {
    constructor(props) {
        super(props)

        this.departmentList = []
        this.letterTypeList = []
        this.letterTagList = []
        this.assignedOfficerList = []
        this.acceptedFiles = ''

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
            showLoading: false,
            uploadedFileName: ''
        }

        // functions binding
        this.onDrop = this.onDrop.bind(this)
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
        })

        if (this.props.record) {
            const record = this.props.record
            this.setState({
                fields: {
                    DEPARTMENT_NAME: record.DEPARTMENT_NAME,
                    ASSIGNED_OFFICER: record.ASSIGNED_OFFICER,
                    LETTER_TYPE: record.LETTER_TYPE,
                    LETTER_TAG: record.LETTER_TAG,
                    LETTER_ADDRESS: record.LETTER_ADDRESS,
                    LETTER_SUBJECT: record.LETTER_SUBJECT,
                    LETTER_REG_NO: record.LETTER_REG_NO,
                    LETTER_DATE: moment(record.LETTER_DATE),
                    LETTER_STATUS: record.LETTER_STATUS,
                    REMARK: record.REMARK
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

    onDrop(acceptedFiles) {
        this.acceptedFiles = acceptedFiles
        this.setState({ uploadedFileName: acceptedFiles[0].name })
    }

    handleSubmit(event) {
        event.preventDefault()
        const url = this.props.mode === 'edit' ? `${config.baseUrl}/letters/updateRecord/${this.props.record.ID}` : `${config.baseUrl}/letters/addNewLetterRecord`
        const method = this.props.mode === 'edit' ? 'put' : 'post'
        let data = this.state.fields

        NewLetterEntryFormService.addNewLetterRecord(method, url, data).then((res) => {
            if (this.acceptedFiles) {
                let data = new FormData()
                data.append('file', this.acceptedFiles[0])
                data.append('filename', this.acceptedFiles[0].name)
                data.append('id', res.data.id)
                NewLetterEntryFormService.uploadLetterFile(data).then((response) => {
                    if (response.data.success === true && response.data.file) {
                        this.setState({ uploadedFileName: response.data.file })
                    }
                })
            }
            Alert.success(res.data.message, config.alertGlobalSettings)
        }).catch(err => {
            const errMsg = err.response.data.message || 'Some error occured. Please try again'
            Alert.error(errMsg, config.alertGlobalSettings)
        })

        // to update the record list when a record is updated
        if (this.props.mode === 'edit') this.props.onUpdate(this.state.fields)
    }

    render() {
        const btnText = this.props.mode === 'edit' ? 'Update' : 'Save'
        return (
            <Grid bsClass="entry-form">
                {this.props.mode !== 'edit' && <BreadcrumbsItem to={LetterTracking.getLetterTrackingAbsolutePath('addNewEntry')}> Add New Entry </BreadcrumbsItem>}
                {this.props.mode !== 'edit' && <PageHead />}
                {this.state.showLoading && <LoadingSpinner />}

                <Row className="margin-0x">
                    <Alert stack={{limit: 3}} html={true} />
                    <Grid componentClass="section" bsClass="col-xs-12">
                        <Form onSubmit={this.handleSubmit}>
                            <fieldset className="custom-fieldset margin-bottom-2x">
                                <legend className="custom-legend">
                                    <Label bsStyle="primary" className="padding-2x">{this.props.mode === 'edit' ? 'Update Entry' : 'New Entry'}</Label>
                                </legend>
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

                                <Col md={12}>
                                    <Dropzone
                                        className="dz-default"
                                        multiple={false}
                                        accept={".jpg, .png, .doc"}
                                        maxSize={500000}
                                        onDrop={(files) => this.onDrop(files)}>
                                            <Grid bsClass="dzinfo">
                                                <span> Upload your letter here. File size limit is 500KB. <span className="highlight">Only valid doc (.doc) and image files (.jpg, .png) will be accepted</span></span>
                                                <Clearfix />

                                                <Btn bsStyle="default" className="dzuploadbtn">
                                                    <Glyphicon glyph="upload" /> Upload File
                                                </Btn>
                                                <Clearfix />

                                                <p className="dzuploadedfilename">{this.state.uploadedFileName}</p>
                                            </Grid>
                                    </Dropzone>
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
    mode: PropTypes.string,
    onUpdate: PropTypes.func,
    record: PropTypes.object
}

export default NewLetterEntryForm