import React, {Component} from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips'
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  CardBody,
  Progress
} from 'reactstrap'
import { DateRangePicker2 } from 'components'
import moment from 'moment'
import './style.scss'

const invoiceOption = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  legend: {
    display: false,
    position: 'right',
    labels: {
      boxWidth: 15,
    }
  },
  scales: {
  }, 
  maintainAspectRatio: false
}

const ranges =  {
  // 'Today': [moment(), moment()],
  // 'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  'This Month': [moment().startOf('month'), moment().endOf('month')],
  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
  'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
}


const minusIcon = require('assets/images/dashboard/minus.png')
const equalIcon = require('assets/images/dashboard/equal.png')


class ProfitAndLoss extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeTab: new Array(4).fill('1')
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray
    })
  }

  componentDidMount() {
    this.props.DashboardActions.getProfitAndLossData('2019-01-01', '2019-05-01')
  }

  render() {
    const invoiceBar = {
      labels: ['', ''],
      datasets: [
        {
        label: 'Profit',
        backgroundColor: '#36A2EB89',
        data: [2500, 4000],
        },
      ]
    }

    return (
      <div className="animated fadeIn">
        <Card className='profit-card'>
          <CardBody className="tab-card">
            <div className="flex-wrapper">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[0] === '1'}
                    onClick={() => { this.toggle(0, '1') }}
                  >
                    Profit and Loss
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[0] === '2'}
                    onClick={() => { this.toggle(0, '2') }}
                  >
                    Taxes
                  </NavLink>
                </NavItem>
              </Nav>
              <div className="card-header-actions">
                <DateRangePicker2 ranges={ranges}/>
              </div>
            </div>
            <TabContent activeTab={this.state.activeTab[0]}>
              <TabPane tabId="1">
                <div className="flex-wrapper">
                  <div className="data-info">
                    <div className="data-item">
                      <div>
                      <h3>$ {this.props.profit_loss['income']}</h3>
                      <p>INCOME</p>
                      </div>
                    </div>
                    <img alt="minus" src={minusIcon}/>
                    <div className="data-item">
                      <div>
                      <h3>$ {this.props.profit_loss['expenses']}</h3>
                      <p>EXPENSES</p>
                      </div>
                    </div>
                    <img alt="sum" src={equalIcon}/>
                    <div className="data-item total">
                      <div>
                        <h3>$ {this.props.profit_loss['income'] - this.props.profit_loss['expenses']}</h3>
                        <p>PROFIT</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{marginTop: 20}}>
                  <div className="data-info progress">
                    <Progress className="income" color="success" value="90"></Progress>
                    <div className="data-item small">
                      <div>
                        <h3>$ 180, 40</h3>
                        <p>INCOME</p>
                      </div>
                    </div>
                  </div>
                  <div className="data-info progress">
                    <Progress className='expense' color="warning" value="20"></Progress>
                    <div className="data-item small">
                      <div>
                      <h3>$ 180, 40</h3>
                      <p>EXPENSES</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="2">
                Taxes
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
        
      </div>
    )
  }
}

export default ProfitAndLoss