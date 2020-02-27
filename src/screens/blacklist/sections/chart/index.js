import React, {Component} from 'react'
import { Line } from 'react-chartjs-2'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
import {
  Card,
  CardBody
} from 'reactstrap'
import moment from 'moment'

import './style.scss'

const backOption = {
  tooltips: {
    enabled: true,
  },
  // responsive: true,
  maintainAspectRatio: false,
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },
      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          max: 7 + 5,
        },
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3,
    },
  },
  legend: {
    display: false,
  },
}


class DashBoardChart extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }


  componentDidMount(){
    // this.props.DashboardActions.getBankAccountTypes().then(firstAccount => {
    //   this.getBankAccountGraphData(firstAccount, 12)
    // })
  }

  getBankAccountGraphData(account, dateRange){
    // this.props.DashboardActions.getBankAccountGraphData(account, dateRange)
  }

  render() {
    const line = {
      labels:  ['19.Jan', '20.Jan', '21.Jan', '22.Jan', '23.Jan', '24.Jan', ],
      datasets: [
        {
          label: [],
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'white',
          borderColor: '#613BEA',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'white',
          pointBackgroundColor: '#613BEA',
          pointBorderWidth: 2,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#613BEA',
          pointHoverBorderColor: 'white',
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 20,
          data: [0, 6,0,0,0,0],
        }
      ]
    }

    return (
      <div className="animated fadeIn">

            <div className="flex-wrapper">
              <div className="chart-wrapper" style={{ height: '70px' }}>
                <Line data={line} options={backOption} datasetKeyProvider={() => {return Math.random()}} height={70}/>
              </div>
            </div>

      </div>
    )
  }
}

export default DashBoardChart