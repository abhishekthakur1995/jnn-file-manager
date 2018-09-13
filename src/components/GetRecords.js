import React from 'react'
import { Grid, Radio, Table, Button, Clearfix } from 'react-bootstrap'
import { PageHead, MonthDropDown, YearDropDown } from './uiComponents/CommonComponent'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import config from 'config'
import 'react-datepicker/dist/react-datepicker.css'
import _ from 'lodash'

class GetRecords extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
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
  		}

  		if (this.state.filter.type === 'monthType' && (_.isEmpty(this.state.filter.month) || _.isEmpty(this.state.filter.year))) {
  			this.setState({ error : { monthError: true } })
  		}

  		if (this.state.filter.type === 'specificPeriodType' && (_.isEmpty(this.state.filter.startDate) || _.isEmpty(this.state.filter.endDate))) {
  			this.setState({ error : { specificPeriodError: true } })
  		}
  	}

	render() {
		return (
			<Grid bsClass="get-records">
				<PageHead title="Get Records" />

				<Table bordered className="table" width="100%">
					<tbody>
						<tr width="100%">
							<td width="80%">
								<Table className="formtable" border="0" cellSpacing="0" cellPadding="2" width="100%">
									<tbody>

										<tr align="left" valign="middle">
											<td className="data-left-aligned" width="20%">
												Account Number
											</td>
											<td className="data-left-aligned" width="80%">
												32776121111234
											</td>
										</tr>

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
												Select a format
											</td>
											<td width="80%" className="data-left-aligned">
												<Radio
													name="downloadFormat"
													inline={true}
													onChange={(e) => { this.handleFilterParams('downloadFormat', 'excel') }} >Excel
												</Radio>
												<Radio
													name="downloadFormat"
													inline={true}
													onChange={(e) => { this.handleFilterParams('downloadFormat', 'pdf') }} >PDF
												</Radio>

												{this.state.error.emptyDownloadFormat && <span className="error margin-left-5x">Please select a download format</span>}
											</td>
										</tr>

										<tr align="left" valign="middle">
											<td width="20%" colSpan="2" className="data-left-aligned">
												<Button bsStyle="primary" onClick={this.downloadData}>Download</Button>
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

export default GetRecords