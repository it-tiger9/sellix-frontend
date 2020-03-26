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

import { Loader } from 'components'
import { tableOptions } from 'constants/tableoptions'

import 'react-toastify/dist/ReactToastify.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import * as ProductActions from './actions'
import './style.scss'

const user = window.localStorage.getItem('userId')

const mapStateToProps = (state) => {
  return ({
    product_list: state.product.product_list
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    productActions: bindActionCreators(ProductActions, dispatch)
  })
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
    // this.props.productActions.getProductList().then(res => {
    //   if (res.status === 200) {
    //     this.setState({ loading: false })
    //   }
    // })

    this.props.productActions.getProductList()
    this.setState({ loading: false })
  }

  gotoDetail(e, id) {
    this.props.history.push({
      pathname: `/${user}/orders/detail/${id}`
    })
  }

  renderOrderInfo (cell, row) {
    console.log(this)
    if (
      row.mail && row.id
    ) {
      return (
        <div>
          <p><a onClick={(e) => this.gotoDetail(e, row.id)}>
            <i className="flag-icon flag-icon-be"></i>&nbsp;&nbsp;&nbsp;{`${row.unit}-${row.mail}`}</a>
          </p>
          <p className="caption">{row.id}</p>
        </div>
      )  
    } else {
      return (
        <p className="caption">No specified</p>
      )
    }
  }

  renderOrderStatus (cell, row) {
    if (
      row.status
    ) {
      return (
        <div className={`badge badge-${row.status.toLowerCase()}`}>
          {row.status}
        </div>
      )  
    } else {
      return (
        <p className="caption">No specified</p>
      )
    }
  }

  renderOrderValue(cell, row) {
    if (
      row.value
    ) {
      return (
        <div className="order">
          <p className="order-value">{row.value}</p>
          <p className="caption">{row.rate}</p>
        </div>
      )  
    } else {
      return (
        <p className="caption">No specified</p>
      )
    }
  }

  renderOrderTime(cell, row) {
    if (
      row.datetime
    ) {
      return (
        <div>
          <p>{new moment(row.datetime).format('ddd MM')}</p>
          <p>{new moment(row.datetime).format('HH:mm')}</p>
        </div>
      )  
    } else {
      return (
        <p className="caption">No specified</p>
      )
    }
  }

  render() {

    const { loading } = this.state
    const { product_list } = this.props

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
                          options={ tableOptions() }
                          data={product_list}
                          version="4"
                          pagination
                          totalSize={product_list ? product_list.length : 0}
                          className="product-table"
                          trClassName="cursor-pointer"
                        >
                          <TableHeaderColumn
                            isKey
                            dataField="email"
                            dataFormat={this.renderOrderInfo}
                            dataSort
                            width='50%'
                          >
                            Info
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="status"
                            dataFormat={this.renderOrderStatus}
                            dataSort
                            width='20%'
                          >
                            Status
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="value"
                            dataSort
                            dataFormat={this.renderOrderValue}
                          >
                            Value
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="datetime"
                            dataAlign="right"
                            dataFormat={this.renderOrderTime}
                            dataSort
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
