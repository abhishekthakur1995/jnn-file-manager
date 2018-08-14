import React from 'react'
import EntryForm from './../EntryForm'
import { Grid, Col, Modal, Button } from 'react-bootstrap'
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
                    <img></img>
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
    value: PropTypes.string
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