import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  ButtonGroup,
  Input
} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'
import moment from 'moment'
import config from 'constants/config'
import { Loader, Spin } from 'components'
import { tableOptions } from 'constants/tableoptions'

import 'react-toastify/dist/ReactToastify.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import * as OrderActions from './actions'
import './style.scss'

const user = window.localStorage.getItem('userId')

const mapStateToProps = (state) => {
  return ({
    order_list: state.order.order_list
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators(OrderActions, dispatch)
  })
}

const ORDER_STATUS = {
  '0': 'Pending',
  '1': 'Completed',
  '2': 'Cancelled',
  '3': 'Confirmation',
  '4': 'Partial'
}

const PAYMENT_OPTS = {
  'paypal': 'PayPal',
  'bitcoin': 'BTC',
  'litecoin': 'LTC',
  'ethereum': 'ETH',
  'skrill': 'Skrill',
  'stripe': 'Stripe',
  'bitcoincash': 'BTH',
  'perfectmoney': 'Perfect Money'
}


class Order extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }

    this.initializeData = this.initializeData.bind(this)
    this.gotoDetail = this.gotoDetail.bind(this)
    this.renderOrderInfo = this.renderOrderInfo.bind(this)
  }

  componentDidMount () {
    this.initializeData()
  }

  initializeData () {
    this.setState({ loading: true })
    this.props.actions.getOrderList().then(res => {
      if (res.status === 200) {
        this.setState({ loading: false })
      }
    }).finally(() => {
      this.setState({loading: false})
    })
  }

  gotoDetail(e, id) {
    this.props.history.push({
      pathname: `/dashboard/${user}/orders/view/${id}`
    })
  }

  renderOrderInfo (cell, row) {
    return (
      <div>
        <p><a onClick={(e) => this.gotoDetail(e, row.uniqid)}>
          <i className={`flag-icon flag-icon-${row.country.toLowerCase()}`}>
            </i>&nbsp;&nbsp;&nbsp;{`${PAYMENT_OPTS[row.gateway]} - ${row.customer_email}`}</a>
        </p>
        <p className="caption">{row.uniqid} - {row.developer_invoice == '1'?row.developer_title:row.product_title}</p>
      </div>
    )  
  }

  renderOrderStatus (cell, row) {
    return (
      <div className={`badge badge-${ORDER_STATUS[row.status].toLowerCase()}`} style={{  margin: '0 auto'}}>
        {ORDER_STATUS[row.status]} {ORDER_STATUS == '3' && <Spin/>}
      </div>
    )  
  }

  renderOrderValue(cell, row) {
    return (
      <div className="order">
        <p className="order-value">{'+' + config.CURRENCY_LIST[row.currency] + row.total_display}</p>
        <p className="caption">{row.crypto_amount?(row.crypto_amount + ' '):''} {PAYMENT_OPTS[row.gateway]}</p>
      </div>
    )  
  }

  renderOrderTime(cell, row) {
    return (
      <div>
        <p>{new moment(new Date(row.created_at*1000)).format('ddd MM')}</p>
        <p>{new moment(new Date(row.created_at*1000)).format('HH:mm')}</p>
      </div>
    )  
  }

  render() {

    const { loading } = this.state
    const { order_list } = this.props

    console.log(order_list)

    return (
      <div className="order-screen">
        <div className="animated fadeIn">
          <Card className="grey">
            <CardHeader>
              <Row style={{alignItems: 'center'}}>
                <Col md={4}>
                  <h1>Orders</h1>
                </Col>
                <Col md={8}>
                  <div className="d-flex justify-content-end">
                    <div className="searchbar white">
                      <i className="fas fa-search"/>
                      <Input placeholder="Search..." className="header-search-input"></Input>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody className="p-0">
              {
                loading ?
                  <Row>
                    <Col lg={12}>
                      <Loader />
                    </Col>
                  </Row>
                :
                  <Row>
                    <Col lg={12}>
                      <div>
                        <BootstrapTable
                          options={{...tableOptions(), onRowClick: (row) => {
                            this.gotoDetail(null, row.uniqid)}
                          }}
                          data={order_list}
                          version="4"
                          pagination
                          totalSize={order_list ? order_list.length : 0}
                          className="product-table"
                          trClassName="cursor-pointer"
                        >
                          <TableHeaderColumn
                            isKey
                            dataField="uniqid"
                            dataFormat={this.renderOrderInfo}
                            dataSort
                            width='45%'
                          >
                            Info
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="status"
                            dataAlign="center"
                            dataFormat={this.renderOrderStatus}
                            dataSort
                            width='20%'
                          >
                            Status
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="value"
                            dataAlign="center"
                            dataSort
                            dataFormat={this.renderOrderValue}
                            width='20%'
                          >
                            Value
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="datetime"
                            dataAlign="right"
                            dataFormat={this.renderOrderTime}
                            dataSort
                            width='15%'
                          >
                            Time
                          </TableHeaderColumn>
                        </BootstrapTable>
                      </div>
                    </Col>
                  </Row>
              }
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
