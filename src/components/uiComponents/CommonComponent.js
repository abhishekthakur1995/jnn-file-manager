import React from 'react'
import EntryForm from './../EntryForm'
import { Grid, Col, Modal, Button, Table } from 'react-bootstrap'
import PropTypes from 'prop-types'

export const PageHead = (props) => {
	return (
		<Grid bsClass="navbar">
            <Grid bsClass="container-fluid">
                <Grid bsClass="navbar-header">
                    <button type="button" id="sidebarCollapse" className="btn btn-info navbar-btn">
                        <span>{props.title}</span>
                    </button>
                </Grid>
            </Grid>
    	</Grid>
	)
}

PageHead.propTypes = {
    title: PropTypes.string
}

export const InfoBlock = (props) => {
    return (
        <Grid bsClass="boxes">
            <Grid bsClass="info-box">
                <Grid componentClass="span" bsClass="info-box-icon bg-green">
                    <img src={`static/img/${props.title}.png`}></img>
                </Grid>
                <Grid bsClass="info-box-content">
                    <Grid componentClass="span" bsClass="info-box-text">{props.title}</Grid>
                    <Grid componentClass="span" bsClass="info-box-number">{props.value}</Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

InfoBlock.propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
}

export const ChartHolder = (props) => {
    return (
        <Col md={4}>
            <Grid bsClass="chart-holder">
                <Grid bsClass="chart-holder-heading" align="center">
                   {props.title}
                </Grid>
                <Grid bsClass="chart-holder-body">
                    {props.chart}
                </Grid>
            </Grid>
        </Col>
    )
}

ChartHolder.propTypes = {
    title: PropTypes.string,
    chart: PropTypes.element
}

export const EditRecordModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.onHide} dialogClassName={props.dialogClassName}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <EntryForm showPageHead={false} mode="edit" record={props.record} onUpdate={props.onUpdate}/>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.handleModalClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

EditRecordModal.propTypes = {
    show: PropTypes.bool,
    dialogClassName: PropTypes.string,
    onHide: PropTypes.func,
    onUpdate: PropTypes.func,
    modalTitle: PropTypes.string,
    record: PropTypes.object,
    handleModalClose: PropTypes.func
}

export const DeleteRecordModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title bsClass="bold fs22">{props.modalTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Are you sure you want to delete this record? This cannot be undone.
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.handleModalClose}>Close</Button>
                <Button bsClass="btn btn-danger" onClick={props.onDelete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    )
}

DeleteRecordModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onDelete: PropTypes.func,
    modalTitle: PropTypes.string,
    handleModalClose: PropTypes.func
}

export const ManageRecordModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title bsClass="bold fs22">{props.modalTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <RecordDetails record={props.record} handleApproveBtnClick={props.onApprove} handleRejectBtnClick={props.onReject} />
            </Modal.Body>
        </Modal>
    )
}

ManageRecordModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    modalTitle: PropTypes.string,
    record: PropTypes.object,
    onApprove: PropTypes.func,
    onReject: PropTypes.func,
    handleModalClose: PropTypes.func
}

export const RecordDetails = (props) => {
    const { record } = props
    return (
        <Grid bsClass="record-details">
            <Table>
                <thead>
                    <tr><th>File Number: {record.FILE_NUMBER}</th></tr>
                    <tr><th>Current State: {record.FILE_STATUS == 1 ? 'Approved' : (record.FILE_STATUS == 2 ? 'Rejected' : 'Pending')}</th></tr>
                </thead>
                <tbody>
                    <tr><td>Applicant Name: {record.APPLICANT_NAME}</td></tr>
                    <tr><td>Applicant Type: {record.APPLICANT_TYPE}</td></tr>
                    <tr><td>Applicant Address: {record.APPLICANT_ADDRESS}</td></tr>
                    <tr><td>Applicant Contact: {record.APPLICANT_CONTACT}</td></tr>
                    <tr><td>Building Name: {record.BUILDING_NAME}</td></tr>
                    <tr><td>Building Address: {record.BUILDING_ADDRESS}</td></tr>
                    <tr><td>Building Area: {record.BUILDING_AREA}</td></tr>
                    <tr><td>Remark: {record.REMARK}</td></tr>
                </tbody>
            </Table>

            <Grid bsClass="width-10x display-inline">
                <Button className="btn-success pull-right margin-left-1x" onClick={props.handleApproveBtnClick}> Approve </Button>
                <Button className="btn-danger pull-right" onClick={props.handleRejectBtnClick}> Reject </Button>
            </Grid>
        </Grid>
    )
}

RecordDetails.propTypes = {
    record: PropTypes.object,
    handleApproveBtnClick: PropTypes.func,
    handleRejectBtnClick: PropTypes.func
}