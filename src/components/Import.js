import React from 'react'
import { ImportService } from './services/ApiServices'
import { Grid, Button, Glyphicon, Clearfix } from 'react-bootstrap'
import { PageHead, LoadingSpinner, ImportSummary } from './uiComponents/CommonComponent'
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic'
import Dropzone from 'react-dropzone'

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
				<BreadcrumbsItem glyph='import' to={'/servicePanel/fileManager/import'}> Import </BreadcrumbsItem>
				<PageHead title="Import" downloadSampleExcel={<span onClick={this.downloadSampleExcel}> Download Sample Excel<Glyphicon className="fs20" glyph="download" /></span>} />
				{this.state.showLoading && <LoadingSpinner />}

				<Dropzone
					className="dz-default"
					accept=".xlsx"
					multiple={false}
					onDrop={(files) => this.onDrop(files)}>
						<Grid bsClass="dzinfo">
							<span>Try dropping some files here, or click to select files to upload. <span className="highlight">Only valid excel files (.xlsx) will be accepted</span></span>
							<Clearfix />

							<Button bsStyle="default" className="dzuploadbtn">
								<Glyphicon glyph="upload" /> Upload File
							</Button>
							<Clearfix />

							<p className="dzuploadedfilename">{this.state.uploadedFileName}</p>
						</Grid>
				</Dropzone>

				{this.state.showImportSummary && <ImportSummary totalRecords={this.totalRecords} recordsInserted={this.recordsInserted} errorRecords={this.errorRecords} />}

				{this.state.fileUpload &&
					<Button bsStyle="primary" className="margin-top-2x width-2x" onClick={this.onImport}>
						<Glyphicon glyph="import" /> Import Data
					</Button>
				}
			</Grid>
		)
	}
}

export default Import