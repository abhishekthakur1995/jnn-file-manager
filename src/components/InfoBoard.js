import React from 'react'
import axios from 'axios'
import { Grid } from 'react-bootstrap'
import { InfoBlock, ChartHolder } from './uiComponents/CommonComponent'
import { Doughnut } from 'react-chartjs-2'
import _ from 'lodash'
import config from 'config'

class InfoBoard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			dashboardData:{}
		}
	}

	componentDidMount() {
		const headers = { 'Authorization': localStorage.getItem('authToken') }
		axios.get(`${config.baseUrl}/getDashboardData`, {headers})
      	.then(res => {
	        this.setState({
	        	dashboardData: res.data.data[0]
	        })
      	})
	}

	render() {
		const { dashboardData } = this.state

		if (_.isEmpty(dashboardData)) {
		  return <div>No data available</div>
		}

		const chartData = {
			labels: ['Received', 'Approved', 'Pending'],
			datasets: [{
				data: [dashboardData.RECEIVED, dashboardData.APPROVED, dashboardData.PENDING],
				backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
				hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
			}]
		}

		const chart = <Doughnut data={chartData} width={100} height={100} />

		return (
			<Grid bsClass="width-10x pull-left">
				<Grid bsClass="width-10x pull-left">
					<InfoBlock title="Received" value={dashboardData.RECEIVED} />
					<InfoBlock title="Pending"  value={dashboardData.APPROVED} />
					<InfoBlock title="Approved" value={dashboardData.PENDING} />
				</Grid>
				<ChartHolder title="Application Status" chart={chart}/>
			</Grid>
		)
	}
}

export default InfoBoard