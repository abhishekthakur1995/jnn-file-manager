import React from 'react'
import './css/style.css'

class EntryForm extends React.Component {
	constructor(props) {
    	super(props)
    	this.state = {
    		applicantName: '',
    		applicantType: '',
    		applicantAddress: '',
    		applicantContact: '',
    		buildingName: '',
    		buildingAddress: '',
    		area:'',
    	};

    	this.handleChange = this.handleChange.bind(this)
    	this.handleSubmit = this.handleSubmit.bind(this)
    }

  	handleChange(event) {
    	this.setState({
    		applicantName: this.refs.applicantName.value,
    		applicantType: this.refs.applicantType.value,
    		applicantAddress: this.refs.applicantAddress.value,
    		applicantContact: this.refs.applicantContact.value,
    		buildingName: this.refs.buildingName.value,
    		buildingAddress: this.refs.buildingAddress.value,
    		area: this.refs.area.value
    	});
  	}

  	handleSubmit(event) {
    	alert('A name was submitted: ' + this.state.value);
    	event.preventDefault();
  	}

	render() {
	    return (
      		<form onSubmit={this.handleSubmit}>
        		<label>
          			Applicant Name:
          			<input type="text" autoComplete="on" name="applicantName" ref="applicantName" value={this.state.applicantName} onChange={this.handleChange} />
        		</label>

        		<label>
          			Applicant Address:
          			<input type="text" autoComplete="on" name="applicantAddress" ref="applicantAddress" value={this.state.applicantAddress} onChange={this.handleChange} />
        		</label>

        		<label>
          			Applicant Contact No:
          			<input type="text" autoComplete="on" name="applicantContact" ref="applicantContact" value={this.state.applicantContact} onChange={this.handleChange} />
        		</label>

        		<label>
          			Building Name:
          			<input type="text" autoComplete="on" name="buildingName" ref="buildingName" value={this.state.buildingName} onChange={this.handleChange} />
        		</label>

        		<label>
          			Building Address:
          			<input type="text" autoComplete="on" name="buildingAddress" ref="buildingAddress" value={this.state.buildingAddress} onChange={this.handleChange} />
        		</label>

        		<label>
      				Area:
          			<select name="area" ref="area" value={this.state.area} onChange={this.handleChange}>
          				<option value="">Select</option>
        				<option value="urban">Urban</option>
			            <option value="rural">Rural</option>
          			</select>
        		</label>

        		<label>
      				Application Type:
          			<select name="applicantType" ref="applicantType" value={this.state.applicantType} onChange={this.handleChange}>
          				<option value="">Select</option>
        				<option value="urban">Permanent</option>
			            <option value="rural">Temporary</option>
          			</select>
        		</label>
        		<input type="submit" value="Submit" />
      		</form>
    	)
	}
}

export default EntryForm
