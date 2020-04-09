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
  FormGroup,
  Label,
} from 'reactstrap'
import moment from 'moment'
import config from 'constants/config'
import { Loader, Spin } from 'components'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'
import { tableOptions } from 'constants/tableoptions'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {
	CommonActions
} from 'services/global'
import {ResendModal} from './sections'
import bitcoinIcon from 'assets/images/crypto/btc.svg'
import paypalIcon from 'assets/images/crypto/paypal.svg'
import litecoinIcon from 'assets/images/crypto/ltc.svg'
import ethereumIcon from 'assets/images/crypto/eth.svg'
import perfectmoneyIcon from 'assets/images/crypto/perfectmoney.svg'
import stripeIcon from 'assets/images/crypto/stripe.svg'
import bitcoincashIcon from 'assets/images/crypto/bitcoincash.svg'
import skrillIcon from 'assets/images/crypto/skrill.svg'

import * as OrderActions from '../../actions'

import './style.scss'


const PAYMENT_ICONS = {
  paypal: paypalIcon,
  bitcoin: bitcoinIcon,
  litecoin: litecoinIcon,
  ethereum: ethereumIcon,
  perfectmoney: perfectmoneyIcon,
  stripe: stripeIcon,
  bitcoincash: bitcoincashIcon,
  skrill: skrillIcon
}

const CRYPTOS = ['bitcoin', 'litecoin', 'ethereum', 'bitcoincash']

const mapStateToProps = (state) => {
  return ({
    product_list: state.product.product_list
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators(OrderActions, dispatch),
    commonActions: bindActionCreators(CommonActions, dispatch),
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

class OrderDetail extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      resending: false,
      openModal: false,
      order: {}
    }

    this.id = this.props.match.params.id
  }

  closeResendModal() {
    this.setState({openModal: false})
  }

  openResendModal() {
    this.setState({openModal: true})
  }

  componentDidMount () {
    this.initializeData()
  }

  initializeData () {
    this.setState({ loading: true })
    this.props.actions.getOrderByID(this.id).then(res => {
      if(res.status == 200)
        this.setState({order: res.data.invoice})
      else throw res
    }).finally(() => {
      this.setState({ loading: false })
    })
  }


  resendInvoice(email){
    this.setState({ resending: true })
    this.props.actions.resendInvoice({
      uniqid: this.state.order.uniqid
    }).then(res => {
      if(res.status == 200)
      this.props.commonActions.tostifyAlert('success', res.message)
      else throw res
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error)
    }).finally(() => {
      this.setState({ resending: false })
    })
  }

  render() {
    const { loading, order, resending, openModal } = this.state

    let custom_fields = []

    if(order.custom_fields){
      const data = JSON.parse(order.custom_fields || {})['custom_fields'] || {}
      custom_fields = Object.keys(data).map((key) => {
        return {field: key, value: data[key]}
      })
    }

    return (
      <div className="order-detail-screen mt-3">
        <div className="animated fadeIn">
          <ResendModal openModal={openModal} 
            resendInvoice = {this.resendInvoice.bind(this)}
            invoiceId = {order.uniqid}
            email = {order.customer_email}
            closeModal={this.closeResendModal.bind(this)}/>

          <Breadcrumb className="mb-0">
            <BreadcrumbItem active className="mb-0">
              <a onClick={(e) => this.props.history.push('/dashboard/orders')}><i className="fas fa-chevron-left"/> Orders</a>
            </BreadcrumbItem>
          </Breadcrumb>
          <Card>
            <CardBody className="p-4">
              {
                loading ?
                  <Row>
                    <Col lg={12}>
                      <Loader />
                    </Col>
                  </Row>
                : 
                  <Row className="mt-3 mb-2">
                    <Col lg={12}>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <Label className="title">View Order {order.developer_invoice == '1' && 
                          <span className={`small-badge badge-developer`} style={{  margin: '0 auto'}}>
                            Developer
                          </span>
                        }</Label>
                        { 
                          order.status && (order.status == '0' || order.status == '1') && 
                            <Button color="primary" onClick={this.openResendModal.bind(this)}>
                              Resend Order
                            </Button>
                        }
                      </div>
                      
                    </Col>
                    <Col lg={12}>
                      <Row className="flex">
                        <Col lg={12} className="mb-5">
                          <div className="d-flex align-items-center">
                            <img src={PAYMENT_ICONS[order.gateway]} className="avatar mr-3"/>
                            <div>
                              <p className="email text-primary mb-1 d-flex align-items-center">
                                <a href={`mailto:${order.customer_email}`}>{order.customer_email}</a>
                                <span className={`small-badge badge-${ORDER_STATUS[order.status] && ORDER_STATUS[order.status].toLowerCase()}`} style={{  margin: '0 auto'}}>
                                  {ORDER_STATUS[order.status]}
                                </span>
                              </p>
                              <p className="mb-0">{order.uniqid}</p>
                            </div>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="d-flex">
                            <p className="title">Product</p>
                            <p>
                              <a href="#">
                              {order.developer_invoice == '1'?order.developer_title:(order.product && order.product.title || '')}</a></p>
                          </div>
                          <div className="d-flex">
                            <p className="title">Value</p>
                            <p>{`${config.CURRENCY_LIST[order.currency]}${order.product_price} ${order.currency}`}</p>
                          </div>
                          <div className="d-flex">
                            <p className="title">Created At</p>
                            <p>{moment(new Date(order.created_at*1000)).format('DD MMM h:mm:ss')}</p>
                          </div>
                          <div className="d-flex">
                            <p className="title">Quantity</p>
                            <p>{order.quantity}</p>
                          </div>
                          <div className="d-flex">
                            <p className="title">Coupon</p>
                            <p>{order.coupon_id?order.coupon_id:'No Coupon'}</p>
                          </div>
                          
                          
                        </Col>
                        <Col lg={6}>
                          <div className="d-flex">
                            <p className="title">Gateway</p>
                            <p>{PAYMENT_OPTS[order.gateway]}</p>
                          </div>
                          
                          <div className="d-flex">
                              <p className="title">IP Address</p>
                              <p>{order.ip} {order.is_vpn_or_proxy == '1' && <span className="proxy-label">VPN/Proxy</span> }</p>
                            </div>
                            <div className="d-flex">
                              <p className="title">Device</p>
                              <p>{order.user_agent}</p>
                            </div>
                            <div className="d-flex">
                              <p className="title">Country</p>
                              <p><i className={`flag-icon flag-icon-${order.country && order.country.toLowerCase()} mr-2`}/> 
                                {order.location}</p>
                            </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
              }
            </CardBody>
          </Card>
          <Row>
          <Col lg={12}>
              <Card>
                <CardBody className="">
                  {
                    loading ?
                      <Row>
                        <Col lg={12}>
                          <Loader />
                        </Col>
                      </Row>
                    :
                    <Row className="mt-3">
                      <Col lg={12}>
                        <FormGroup className="mb-4">
                          <Label className="title">Delivered Webhooks</Label>
                        </FormGroup>
                      </Col>
                      <Col lg={12}>
                        <Row>
                          <Col lg={12}>
                          <BootstrapTable
                            options={ tableOptions() }
                            data={order.webhooks || []}
                            version="4"
                            pagination
                            totalSize={order.webhooks ? order.webhooks.length : 0}
                            className="provided-custom-table"
                            trClassName="cursor-pointer"
                        >
                          <TableHeaderColumn
                            isKey
                            dataField="url"
                            width='30%'
                          >
                            URL
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="event"
                            width='20%'
                          >
                            Event
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="attempts"
                            dataAlign='center'
                            width='10%'
                          >
                            Attemps
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="response_code"
                            dataAlign='center'
                            width='20%'
                          >
                            Response Code
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="created_at"
                            dataAlign='center'
                            dataFormat={(cell, row) => <div>
                              {moment(new Date(row.created_at*1000)).format('DD MMM hh:mm:ss')}
                            </div>}
                          >
                            Time
                          </TableHeaderColumn>
                        </BootstrapTable>
                          </Col>
                          
                        </Row>
                      </Col>
                    </Row>
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <div>
                <Card>
                  <CardBody className="">
                    {
                      loading ?
                        <Row>
                          <Col lg={12}>
                            <Loader />
                          </Col>
                        </Row>
                      :
                      <Row className="mt-3">
                        <Col lg={12}>
                          <FormGroup className="mb-4">
                            <Label className="title">Delivered Goods</Label>
                          </FormGroup>
                        </Col>
                        <Col lg={12}>
                          <Row>
                            <Col lg={12}>
                              {
                                (order.serials && order.serials.length == 0)?
                                  <label>No product has been delivered</label>:
                                  (order.serials || []).map(ser => <p>{ser}</p>)
                              }
                              
                            </Col>
                            
                          </Row>
                        </Col>
                      </Row>
                    }
                  </CardBody>
                </Card>
                {
                  order.developer_invoice == '1'  && 
                    <Card>
                      <CardBody className="">
                        {
                          loading ?
                            <Row>
                              <Col lg={12}>
                                <Loader />
                              </Col>
                            </Row>
                          :
                          <Row className="mt-3">
                            <Col lg={12}>
                              <FormGroup className="mb-4">
                                <Label className="title">Developer Settings</Label>
                              </FormGroup>
                            </Col>
                            <Col lg={12}>
                              <Row>
                                <Col lg={12}>
                                  <div className="d-flex">
                                    <p className="title">Title:</p>
                                    <p className="title">{order.developer_title}</p>
                                  </div>
                                  <div className="d-flex">
                                    <p className="title">Webhook:</p>
                                    <p className="title">{order.developer_webhook}</p>
                                  </div>
                                  <div className="d-flex">
                                    <p className="title">Return url:</p>
                                    <p className="title">{order.developer_return_url}</p>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        }
                      </CardBody>
                    </Card> 
                }
                {
                  order.gateway && CRYPTOS.includes(order.gateway)  && 
                    <Card>
                      <CardBody className="">
                        {
                          loading ?
                            <Row>
                              <Col lg={12}>
                                <Loader />
                              </Col>
                            </Row>
                          :
                          <Row className="mt-3">
                            <Col lg={12}>
                              <FormGroup className="mb-4">
                                <Label className="title">{PAYMENT_OPTS[order.gateway]} Transactions</Label>
                              </FormGroup>
                            </Col>
                            <Col lg={12}>
                              <Row>
                                <Col lg={12}>
                                  {
                                    order.crypto_transactions && order.crypto_transactions.map(trans => 
                                      <div className="d-flex">
                                        <p className="hash">
                                          {trans.crypto_amount} <img src={PAYMENT_ICONS[order.gateway]} width="15"/> - {trans.hash}</p>
                                      </div>
                                    )
                                  }
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        }
                      </CardBody>
                    </Card> 
                }
              </div>
            </Col>
            <Col lg={6}>
              <Card>
                <CardBody className="">
                  {
                    loading ?
                      <Row>
                        <Col lg={12}>
                          <Loader />
                        </Col>
                      </Row>
                    :
                    <Row className="mt-3">
                      <Col lg={12}>
                        <FormGroup className="mb-4">
                          <Label className="title">Provided Custom Fields</Label>
                        </FormGroup>
                      </Col>
                      <Col lg={12}>
                      <BootstrapTable
                          options={ tableOptions() }
                          data={custom_fields}
                          version="4"
                          pagination
                          totalSize={custom_fields ? custom_fields.length : 0}
                          className="provided-custom-table"
                          trClassName="cursor-pointer"
                        >
                          <TableHeaderColumn
                            isKey
                            dataField="field"
                            dataSort
                            width='50%'
                          >
                            Field
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="value"
                            dataSort
                          >
                            Value
                          </TableHeaderColumn>
                        </BootstrapTable>
                      </Col>
                    </Row>
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>
          
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
