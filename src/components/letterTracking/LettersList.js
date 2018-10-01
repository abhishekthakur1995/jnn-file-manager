import React from 'react'
import config from 'config'
import _ from 'underscore'
import SingleLetter from './SingleLetter'
import { Grid, Table, Checkbox } from 'react-bootstrap'
import { LetterTracking } from './../helpers/CommonHelper'
import { LettersService } from './../services/ApiServices'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import FilterComponent from './../uiComponents/FilterComponent'
import { NewLetterEntryFormService } from './../services/ApiServices'
import PaginationComponent from './../uiComponents/PaginationComponent'
import { PageHead, LoadingSpinner, QuickSearchComponent, TableFunctionalityBase, FilterButton, NoData } from './../uiComponents/CommonComponent'

class LettersList extends React.Component {
	constructor(props) {
		super(props)

		this.appliedPageSize = 10

		this.state = {
			letters:[],
			totalLetters: 0,
			currentPage: null,
			quickSearchEnabled: false,
			searchTerm: null,
			showLoading: false,
			showFilter: false,
			filterApplied: false,
			sortFilters: [],
			searchFilters: {},
			sortFieldCriteria: 'asc',
			sortField: '',
			customPageSizeApplied: false,
			pageSize: config.pagination.pageSize
		}

		this.handleRecordUpdate = this.handleRecordUpdate.bind(this)
		this.handleQuickSearch = this.handleQuickSearch.bind(this)
		this.removeQuickSearch = this.removeQuickSearch.bind(this)
		this.handleInitialLoad = this.handleInitialLoad.bind(this)
		this.onPageChanged = this.onPageChanged.bind(this)
		this.toggleFilter = this.toggleFilter.bind(this)
		this.applyFilter = this.applyFilter.bind(this)
		this.sortField = this.sortField.bind(this)
		this.handlePageSizeChange = this.handlePageSizeChange.bind(this)
	}

	componentDidMount() {
		// need to reset local storage applied filter when the page refreshes/new view is rendered.
		localStorage.setItem('sortFilters', null)
		localStorage.setItem('searchFilters', null)

		this.appliedPageSize = this.state.pageSize
		LettersService.getCountOfAllLetters().then((response) => {
			NewLetterEntryFormService.getInputFieldsData().then(res => {
	            this.inputFieldsData = res.data.data
	            this.setState({ totalLetters: response.data.data[0].count })
	        })
		})
	}

	componentDidUpdate() {
		if (this.state.customPageSizeApplied) {
			this.appliedPageSize = this.state.pageSize
		}
	}

	componentWillUnmount() {
		// remove the applied filter key from local storage once this component is unmounted.
		// this code cannot be placed in the filter component as it unmount will run every time the filter is closed.
		localStorage.setItem('sortFilters', null)
		localStorage.setItem('searchFilters', null)
	}

	handleRecordUpdate(updatedLeter) {
		this.setState(prevState => ({
			letters: prevState.letters.map(
				letter => (letter.ID !== updatedLeter.ID) ? letter : updatedLeter
			)
		}))
	}

	onPageChanged(data) {
		if (this.state.filterApplied) {
			this.applyFilter(this.state.sortFilters, this.state.searchFilters, data)
		} else if (this.state.quickSearchEnabled) {
			this.handleQuickSearch(this.state.searchTerm, data)
		} else {
			this.handleInitialLoad(data)
		}
	}

	handleInitialLoad(data) {
		this.setState({ showLoading: true })
		const { currentPage, pageLimit } = data
		let queryUrl = `${config.baseUrl}/letters/getRecords?page=${currentPage}&limit=${pageLimit}`
		if (this.state.sortField) {
			queryUrl += `&sortField=${this.state.sortField}&orderBy=${this.state.sortFieldCriteria}`
		}

      	LettersService.getRecords(queryUrl).then((res) => {
      		this.setState({
	        	totalLetters: res.data.totalCount,
	        	letters: res.data.data,
	        	showLoading: false,
	        	currentPage
	        })
      	})
	}

	sortField(sortField) {
		if (this.state.sortField && this.state.sortField === sortField) {
			this.setState({
				sortFieldCriteria: (this.state.sortFieldCriteria === 'asc') ? 'desc' : 'asc'
			})
		}
		this.setState({sortField}, () => {
			this.handleInitialLoad({currentPage: 1, pageLimit: this.appliedPageSize})
		})
	}

	handleQuickSearch(searchTerm, data) {
		if (searchTerm) {
			this.setState({ showLoading: true })
			const page = data && data.currentPage || this.state.currentPage
			const searchData = {searchTerm: searchTerm, page, limit: this.appliedPageSize}
			LettersService.getSearchResults(searchData).then((res) => {
				this.setState({
					totalLetters: res.data.totalCount,
					letters: res.data.data,
					quickSearchEnabled: true,
					showLoading: false,
					searchTerm
				})
			})
	    }
	}

	removeQuickSearch() {
		this.setState({ quickSearchEnabled: false })
		this.handleInitialLoad({currentPage: 1, pageLimit: this.appliedPageSize})
	}

	applyFilter(sortFilters, searchFilters, data) {
		if (!_.isEmpty(sortFilters) || !_.isEmpty(searchFilters)) {
			this.setState({ showLoading: true })
			const page = data && data.currentPage || this.state.currentPage
			const filterData = { page, limit: this.appliedPageSize, sortFilters, searchFilters }
			LettersService.getFilteredData(filterData).then((res) => {
				this.setState({
					totalLetters: res.data.totalCount,
					letters: res.data.data,
					filterApplied: true,
					showLoading: false,
					showFilter: false,
					sortFilters,
					searchFilters
				})
			})
      	}
	}

	handlePageSizeChange(pageSize) {
		this.setState({ customPageSizeApplied: true, pageSize: parseInt(pageSize) }, () => {
			this.handleInitialLoad({currentPage: 1, pageLimit: this.appliedPageSize})
		})
	}

	toggleFilter() {
		this.setState({ showFilter: !this.state.showFilter })
	}

	render() {
		let filteredRecords = this.state.letters
		if (_.isEmpty(filteredRecords)) {
			filteredRecords = <NoData colSpan={8} />
		} else {
			filteredRecords = filteredRecords.map(function(letter, index) {
				return (
					<SingleLetter
						key={index}
						index={index}
						singleLetter={letter}
						onUpdate={this.handleRecordUpdate} />
				)
			}.bind(this))
		}

		const pagination = this.state.totalLetters > 0 ?
			(
				<PaginationComponent
					totalRecords={this.state.totalLetters}
            		pageLimit={this.appliedPageSize}
            		pageNeighbours={config.pagination.neighbourSize}
            		onPageChanged={this.onPageChanged}
				/>
			) : null

		const quickSearch = <QuickSearchComponent search={this.handleQuickSearch} remove={this.removeQuickSearch} enabled={this.state.quickSearchEnabled} />

		const filterBtn = <FilterButton onClick={this.toggleFilter} upCheveron={this.state.showFilter} />

		const filterComponent = <FilterComponent for={'letterManager'} inputFieldsData={this.inputFieldsData} onApply={this.applyFilter} />

		return (
			<Grid bsClass="record-list">
				<BreadcrumbsItem glyph='lock' to={LetterTracking.getLetterTrackingAbsolutePath('manageLetters')}> Manage Letters </BreadcrumbsItem>
				{this.state.showLoading && <LoadingSpinner />}
				<PageHead
					title="Manage Letters"
					pagination={pagination}
					quickSearch={quickSearch}
					filter={filterBtn}
				/>
				{this.state.showFilter && filterComponent}
				<Table hover bordered className="record-table margin-bottom-0x">
                    <thead>
                        <tr>
                        	<th
                            	className={`cursor-pointer ${this.state.sortField === 'DEPARTMENT_NAME' ? (this.state.sortFieldCriteria === 'asc' ? 'asc-box-shadow' : 'desc-box-shadow') : ''}`}
                            	onClick={() => this.sortField('DEPARTMENT_NAME')}>DEPARTMENT_NAME
                        	</th>
                        	<th
                            	className={`cursor-pointer ${this.state.sortField === 'ASSIGNED_OFFICER' ? (this.state.sortFieldCriteria === 'asc' ? 'asc-box-shadow' : 'desc-box-shadow') : ''}`}
                            	onClick={() => this.sortField('ASSIGNED_OFFICER')}>ASSIGNED_OFFICER
                        	</th>
                    		<th>LETTER_TYPE</th>
                            <th>LETTER_TAG</th>
                            <th>LETTER_SUBJECT</th>
                            <th>LETTER_REG_NO</th>
                            <th>LETTER_STATUS</th>
                            <th
                           		className={`cursor-pointer ${this.state.sortField === 'CREATED' ? (this.state.sortFieldCriteria === 'asc' ? 'asc-box-shadow' : 'desc-box-shadow') : ''}`}
                        		onClick={() => this.sortField('CREATED')}>CREATED
                    		</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
						{filteredRecords}
					</tbody>
				</Table>
				{this.state.totalLetters > 0 && <TableFunctionalityBase
					onPageSizeChange={this.handlePageSizeChange} />
				}
			</Grid>
		)
	}
}

export default LettersList