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
  Invoice,
  BankAccount,
  CashFlow,
  RevenueAndExpense,
  ProfitAndLoss
} from './sections'

import * as DashboardActions from './actions'

import './style.scss'


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

class Dashboard extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="dashboard-screen">
        <div className="animated fadeIn">
          <Card>
            <CardBody>
              <div className="flex-wrapper align-items-center">
                <h1 className="title">Dashboard</h1>
                <div className="card-header-actions">
                  <div className="new-select fill">
                    <select className="form-control" ref={this.dateRangeSelect} onChange={(e) => this.handleChange(e)}>
                      <option value="12">Last 12 Months</option>
                      <option value="6">Last 6 Months</option>
                      <option value="3">Last 3 Months</option>
                    </select>
                    <i className="fa fa-caret-down fa-lg mt-4"/>
                  </div>
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
            </CardBody>
          </Card>
        </div>
        
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
