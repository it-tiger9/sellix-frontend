import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardBody,
  Row,
  Col
} from 'reactstrap'

import {
  RevenueChart,
  ViewsChart,
  ConverstionChart,
  OrdersChart,
  RevenueMap
} from './sections'

import moment from 'moment'
import { DateRangePicker2 } from 'components'
import * as DashboardActions from './actions'

import './style.scss'

const ranges =  {
  // 'Today': [moment(), moment()],
  // 'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  'This Month': [moment().startOf('month'), moment().endOf('month')],
  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
  'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
}

const mapStateToProps = (state) => {
  return ({
    // Bank Account
    bank_account_type: state.dashboard.bank_account_type,
    bank_account_graph: state.dashboard.bank_account_graph,

    // Cash Flow
    cash_flow_graph: state.dashboard.cash_flow_graph,

    // Invoice 
    invoice_graph: state.dashboard.invoice_graph,

    // Profit and Loss
    profit_loss: state.dashboard.proft_loss,

    // Revenues and Expenses
    revenue_graph: state.dashboard.revenue_graph,
    expense_graph: state.dashboard.expense_graph
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    DashboardActions: bindActionCreators(DashboardActions, dispatch)
  })
}

class Analytics extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="analytics-screen">
        <div className="animated fadeIn">
          <Card>
            <CardBody>
              <div className="flex-wrapper align-items-center">
                <h1 className="title">Analytics</h1>
                <div className="card-header-actions">
                  <DateRangePicker2 ranges={ranges} getDate={() => {}}/>
                </div>
              </div>
              <Row className="mt-4">
                <Col lg={3}>
                  <Card className="grey">
                    <CardBody>
                      <h1 className="report">$4000.00</h1>
                      <p className="report-title">Revenue</p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={3}>
                  <Card className="grey">
                    <CardBody>
                      <h1 className="report">253</h1>
                      <p className="report-title">Orders</p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={3}>
                  <Card className="grey">
                    <CardBody>
                      <h1 className="report">397</h1>
                      <p className="report-title">Views</p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={3}>
                  <Card className="grey">
                    <CardBody>
                      <h1 className="report">89%</h1>
                      <p className="report-title">Conversion</p>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
              <div className="chart row row mt-2 mb-2">
                <Col lg={12}>
                  <label>Revenue</label>
                  <hr/>
                  <RevenueChart height="350px"/>
                </Col>
              </div>

              <div className="chart row row mt-2 mb-2">
                <Col lg={12}>
                  <label>Views</label>
                  <hr/>
                  <ViewsChart height="350px"/>
                </Col>
              </div>

              <div className="chart row row mt-2 mb-2">
                <Col lg={12}>
                  <label>Orders</label>
                  <hr/>
                  <OrdersChart height="350px"/>
                </Col>
              </div>

              <div className="chart row mt-2 mb-2">
                <Col lg={12}>
                  <label>Conversion</label>
                  <hr/>
                  <ConverstionChart height="350px"/>
                </Col>
              </div>
              <div className="chart row mt-2 mb-2">
                <Col lg={12}>
                  <label>Revenue by Country</label>
                  <hr/>
                  <RevenueMap/>
                </Col>
              </div>
            </CardBody>
          </Card>
        </div>
        
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Analytics)
