import React from 'react'
import { Grid, Row, Col, Checkbox, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import _ from 'lodash'

class FilterComponent extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			formStatus : {
				approved : true,
				rejected : true,
				pending  : true
			}
		}

		this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this)
		this.handleFilterParams = this.handleFilterParams.bind(this)
		this.resetAllFilters = this.resetAllFilters.bind(this)
	}

	handleCheckBoxClick(action) {
		let { formStatus } = this.state
		formStatus[action] = !formStatus[action]
		this.setState({ formStatus })
	}

	handleFilterParams() {
		const { formStatus } = this.state
		this.props.onApply(_.keys(_.pickBy(formStatus)))
	}

	resetAllFilters() {
		let formStatus = this.state.formStatus
		formStatus = _.mapValues(formStatus, () => false)
		this.setState({ formStatus })
	}

   	render() {
   		return (
			<Grid bsClass="filter-advanced">
				<Grid bsClass="margin-1x">
					<Row className="show-grid padding-0x margin-0x">
						<Col sm={12} md={6} lg={6}>
							<Col sm={12} className="pull-left">
								<Grid bsClass="left margin-1x filter-group small-12">
									<Grid bsClass="columns">
							            <h5 className="">Sort By</h5>
				                        <ul rel="sort" className="no-bu left small-12 no-bullet list-style-type-none">
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