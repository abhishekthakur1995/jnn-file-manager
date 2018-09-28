import React from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Button from 'react-validation/build/button'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import { NewLetterEntryFormService, ManageLetterBoardInputsService } from './../services/ApiServices'
import { PageHead, LoadingSpinner } from './../uiComponents/CommonComponent'
import { Grid, FormGroup, ControlLabel, Row, Col, Clearfix, Glyphicon, Label, Tabs, Tab, ListGroup, ListGroupItem } from 'react-bootstrap'
import { required } from './..//helpers/ValidationHelper'

class ManageLetterBoardInputs extends React.Component {
	constructor(props) {
		super(props)

		this.departmentList = []
		this.letterTypeList = []
		this.letterTagList = []
		this.assignedOfficerList = []

		this.state = {
			DEPARTMENT_NAME: '',
			showLoading: false,
			key:1
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	handleSelect(key) {
	    this.setState({ key })
  	}

  	handleChange(e) {
  		const element = e.nativeEvent.target
  		this.setState({ [element.name]: element.value  })
  	}

  	handleSubmit(e, code) {
  		e.preventDefault()
  		ManageLetterBoardInputsService.addNewDepartment({DEPARTMENT_NAME: this.state.DEPARTMENT_NAME, CODE: code}).then(res => {
  			if(res.data.data.saved === true) {

  			}
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
  			console.log(this.departmentList)
  		    this.setState({ showLoading: false })
  		}).catch(err => { console.log(err) })
  	}

	render() {
		return (
			<Grid bsClass="manage-letter-system-inputs">
				<BreadcrumbsItem glyph='cog' to={'/servicePanel/letterTracking/manageApp'}> Manage Letter Board Inputs </BreadcrumbsItem>
				<PageHead title="Import" />
				{this.state.showLoading && <LoadingSpinner />}

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
								<ListGroupItem className="width-3x pull-left margin-right-2x margin-bottom-2x" key={dept.NAME} value={dept.NAME}>{dept.TITLE}
									<Glyphicon title="Remove this department" className="pull-right" glyph="remove"></Glyphicon>
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