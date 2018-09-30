import React from 'react'
import moment from 'moment'
import config from 'config'
import PropTypes from 'prop-types'
import NewLetterEntryForm from './NewLetterEntryForm'
import { SplitButton, MenuItem, Checkbox } from 'react-bootstrap'
import { Common, FileRecord, LetterTracking } from './../helpers/CommonHelper'
import { EditRecordModal, DeleteRecordModal, ManageRecordModal } from './../uiComponents/CommonComponent'

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
			    	<SplitButton title="Manage" data-id="manage" id={`split-button-basic-${this.props.index + 1}`} pullRight onClick={this.showModal}>
  						<MenuItem data-id="edit" eventKey="1" onClick={this.showModal}>Edit</MenuItem>
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
					modalTitle="Manage data"
					showActionButtons={false} >
				</ManageRecordModal>
			</tr>
		)
	}
}

SingleLetter.propTypes = {
	index: PropTypes.number,
    singleLetter: PropTypes.object
}

export default SingleLetter