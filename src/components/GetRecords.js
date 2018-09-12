import React from 'react'
import { Grid, Radio, Table } from 'react-bootstrap'
import { PageHead } from './uiComponents/CommonComponent'

class GetRecords extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			radioType: 'month',
			date: new Date()
		}

		this.handleRadioChange = this.handleRadioChange.bind(this)
	}

	handleRadioChange(radioType, checked) {
		// console.log(radioType)
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
											<td width="80%">
												32776121111234
											</td>
										</tr>

										<tr>
											<td width="20%" colSpan="2" className="data-left-aligned">
												<Radio
													name="radioGroup"
													inline={true}
													onChange={(e) => { this.handleRadioChange('year', e.target.checked) }} >By Year
												</Radio>
											</td>
										</tr>

										<tr align="left" valign="middle">
											<td className="data-left-aligned" width="20%">
												<span>Specific Period</span>
											</td>

											<td width="80%">
												<div>From:&nbsp;
													<input autoComplete="off" name="frmDatePicker" id="frmDatePicker" type="text" disabled />
												</div>
												<br />

												<div>&nbsp;&nbsp;&nbsp;To:&nbsp;
													<input autoComplete="off" name="toDatePicker" id="toDatePicker" type="text" disabled />
												</div>
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