import React from 'react'
import { Grid } from 'react-bootstrap'
import { Doughnut } from 'react-chartjs-2'
import { COMMON } from './../helpers/Constants'
import total from './../../../public/img/total.png'
import incoming from './../../../public/img/incoming_mail.png'
import outgoing from './../../../public/img/outgoing_mail.png'
import { LetterBoardService } from './../services/ApiServices'
import { InfoBlock, ChartHolder, PageHead, LoadingSpinner } from './../uiComponents/CommonComponent'

class LetterBoard extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			dashboardData:{},
			showLoading: false
		}
	}

	componentDidMount() {
		this.setState({ showLoading:true })
      	LetterBoardService.getDashboardData().then((res) => {
      		this.setState({
      			dashboardData: res.data.data[0],
      			showLoading: false
      		})
      	})
	}

	render() {
		const { dashboardData } = this.state

		const chartData = {
			labels: ['Incoming', 'Outgoing'],
			datasets: [{
				data: [dashboardData.INCOMING, dashboardData.OUTGOING],
				backgroundColor: [COMMON.CHART_COLOR.INCOMING, COMMON.CHART_COLOR.OUTGOING],
				hoverBackgroundColor: [COMMON.HOVER_COLOR.INCOMING, COMMON.HOVER_COLOR.OUTGOING],
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
					<InfoBlock title="Total" img={total} value={dashboardData.TOTAL} customClass={'padding-right-3x col-md-4'} />
					<InfoBlock title="Incoming" img={incoming} value={dashboardData.INCOMING} customClass={'padding-vert-3x col-md-4'} />
					<InfoBlock title="Outgoing" img={outgoing} value={dashboardData.OUTGOING} customClass={'padding-left-3x col-md-4'} />
				</Grid>
				<ChartHolder title="Letter Status" chart={chart}/>
			</Grid>
		)
	}
}

export default LetterBoard