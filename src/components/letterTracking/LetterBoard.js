import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'react-bootstrap'
import { Doughnut } from 'react-chartjs-2'
import { COMMON } from './../helpers/Constants'
import total from './../../../public/img/total.png'
import { defineMessages, injectIntl } from 'react-intl'
import incoming from './../../../public/img/incoming_mail.png'
import outgoing from './../../../public/img/outgoing_mail.png'
import { LetterBoardService } from './../services/ApiServices'
import { InfoBlock, ChartHolder, PageHead, LoadingSpinner } from './../uiComponents/CommonComponent'

const messages = defineMessages({
    total: {
		id: 'common.general.total',
        defaultMessage: 'Total',
    },
    incoming: {
		id: 'common.general.incoming',
        defaultMessage: 'Incoming',
    },
    outgoing: {
		id: 'common.general.outgoing',
        defaultMessage: 'Outgoing',
    },
    chartHolderTitle: {
		id: 'letterTracking.letterboard.chartHolderTitle',
	    defaultMessage: 'Letter Record Status'
    }
})

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
		const { intl } = this.props

		const chartData = {
			labels: [intl.formatMessage(messages.incoming), intl.formatMessage(messages.outgoing)],
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
					<InfoBlock title={intl.formatMessage(messages.total)} img={total} value={dashboardData.TOTAL} customClass={'padding-right-3x col-md-4'} />
					<InfoBlock title={intl.formatMessage(messages.incoming)} img={incoming} value={dashboardData.INCOMING} customClass={'padding-vert-3x col-md-4'} />
					<InfoBlock title={intl.formatMessage(messages.outgoing)} img={outgoing} value={dashboardData.OUTGOING} customClass={'padding-left-3x col-md-4'} />
				</Grid>
				<ChartHolder title={intl.formatMessage(messages.chartHolderTitle)} chart={chart} />
			</Grid>
		)
	}
}

LetterBoard.propTypes = {
    intl: PropTypes.object
}

export default injectIntl(LetterBoard)