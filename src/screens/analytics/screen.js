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
import { Loader } from 'components'
import moment from 'moment'
import { DateRangePicker2 } from 'components'
import * as AnalyticsActions from './actions'

import './style.scss'
import { date } from 'yup'

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
    actions: bindActionCreators(AnalyticsActions, dispatch)
  })
}

class Analytics extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,

      chartData: [],
      totalRevenue: 0,
      totalOrders: 0,
      totalViews: 0,
      totalConversion: 0
    }
  }

  changeDateRange(date) {
    this.setState({
      startDate: date.startDate,
      endDate: date.endDate
    })

    this.getAnalyticsData()
  }

  getAnalyticsData(date) {
    const startDate = date.startDate.format('MM/DD/YYYY')
    const endDate = date.endDate.format('MM/DD/YYYY')
    this.setState({loading: true})

    this.props.actions.getAnalyticsData(startDate, endDate).then(res => {
      const total = res.data.analytics.total

      this.setState({
        totalRevenue: total.revenue || 0,
        totalOrders: total.orders_count || 0,
        totalViews: total.views_count || 0,
        totalConversion: total.queries_count || 0,
        chartData: res.data.analytics.daily
      })
    }).finally(() => {
      this.setState({loading:false})
    })
  }

  componentDidMount(){
    const date = { 
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month')
    }

    this.getAnalyticsData(date)
  }

  render() {
    const {totalConversion, totalOrders, totalRevenue, totalViews, loading, chartData} = this.state

    return (
      <div className="analytics-screen mt-4">
        <div className="animated fadeIn">
          <Card>
            <CardBody>
              <div className="flex-wrapper align-items-center">
                <h1 className="title">Analytics</h1>
                <div className="card-header-actions">
                  <DateRangePicker2 ranges={ranges} getDate={(date) => {this.getAnalyticsData(date)}} opens={'left'}/>
                </div>
              </div>

              {
                loading ?
                  <Row>
                    <Col lg={12}>
                      <Loader />
                    </Col>
                  </Row>
                : <div>
                <Row className="mt-4">
                  <Col lg={3}>
                    <Card className="grey">
                      <CardBody className="p-4">
                        <h3 className="text-primary">${totalRevenue}</h3>
                        <p className="report-title">Revenue</p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={3}>
                    <Card className="grey">
                      <CardBody className="p-4">
                        <h3 className="text-primary">{totalOrders}</h3>
                        <p className="report-title">Orders</p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={3}>
                    <Card className="grey">
                      <CardBody className="p-4">
                        <h3 className="text-primary">{totalViews}</h3>
                        <p className="report-title">Views</p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg={3}>
                    <Card className="grey">
                      <CardBody className="p-4">
                        <h3 className="text-primary">{totalConversion}%</h3>
                        <p className="report-title">Conversion</p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <div className="chart row row mt-2 mb-2">
                  <Col lg={12}>
                    <label>Revenue</label>
                    <hr/>
                    <RevenueChart height="350px" data={chartData}/>
                  </Col>
                </div>

                <div className="chart row row mt-2 mb-2">
                  <Col lg={12}>
                    <label>Views</label>
                    <hr/>
                    <ViewsChart height="350px" data={chartData}/>
                  </Col>
                </div>

                <div className="chart row row mt-2 mb-2">
                  <Col lg={12}>
                    <label>Orders</label>
                    <hr/>
                    <OrdersChart height="350px" data={chartData}/>
                  </Col>
                </div>

                <div className="chart row mt-2 mb-2">
                  <Col lg={12}>
                    <label>Conversion</label>
                    <hr/>
                    <ConverstionChart height="350px" data={chartData}/>
                  </Col>
                </div>
                {/* <div className="chart row mt-2 mb-2">
                  <Col lg={12}>
                    <label>Revenue by Country</label>
                    <hr/>
                    <RevenueMap/>
                  </Col>
                </div> */}
              </div>
              }
              
            </CardBody>
          </Card>
        </div>
        
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Analytics)
