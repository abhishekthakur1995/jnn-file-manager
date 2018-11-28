import React from 'react'
import moment from 'moment'
import config from 'config'
import Alert from 'react-s-alert'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Select from 'react-validation/build/select'
import Button from 'react-validation/build/button'
import { FileRecord } from './helpers/CommonHelper'
import Textarea from 'react-validation/build/textarea'
import { EntryFormService } from './services/ApiServices'
import { PageHead } from './uiComponents/CommonComponent'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import { required, phoneNumber } from './helpers/ValidationHelper'
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl'
import { Grid, FormGroup, ControlLabel, Row, Col, Clearfix, Glyphicon, Label } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'
import ZoneWardList from '../../data/zone_ward_list.json'

const messages = defineMessages({
    submitBtnSaveText: {
        id: 'fileManager.entryForm.submitBtnSaveText',
        defaultMessage: 'Save',
    },
    submitBtnUpdateText: {
        id: 'fileManager.entryForm.submitBtnUpdateText',
        defaultMessage: 'Update',
    },
    saveEntryFormLabel: {
        id: 'fileManager.entryForm.saveEntryFormLabel',
        defaultMessage: 'New Entry',
    },
    updateEntryFormLabel: {
        id: 'fileManager.entryForm.updateEntryFormLabel',
        defaultMessage: 'Update Entry',
    },
    selectText: {
        id: 'common.general.select',
        defaultMessage: 'Select',
    }
})

class EntryForm extends React.Component {
    constructor(props) {
        super(props)

        // state
        this.state = {
            fields: {
                applicantName: '',
                applicantAddress: '',
                applicantContact: '',
                fileNumber: '',
                fileDescription: '',
                department: '',
                zone: '',
                ward: '',
                remark: '',
                fileDate: moment(),
            }
        }

        this.departmentList = []

        // functions binding
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDatePickerChange = this.handleDatePickerChange.bind(this)
    }

    componentDidMount() {
        this.setState({ showLoading: true })
        EntryFormService.getInputFieldsData().then(res => {
            this.departmentList = res.data.data.DEPARTMENT_NAME
            this.setState({ showLoading: false })
        })
        if (this.props.record) {
            const record = this.props.record
            this.setState({
                fields: {
                    applicantName: record.APPLICANT_NAME,
                    applicantAddress: record.APPLICANT_ADDRESS,
                    applicantContact: record.APPLICANT_CONTACT,
                    fileNumber: record.FILE_NUMBER,
                    fileDate: moment(record.FILE_DATE),
                    fileDescription: record.FILE_DESCRIPTION,
                    department: record.DEPARTMENT,
                    zone: record.ZONE,
                    ward: record.WARD,
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
                ['fileDate']: date
            }
        }))
    }

    handleSubmit(event) {
        event.preventDefault()
        const url = this.props.mode === 'edit' ? `${config.baseUrl}/updateRecord/${this.props.record.ID}` : `${config.baseUrl}/addNewRecord`
        const method = this.props.mode === 'edit' ? 'put' : 'post'
        const data = {
            applicant_name: this.state.fields.applicantName,
            applicant_address: this.state.fields.applicantAddress,
            applicant_contact: this.state.fields.applicantContact,
            file_number: this.state.fields.fileNumber,
            file_date: this.state.fields.fileDate,
            file_description: this.state.fields.fileDescription,
            department: this.state.fields.department,
            zone: this.state.fields.zone,
            ward: this.state.fields.ward,
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
        const { intl } = this.props
        const btnText = this.props.mode === 'edit' ? intl.formatMessage(messages.submitBtnUpdateText) : intl.formatMessage(messages.submitBtnSaveText)
        return (
            <Grid bsClass="entry-form">
            {this.props.mode !== 'edit' && <BreadcrumbsItem to={FileRecord.getAbsolutePath('addNewRecord')}> Add New Record </BreadcrumbsItem>}
            {this.props.mode !== 'edit' && <PageHead />}
                <Row className="margin-0x bg-white green-top padding-top-2x">
                    <Alert stack={{limit: 3}} html={true} />
                    <Grid componentClass="section" bsClass="col-xs-12">
                        <Form onSubmit={this.handleSubmit}>
                            <fieldset className="custom-fieldset margin-bottom-2x">
                            <legend className="custom-legend">
                                <Label bsStyle="primary" className="padding-2x">{this.props.mode === 'edit' ? intl.formatMessage(messages.updateEntryFormLabel) : intl.formatMessage(messages.saveEntryFormLabel)}</Label>
                            </legend>
                                <Col md={4}>
                                    <FormGroup className="required">
                                        <ControlLabel htmlFor="fileNumber">
                                            <FormattedMessage id="fileManager.entryForm.fileNumber" defaultMessage="File Number" />
                                        </ControlLabel>
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

                                <Col md={4}>
                                    <FormGroup className="required" >
                                        <ControlLabel htmlFor="fileDate">
                                            <FormattedMessage id="fileManager.entryForm.date" defaultMessage="SELECT_DATE" />
                                        </ControlLabel>
                                        <DatePicker
                                            name="fileDate"
                                            className="form-control"
                                            dateFormat={config.datePicker.dateFormat}
                                            placeholderText="Click to select a date"
                                            maxDate={moment()}
                                            selected={this.state.fields.fileDate}
                                            onChange={this.handleDatePickerChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Clearfix />

                                <Col md={4}>
                                    <FormGroup className="required">
                                        <ControlLabel htmlFor="applicantName">
                                            <FormattedMessage id="fileManager.entryForm.applicantName" defaultMessage="Applicant Name" />
                                        </ControlLabel>
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
                                    <FormGroup className="required">
                                        <ControlLabel htmlFor="applicantAddress">
                                            <FormattedMessage id="fileManager.entryForm.applicantAddress" defaultMessage="Applicant Address" />
                                        </ControlLabel>
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
                                    <FormGroup className="required">
                                        <ControlLabel htmlFor="applicantContact">
                                            <FormattedMessage id="fileManager.entryForm.applicantContact" defaultMessage="Applicant Contact" />
                                        </ControlLabel>
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
                                    <FormGroup className="required">
                                        <ControlLabel htmlFor="department">
                                            <FormattedMessage id="fileManager.entryForm.department" defaultMessage="Department" />
                                        </ControlLabel>
                                        <Select
                                        name="department"
                                        value={this.state.fields.department}
                                        className="form-control"
                                        onChange={this.handleChange}>
                                            <option value="">{intl.formatMessage(messages.selectText)}</option>
                                            {this.departmentList.map((dept) => <option key={dept.CODE} value={dept.CODE}>{dept.NAME}</option>)}
                                        </Select>
                                    </FormGroup>
                                </Col>

                                <Col md={4}>
                                    <FormGroup className="required">
                                        <ControlLabel htmlFor="zone">
                                            <FormattedMessage id="fileManager.entryForm.zone" defaultMessage="Zone" />
                                        </ControlLabel>
                                        <Select
                                        name="zone"
                                        value={this.state.fields.zone}
                                        className="form-control"
                                        onChange={this.handleChange}>
                                            <option value="">{intl.formatMessage(messages.selectText)}</option>
                                            {ZoneWardList.map((zone) => <option key={zone.CODE} value={zone.CODE}>{zone.NAME}</option>)}
                                        </Select>
                                    </FormGroup>
                                </Col>

                                <Col md={4}>
                                    <FormGroup className="required">
                                        <ControlLabel htmlFor="ward">
                                            <FormattedMessage id="fileManager.entryForm.ward" defaultMessage="Ward" />
                                        </ControlLabel>
                                        <Select
                                        name="ward"
                                        value={this.state.fields.ward}
                                        className="form-control"
                                        disabled={this.state.fields.zone === ''}
                                        onChange={this.handleChange}>
                                            <option value="">{intl.formatMessage(messages.selectText)}</option>
                                            {
                                                ZoneWardList.map((zone) => {
                                                    if (this.state.fields.zone === zone.CODE) {
                                                        return (
                                                            zone.WARD_LIST.map((ward) =>
                                                                <option key={ward.CODE} value={ward.CODE}>{ward.NAME}</option>
                                                            )
                                                        )
                                                    }
                                                })
                                            }
                                        </Select>
                                    </FormGroup>
                                </Col>
                                <Clearfix />

                                <Col md={6}>
                                    <FormGroup bsSize="large" className="required">
                                        <ControlLabel htmlFor="fileDescription">
                                            <FormattedMessage id="fileManager.entryForm.fileDescription" defaultMessage="File Description" />
                                        </ControlLabel>
                                        <Textarea
                                            autoComplete="on"
                                            name="fileDescription"
                                            className="form-control"
                                            validations={[required]}
                                            value={this.state.fields.fileDescription}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                </Col>

                                <Col md={6}>
                                    <FormGroup bsSize="large" className="required">
                                        <ControlLabel htmlFor="remark">
                                            <FormattedMessage id="fileManager.entryForm.remark" defaultMessage="Remark" />
                                        </ControlLabel>
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
                            <Col className="padding-0x margin-bottom-2x" md={12}>
                                <Button type="submit" className="btn btn-default green-btn">
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
    intl: PropTypes.object,
    record: PropTypes.object,
    mode: PropTypes.string,
    onUpdate: PropTypes.func,
}

export default injectIntl(EntryForm)