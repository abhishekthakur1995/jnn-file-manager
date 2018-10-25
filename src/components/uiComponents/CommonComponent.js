import React from 'react'
import _ from 'underscore'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Breadcrumbs } from 'react-breadcrumbs-dynamic'
import { CrumbIconItem } from './CustomBreadCrumbsComponent'
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl'
import { Common, FileRecord, LetterTracking } from './../helpers/CommonHelper'
import { Grid, Col, Modal, Button, Table, FormControl, Glyphicon, FormGroup, Breadcrumb, ListGroup } from 'react-bootstrap'

const messages = defineMessages({
    quickSearchPlaceHolder: {
        id: 'common.filter.quickSearchPlaceHolder',
        defaultMessage: 'Quick Search',
    }
})

export const PageHead = (props) => {
	return (
		<Grid bsClass="page-head">
            <Grid bsClass="container-fluid">
                <Grid bsClass="navbar-header">
                    <Breadcrumbs
                        item={CrumbIconItem}
                        container={Breadcrumb}
                        finalProps={{active: true}}
                        duplicateProps={{to:"href"}}
                    />
                </Grid>
                <Col sm={12} md={7} className="filter-container">
                    <Grid bsClass="pull-left padding-vert-5x">{props.filter}</Grid>
                    <Grid bsClass="pull-left padding-vert-7x">{props.quickSearch}</Grid>
                    <Grid bsClass="pull-left margin-top-2x">{props.pagination}</Grid>
                    <Grid bsClass="pull-left margin-top-2x cursor-pointer" title="Download Sample Excel">{props.downloadSampleExcel}</Grid>
                </Col>
            </Grid>
    	</Grid>
	)
}

PageHead.propTypes = {
    pagination: PropTypes.object,
    quickSearch: PropTypes.object,
    downloadSampleExcel: PropTypes.element,
    filter: PropTypes.object
}

export const InfoBlock = (props) => {
    return (
        <Col className={`padding-0x ${props.customClass}`}>
            <Grid bsClass="info-box">
                <Grid title={props.title} componentClass="span" bsClass="info-box-icon bg-green">
                    <img src={props.img}></img>
                </Grid>
                <Grid bsClass="info-box-content green-top">
                    <Grid componentClass="span" bsClass="info-box-text fs20">{props.title}</Grid>
                    <Grid componentClass="span" bsClass="info-box-number">{props.value}</Grid>
                </Grid>
            </Grid>
        </Col>
    )
}

InfoBlock.propTypes = {
    title: PropTypes.string,
    value: PropTypes.number,
    img: PropTypes.string,
    customClass: PropTypes.string
}

export const ChartHolder = (props) => {
    return (
        <Col xs={12} className="chart-holder">
            <Grid componentClass="p" bsClass="bold">{props.title}</Grid>
            <Grid bsClass="padding-horiz-2x">
                {props.chart}
            </Grid>
        </Col>
    )
}

ChartHolder.propTypes = {
    title: PropTypes.string,
    chart: PropTypes.element
}

export const EditRecordModal = (props) => {
    const ChildComponent = props.component
    return (
        <Modal show={props.show} onHide={props.onHide} dialogClassName={props.dialogClassName}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <ChildComponent mode="edit" record={props.record} onUpdate={props.onUpdate} />
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
    handleModalClose: PropTypes.func,
    component: PropTypes.func
}

export const DeleteRecordModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title bsClass="bold fs22">{props.modalTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <FormattedMessage id="record.deleteRecordModal.warning" defaultMessage="Are you sure you want to delete this record? This cannot be undone." />
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.handleModalClose}>
                    <FormattedMessage id="record.deleteRecordModal.closeBtn" defaultMessage="Close" />
                </Button>
                <Button bsClass="btn btn-danger" onClick={props.onDelete}>
                    <FormattedMessage id="record.deleteRecordModal.deleteBtn" defaultMessage="Delete" />
                </Button>
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
        <Modal show={props.show} onHide={props.onHide} dialogClassName={props.dialogClassName}>
            <Modal.Header closeButton>
                <Modal.Title bsClass="bold fs22">{props.modalTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <RecordDetails record={props.record} showActionButtons={props.showActionButtons} handlePendingBtnClick={props.onPending} handleApproveBtnClick={props.onApprove} handleRejectBtnClick={props.onReject} />
            </Modal.Body>
        </Modal>
    )
}

ManageRecordModal.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    modalTitle: PropTypes.string,
    record: PropTypes.object,
    onPending: PropTypes.func,
    onApprove: PropTypes.func,
    onReject: PropTypes.func,
    handleModalClose: PropTypes.func,
    showActionButtons:PropTypes.bool,
    dialogClassName: PropTypes.string,
}

export const RecordDetails = (props) => {
    const { record } = props

    var rows = [];
    for (var key in record) {
        if (record.hasOwnProperty(key)) {
            if (!_.contains(['CREATED', 'MODIFIED', 'ID', 'STATUS', 'LETTER_FILE', 'LETTER_FILE_EXT'], key)) {
                let val = ''
                if (key === 'FILE_STATUS') {
                    val = FileRecord.getFileStatusFromCode(record[key])
                } else if (key === 'LETTER_STATUS') {
                    val = LetterTracking.getLetterStatusFromCode(record[key])
                } else if (key === 'LETTER_DATE') {
                    val = Common.getDisplayFormatDate(record[key])
                } else {
                    val = record[key]
                }
                rows.push(<tr key={key}><td><Grid componentClass="span" bsClass="bold">{key}:</Grid> {val}</td></tr>)
            }
        }
    }

    return (
        <Grid bsClass="record-details">
            <Table responsive striped bordered condensed hover>
                <tbody>{rows}</tbody>
            </Table>

            {props.showActionButtons &&
                <Grid bsClass="width-10x display-inline">
                    <Button className="btn-danger pull-right margin-left-1x" onClick={props.handleRejectBtnClick}>Reject</Button>
                    <Button className="btn-success pull-right margin-left-1x" onClick={props.handleApproveBtnClick}>Approve</Button>
                    <Button className="btn-warning pull-right margin-left-1x" onClick={props.handlePendingBtnClick}>Pending</Button>
                </Grid>
            }
        </Grid>
    )
}

RecordDetails.propTypes = {
    record: PropTypes.object,
    handlePendingBtnClick: PropTypes.func,
    handleApproveBtnClick: PropTypes.func,
    handleRejectBtnClick: PropTypes.func,
    showActionButtons:PropTypes.bool
}

export const LoadingSpinner = () => (
    <Grid className="overlay" />
)

export const QuickSearchComponent = injectIntl((props) => {
    let inputRef
    return (
        <Grid bsClass="quick_search">
            <FormControl
                type="text"
                inputRef={ref => inputRef = ref}
                autoComplete="on"
                placeholder={props.intl.formatMessage(messages.quickSearchPlaceHolder)}
                name="quickSearch"
                className="searchInputBox"
            />

            { props.enabled ? <Glyphicon className="searchInputBoxIcon" glyph="remove" onClick={() => { props.remove(); inputRef.value = ''}}/> :
                <Glyphicon className="searchInputBoxIcon" glyph="search" onClick={() => props.search(inputRef.value)}/>
            }
        </Grid>
    )
})

QuickSearchComponent.propTypes = {
    intl: PropTypes.object,
    search: PropTypes.func,
    remove: PropTypes.func,
    enabled: PropTypes.bool
}

export const TableFunctionalityBase = (props) => {
    return (
        <Grid bsClass="table-base">
            {props.onPending && <Glyphicon
                glyph="option-horizontal"
                title="Mark selected record as pending"
                onClick={() => props.onReject('pending')}
                className="margin-right-2x" >
                <Grid componentClass="span" bsClass="">Pending</Grid>
            </Glyphicon>}

            {props.onApprove && <Glyphicon
                glyph="ok"
                title="Mark selected record as approveed"
                onClick={() => props.onApprove('approve')}
                className="margin-right-2x">
                <Grid componentClass="span" bsClass="">Approve</Grid>
            </Glyphicon>}

            {props.onApprove && <Glyphicon
                glyph="remove"
                title="Mark selected record as rejected"
                onClick={() => props.onReject('reject')}
                className="margin-right-2x" >
                <Grid componentClass="span" bsClass="">Reject</Grid>
            </Glyphicon>}

            {props.onPageSizeChange && <FormControl bsClass="pageSize" componentClass="select" onChange={(e) => { props.onPageSizeChange(e.target.value) }}>
                {[10, 20, 30, 40, 50].map((pageSize) => <option key={pageSize} value={pageSize}>{pageSize}</option>)}
            </FormControl>}
            {props.onPageSizeChange && <Grid componentClass="span" bsClass="margin-left-1x">results per page</Grid>}
        </Grid>
    )
}

TableFunctionalityBase.propTypes = {
    onPending: PropTypes.func,
    onApprove: PropTypes.func,
    onReject: PropTypes.func,
    onPageSizeChange: PropTypes.func
}

export const FilterButton = (props) => {
    return (
        <Grid bsClass="filter-dropdown">
            <Grid bsClass="pull-left">
                <Grid bsClass="margin-top-3x cursor-pointer" onClick={props.onClick}>
                    <FormattedMessage id="common.filter.title" defaultMessage="Filter Results" />
                    <Grid bsClass="chevron"> { props.upCheveron ? <Glyphicon glyph="chevron-up" /> : <Glyphicon glyph="chevron-down" /> }</Grid>
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
            <td colSpan={props.colSpan}> No results found.</td>
        </tr>
    )
}

NoData.propTypes = {
    colSpan: PropTypes.number
}

export const YearDropDown = (props) => {
    const yearList = [moment().format('YYYY'), moment().format('YYYY') - 1, moment().format('YYYY') - 2]

    return (
        <FormGroup controlId="formControlsSelect">
            <FormControl componentClass="select" onChange={(e) => { props.onClick('year', e.target.value) }} >
                <option value="">Select</option>
                    {yearList.map((year) => <option key={year} value={year}>{year}</option>)}
            </FormControl>
        </FormGroup>
    )
}

YearDropDown.propTypes = {
    onClick: PropTypes.func
}

export const MonthDropDown = (props) => {
    const monthList = [
        { id: 1, name: 'January'}, { id: 2, name: 'February'}, { id: 3, name: 'March'}, { id: 4, name: 'April'},
        { id: 5, name: 'May'}, { id: 6, name: 'June'}, { id: 7, name: 'July'}, { id: 8, name: 'August'},
        { id: 9, name: 'September'}, { id: 10, name: 'October'}, { id: 11, name: 'November'}, { id: 12, name: 'December'}
    ]

    return (
        <FormGroup controlId="formControlsSelect">
            <FormControl componentClass="select" onChange={(e) => { props.onClick('month', e.target.value) }} >
                <option value="">Select</option>
                    {monthList.map((month) => <option key={month.id} value={month.id}>{month.name}</option>)}
            </FormControl>
        </FormGroup>
    )
}

MonthDropDown.propTypes = {
    onClick: PropTypes.func
}

export const SearchFilterOptions = (props) => {
    const optionsList = [
        { id: 'buildingName', name: 'Building Name'},
        { id: 'applicantName', name: 'Applicant Name'},
        { id: 'applicantContact', name: 'Applicant Contact'},
        { id: 'applicantAddress', name: 'Applicant Address'},
        { id: 'fileNumber', name: 'File Number'}
    ]

    return (
        <FormGroup controlId="formControlsSelect">
            <FormControl componentClass="select" name={props.name} value={props.value} onChange={(e) => { props.onClick(e) }} >
                <option value="">Select</option>
                    {optionsList.map((options) => <option key={options.id} value={options.id}>{options.name}</option>)}
            </FormControl>
        </FormGroup>
    )
}

SearchFilterOptions.propTypes = {
    name: PropTypes.string,
    onClick: PropTypes.func,
    value: PropTypes.string
}

export const ImportSummary = (props) => (
    <section className="import-summary">
        <Grid componentClass="h3" bsClass="margin-top-0x margin-left-2x">
            <u>Import Summary</u>
        </Grid>
        <ListGroup componentClass="ul" bsClass="import-data">
            <ListGroup componentClass="li" bsClass="import-total-records"> Total records in sheet: {props.totalRecords} </ListGroup>
            <ListGroup componentClass="li" bsClass="import-records-success"> Number of records successfully inserted: {props.recordsInserted} </ListGroup>
            <ListGroup componentClass="li" bsClass="import-records-fail"> Number of records which were not inserted : {props.errorRecords.length} </ListGroup>
            <ListGroup componentClass="ul" bsClass="error"> {props.errorRecords.map((errorRecord, index) => (
                    <ListGroup componentClass="li" bsClass="no-margin-bottom-0x" key={index}>File Number: {errorRecord}</ListGroup>
                ))}
            </ListGroup>
        </ListGroup>
    </section>
)

ImportSummary.propTypes = {
    totalRecords: PropTypes.number,
    recordsInserted: PropTypes.number,
    errorRecords: PropTypes.array
}

export const GetModuleLogo = (props) => {
    return (
        <Col xs={12} title={props.title}>
            <Grid bsClass="thumbnail margin-bottom-0x">
                <Link to={props.moduleUrl}>
                    <img src={props.logo} alt={props.title} className="width-10x image" />
                    <Grid bsClass="middle">
                        <Grid bsClass="text">{props.title}</Grid>
                      </Grid>
                    <Grid bsClass="caption">
                        <Grid componentClass="p" bsClass="text-align-center bold">{props.title}</Grid>
                    </Grid>
                </Link>
            </Grid>
        </Col>
    )
}

GetModuleLogo.propTypes = {
    logo: PropTypes.string,
    title: PropTypes.string,
    moduleUrl: PropTypes.string
}