import React from 'react'
import { Grid } from 'react-bootstrap'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import { PageHead, LoadingSpinner } from './uiComponents/CommonComponent'

class ManageSystemInputs extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			showLoading: false
		}
	}

	render() {
		return (
			<Grid bsClass="manage-system-inputs">
				<BreadcrumbsItem glyph='cog' to={'/servicePanel/fileManager/ManageSystemInputs'}> Manage System Inputs </BreadcrumbsItem>
				<PageHead title="Import" />
				{this.state.showLoading && <LoadingSpinner />}
			</Grid>
		)
	}
}

export default ManageSystemInputs