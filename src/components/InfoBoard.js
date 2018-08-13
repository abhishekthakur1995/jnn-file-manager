import React from 'react'
import { Grid } from 'react-bootstrap'
import { InfoBlock } from './uiComponents/CommonComponent'
import { Doughnut } from 'react-chartjs-2'

class InfoBoard extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const chartData = {
			labels: [
				'Received',
				'Approved',
				'Pending'
			],
			datasets: [{
				data: [300, 50, 100],
				backgroundColor: [
				'#FF6384',
				'#36A2EB',
				'#FFCE56'
				],
				hoverBackgroundColor: [
				'#FF6384',
				'#36A2EB',
				'#FFCE56'
				]
			}]
		};
		return (
			<Grid bsClass="InfoBoard">
				<InfoBlock title="Received" value="100" />
				<InfoBlock title="Approved" value="60" />
				<InfoBlock title="Pending" value="40" />
				<Doughnut data={chartData} width={100} height={100} options={{maintainAspectRatio: false}} />
			</Grid>
		)
	}
}

export default InfoBoard