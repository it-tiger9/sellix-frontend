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
  CardBody
} from 'reactstrap'
import moment from 'moment'

import './style.scss'

const invoiceOption = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  legend: {
    display: true,
    position: 'right',
    labels: {
      boxWidth: 15,
    }
  },
  scales: {
    xAxes: [{
    stacked: true
    }],
    yAxes: [{
      stacked: true,
    }]
  }, 
  maintainAspectRatio: false
}

const ranges =  {
  // 'Today': [moment(), moment()],
  // 'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  'This Week': [moment().startOf('week'), moment().endOf('week')],
  'This Month': [moment().startOf('month'), moment().endOf('month')],
  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
  'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
}

class Invoice extends Component {

  constructor(props) {
    super(props);
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
    this.props.DashboardActions.getInvoiceGraphData(12)
  }

  handleChange(e) {
    e.preventDefault()
    this.props.DashboardActions.getInvoiceGraphData(e.currentTarget.value)
  }

  render() {
    const invoiceBar = {
      labels: this.props.invoice_graph.labels || [],
      datasets: [
        {
          label: (this.props.invoice_graph.paid || {})['label'],
          backgroundColor: '#36A2EB89',
          data: (this.props.invoice_graph.paid || {})['data'],
        },
        {
          label: (this.props.invoice_graph.due || {})['label'],
          backgroundColor: '#FF638489',
          data: (this.props.invoice_graph.due || {})['data'],
        },
        {
          label: (this.props.invoice_graph.overdue || {})['label'],
          backgroundColor: '#FFCE5689',
          data: (this.props.invoice_graph.overdue || {})['data'],
        }
      ]
    }

    return (
      <div className="animated fadeIn">
        <Card className='invoice-card'>
          <CardBody className="tab-card">
            <div className="flex-wrapper">
              <Nav tabs>
                <NavItem>
                  <NavLink
                  active={this.state.activeTab[0] === '1'}
                  onClick={() => { this.toggle(0, '1') }}
                  >
                  Invoices Timeline
                  </NavLink>
                </NavItem>
              </Nav>
              <div className="card-header-actions">
                <select className="form-control" ref={this.dateRangeSelect} onChange={(e) => this.handleChange(e)}>
                  <option value="12">Last 12 Months</option>
                  <option value="6">Last 6 Months</option>
                  <option value="3">Last 3 Months</option>
                </select>
              </div>
            </div>
            <TabContent activeTab={this.state.activeTab[0]}>
              <TabPane tabId="1">
                <div className="flex-wrapper" style={{paddingLeft: 20}}>
                  <div className="data-info">
                  <button className="btn-instagram btn-brand mr-1 mb-1 btn btn-secondary btn-sm">
                    <i className="nav-icon icon-speech"></i><span>New Invoice</span>
                  </button>
                  </div>
                  <div className="data-info">
                  <div className="data-item">
                    <div>
                      <h3>$12,640</h3>
                      <p>OUTSTANDING</p>
                    </div>
                  </div>
                  </div>
                </div>
                <div className="chart-wrapper invoices">
                  <HorizontalBar data={invoiceBar} options={invoiceOption} datasetKeyProvider={() => {return Math.random()}}/>
                </div>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </div>
    )
  }
}

export default Invoice