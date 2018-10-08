import React from 'react'
import _ from 'underscore'
import moment from 'moment'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Breadcrumbs } from 'react-breadcrumbs-dynamic'
import { CrumbIconItem } from './CustomBreadCrumbsComponent'
import { Common, FileRecord, LetterTracking } from './../helpers/CommonHelper'
import { Grid, Col, Modal, Button, Table, FormControl, Glyphicon, FormGroup, Breadcrumb } from 'react-bootstrap'

export const PageHead = (props) => {
	return (
		<Grid bsClass="navbar page-head">
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
    filter: PropTypes.object,
    downloadSampleExcel: PropTypes.element
}

export const InfoBlock = (props) => {
    return (
        <Col md={4} sm={12} className={`padding-0x ${props.customClass}`}>
            <Grid bsClass="info-box">
                <Grid componentClass="span" bsClass="info-box-icon bg-green">
                    <img title={props.title} src={props.img}></img>
                </Grid>
                <Grid bsClass="info-box-content">
                    <Grid componentClass="span" bsClass="info-box-text">{props.title}</Grid>
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
            <p className="bold">{props.title}</p>
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
        <Modal show={props.show} onHide={props.onHide} dialogClassName={props.dialogClassName}>
            <Modal.Header closeButton>
                <Modal.Title bsClass="bold fs22">{props.modalTitle}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <RecordDetails record={props.record} showActionButtons={props.showActionButtons} handleApproveBtnClick={props.onApprove} handleRejectBtnClick={props.onReject} />
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
    handleModalClose: PropTypes.func,
    showActionButtons:PropTypes.bool,
    dialogClassName: PropTypes.string,
}

export const RecordDetails = (props) => {
    const { record } = props

    var rows = [];
    for (var key in record) {
        if (record.hasOwnProperty(key)) {
            if (!_.contains(['CREATED', 'MODIFIED', 'ID', 'STATUS', 'LETTER_FILE'], key)) {
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
                rows.push(<tr key={key}><td><span className="bold">{key}:</span> {val}</td></tr>)
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
                    <Button className="btn-success pull-right margin-left-1x" onClick={props.handleApproveBtnClick}> Approve </Button>
                    <Button className="btn-danger pull-right" onClick={props.handleRejectBtnClick}> Reject </Button>
                </Grid>
            }
        </Grid>
    )
}

RecordDetails.propTypes = {
    record: PropTypes.object,
    handleApproveBtnClick: PropTypes.func,
    handleRejectBtnClick: PropTypes.func,
    showActionButtons:PropTypes.bool
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
            {props.onApprove && <Glyphicon
                glyph="ok"
                title="Approve"
                onClick={() => props.onApprove('approve')}
                className="margin-right-2x">
                <Grid componentClass="span" bsClass="">Approve</Grid>
            </Glyphicon>}

            {props.onApprove && <Glyphicon
                glyph="remove"
                title="Reject"
                onClick={() => props.onReject('reject')} >
                <Grid componentClass="span" bsClass="">Reject</Grid>
            </Glyphicon>}

            {props.onPageSizeChange && <FormControl bsClass="pageSize" componentClass="select" onChange={(e) => { props.onPageSizeChange(e.target.value) }}>
                {[10, 20, 30, 40, 50].map((pageSize) => <option key={pageSize} value={pageSize}>{pageSize}</option>)}
            </FormControl>}
            {props.onPageSizeChange && <span className="margin-left-1x">results per page</span>}
        </Grid>
    )
}

TableFunctionalityBase.propTypes = {
    onApprove: PropTypes.func,
    onReject: PropTypes.func,
    onPageSizeChange: PropTypes.func
}

export const FilterButton = (props) => {
    return (
        <Grid bsClass="filter-dropdown">
            <Grid bsClass="pull-left">
                <Grid bsClass="margin-top-3x cursor-pointer" onClick={props.onClick}>Filter Results
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
            <td colSpan={props.colSpan}> No results found. </td>
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
            <FormControl componentClass="select" value={props.value} onChange={(e) => { props.onClick(e.target.value) }} >
                <option value="">Select</option>
                    {optionsList.map((options) => <option key={options.id} value={options.id}>{options.name}</option>)}
            </FormControl>
        </FormGroup>
    )
}

SearchFilterOptions.propTypes = {
    onClick: PropTypes.func,
    value: PropTypes.string
}

export const ImportSummary = (props) => (
    <section className="export-summary">
        <h3 className="margin-top-0x margin-left-2x"> <u>Import Summary</u> </h3>
        <ul>
            <li> Total records in sheet: {props.totalRecords} </li>
            <li> Number of records successfully inserted: {props.recordsInserted} </li>
            <li> Number of records which were not inserted : {props.errorRecords.length} </li>

            <ul className="error"> {props.errorRecords.map((errorRecord, index) => (
                    <li className="no-margin-bottom-0x" key={index}>File Number: {errorRecord}</li>
                ))}
            </ul>
        </ul>
    </section>
)

ImportSummary.propTypes = {
    totalRecords: PropTypes.number,
    recordsInserted: PropTypes.number,
    errorRecords: PropTypes.array
}

export const GetModuleLogo = (props) => {
    return (
        <Grid bsClass="col-md-4 col-sm-6" title={props.title}>
            <Grid bsClass="thumbnail margin-bottom-0x">
                <Link to={props.moduleUrl}>
                    <img src={props.logo} alt="Lights" className="width-10x" />
                    <Grid bsClass="caption">
                        <p className="text-align-center bold">{props.title}</p>
                    </Grid>
                </Link>
            </Grid>
        </Grid>
    )
}

GetModuleLogo.propTypes = {
    logo: PropTypes.string,
    title: PropTypes.string,
    moduleUrl: PropTypes.string
}