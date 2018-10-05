import React from 'react'
import _ from 'underscore'
import PropTypes from 'prop-types'
import { SearchFilterOptions } from './CommonComponent'
import { Grid, Row, Col, Checkbox, Button, ControlLabel, FormControl } from 'react-bootstrap'

class FilterComponent extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			formStatus : {
				approved : false,
				rejected : false,
				pending  : false,
			},
			letterStatus: {},
			letterType: {},
			letterTag: {},
			departmentName: {},
			assignedOfficer: {},
			searchTerm: '',
			queryField: ''
		}

		this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this)
		this.handleFilterParams = this.handleFilterParams.bind(this)
		this.resetAllFilters = this.resetAllFilters.bind(this)
		this.getSearchQueryField = this.getSearchQueryField.bind(this)
		this.setSearchTerm = this.setSearchTerm.bind(this)
	}

	componentDidMount() {
		const sortFilters = JSON.parse(localStorage.getItem('sortFilters'))
		const searchFilters = JSON.parse(localStorage.getItem('searchFilters'))

		if (sortFilters) {
			let newState = Object.keys(sortFilters).reduce(function(prev, current) {
		  		let val = sortFilters[current]
			  	if (!val) {
				    prev[current] = sortFilters[current]
			  	} else {
			    	prev[current] = Object.keys(val).reduce(function(p, c) {
		      			p[val[c]] = true
			      		return p
			    	}, {})
			  	}
			  	return prev
			}, {})

			console.log(this.state)

			this.setState(prevState => ({
				...prevState.searchTerm,
				...prevState.queryField,
				...newState
			}), () => {
				console.log(this.state)
			})
		}
	}

	handleCheckBoxClick(action, stateList) {
		let { formStatus, letterStatus, departmentName, letterType, letterTag, assignedOfficer } = this.state
		stateList[action] = !stateList[action]
		this.setState({ formStatus, letterStatus, departmentName, letterType, letterTag, assignedOfficer })
	}

	handleFilterParams() {
		const { formStatus, letterStatus, departmentName, letterType, letterTag, assignedOfficer } = this.state
		const sortFilters = {}
		sortFilters['formStatus'] = _.keys(_.pick(formStatus, (status) =>  status === true ))
		sortFilters['letterStatus'] = _.keys(_.pick(letterStatus, (status) =>  status === true ))
		sortFilters['letterTag'] = _.keys(_.pick(letterTag, (status) =>  status === true ))
		sortFilters['letterType'] = _.keys(_.pick(letterType, (status) =>  status === true ))
		sortFilters['departmentName'] = _.keys(_.pick(departmentName, (status) =>  status === true ))
		sortFilters['assignedOfficer'] = _.keys(_.pick(assignedOfficer, (status) =>  status === true ))

		const searchFilters = {'searchTerm': this.state.searchTerm, 'queryField': this.state.queryField}
		localStorage.setItem('sortFilters', JSON.stringify(sortFilters))
		localStorage.setItem('searchFilters', JSON.stringify(searchFilters))

		this.props.onApply(sortFilters, searchFilters)
	}

	resetAllFilters() {
		let formStatus = this.state.formStatus
		formStatus = _.mapObject(formStatus, () => false)
		this.setState({
			formStatus,
			searchTerm: '',
			queryField: ''
		})
	}

	getSearchQueryField(queryField) {
		if (queryField) {
			this.setState({ queryField })
		}
	}

	setSearchTerm(event) {
		const searchTerm = event.nativeEvent.target.value
		if (searchTerm) {
			this.setState({ searchTerm })
		}
	}

   	render() {
   		return (
			<Grid bsClass="filter-advanced">
				<Grid bsClass="margin-1x">
					<Row className="show-grid padding-0x margin-0x">
						<Col sm={12} md={12} lg={12}>
							<Col sm={12} className="pull-left">
								<Grid bsClass="pull-left margin-1x filter-group col-sm-12 padding-0x">
									<Grid bsClass="pull-left col-sm-12 columns padding-0x">
							            <h4 className="bold margin-left-3x">Filter By</h4>
							            <div className="pull-left col-sm-12 padding-0x">
							            	{this.props.for === 'fileManager' &&
						                        <ul rel="sort" className="pull-left small-12 no-bullet list-style-type-none">
					                                <li className="margin-vert-1x">
				                                		{[{NAME:'Approved', CODE: 'approved'}, {NAME:'Rejected', CODE: 'rejected'}, {NAME:'Pending', CODE: 'pending'}].map((data) => {
					                            			const code = data.CODE
					                            			const name = data.NAME
					                            			return (
						                            			<Checkbox
						                            				name={code}
						                            				key={code}
						                            				checked={this.state.formStatus.code}
						                            				onChange={() => { this.handleCheckBoxClick(code, this.state.formStatus) }}>{name}</Checkbox>
					                            			)})
					                            		}
								                	</li>
					                            </ul>
				                            }

				                            {this.props.for === 'letterManager' &&
				                            	<div className="pull-left">
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
						                            		{this.props.inputFieldsData.DEPARTMENT_NAME.map((data) => {
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
						                            		{this.props.inputFieldsData.LETTER_TYPE.map((data) => {
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
						                            		{this.props.inputFieldsData.LETTER_TAG.map((data) => {
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
						                            		{this.props.inputFieldsData.ASSIGNED_OFFICER.map((data) => {
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
						                        </div>
				                        	}
				                        </div>
							        </Grid>
							    </Grid>
							</Col>
						</Col>
						{this.props.for === 'fileManager' &&
							<Col sm={12} md={6} lg={6}>
								<Col sm={12} className="pull-left">
									<Grid bsClass="margin-1x filter-group small-12">
										<Grid bsClass="columns">
								            <h5 className="bold margin-left-3x">Search By</h5>
					                        <ul rel="sort" className="small-12 no-bullet list-style-type-none padding-vert-2x">
				                                <li className="margin-vert-1x">

				                                	<SearchFilterOptions onClick={this.getSearchQueryField} value={this.state.queryField}/>

				                                	<ControlLabel htmlFor="searchTerm">Search Query</ControlLabel>
				                                	<FormControl
				                                		type="text"
				                                		name="searchTerm"
				                                		value={this.state.searchTerm}
				                                		onChange={this.setSearchTerm}
				                                		placeholder="Enter your query to search"
			                                		/>
							                	</li>
				                            </ul>
								        </Grid>
								    </Grid>
								</Col>
							</Col>
						}
					</Row>
				</Grid>

				<Grid bsClass="clear full-width filter-action">
					<Button bsStyle="primary" className="primary pull-right margin-1x" onClick={this.handleFilterParams}>Filter</Button>
					<Button bsStyle="primary" className="primary pull-right margin-1x" onClick={this.resetAllFilters}>Reset</Button>
				    <Grid bsClass="clear"></Grid>
				</Grid>
			</Grid>
		)
   	}
}

FilterComponent.propTypes = {
	for: PropTypes.string,
	onApply: PropTypes.func,
	inputFieldsData: PropTypes.object
}

export default FilterComponent