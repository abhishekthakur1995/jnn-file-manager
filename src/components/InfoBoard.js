import React from 'react'
import { Grid } from 'react-bootstrap'
import { Doughnut } from 'react-chartjs-2'
import { COMMON } from './helpers/Constants'
import { DashboardService } from './services/ApiServices'
import { InfoBlock, ChartHolder, PageHead, LoadingSpinner } from './uiComponents/CommonComponent'
import approved from './../../public/img/approved.png'
import received from './../../public/img/received.png'
import pending from './../../public/img/pending.png'

class InfoBoard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			dashboardData:{},
			showLoading: false
		}
	}

	componentDidMount() {
		this.setState({ showLoading:true })
      	DashboardService.getDashboardData().then((res) => {
      		this.setState({
      			dashboardData: res.data.data[0],
      			showLoading: false
      		})
      	})
	}

	render() {
		const { dashboardData } = this.state

		const chartData = {
			labels: ['Received', 'Approved', 'Pending'],
			datasets: [{
				data: [dashboardData.RECEIVED, dashboardData.APPROVED, dashboardData.PENDING],
				backgroundColor: [COMMON.CHART_COLOR.RECEIVED, COMMON.CHART_COLOR.INCOMING, COMMON.CHART_COLOR.OUTGOING],
				hoverBackgroundColor: [COMMON.HOVER_COLOR.RECEIVED, COMMON.HOVER_COLOR.INCOMING, COMMON.HOVER_COLOR.OUTGOING],
			}]
		}

		const options = {
	        legend: {
	            display: true,
	            position: 'right',
	            labels: {
	            	padding:30,
	            	usePointStyle: true
	            }
	        },
	        maintainAspectRatio: false
	  	}

		const chart = <Doughnut data={chartData} width={200} height={200} options={options} />

		return (
			<Grid bsClass="width-10x pull-left">
				{this.state.showLoading && <LoadingSpinner />}
				<PageHead />
				<Grid bsClass="width-10x pull-left">
					<InfoBlock title="Received" img={received} value={dashboardData.RECEIVED} customClass={'padding-right-3x'} />
					<InfoBlock title="Pending"  img={pending} value={dashboardData.APPROVED} customClass={'padding-vert-3x'} />
					<InfoBlock title="Approved" img={approved} value={dashboardData.PENDING} customClass={'padding-left-3x'} />
				</Grid>
				<ChartHolder title="Application Status" chart={chart}/>
			</Grid>
		)
	}
}

export default InfoBoard