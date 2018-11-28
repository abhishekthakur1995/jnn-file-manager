import React from 'react'
import PropTypes from 'prop-types'
import EntryForm from './EntryForm'
import { Common } from './helpers/CommonHelper'
import { defineMessages, injectIntl } from 'react-intl'
import { SplitButton, MenuItem, Checkbox } from 'react-bootstrap'
import { EditRecordModal, DeleteRecordModal, ManageRecordModal } from './uiComponents/CommonComponent'

const messages = defineMessages({
    editModalTitle: {
		id: 'fileManager.record.editRecordModal.title',
        defaultMessage: 'Edit record',
    },
    deleteModalTitle: {
		id: 'fileManager.record.deleteRecordModal.title',
        defaultMessage: 'Delete record',
    },
    manageModalTitle: {
		id: 'fileManager.record.manageRecordModal.title',
        defaultMessage: 'Manage record'
    },
    dropdownBtn1: {
    	id: 'fileManager.record.dropdown.btn1',
    	defaultMessage: 'Manage record'
    },
    dropdownBtn2: {
    	id: 'fileManager.record.dropdown.btn2',
    	defaultMessage: 'Manage record'
    },
    dropdownBtn3: {
    	id: 'fileManager.record.dropdown.btn3',
    	defaultMessage: 'Manage record'
    }
})

class Record extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			showEditModal: false,
			showDeleteModal: false,
			showManageModal: false,
			checkBoxClick: {
	      		1: false,
	      		2: false,
	      		3: false,
	      		4: false,
	      		5: false,
	      		6: false,
	      		7: false,
	      		8: false,
	      		9: false,
	      		10: false
    		}
		}

		this.showModal = this.showModal.bind(this)
		this.handleModalClose = this.handleModalClose.bind(this)
		this.handleUpdate = this.handleUpdate.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
		this.handlePendingStatus = this.handlePendingStatus.bind(this)
		this.handleApproveStatus = this.handleApproveStatus.bind(this)
		this.handleRejectStatus = this.handleRejectStatus.bind(this)
		this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this)
	}

	componentDidUpdate() {
		if (this.props.checkBoxDefaultStatus) {
			this.props.getRecordsMarkedForUpdate(true, this.props.singleRecord.ID)
		}
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

	handlePendingStatus() {
		this.props.onStatusChange(this.props.singleRecord, 'pending')
	}

	handleApproveStatus() {
		this.props.onStatusChange(this.props.singleRecord, 'approve')
	}

	handleRejectStatus() {
		this.props.onStatusChange(this.props.singleRecord, 'reject')
	}

	handleCheckBoxClick(index, id, checked) {
    	let checkBoxClick = this.state.checkBoxClick
    	checkBoxClick[index] = !this.state.checkBoxClick[index]
    	this.setState({ checkBoxClick })

    	this.props.getRecordsMarkedForUpdate(checked, id)

    	const alltrue = Object.keys(checkBoxClick).every((k) => { return checkBoxClick[k] })
    	if (alltrue) {
	      	this.props.handleMultiSelect()
    	}

    	if (this.props.checkBoxDefaultStatus) {
    		this.props.handleMultiSelect()
    	}
  	}

	render() {
		const { intl } = this.props
		const record = this.props.singleRecord
		const fileStatus = record.FILE_STATUS == 1 ? 'Approved' : (record.FILE_STATUS == 2 ? 'Rejected' : 'Pending')
		const fileDate = Common.getDisplayFormatDate(record.fileDate)
		const dateCreated = Common.getDisplayFormatDateTime(record.CREATED)
		return (
			<tr>
				<td>
					<Checkbox
						name="selectRecord"
						checked={this.props.checkBoxDefaultStatus ? this.props.checkBoxDefaultStatus : this.state.checkBoxClick[this.props.index + 1]}
						onChange={(e) => { this.handleCheckBoxClick(this.props.index + 1, record.ID, e.target.checked) }} >
					</Checkbox>
				</td>
			    <td title={record.APPLICANT_NAME}>{record.APPLICANT_NAME}</td>
			    <td title={record.APPLICANT_ADDRESS}>{record.APPLICANT_ADDRESS}</td>
			    <td title={record.APPLICANT_CONTACT}>{record.APPLICANT_CONTACT}</td>
			    <td title={record.FILE_NUMBER}>{record.FILE_NUMBER}</td>
			    <td title={record.FILE_DESCRIPTION}>{record.FILE_DESCRIPTION}</td>
			    <td title={record.DEPARTMENT}>{record.DEPARTMENT}</td>
			    <td title={record.WARD}>{record.WARD}</td>
			    <td title={record.ZONE}>{record.ZONE}</td>
			    <td title={fileStatus}>{fileStatus}</td>
			    <td title={fileDate}>{fileDate}</td>
			    <td title={dateCreated}>{dateCreated}</td>
			    <td>
			    	<SplitButton title={intl.formatMessage(messages.dropdownBtn1)} data-id="manage" id={`split-button-basic-${this.props.index + 1}`} pullRight onClick={this.showModal}>
  						<MenuItem data-id="edit" eventKey="1" onClick={this.showModal}>{intl.formatMessage(messages.dropdownBtn2)}</MenuItem>
  						<MenuItem data-id="delete" eventKey="2" onClick={this.showModal}>{intl.formatMessage(messages.dropdownBtn3)}</MenuItem>
					</SplitButton>
				</td>

				<EditRecordModal
					show={this.state.showEditModal}
					onHide={this.handleModalClose}
					handleModalClose={this.handleModalClose}
					dialogClassName="width-9x"
					modalTitle={intl.formatMessage(messages.editModalTitle)}
					onUpdate={this.handleUpdate}
					record={record}
					component={EntryForm} >
				</EditRecordModal>

				<DeleteRecordModal
					show={this.state.showDeleteModal}
					onHide={this.handleModalClose}
					handleModalClose={this.handleModalClose}
					onDelete={this.handleDelete}
					modalTitle={intl.formatMessage(messages.deleteModalTitle)}>
				</DeleteRecordModal>

				<ManageRecordModal
					show={this.state.showManageModal}
					onHide={this.handleModalClose}
					handleModalClose={this.handleModalClose}
					record={record}
					onPending={this.handlePendingStatus}
					onApprove={this.handleApproveStatus}
					onReject={this.handleRejectStatus}
					modalTitle={intl.formatMessage(messages.manageModalTitle)}
					showActionButtons={true}>
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
    onStatusChange: PropTypes.func,
    handleMultiSelect: PropTypes.func,
    getRecordsMarkedForUpdate: PropTypes.func,
    checkBoxDefaultStatus: PropTypes.bool,
    intl: PropTypes.object
}

export default injectIntl(Record)