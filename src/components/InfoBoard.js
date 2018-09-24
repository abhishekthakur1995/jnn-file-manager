import React from 'react'
import { Grid } from 'react-bootstrap'
import { Doughnut } from 'react-chartjs-2'
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
				backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
				hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
			}]
		}

		const chart = <Doughnut data={chartData} width={100} height={100} />

		return (
			<Grid bsClass="width-10x pull-left">
				{this.state.showLoading && <LoadingSpinner />}
				<PageHead />
				<Grid bsClass="width-10x pull-left">
					<InfoBlock title="Received" img={received} value={dashboardData.RECEIVED} />
					<InfoBlock title="Pending"  img={pending} value={dashboardData.APPROVED} />
					<InfoBlock title="Approved" img={approved} value={dashboardData.PENDING} />
				</Grid>
				<ChartHolder title="Application Status" chart={chart}/>
			</Grid>
		)
	}
}

export default InfoBoard