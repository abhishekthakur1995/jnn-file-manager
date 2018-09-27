import React from 'react'
import { Grid } from 'react-bootstrap'
import { Doughnut } from 'react-chartjs-2'
import received from './../../../public/img/received_mail.png'
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
			labels: ['Received', 'Incoming', 'Outgoing'],
			datasets: [{
				data: [dashboardData.RECEIVED, dashboardData.INCOMING, dashboardData.OUTGOING],
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
					<InfoBlock title="Incoming"  img={incoming} value={dashboardData.INCOMING} />
					<InfoBlock title="Outgoing" img={outgoing} value={dashboardData.OUTGOING} />
				</Grid>
				<ChartHolder title="Letter Status" chart={chart}/>
			</Grid>
		)
	}
}

export default LetterBoard