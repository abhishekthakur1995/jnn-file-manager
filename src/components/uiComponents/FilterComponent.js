import React from 'react'
import { Grid, Row, Col, Checkbox, Button, ControlLabel, FormControl } from 'react-bootstrap'
import { SearchFilterOptions } from './CommonComponent'
import PropTypes from 'prop-types'
import _ from 'lodash/core'

class FilterComponent extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			formStatus : {
				approved : true,
				rejected : true,
				pending  : true
			},
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
		// need to maintain filter state of components
		// get the filters from localStorageService and set them
		const sortFilters = JSON.parse(localStorage.getItem('sortFilters'))
		const searchFilters = JSON.parse(localStorage.getItem('searchFilters'))
		if (sortFilters) {
			this.setState(prevState => ({
		  		formStatus: Object.keys(prevState.formStatus).reduce((newState, item) => ({
		    		...newState,
		    	    [item]: sortFilters.includes(item)
		    	}), {})
			}))
		}

		if (searchFilters) {
			this.setState({
				searchTerm: searchFilters.searchTerm,
				queryField: searchFilters.queryField
			})
		}
	}

	handleCheckBoxClick(action) {
		let { formStatus } = this.state
		formStatus[action] = !formStatus[action]
		this.setState({ formStatus })
	}

	handleFilterParams() {
		const { formStatus } = this.state
		const sortFilters = _.keys(_.pickBy(formStatus))
		const searchFilters = {'searchTerm': this.state.searchTerm, 'queryField': this.state.queryField}

		localStorage.setItem('sortFilters', JSON.stringify(sortFilters))
		localStorage.setItem('searchFilters', JSON.stringify(searchFilters))

		this.props.onApply(sortFilters, searchFilters)
	}

	resetAllFilters() {
		let formStatus = this.state.formStatus
		formStatus = _.mapValues(formStatus, () => false)
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
						<Col sm={12} md={6} lg={6}>
							<Col sm={12} className="pull-left">
								<Grid bsClass="margin-1x filter-group small-12">
									<Grid bsClass="columns">
							            <h5 className="bold margin-left-3x">Filter By</h5>
				                        <ul rel="sort" className="small-12 no-bullet list-style-type-none">
			                                <li className="margin-vert-1x">
		                                		<Checkbox
		                                			name="approved"
		                                			checked={this.state.formStatus.approved}
		                                			onChange={() => { this.handleCheckBoxClick('approved') }} > Accepted
		                                		</Checkbox>

		                                		<Checkbox
		                                			name="rejected"
		                                			checked={this.state.formStatus.rejected}
		                                			onChange={() => { this.handleCheckBoxClick('rejected') }} > Rejected
		                                		</Checkbox>

		                                		<Checkbox
		                                			name="pending"
		                                			checked={this.state.formStatus.pending}
		                                			onChange={() => { this.handleCheckBoxClick('pending') }} > Pending
		                                		</Checkbox>
						                	</li>
			                            </ul>
							        </Grid>
							    </Grid>
							</Col>
						</Col>

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
	onApply: PropTypes.func
}

export default FilterComponent