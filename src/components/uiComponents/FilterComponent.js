import React from 'react'
import _ from 'underscore'
import PropTypes from 'prop-types'
import { SearchFilterOptions } from './CommonComponent'
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl'
import { Grid, Row, Col, Checkbox, Button, ControlLabel, FormControl, ListGroup } from 'react-bootstrap'

const messages = defineMessages({
    searchBoxPlaceholder: {
		id: 'common.filter.searchBoxPlaceholder',
        defaultMessage: 'Enter your query to search',
    },
    approved: {
    	id: 'common.general.approved',
    	defaultMessage: 'Approved',
    },
    pending: {
    	id: 'common.general.pending',
    	defaultMessage: 'Pending',
    },
    rejected: {
    	id: 'common.general.rejected',
    	defaultMessage: 'Rejected',
    },
    incoming: {
    	id: 'common.general.incoming',
    	defaultMessage: 'Incoming'
    },
    outgoing: {
    	id: 'common.general.outgoing',
    	defaultMessage: 'Outgoing'
    }

})

class FilterComponent extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			fileStatus : {
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
			queryField: '',
			readOnly: true
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

			this.setState(prevState => ({
				...prevState.searchTerm,
				...prevState.queryField,
				...newState
			}))

			if (searchFilters) {
				this.setState({
					searchTerm: searchFilters.searchTerm,
					queryField: searchFilters.queryField
				})
			}
		}
	}

	handleCheckBoxClick(action, stateList) {
		let { fileStatus, letterStatus, departmentName, letterType, letterTag, assignedOfficer } = this.state
		stateList[action] = !stateList[action]
		this.setState({ fileStatus, letterStatus, departmentName, letterType, letterTag, assignedOfficer })
	}

	handleFilterParams() {
		const { fileStatus, letterStatus, departmentName, letterType, letterTag, assignedOfficer } = this.state
		const sortFilters = {}
		sortFilters['fileStatus'] = _.keys(_.pick(fileStatus, (status) =>  status === true ))
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
		let fileStatus = this.state.fileStatus
		fileStatus = _.mapObject(fileStatus, () => false)
		this.setState({
			fileStatus,
			searchTerm: '',
			queryField: ''
		})
	}

	getSearchQueryField(event) {
		const element = event.nativeEvent.target
		this.setState((prevState) => ({
		    ...prevState,
		    [element.name]: element.value
		}))
		_.isEmpty(element.value) ? this.setState({ readOnly: true }) : this.setState({ readOnly: false })
	}

	setSearchTerm(event) {
		const element = event.nativeEvent.target
		this.setState((prevState) => ({
		    ...prevState,
		    [element.name]: element.value
		}))
	}

   	render() {
   		const { intl } = this.props
   		return (
			<Grid bsClass="filter-advanced">
				<Grid bsClass="margin-1x">
					<Row className="show-grid padding-0x margin-0x">
						<Col className={`${this.props.for === 'fileManager'? 'col-sm-6' : 'col-sm-12'}`}>
							<Col sm={12} className="pull-left">
								<Grid bsClass="pull-left margin-1x filter-group col-sm-12 padding-0x">
									<Grid bsClass="pull-left col-sm-12 columns padding-0x">
										<Grid componentClass="h4" bsClass="bold margin-left-3x">
											<FormattedMessage id="common.filter.mainHeading" defaultMessage="Filter By" />
										</Grid>
							            <Grid bsClass="pull-left col-sm-12 padding-0x">
							            	{this.props.for === 'fileManager' &&
							            		<ListGroup componentClass="ul" bsClass="no-bullet list-style-type-none">
					                                <ListGroup componentClass="li" bsClass="margin-vert-1x">
				                                		{[{NAME:intl.formatMessage(messages.approved), CODE: 'approved'}, {NAME:intl.formatMessage(messages.rejected), CODE: 'rejected'}, {NAME:intl.formatMessage(messages.pending), CODE: 'pending'}].map((data) => {
					                            			const code = data.CODE
					                            			const name = data.NAME
					                            			return (
						                            			<Checkbox
						                            				name={code}
						                            				key={code}
						                            				checked={this.state.fileStatus[code] || false}
						                            				onChange={() => { this.handleCheckBoxClick(code, this.state.fileStatus) }}>{name}</Checkbox>
					                            			)})
					                            		}
								                	</ListGroup>
					                            </ListGroup>
				                            }

				                            {this.props.for === 'letterManager' &&
				                            	<Grid bsClass="pull-left">
						                            <ListGroup componentClass="ul" bsClass="pull-left small-12 no-bullet list-style-type-none">
						                            	<Grid componentClass="span" bsClass="bold underline">
						                            		<FormattedMessage id="letterTracking.newLetterEntryForm.status" />
						                            	</Grid>
						                                <ListGroup componentClass="li" bsClass="margin-vert-1x">
					                                		{[{NAME: intl.formatMessage(messages.incoming), CODE: '1'}, {NAME: intl.formatMessage(messages.outgoing), CODE: '2'}].map((data) => {
						                            			const code = data.CODE
						                            			const name = data.NAME
						                            			return (
							                            			<Checkbox
							                            				name={code}
							                            				key={code}
							                            				checked={this.state.letterStatus[code] || false}
							                            				onChange={() => { this.handleCheckBoxClick(code, this.state.letterStatus) }}>{name}</Checkbox>
						                            			)})
						                            		}
									                	</ListGroup>
						                            </ListGroup>

						                            <ListGroup componentClass="ul" bsClass="pull-left small-12 no-bullet list-style-type-none">
						                            	<Grid componentClass="span" bsClass="bold underline">
						                            		<FormattedMessage id="letterTracking.newLetterEntryForm.deptName" />
						                            	</Grid>
						                            	<ListGroup componentClass="li" bsClass="margin-vert-1x">
						                            		{this.props.inputFieldsData.DEPARTMENT_NAME.map((data) => {
						                            			const code = data.CODE
						                            			const name = data.NAME
						                            			return (
							                            			<Checkbox
							                            				name={code}
							                            				key={code}
							                            				checked={this.state.departmentName[code] || false}
							                            				onChange={() => { this.handleCheckBoxClick(code, this.state.departmentName) }}>{name}</Checkbox>
						                            			)})
						                            		}
						                            	</ListGroup>
						                            </ListGroup>

						                            <ListGroup componentClass="ul" bsClass="pull-left small-12 no-bullet list-style-type-none">
						                            	<Grid componentClass="span" bsClass="bold underline">
						                            		<FormattedMessage id="letterTracking.newLetterEntryForm.type" />
						                            	</Grid>
						                            	<ListGroup componentClass="li" bsClass="margin-vert-1x">
						                            		{this.props.inputFieldsData.LETTER_TYPE.map((data) => {
						                            			const code = data.CODE
						                            			const name = data.NAME
						                            			return (
							                            			<Checkbox
							                            				name={code}
							                            				key={code}
							                            				checked={this.state.letterType[code] || false}
							                            				onChange={() => { this.handleCheckBoxClick(code, this.state.letterType) }}>{name}</Checkbox>
						                            			)})
						                            		}
						                            	</ListGroup>
						                            </ListGroup>

						                            <ListGroup componentClass="ul" bsClass="pull-left small-12 no-bullet list-style-type-none">
						                            	<Grid componentClass="span" bsClass="bold underline">
						                            		<FormattedMessage id="letterTracking.newLetterEntryForm.tag" />
						                            	</Grid>
						                            	<ListGroup componentClass="li" bsClass="margin-vert-1x">
						                            		{this.props.inputFieldsData.LETTER_TAG.map((data) => {
						                            			const code = data.CODE
						                            			const name = data.NAME
						                            			return (
							                            			<Checkbox
							                            				name={code}
							                            				key={code}
							                            				checked={this.state.letterTag[code] || false}
							                            				onChange={() => { this.handleCheckBoxClick(code, this.state.letterTag) }}>{name}</Checkbox>
						                            			)})
						                            		}
						                            	</ListGroup>
						                            </ListGroup>

						                            <ListGroup componentClass="ul" bsClass="pull-left small-12 no-bullet list-style-type-none">
						                            	<Grid componentClass="span" bsClass="bold underline">
						                            		<FormattedMessage id="letterTracking.newLetterEntryForm.assignedOfficer" />
						                            	</Grid>
						                            	<ListGroup componentClass="li" bsClass="margin-vert-1x">
						                            		{this.props.inputFieldsData.ASSIGNED_OFFICER.map((data) => {
						                            			const code = data.CODE
						                            			const name = data.NAME
						                            			return (
							                            			<Checkbox
							                            				name={code}
							                            				key={code}
							                            				checked={this.state.assignedOfficer[code] || false}
							                            				onChange={() => { this.handleCheckBoxClick(code,this.state.assignedOfficer) }}>{name}</Checkbox>
						                            			)})
						                            		}
						                            	</ListGroup>
						                            </ListGroup>
						                        </Grid>
				                        	}
				                        </Grid>
							        </Grid>
							    </Grid>
							</Col>
						</Col>
						{this.props.for === 'fileManager' &&
							<Col sm={12} md={6} lg={6}>
								<Col sm={12} className="pull-left">
									<Grid bsClass="margin-1x filter-group small-12">
										<Grid bsClass="columns">
								            <Grid componentClass="h5" bsClass="bold margin-left-3x">
								            	<FormattedMessage id="common.filter.searchPanelHeading" defaultMessage="Search By" />
								            </Grid>
					                        <ListGroup componentClass="ul" bsClass="small-12 no-bullet list-style-type-none padding-vert-2x">
				                                <ListGroup componentClass="li" bsClass="margin-vert-1x">
				                                	<SearchFilterOptions name="queryField" onClick={this.getSearchQueryField} value={this.state.queryField}/>
				                                	<ControlLabel htmlFor="searchTerm">
				                                		<FormattedMessage id="common.filter.searchBoxHeading" defaultMessage="Search Query" />
				                                	</ControlLabel>
				                                	<FormControl
				                                		readOnly={this.state.readOnly}
				                                		type="text"
				                                		name="searchTerm"
				                                		value={this.state.searchTerm}
				                                		onChange={this.setSearchTerm}
				                                		placeholder={intl.formatMessage(messages.searchBoxPlaceholder)}
			                                		/>
							                	</ListGroup>
				                            </ListGroup>
								        </Grid>
								    </Grid>
								</Col>
							</Col>
						}
					</Row>
				</Grid>

				<Grid bsClass="clear full-width filter-action">
					<Button className="primary green-btn pull-right margin-1x" onClick={this.handleFilterParams}>
						<FormattedMessage id="common.filter.filterBtn" defaultMessage="Filter" />
					</Button>
					<Button className="primary green-btn pull-right margin-1x" onClick={this.resetAllFilters}>
						<FormattedMessage id="common.filter.resetBtn" defaultMessage="Reset" />
					</Button>
				    <Grid bsClass="clear"></Grid>
				</Grid>
			</Grid>
		)
   	}
}

FilterComponent.propTypes = {
	for: PropTypes.string,
	onApply: PropTypes.func,
	intl: PropTypes.object,
	inputFieldsData: PropTypes.object
}

export default injectIntl(FilterComponent)