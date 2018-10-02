import React from 'react'
import _ from 'underscore'
import config from 'config'
import moment from 'moment'
import { CSVLink } from 'react-csv'
import DatePicker from 'react-datepicker'
import pdfMake from "pdfmake/build/pdfmake"
import pdfFonts from "pdfmake/build/vfs_fonts"
import { LetterTracking } from './../helpers/CommonHelper'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import { ExportLetterDataService, NewLetterEntryFormService } from './../services/ApiServices'
import { Grid, Radio, Table, Button, Clearfix, Checkbox } from 'react-bootstrap'
import { PageHead, MonthDropDown, YearDropDown, LoadingSpinner } from './../uiComponents/CommonComponent'
import 'react-datepicker/dist/react-datepicker.css'
pdfMake.vfs = pdfFonts.pdfMake.vfs

class ExportLetterData extends React.Component {
	constructor(props) {
		super(props)

		this.departmentList = []
		this.letterTypeList = []
		this.letterTagList = []
		this.assignedOfficerList = []

		this.state = {
			downloadData: '',
			filter: {
				type: '',
				month: '',
				year: '',
				startDate: moment(),
				endDate: moment(),
				downloadFormat: ''
			},
			error: {
				emptyDownloadFormat: false,
				monthError: false,
				specificPeriodError: false
			},
			letterStatus: {},
			letterType: {},
			letterTag: {},
			departmentName: {},
			assignedOfficer: {},
			showLoading: false
		}

		this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this)
		this.handleRadioChange = this.handleRadioChange.bind(this)
		this.handleFilterParams = this.handleFilterParams.bind(this)
		this.downloadData = this.downloadData.bind(this)
		this.getDataBasedOnMonth = this.getDataBasedOnMonth.bind(this)
		this.getDataForSpecificPeriod = this.getDataForSpecificPeriod.bind(this)
		this.handlePdfGeneration = this.handlePdfGeneration.bind(this)
		this.buildTableBody = this.buildTableBody.bind(this)
		this.table = this.table.bind(this)
	}

	componentDidMount() {
		this.setState({showLoading: true})
		NewLetterEntryFormService.getInputFieldsData().then(res => {
            const inputFieldsData = res.data.data
  		    this.departmentList = inputFieldsData.DEPARTMENT_NAME
  		    this.letterTypeList = inputFieldsData.LETTER_TYPE
  		    this.letterTagList = inputFieldsData.LETTER_TAG
  		    this.assignedOfficerList = inputFieldsData.ASSIGNED_OFFICER
  		    this.setState({ showLoading: false })
        })
	}

	handleCheckBoxClick(action, stateList) {
		let { letterStatus, departmentName, letterType, letterTag, assignedOfficer } = this.state
		stateList[action] = !stateList[action]
		this.setState({ letterStatus, departmentName, letterType, letterTag, assignedOfficer })
	}

	handleRadioChange(type) {
		this.setState((prevState) => ({
  			...prevState,
  			filter: {
  				...prevState.filter,
  				type
  			}
  		}))
	}

  	handleFilterParams(paramType, value) {
  		this.setState((prevState) => ({
  			...prevState,
  			filter: {
  				...prevState.filter,
  				[paramType] : value
  			}
  		}))
  	}

  	downloadData() {
  		if (_.isEmpty(this.state.filter.type)) {
  			return
  		}

  		if (_.isEmpty(this.state.filter.downloadFormat)) {
  			this.setState({ error : { emptyDownloadFormat: true } })
  			return
  		}

  		if (this.state.filter.type === 'monthType') {
  			if (_.isEmpty(this.state.filter.month) || _.isEmpty(this.state.filter.year)) {
  				this.setState({ error : { monthError: true } })
  				return
  			}
  			this.getDataBasedOnMonth()
  		}

  		if (this.state.filter.type === 'specificPeriodType') {
  			if (_.isEmpty(this.state.filter.startDate) || _.isEmpty(this.state.filter.endDate)) {
  				this.setState({ error : { specificPeriodError: true } })
  				return
  			}
  			this.getDataForSpecificPeriod()
  		}

  		if (this.state.filter.type === 'byTags') {
  			// if (_.isEmpty(this.state.filter.startDate) || _.isEmpty(this.state.filter.endDate)) {
  			// 	this.setState({ error : { specificPeriodError: true } })
  			// 	return
  			// }
  			this.getDataBasedOnSelectedTags()
  		}
  	}

  	getDataBasedOnMonth() {
  		ExportLetterDataService.exportDataByMonth(this.state.filter.month, this.state.filter.year).then((res) => {
	        this.setState({downloadData : res.data.data})
      	})
  	}

  	getDataForSpecificPeriod() {
  		ExportLetterDataService.exportDataBySpecificPeriod(this.state.filter.startDate, this.state.filter.endDate).then((res) => {
	        this.setState({downloadData : res.data.data})
      	})
  	}

  	getDataBasedOnSelectedTags() {
  		const { formStatus, letterStatus, departmentName, letterType, letterTag, assignedOfficer } = this.state
		const selectedTags = {}
		selectedTags['formStatus'] = _.keys(_.pick(formStatus, (status) =>  status === true ))
		selectedTags['letterStatus'] = _.keys(_.pick(letterStatus, (status) =>  status === true ))
		selectedTags['letterTag'] = _.keys(_.pick(letterTag, (status) =>  status === true ))
		selectedTags['letterType'] = _.keys(_.pick(letterType, (status) =>  status === true ))
		selectedTags['departmentName'] = _.keys(_.pick(departmentName, (status) =>  status === true ))
		selectedTags['assignedOfficer'] = _.keys(_.pick(assignedOfficer, (status) =>  status === true ))

  		ExportLetterDataService.exportDataBySelectedTags({selectedTags}).then((res) => {
	        this.setState({downloadData : res.data.data})
      	})
  	}

  	buildTableBody(data, columns) {
  	    var body = []

  	    body.push(columns);

  	    _.forEach(data, function(row) {
  	        var dataRow = [];
  	        _.forEach(columns, function(column) {
  	        	if (column === 'CREATED') {
  	        		dataRow.push(moment(row[column]).format(config.defaultDateTimeFormat).toString());
  	        	} else {
  	            	dataRow.push(row[column].toString());
  	            }
  	        })

  	        body.push(dataRow);
  	    })

  	    return body
  	}

  	table(data, columns) {
  	    return {
  	        table: {
  	            headerRows: 1,
  	            widths: [ '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%' ],
  	            body: this.buildTableBody(data, columns)
  	        }
  	    }
  	}

  	handlePdfGeneration() {
  		pdfMake.fonts = {
  		   	times: {
	     		normal: 'times.ttf',
	     		bold: 'times.ttf',
  		     	italics: 'times.ttf',
  		     	bolditalics: 'times.ttf'
  		   	}
	   	}
  		var pdfLayout = {
  			pageSize: 'A4',
  		    content: [
  		        this.table(this.state.downloadData, ['DEPARTMENT_NAME', 'ASSIGNED_OFFICER', 'LETTER_TYPE', 'LETTER_TAG', 'LETTER_ADDRESS', 'LETTER_SUBJECT', 'LETTER_REG_NO', 'LETTER_STATUS', 'LETTER_DATE', 'REMARK'])
  		    ],
  		    defaultStyle: {
  		        font: 'times',
  		        fontSize: 8,
  		        alignment: 'center'
		    }
  		}
  		pdfMake.createPdf(pdfLayout).open()
  	}

	render() {
		return (
			<Grid bsClass="get-records">
				<BreadcrumbsItem glyph='download' to={LetterTracking.getLetterTrackingAbsolutePath('exportData')}> Get Records </BreadcrumbsItem>
				<PageHead title="Get Records" />
				{this.state.showLoading && <LoadingSpinner />}

				<Table bordered className="table" width="100%">
					<tbody>
						<tr width="100%">
							<td width="80%">
								<Table className="formtable" border="0" cellSpacing="0" cellPadding="2" width="100%">
									<tbody>
										<tr>
											<td width="20%" className="data-left-aligned">
												<Radio
													name="periodType"
													inline={true}
													onChange={() => { this.handleRadioChange('monthType') }} >By Month
												</Radio>
											</td>

											<td width="80%">
												<Grid bsClass="pull-left">Year:<br />
													<YearDropDown
														onClick={this.handleFilterParams}
													/>
												</Grid>

												<Clearfix />

												<Grid bsClass="pull-left">Month:<br />
													<MonthDropDown
														onClick={this.handleFilterParams}
													/>
												</Grid>

												<Clearfix />

												{this.state.error.monthError && <span className="error">Please select both year and month</span>}

											</td>
										</tr>

										<tr align="left" valign="middle">
											<td className="data-left-aligned" width="20%">
												<Radio
													name="periodType"
													inline={true}
													onChange={() => { this.handleRadioChange('specificPeriodType') }} >Specific Period
												</Radio>
											</td>

											<td width="80%">
												<div>From:
													<DatePicker
														dateFormat={config.datePicker.dateFormat}
														placeholderText="Click to select a date"
														maxDate={moment()}
														selected={this.state.filter.startDate}
														startDate={this.state.filter.startDate}
														endDate={this.state.filter.endDate}
														onChange={(date) => { this.handleFilterParams('startDate', date) }}
													/>
												</div>

												<br />

												<div>To:
													<DatePicker
													   	dateFormat={config.datePicker.dateFormat}
													   	placeholderText="Click to select a date"
													   	maxDate={moment()}
													   	selected={this.state.filter.endDate}
													    startDate={this.state.filter.startDate}
													    endDate={this.state.filter.endDate}
													    onChange={(date) => { this.handleFilterParams('endDate', date) }}
													/>
												</div>

												{this.state.error.specificPeriodError && <span className="error">Please select both start date and end date</span>}

											</td>
										</tr>

										<tr align="left" valign="middle">
											<td className="data-left-aligned" width="20%">
												<Radio
													name="tagsType"
													inline={true}
													onChange={() => { this.handleRadioChange('byTags') }} >By Tags
												</Radio>
											</td>
											<td width="80%">
												<ul rel="sort" className="pull-left small-12 no-bullet list-style-type-none">
					                            	<span className="bold underline">Letter Status</span>
					                                <li className="margin-vert-1x">
				                                		{[{NAME:'Incoming', CODE: '1'}, {NAME:'Outgoing', CODE: '2'}].map((data) => {
					                            			const code = data.CODE
					                            			const name = data.NAME
					                            			return (
						                            			<Checkbox
						                            				name={code}
						                            				key={code}
						                            				checked={this.state.letterStatus.code}
						                            				onChange={() => { this.handleCheckBoxClick(code, this.state.letterStatus) }}>{name}</Checkbox>
					                            			)})
					                            		}
								                	</li>
					                            </ul>
												<ul rel="sort" className="pull-left small-12 no-bullet list-style-type-none">
				                            		<span className="bold underline">Department Name</span>
					                            	<li className="margin-vert-1x">
					                            		{this.departmentList.map((data) => {
					                            			const code = data.CODE
					                            			const name = data.NAME
					                            			return (
						                            			<Checkbox
						                            				name={code}
						                            				key={code}
						                            				checked={this.state.departmentName.code}
						                            				onChange={() => { this.handleCheckBoxClick(code, this.state.departmentName) }}>{name}</Checkbox>
					                            			)})
					                            		}
					                            	</li>
					                            </ul>

					                            <ul rel="sort" className="pull-left small-12 no-bullet list-style-type-none">
					                            	<span className="bold underline">Letter Type</span>
					                            	<li className="margin-vert-1x">
					                            		{this.letterTypeList.map((data) => {
					                            			const code = data.CODE
					                            			const name = data.NAME
					                            			return (
						                            			<Checkbox
						                            				name={code}
						                            				key={code}
						                            				checked={this.state.letterType.code}
						                            				onChange={() => { this.handleCheckBoxClick(code, this.state.letterType) }}>{name}</Checkbox>
					                            			)})
					                            		}
					                            	</li>
					                            </ul>

					                            <ul rel="sort" className="pull-left small-12 no-bullet list-style-type-none">
					                            	<span className="bold underline">Letter Tag</span>
					                            	<li className="margin-vert-1x">
					                            		{this.letterTagList.map((data) => {
					                            			const code = data.CODE
					                            			const name = data.NAME
					                            			return (
						                            			<Checkbox
						                            				name={code}
						                            				key={code}
						                            				checked={this.state.letterTag.code}
						                            				onChange={() => { this.handleCheckBoxClick(code, this.state.letterTag) }}>{name}</Checkbox>
					                            			)})
					                            		}
					                            	</li>
					                            </ul>

					                            <ul rel="sort" className="pull-left small-12 no-bullet list-style-type-none">
					                            	<span className="bold underline">Assigned Officer</span>
					                            	<li className="margin-vert-1x">
					                            		{this.assignedOfficerList.map((data) => {
					                            			const code = data.CODE
					                            			const name = data.NAME
					                            			return (
						                            			<Checkbox
						                            				name={code}
						                            				key={code}
						                            				checked={this.state.assignedOfficer.code}
						                            				onChange={() => { this.handleCheckBoxClick(code,this.state.assignedOfficer) }}>{name}</Checkbox>
					                            			)})
					                            		}
					                            	</li>
					                            </ul>
											</td>
										</tr>

										<tr align="left" valign="middle">
											<td className="data-left-aligned" width="20%">
												Select a format
											</td>
											<td width="80%" className="data-left-aligned">
												<Radio
													name="downloadFormat"
													inline={true}
													onChange={() => { this.handleFilterParams('downloadFormat', 'excel') }} >Excel
												</Radio>
												<Radio
													name="downloadFormat"
													inline={true}
													onChange={() => { this.handleFilterParams('downloadFormat', 'pdf') }} >PDF
												</Radio>

												{this.state.error.emptyDownloadFormat && <span className="error margin-left-5x">Please select a download format</span>}
											</td>
										</tr>

										<tr align="left" valign="middle">
											<td width="20%" className="data-left-aligned">
												<Button bsStyle="primary" onClick={this.downloadData}>Fetch Data</Button>
											</td>

											<td width="80%" className="data-left-aligned">
											{this.state.downloadData && this.state.filter.downloadFormat === 'excel' &&
												<CSVLink
													data={this.state.downloadData}
											  		filename={`${this.state.filter.month}.csv`}
											  		target="_blank"
											  		className="traditional-link"> Download Excel
												</CSVLink>
											}

											{this.state.downloadData && this.state.filter.downloadFormat === 'pdf' &&
												<span className="traditional-link cursor-pointer" onClick={this.handlePdfGeneration}>Download Pdf</span>
											}
											</td>
										</tr>

									</tbody>
								</Table>
							</td>
						</tr>
					</tbody>
				</Table>
			</Grid>
		)
	}
}

export default ExportLetterData