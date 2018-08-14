import React from 'react'
import { SplitButton, MenuItem } from 'react-bootstrap'
import { EditRecordModal, DeleteRecordModal } from './uiComponents/CommonComponent'
import PropTypes from 'prop-types'

class Record extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			showEditModal: false,
			showDeleteModal: false
		}

		this.showModal = this.showModal.bind(this)
		this.handleModalClose = this.handleModalClose.bind(this)
		this.handleUpdate = this.handleUpdate.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}

	showModal(e) {
		switch (e.target.id) {
			case 'edit':
				this.setState({showEditModal: true})
			break

			case 'delete':
				this.setState({showDeleteModal: true})
			break
		}
	}

	handleModalClose() {
		this.setState({
			showEditModal: false,
			showDeleteModal: false
		})
	}

	// gets the updated record from EntryForm
	// pass the updated record to record list
	handleUpdate(updatedRecord) {
		updatedRecord.ID = this.props.singleRecord.ID
		this.props.onUpdate(updatedRecord)
	}

	handleDelete() {
		this.props.onDelete(this.props.singleRecord.ID)
		this.handleModalClose()
	}

	render() {
		const record = this.props.singleRecord
		return (
			<tr>
				<td>{this.props.index+1}</td>
			    <td>{record.APPLICANT_NAME} </td>
			    <td>{record.APPLICANT_ADDRESS}</td>
			    <td>{record.APPLICANT_CONTACT}</td>
			    <td>{record.BUILDING_NAME}</td>
			    <td>{record.FILE_NUMBER}</td>
			    <td>
			    	<SplitButton title="Manage" pullRight id="split-button-pull-right">
						<MenuItem id="view" eventKey="1">View</MenuItem>
  						<MenuItem id="edit" eventKey="2" onClick={this.showModal}>Edit</MenuItem>
  						<MenuItem id="delete" eventKey="3" onClick={this.showModal}>Delete</MenuItem>
					</SplitButton>
				</td>

				<EditRecordModal
					show={this.state.showEditModal}
					onHide={this.handleModalClose}
					handleModalClose={this.handleModalClose}
					dialogClassName="width-9x"
					modalTitle="Edit record"
					onUpdate={this.handleUpdate}
					record={record}>
				</EditRecordModal>

				<DeleteRecordModal
					show={this.state.showDeleteModal}
					onHide={this.handleModalClose}
					handleModalClose={this.handleModalClose}
					onDelete={this.handleDelete}
					modalTitle="Delete record">
				</DeleteRecordModal>
			</tr>
		)
	}
}

Record.propTypes = {
	index: PropTypes.number,
    singleRecord: PropTypes.object,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func
}

export default Record