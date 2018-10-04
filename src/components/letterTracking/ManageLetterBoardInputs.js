import React from 'react'
import config from 'config'
import Alert from 'react-s-alert'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Button from 'react-validation/build/button'
import { LetterTracking } from './../helpers/CommonHelper'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import { NewLetterEntryFormService, ManageLetterBoardInputsService } from './../services/ApiServices'
import { PageHead, LoadingSpinner } from './../uiComponents/CommonComponent'
import { Grid, FormGroup, ControlLabel, Col, Glyphicon, Label, Tabs, Tab, ListGroup, ListGroupItem } from 'react-bootstrap'
import { required } from './..//helpers/ValidationHelper'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'

class ManageLetterBoardInputs extends React.Component {
	constructor(props) {
		super(props)

		this.departmentList = []
		this.letterTypeList = []
		this.letterTagList = []
		this.assignedOfficerList = []

		this.state = {
			settingName: '',
			showLoading: false,
			key:1
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleSelect = this.handleSelect.bind(this)
	}

	handleSelect(key) {
	    this.setState({ settingName: '', key })
  	}

  	handleChange(e) {
  		const element = e.nativeEvent.target
  		this.setState({ settingName: element.value  })
  	}

  	handleSubmit(e, code) {
  		e.preventDefault()
  		this.setState({showLoading: true})
  		ManageLetterBoardInputsService.addNewSettings({SETTING_NAME: this.state.settingName, DEPARTMENT_CODE: code}).then(res => {
			if (code === 'DEPARTMENT') {
				this.departmentList.push({NAME: this.state.settingName, CODE: LetterTracking.createCodeFromSettingsName(this.state.settingName)})
			} else if (code === 'TYPE') {
				this.letterTypeList.push({NAME: this.state.settingName, CODE: LetterTracking.createCodeFromSettingsName(this.state.settingName)})
			} else if (code === 'TAG') {
				this.letterTagList.push({NAME: this.state.settingName, CODE: LetterTracking.createCodeFromSettingsName(this.state.settingName)})
			} else {
				this.assignedOfficerList.push({NAME: this.state.settingName, CODE: LetterTracking.createCodeFromSettingsName(this.state.settingName)})
			}
			Alert.success(res.data.message, config.alertGlobalSettings)
			this.setState({ showLoading: false })
  		}).catch(err => {
  			Alert.error(err.response.data.message, config.alertGlobalSettings)
            this.setState({ showLoading: false })
        })
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
  	}

	render() {
		return (
			<Grid bsClass="manage-letter-system-inputs">
				<BreadcrumbsItem glyph='cog' to={'/servicePanel/letterTracking/manageApp'}> Manage Letter Board Inputs </BreadcrumbsItem>
				<PageHead title="Import" />
				{this.state.showLoading && <LoadingSpinner />}
            	<Alert stack={{limit: 3}} html={true} />
				<Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example" >
			  		<Tab eventKey={1} title="Manage Department">
						<fieldset className="custom-fieldset margin-bottom-6x">
							<legend className="custom-legend">
								<Label bsStyle="primary" className="padding-2x">Add New Department</Label>
							</legend>
							<Form onSubmit={(e) => this.handleSubmit(e, 'DEPARTMENT')}>
								<Col md={4}>
								    <FormGroup className="margin-top-2x required">
								        <ControlLabel htmlFor="DEPARTMENT_NAME">DEPARTMENT_NAME</ControlLabel>
								        <Input
		                                    type="text"
		                                    autoComplete="on"
		                                    name="DEPARTMENT_NAME"
		                                    validations={[required]}
		                                    value={this.state.DEPARTMENT_NAME}
		                                    onChange={this.handleChange}
		                                    className="form-control"
		                                />
								    </FormGroup>
								</Col>
								<Button type="submit" className="btn btn-default btn-adjust">
								    <Glyphicon className="padding-right-1x" glyph="plus" />Add new department
								</Button>
							</Form>
						</fieldset>

						<Label bsStyle="primary" className="padding-2x">Department List</Label>
						<ListGroup className="margin-top-4x">
							{this.departmentList.map((dept) =>
								<ListGroupItem className="width-3x pull-left margin-right-2x margin-bottom-2x" key={dept.CODE} value={dept.CODE}>{dept.NAME}
								</ListGroupItem>
							)}
						</ListGroup>
				  	</Tab>
				  	<Tab eventKey={2} title="Manage Officers List">
				  		<fieldset className="custom-fieldset margin-bottom-6x">
							<legend className="custom-legend">
								<Label bsStyle="primary" className="padding-2x">Add New Officer</Label>
							</legend>
							<Form onSubmit={(e) => this.handleSubmit(e, 'OFFICER')}>
								<Col md={4}>
								    <FormGroup className="margin-top-2x required">
								        <ControlLabel htmlFor="ASSIGNED_OFFICER">ASSIGNED_OFFICER</ControlLabel>
								        <Input
		                                    type="text"
		                                    autoComplete="on"
		                                    name="ASSIGNED_OFFICER"
		                                    validations={[required]}
		                                    value={this.state.ASSIGNED_OFFICER}
		                                    onChange={this.handleChange}
		                                    className="form-control"
		                                />
								    </FormGroup>
								</Col>
								<Button type="submit" className="btn btn-default btn-adjust">
								    <Glyphicon className="padding-right-1x" glyph="plus" />Add new officer
								</Button>
							</Form>
						</fieldset>

						<Label bsStyle="primary" className="padding-2x">Officer List</Label>
						<ListGroup className="margin-top-4x">
							{this.assignedOfficerList.map((officer) =>
								<ListGroupItem className="width-3x pull-left margin-right-2x margin-bottom-2x" key={officer.CODE} value={officer.CODE}>{officer.NAME}
								</ListGroupItem>
							)}
						</ListGroup>
				  	</Tab>
				  	<Tab eventKey={3} title="Manage Letter Type">
				  		<fieldset className="custom-fieldset margin-bottom-6x">
							<legend className="custom-legend">
								<Label bsStyle="primary" className="padding-2x">Add New Letter Type</Label>
							</legend>
							<Form onSubmit={(e) => this.handleSubmit(e, 'TYPE')}>
								<Col md={4}>
								    <FormGroup className="margin-top-2x required">
								        <ControlLabel htmlFor="LETTER_TYPE">LETTER_TYPE</ControlLabel>
								        <Input
		                                    type="text"
		                                    autoComplete="on"
		                                    name="LETTER_TYPE"
		                                    validations={[required]}
		                                    value={this.state.LETTER_TYPE}
		                                    onChange={this.handleChange}
		                                    className="form-control"
		                                />
								    </FormGroup>
								</Col>
								<Button type="submit" className="btn btn-default btn-adjust">
								    <Glyphicon className="padding-right-1x" glyph="plus" />Add new letter type
								</Button>
							</Form>
						</fieldset>

						<Label bsStyle="primary" className="padding-2x">Letter Type List</Label>
						<ListGroup className="margin-top-4x">
							{this.letterTypeList.map((letterType) =>
								<ListGroupItem className="width-3x pull-left margin-right-2x margin-bottom-2x" key={letterType.CODE} value={letterType.CODE}>{letterType.NAME}
								</ListGroupItem>
							)}
						</ListGroup>
				  	</Tab>
				  	<Tab eventKey={4} title="Manage Letter Tag">
				  		<fieldset className="custom-fieldset margin-bottom-6x">
							<legend className="custom-legend">
								<Label bsStyle="primary" className="padding-2x">Add New Letter Tag</Label>
							</legend>
							<Form onSubmit={(e) => this.handleSubmit(e, 'TAG')}>
								<Col md={4}>
								    <FormGroup className="margin-top-2x required">
								        <ControlLabel htmlFor="LETTER_TAG">LETTER_TAG</ControlLabel>
								        <Input
		                                    type="text"
		                                    autoComplete="on"
		                                    name="LETTER_TAG"
		                                    validations={[required]}
		                                    value={this.state.LETTER_TAG}
		                                    onChange={this.handleChange}
		                                    className="form-control"
		                                />
								    </FormGroup>
								</Col>
								<Button type="submit" className="btn btn-default btn-adjust">
								    <Glyphicon className="padding-right-1x" glyph="plus" />Add new letter tag
								</Button>
							</Form>
						</fieldset>

						<Label bsStyle="primary" className="padding-2x">Letter Tag List</Label>
						<ListGroup className="margin-top-4x">
							{this.letterTagList.map((letterTag) =>
								<ListGroupItem className="width-3x pull-left margin-right-2x margin-bottom-2x" key={letterTag.CODE} value={letterTag.CODE}>{letterTag.NAME}
								</ListGroupItem>
							)}
						</ListGroup>
				  	</Tab>
				</Tabs>
			</Grid>
		)
	}
}

export default ManageLetterBoardInputs