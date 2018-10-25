import React from 'react'
import _ from 'underscore'
import config from 'config'
import moment from 'moment'
import { CSVLink } from 'react-csv'
import DatePicker from 'react-datepicker'
import pdfMake from 'pdfmake/build/pdfmake'
import { FormattedMessage } from 'react-intl'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { FileRecord } from './helpers/CommonHelper'
import { GetRecordsService } from './services/ApiServices'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import { Grid, Radio, Table, Button, Clearfix } from 'react-bootstrap'
import { PageHead, MonthDropDown, YearDropDown } from './uiComponents/CommonComponent'
import 'react-datepicker/dist/react-datepicker.css'
pdfMake.vfs = pdfFonts.pdfMake.vfs

class GetRecords extends React.Component {
	constructor(props) {
		super(props)

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
			}
		}

		this.handleRadioChange = this.handleRadioChange.bind(this)
		this.handleFilterParams = this.handleFilterParams.bind(this)
		this.downloadData = this.downloadData.bind(this)
		this.getDataBasedOnMonth = this.getDataBasedOnMonth.bind(this)
		this.getDataForSpecificPeriod = this.getDataForSpecificPeriod.bind(this)
		this.handlePdfGeneration = this.handlePdfGeneration.bind(this)
		this.buildTableBody = this.buildTableBody.bind(this)
		this.table = this.table.bind(this)
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
  	}

  	getDataBasedOnMonth() {
  		GetRecordsService.getDataBasedOnSelectedMonth(this.state.filter.month, this.state.filter.year).then((res) => {
	        this.setState({downloadData : res.data.data})
      	})
  	}

  	getDataForSpecificPeriod() {
  		GetRecordsService.getDataForSpecificPeriod(this.state.filter.startDate, this.state.filter.endDate).then((res) => {
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
  		   	mangal: {
	     		normal: 'mangal.ttf',
	     		bold: 'mangal.ttf',
  		     	italics: 'mangal.ttf',
  		     	bolditalics: 'mangal.ttf'
  		   	},
  		   	roboto: {
	     		normal: 'roboto.ttf',
	     		bold: 'roboto.ttf',
  		     	italics: 'roboto.ttf',
  		     	bolditalics: 'roboto.ttf'
  		   	}
	   	}
  		var pdfLayout = {
  			pageSize: 'A2',
  		    content: [
  		        this.table(this.state.downloadData, ['APPLICANT_NAME', 'APPLICANT_ADDRESS', 'APPLICANT_CONTACT', 'BUILDING_NAME', 'BUILDING_ADDRESS', 'BUILDING_AREA', 'FILE_NUMBER', 'FILE_STATUS', 'CREATED', 'REMARK'])
  		    ],
  		    defaultStyle: {
  		        font: 'roboto',
  		        fontSize: 12,
  		        alignment: 'center'
		    }
  		}
  		pdfMake.createPdf(pdfLayout).download()
  	}

	render() {
		return (
			<Grid bsClass="get-records">
				<BreadcrumbsItem to={FileRecord.getAbsolutePath('getRecords')}> Get Records </BreadcrumbsItem>
				<PageHead title="Get Records" />
				<Grid bsClass="green-top bg-white">
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
														onChange={() => { this.handleRadioChange('monthType') }} >
														<FormattedMessage id="fileManager.getRecords.byMonthSection.title" defaultMessage="By Month" />
													</Radio>
												</td>

												<td width="80%">
													<Grid bsClass="pull-left">
														<FormattedMessage id="fileManager.getRecords.byMonthSection.year" defaultMessage="Year:" />
														<br />
														<YearDropDown
															onClick={this.handleFilterParams}
														/>
													</Grid>

													<Clearfix />

													<Grid bsClass="pull-left">
														<FormattedMessage id="fileManager.getRecords.byMonthSection.month" defaultMessage="Month:" />
														<br />
														<MonthDropDown
															onClick={this.handleFilterParams}
														/>
													</Grid>

													<Clearfix />

													{this.state.error.monthError &&
														<Grid componentClass="span" bsClass="error">
															<FormattedMessage id="fileManager.getRecords.byMonthSection.errMsg" defaultMessage="Please select both year and month" />
														</Grid>
													}

												</td>
											</tr>

											<tr align="left" valign="middle">
												<td className="data-left-aligned" width="20%">
													<Radio
														name="periodType"
														inline={true}
														onChange={() => { this.handleRadioChange('specificPeriodType') }} >
														<FormattedMessage id="fileManager.getRecords.specificPeriodSection.title" defaultMessage="Specific Period" />
													</Radio>
												</td>

												<td width="80%">
													<div>
														<FormattedMessage id="fileManager.getRecords.specificPeriodSection.from" defaultMessage="From:" />
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

													<div>
														<FormattedMessage id="fileManager.getRecords.specificPeriodSection.to" defaultMessage="To:" />
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

													{this.state.error.specificPeriodError &&
														<Grid componentClass="span" bsClass="error">
															<FormattedMessage id="fileManager.getRecords.specificPeriodSection.errMsg" defaultMessage="Please select both start date and end date" />
														</Grid>
													}

												</td>
											</tr>

											<tr align="left" valign="middle">
												<td className="data-left-aligned" width="20%">
													<FormattedMessage id="fileManager.getRecords.selectFormatSection.title" defaultMessage="Select a format" />
												</td>
												<td width="80%" className="data-left-aligned">
													<Radio
														name="downloadFormat"
														inline={true}
														onChange={() => { this.handleFilterParams('downloadFormat', 'excel') }} >
														<FormattedMessage id="fileManager.getRecords.selectFormatSection.excel" defaultMessage="Excel" />
													</Radio>
													<Radio
														name="downloadFormat"
														inline={true}
														onChange={() => { this.handleFilterParams('downloadFormat', 'pdf') }} >
														<FormattedMessage id="fileManager.getRecords.selectFormatSection.pdf" defaultMessage="PDF" />
													</Radio>

													{this.state.error.emptyDownloadFormat &&
														<Grid componentClass="span" bsClass="error margin-left-5x">
															<FormattedMessage id="fileManager.getRecords.selectFormatSection.errMsg" defaultMessage="Please select a download format" />
														</Grid>
													}
												</td>
											</tr>

											<tr align="left" valign="middle">
												<td width="20%" className="data-left-aligned">
													<Button className="green-btn" onClick={this.downloadData}>
														<FormattedMessage id="fileManager.getRecords.fetchDataBtn" defaultMessage="Fetch Data" />
													</Button>
												</td>

												<td width="80%" className="data-left-aligned">
												{this.state.downloadData && this.state.filter.downloadFormat === 'excel' &&
													<CSVLink
														data={this.state.downloadData}
												  		filename={`${this.state.filter.month}.csv`}
												  		target="_blank"
												  		className="traditional-link">
												  		<FormattedMessage id="fileManager.getRecords.downloadExcelLink" defaultMessage="Download Excel" />
													</CSVLink>
												}

												{this.state.downloadData && this.state.filter.downloadFormat === 'pdf' &&
													<Grid componentClass="span" bsClass="traditional-link cursor-pointer" onClick={this.handlePdfGeneration}>
														<FormattedMessage id="fileManager.getRecords.downloadPdfLink" defaultMessage="Download Pdf" />
													</Grid>
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
			</Grid>
		)
	}
}

export default GetRecords