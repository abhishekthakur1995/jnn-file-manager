import React from 'react'
import EntryForm from './../EntryForm'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { Grid, Col, Modal, Button, Table, FormControl, Glyphicon } from 'react-bootstrap'
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
                <Col sm={12} md={7} className="pull-right width-auto">
                    <Grid bsClass="pull-left padding-vert-5x">{props.filter}</Grid>
                    <Grid bsClass="pull-left padding-vert-7x">{props.quickSearch}</Grid>
                    <Grid bsClass="pull-left margin-top-2x">{props.pagination}</Grid>
                </Col>
            </Grid>
    	</Grid>
	)
}

PageHead.propTypes = {
    title: PropTypes.string,
    pagination: PropTypes.object,
    quickSearch: PropTypes.object,
    filter: PropTypes.object
}

export const InfoBlock = (props) => {
    return (
        <Grid bsClass="boxes">
            <Grid bsClass="info-box">
                <Grid componentClass="span" bsClass="info-box-icon bg-green">
                    <img className="margin-bottom-8x" title={props.title} src={props.img}></img>
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
    value: PropTypes.number,
    img: PropTypes.string
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

export const LoadingSpinner = () => (
    <Grid className="overlay" />
)

export const QuickSearchComponent = (props) => {
    let inputRef
    return (
        <Grid bsClass="quick_search">
            <FormControl
                type="text"
                inputRef={ref => inputRef = ref}
                autoComplete="on"
                placeholder="Quick Search"
                name="quickSearch"
                className="searchInputBox"
            />

            { props.enabled ? <Glyphicon className="searchInputBoxIcon" glyph="remove" onClick={() => { props.remove(); inputRef.value = ''}}/> :
                <Glyphicon className="searchInputBoxIcon" glyph="search" onClick={() => props.search(inputRef.value)}/>
            }
        </Grid>
    )
}

QuickSearchComponent.propTypes = {
    search: PropTypes.func,
    remove: PropTypes.func,
    enabled: PropTypes.bool
}

export const TableFunctionalityBase = (props) => {
    return (
        <Grid bsClass="table-base">
            <Glyphicon
                glyph="ok"
                title="Approve"
                onClick={() => props.onApprove('approve')}
                className="margin-right-2x">
                <Grid componentClass="span" bsClass="">Approve</Grid>
            </Glyphicon>

            <Glyphicon
                glyph="remove"
                title="Reject"
                onClick={() => props.onReject('reject')} >
                <Grid componentClass="span" bsClass="">Reject</Grid>
            </Glyphicon>
        </Grid>
    )
}

TableFunctionalityBase.propTypes = {
    onApprove: PropTypes.func,
    onReject: PropTypes.func
}

export const FilterButton = (props) => {
    return (
        <Grid bsClass="filter-dropdown">
            <Grid bsClass="pull-left">
                <Grid bsClass="margin-top-3x cursor-pointer" onClick={props.onClick}>Filter Results
                    <Grid bsClass="chevron"> { props.upCheveron ? <FaChevronUp /> : <FaChevronDown /> }</Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

FilterButton.propTypes = {
    onClick: PropTypes.func,
    upCheveron: PropTypes.bool
}

export const NoData = (props) => {
    return (
        <tr>
            <td colSpan={props.colSpan}> No results found. </td>
        </tr>
    )
}

NoData.propTypes = {
    colSpan: PropTypes.number
}