import React from 'react'
import { Grid } from 'react-bootstrap'
import { Doughnut } from 'react-chartjs-2'
import { COMMON } from './helpers/Constants'
import { DashboardService } from './services/ApiServices'
import { InfoBlock, ChartHolder, PageHead, LoadingSpinner } from './uiComponents/CommonComponent'
import total from './../../public/img/total.png'
import approved from './../../public/img/approved.png'
import rejected from './../../public/img/rejected.png'
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
			labels: ['Pending', 'Approved', 'Rejected'],
			datasets: [{
				data: [dashboardData.PENDING, dashboardData.APPROVED, dashboardData.REJECTED],
				backgroundColor: [COMMON.CHART_COLOR.PENDING, COMMON.CHART_COLOR.APPROVED, COMMON.CHART_COLOR.REJECTED],
				hoverBackgroundColor: [COMMON.HOVER_COLOR.PENDING, COMMON.HOVER_COLOR.APPROVED, COMMON.CHART_COLOR.REJECTED],
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
					<InfoBlock title="Received" img={total} value={dashboardData.TOTAL} customClass={'padding-right-3x col-md-3'} />
					<InfoBlock title="Pending"  img={pending} value={dashboardData.PENDING} customClass={'padding-vert-3x col-md-3'} />
					<InfoBlock title="Approved" img={approved} value={dashboardData.APPROVED} customClass={'padding-left-3x col-md-3'} />
					<InfoBlock title="Rejected" img={rejected} value={dashboardData.REJECTED} customClass={'padding-left-3x col-md-3'} />
				</Grid>
				<ChartHolder title="Application Status" chart={chart}/>
			</Grid>
		)
	}
}

export default InfoBoard