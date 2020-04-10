import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardBody,
  Row,
  Col
} from 'reactstrap'
import { Loader } from 'components'
import {
  DashBoardChart
} from './sections'
import moment from 'moment'
import * as DashboardActions from './actions'

import './style.scss'


const mapStateToProps = (state) => {
  return ({

  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators(DashboardActions, dispatch)
  })
}

const DATE_RANGES =  {
  'last-24hours': [moment().subtract(1, 'days'), moment(), 'daily'],
  'total': [moment().startOf(99, 'years'), moment(), 'yearly'],
  'this-month': [moment().startOf('month'), moment().endOf('month'), 'daily'],
  'this-year': [moment().startOf('year'), moment(), 'monthly'],
  'last-30days': [moment().subtract(29, 'days'), moment(), 'daily'],
}

const Progress = ({ progress, isPositive, is24 }) => {
  if(is24) {
    return (
        <div className={'progress-indicator'} >
          {
            progress != 0 ? 
              <i className={`fas fa-caret-${isPositive ? 'up' : 'down'}`} />:
              <i className={`fa fa-minus`} />
          }
          
          {progress != 0 ?
             (isPositive ?
              <span>+<b>{(Math.round(progress*100)/100).toFixed(2)}</b> %</span> :
              <span><b>{(Math.round(progress*100)/100).toFixed(2)}</b> %</span>) :
              <span><b>{(Math.round(progress*100)/100).toFixed(2)}</b> %</span>
          }
        </div>
    )
  } else {
    return null
  }
}

class Dashboard extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      range: 'last-24hours',
      loading: false,
      chartData: [],
      totalRevenue: 0,
      totalOrders: 0,
      totalViews: 0,
      totalQueries: 0,
      revenueProgress: 0,
      ordersProgress: 0,
      viewsProgress: 0,
      queriesProgress: 0,
    }
  }

  changeRange(e) {
    const range = DATE_RANGES[e.target.value]
    this.setState({range:e.target.value})
    this.getAnalyticsData(range)
  }

  getAnalyticsData = (range) => {
    this.setState({loading: true})
    this.props.actions.getAnalyticsData(range[0].format('MM/DD/YYYY'), range[1].format('MM/DD/YYYY')).then(res => {
      const total = res.data.analytics.total

      this.setState({
        totalRevenue: total.revenue || 0,
        totalOrders: total.orders_count || 0,
        totalViews: total.views_count || 0,
        totalQueries: total.queries_count || 0,
        revenueProgress: total.revenue_progress || 0,
        ordersProgress: total.orders_count_progress || 0,
        viewsProgress: total.views_count_progress || 0,
        queriesProgress: total.queries_count_progress || 0,
        chartData: res.data.analytics[range[2]]
      })
    }).finally(() => {
      this.setState({loading: false})
    })
  }

  componentDidMount() {
    const range = DATE_RANGES['last-24hours']
    this.getAnalyticsData(range)
  }

  render() {
    const {
      chartData,
      totalRevenue,
      totalOrders,
      totalViews,
      totalQueries,
      loading,
      revenueProgress,
      ordersProgress,
      viewsProgress,
      queriesProgress
    } = this.state

    return (
      <div className="dashboard-screen mt-4">
        <div className="animated fadeIn">
          <Card>
            <CardBody>
              <div className="flex-wrapper align-items-center">
                <h1 className="title">Dashboard</h1>
                <div className="card-header-actions">
                  <div className="new-select fill">
                    <select className="form-control" onChange={this.changeRange.bind(this)}>
                      <option value="last-24hours">Last 24 hours</option>
                      <option value="last-30days">Last 30 days</option>
                      <option value="this-month">This Month</option>
                      <option value="this-year">This Year</option>
                      <option value="total">Total</option>
                    </select>
                    <i className="fa fa-caret-down fa-lg mt-4"/>
                  </div>
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
                            <Progress progress={revenueProgress} is24={true} isPositive={revenueProgress>=0} />
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg={3}>
                        <Card className="grey">
                          <CardBody className="p-4">
                            <h3 className="text-primary">{totalOrders}</h3>
                            <p className="report-title">Orders</p>
                            <Progress progress={ordersProgress} is24={true} isPositive={ordersProgress>=0} />
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg={3}>
                        <Card className="grey">
                          <CardBody className="p-4">
                            <h3 className="text-primary">{totalViews}</h3>
                            <p className="report-title">Views</p>
                            <Progress progress={viewsProgress} is24={true} isPositive={viewsProgress>=0} />
                          </CardBody>
                        </Card>
                      </Col>
                      <Col lg={3}>
                        <Card className="grey">
                          <CardBody className="p-4">
                          <h3 className="text-primary">{totalQueries}</h3>
                            <p className="report-title">Queries</p>
                            <Progress progress={queriesProgress} is24={true} isPositive={queriesProgress>=0} />
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                    <div className="mt-3">
                      <DashBoardChart height="350px" data={chartData}/>
                    </div>
                  </div>
              }
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
