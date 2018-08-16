import React from 'react'
import { SplitButton, MenuItem } from 'react-bootstrap'
import { EditRecordModal, DeleteRecordModal, ManageRecordModal } from './uiComponents/CommonComponent'
import PropTypes from 'prop-types'

class Record extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			showEditModal: false,
			showDeleteModal: false,
			showManageModal: false
		}

		this.showModal = this.showModal.bind(this)
		this.handleModalClose = this.handleModalClose.bind(this)
		this.handleUpdate = this.handleUpdate.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handleApproveStatus = this.handleApproveStatus.bind(this)
		this.handleRejectStatus = this.handleRejectStatus.bind(this)
	}

	showModal(e) {
		switch (e.target.dataset.id) {
			case 'edit':
				this.setState({showEditModal: true})
			break

			case 'delete':
				this.setState({showDeleteModal: true})
			break

			case 'manage':
				this.setState({showManageModal: true})
			break
		}
	}

	handleModalClose() {
		this.setState({
			showEditModal: false,
			showDeleteModal: false,
			showManageModal: false
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

	handleApproveStatus() {
		this.props.onStatusChange(this.props.singleRecord, 'approve')
	}

	handleRejectStatus() {
		this.props.onStatusChange(this.props.singleRecord, 'reject')
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
			    <td>{record.FILE_STATUS == 1 ? 'Approved' : (record.FILE_STATUS == 2 ? 'Rejected' : 'Pending')}</td>
			    <td>
			    	<SplitButton title="Manage" data-id="manage" id={`split-button-basic-${this.props.index+1}`} pullRight onClick={this.showModal}>
						<MenuItem data-id="view" eventKey="1">View</MenuItem>
  						<MenuItem data-id="edit" eventKey="2" onClick={this.showModal}>Edit</MenuItem>
  						<MenuItem data-id="delete" eventKey="3" onClick={this.showModal}>Delete</MenuItem>
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

				<ManageRecordModal
					show={this.state.showManageModal}
					onHide={this.handleModalClose}
					handleModalClose={this.handleModalClose}
					record={record}
					onApprove={this.handleApproveStatus}
					onReject={this.handleRejectStatus}
					modalTitle="Manage record">
				</ManageRecordModal>
			</tr>
		)
	}
}

Record.propTypes = {
	index: PropTypes.number,
    singleRecord: PropTypes.object,
    onUpdate: PropTypes.func,
    onDelete: PropTypes.func,
    onStatusChange: PropTypes.func
}

export default Record