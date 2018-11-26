import React from 'react'
import PropTypes from 'prop-types'
import NewLetterEntryForm from './NewLetterEntryForm'
import { defineMessages, injectIntl } from 'react-intl'
import { SplitButton, MenuItem } from 'react-bootstrap'
import { Common, LetterTracking } from './../helpers/CommonHelper'
import { EditRecordModal, ManageRecordModal } from './../uiComponents/CommonComponent'

const messages = defineMessages({
	viewBtn: {
		id: 'letterTracking.letterList.dropdown.viewBtn',
		defaultMessage: 'View'
	},
	editBtn: {
		id: 'letterTracking.letterList.dropdown.editBtn',
		defaultMessage: 'Edit'
	},
	viewAttachmentBtn: {
		id: 'letterTracking.letterList.dropdown.viewAttachmentBtn',
		defaultMessage: 'View Attachment'
	}
})

class SingleLetter extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			showEditModal: false,
			showManageModal: false,
		}

		this.showModal = this.showModal.bind(this)
		this.handleModalClose = this.handleModalClose.bind(this)
		this.handleUpdate = this.handleUpdate.bind(this)
	}

	showModal(e) {
		switch (e.target.dataset.id) {
			case 'edit':
				this.setState({showEditModal: true})
			break

			case 'manage':
				this.setState({showManageModal: true})
			break
		}
	}

	handleModalClose() {
		this.setState({
			showEditModal: false,
			showManageModal: false
		})
	}

	// gets the updated record from EntryForm
	// pass the updated record to record list
	handleUpdate(updatedLetter) {
		updatedLetter.ID = this.props.singleLetter.ID
		this.props.onUpdate(updatedLetter)
	}

	render() {
		const { intl } = this.props
		const letter = this.props.singleLetter
		const letterStatus = LetterTracking.getLetterStatusFromCode(letter.LETTER_STATUS)
		const dateCreated = Common.getDisplayFormatDate(letter.CREATED)
		return (
			<tr>
			    <td title={letter.DEPARTMENT_NAME}>{letter.DEPARTMENT_NAME}</td>
			    <td title={letter.ASSIGNED_OFFICER}>{letter.ASSIGNED_OFFICER}</td>
			    <td title={letter.LETTER_TYPE}>{letter.LETTER_TYPE}</td>
			    <td title={letter.LETTER_TAG}>{letter.LETTER_TAG}</td>
			    <td title={letter.LETTER_SUBJECT}>{letter.LETTER_SUBJECT}</td>
			    <td title={letter.LETTER_REG_NO}>{letter.LETTER_REG_NO}</td>
			    <td title={letterStatus}>{letterStatus}</td>
			    <td title={dateCreated}>{dateCreated}</td>
			    <td>
			    	<SplitButton title={intl.formatMessage(messages.viewBtn)} data-id="manage" id={`split-button-basic-${this.props.index + 1}`} pullRight onClick={this.showModal}>
  						<MenuItem data-id="edit" eventKey="1" onClick={this.showModal}>{intl.formatMessage(messages.editBtn)}</MenuItem>
  						{letter.LETTER_FILE_EXT && <MenuItem data-id="attachment" eventKey="2" onClick={() => this.props.onDownload(letter.ID)}>{intl.formatMessage(messages.viewAttachmentBtn)}</MenuItem>}
					</SplitButton>
				</td>

				<EditRecordModal
					show={this.state.showEditModal}
					onHide={this.handleModalClose}
					handleModalClose={this.handleModalClose}
					dialogClassName="width-9x"
					modalTitle="Edit data"
					onUpdate={this.handleUpdate}
					record={letter}
					component={NewLetterEntryForm} >
				</EditRecordModal>

				<ManageRecordModal
					show={this.state.showManageModal}
					onHide={this.handleModalClose}
					handleModalClose={this.handleModalClose}
					record={letter}
					dialogClassName="width-5x"
					modalTitle="View data"
					showActionButtons={false} >
				</ManageRecordModal>
			</tr>
		)
	}
}

SingleLetter.propTypes = {
	intl: PropTypes.object,
	index: PropTypes.number,
	onUpdate: PropTypes.func,
	onDownload: PropTypes.func,
    singleLetter: PropTypes.object
}

export default injectIntl(SingleLetter)