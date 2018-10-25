import React from 'react'
import Dropzone from 'react-dropzone'
import { FileRecord } from './helpers/CommonHelper'
import { FormattedMessage } from 'react-intl'
import { ImportService } from './services/ApiServices'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import { Grid, Button, Glyphicon, Clearfix } from 'react-bootstrap'
import { PageHead, LoadingSpinner, ImportSummary } from './uiComponents/CommonComponent'

class Import extends React.Component {
	constructor(props) {
		super(props)

		this.totalRecords = 0
		this.recordsInserted = 0
		this.errorRecords = []

		this.state = {
			fileUpload: false,
			uploadedFileName: '',
			showImportSummary: false,
			showLoading: false
		}

		this.onDrop = this.onDrop.bind(this)
		this.onImport = this.onImport.bind(this)
		this.downloadSampleExcel = this.downloadSampleExcel.bind(this)
	}

	onDrop(acceptedFiles) {
	    let data = new FormData()
	    data.append('file', acceptedFiles[0])
	    data.append('filename', acceptedFiles[0].name)

	    ImportService.upload(data).then((res) => {
	    	if (res.data.success === true && res.data.file) {
	    		this.setState({
	    			fileUpload: true,
	    			uploadedFileName: res.data.file,
	    			showImportSummary: false
	    		})
	    	}
	    })
	}

	onImport() {
		this.setState({ showLoading: true })
		const data = { fileName: this.state.uploadedFileName }
		ImportService.importDataToDB(data).then((res) => {
			this.totalRecords = res.data.totalRecords
			this.recordsInserted = res.data.recordsInserted
			this.errorRecords = res.data.errorRecords

			this.setState({
				fileUpload: false,
				uploadedFileName: '',
				showImportSummary:true,
				showLoading: false
			})
		})
	}

	downloadSampleExcel() {
		ImportService.downloadExcelFile()
	}

	render() {
		return (
			<Grid bsClass="import-records">
				<BreadcrumbsItem to={FileRecord.getAbsolutePath('import')}>Import</BreadcrumbsItem>
				<PageHead title="Import"
					downloadSampleExcel={<Grid componentClass="span" bsClass="" onClick={this.downloadSampleExcel}><FormattedMessage id="fileManager.import.dwnldSampleExcelMsg" defaultMessage="Download Sample Excel" /><Glyphicon className="fs20" glyph="download" /></Grid>}
				/>
				{this.state.showLoading && <LoadingSpinner />}

				<Grid bsClass="bg-white padding-2x green-top">
					<Dropzone
						className="dz-default"
						accept=".xlsx"
						multiple={false}
						onDrop={(files) => this.onDrop(files)}>
							<Grid bsClass="dzinfo">
								<Grid componentClass="span" bsClass="">
									<FormattedMessage id="fileManager.import.dropzone.msg1" defaultMessage="Try dropping some files here, or click to select files to upload." />
									<Grid componentClass="span" bsClass="highlight">
										<FormattedMessage id="fileManager.import.dropzone.msg2" defaultMessage="Only valid excel files (.xlsx) will be accepted" />
									</Grid>
								</Grid>
								<Clearfix />

								<Button bsStyle="default" className="dzuploadbtn">
									<Glyphicon glyph="file" />
									<FormattedMessage id="fileManager.import.dropzone.uploadFileBtn" defaultMessage="Select File" />
								</Button>
								<Clearfix />

								<Grid componentClass="p" bsClass="dzuploadedfilename">{this.state.uploadedFileName}</Grid>
							</Grid>
					</Dropzone>
				</Grid>

				{this.state.showImportSummary && <ImportSummary totalRecords={this.totalRecords} recordsInserted={this.recordsInserted} errorRecords={this.errorRecords} />}

				{this.state.fileUpload &&
					<Button className="margin-top-2x width-2x green-btn" onClick={this.onImport}>
						<Glyphicon glyph="import" />
						<FormattedMessage id="fileManager.import.dropzone.importDataBtn" defaultMessage="Import Data" />
					</Button>
				}
			</Grid>
		)
	}
}

export default Import