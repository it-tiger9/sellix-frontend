import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  Row,
  Col,
  Button
} from 'reactstrap'
import SweetAlert from 'react-bootstrap-sweetalert';
import moment from 'moment'
import { QRCodeModal } from 'components'
import {
  CommonActions
} from 'services/global'
import {PaypalInvoice} from './sections'
import { LeaveFeedbackModal, Loader} from 'components'

import shop_brand from 'assets/images/brand/paypal-logo.svg'
import paypal_white from 'assets/images/brand/paypal-white.svg'
import sellix_logo from 'assets/images/Sellix_logo.svg'
import backIcon from 'assets/images/x.png'

import bitcoinIcon from 'assets/images/crypto/btc.svg'
import paypalIcon from 'assets/images/crypto/paypal.svg'
import litecoinIcon from 'assets/images/crypto/ltc.svg'
import ethereumIcon from 'assets/images/crypto/eth.svg'
import perfectmoneyIcon from 'assets/images/crypto/perfectmoney.svg'

import './style.scss'

const CURRENCY_LIST = { 
  'USD': '$',
  'EUR': '€',
  'AUD': '$',
  'GBP': '£',
  'JPY': '¥',
  'CAD': '$',
  'CHF': '₣',
  'CNY': '¥',
  'SEK': 'kr',
  'NZD': '$'
}


const PAYMENT_ICONS = {
  paypal: paypalIcon,
  bitcoin: bitcoinIcon,
  litecoin: litecoinIcon,
  ethereum: ethereumIcon,
  perfectmoney: perfectmoneyIcon
}

const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    commonActions: bindActionCreators(CommonActions, dispatch)
  })
}

class Invoice extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      invoice: {},
      timer: '60:00',
      time: {m:0, s:0},
      seconds: 60*60,
      showAlert: true,
      openQRModal: false,
      openFeedbackModal: false
    }

    this.timer = 0;
    this.apiTimer = 1;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }


  openQrCodeModal() {
    this.setState({openQRModal: true})
  }

  closeQrCodeModal() {
    this.setState({openQRModal: false})
  }


  openFeedBackModal() {
    this.setState({openFeedbackModal: true})
  }

  okHandler() {
    this.setState({openFeedbackModal: false})

    this.props.history.push({
      pathname: `/shop/${this.props.match.params.username}/feedback/id`
    })
  }


  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }


  getInvoice() {
    this.props.commonActions.getInvoice(this.props.match.params.id).then(res => {
      this.setState({
        invoice: res.data.invoice
      })
    })
  }

  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
      this.apiTimer = setInterval(this.getInvoice.bind(this), 1000*10)
    }
  }


  hideAlert() {
    this.setState({showAlert: false})
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds == 0) { 
      clearInterval(this.timer);
    }
  }

  gotoPaypal(e, id) {
    this.props.history.push({
      pathname: '/paypal-pay',
      search: `?id=${id}`
    })
  }

  componentDidMount() {
    this.setState({loading:true})
    this.props.commonActions.getInvoice(this.props.match.params.id).then(res => {
      let seconds = 60*60 - (new Date().getTime() - new Date(res.data.invoice.date*1000).getTime()) / 1000
      let timeLeftVar = this.secondsToTime(seconds);

      this.setState({
        seconds: seconds,
        invoice: res.data.invoice,
        time: timeLeftVar,
        loading:false
      })
    })
  }

  setInvoiceStatus(status) {
    if(status == 0){
      this.startTimer()
      return `${(this.state.time.m>9?this.state.time.m:'0'+this.state.time.m) || '00'}:${this.state.time.s>9?this.state.time.s:'0'+this.state.time.s || '00'}`
    }
    else if(status == 1)
      return 'Paid'
    else if(status == 2)
      return 'Cacelled'
    else if(status == 3)
     return 'Pending'
    else if(status == 4)
     return 'Partial'
  }


  getInvoiceStatus2(status) {
    if(status == 0){
      this.startTimer()
      return (
        <div className="d-flex align-items-center">
          <div class="sk-spinner sk-spinner-pulse"></div>
          Awaiting Payment</div>
      )  
    }
    else if(status == 1)
      return 'Paid'
    else if(status == 2)
      return 'Cacelled'
    else if(status == 3)
     return <div className="d-flex align-items-center">
              <div class="sk-spinner sk-spinner-pulse"></div>
              Waiting Confirmation
            </div>
    else if(status == 4)
     return 'Partial'
  }

  render() {
    const {loading, invoice, timer, showAlert, openQRModal, openFeedbackModal} = this.state

    return (
      <div>
        {
          loading ?
            <Row>
              <Col lg={12}>
                <Loader />
              </Col>
            </Row>
          :<div> {
            invoice.gateway == 'paypal'?
              <PaypalInvoice invoice={invoice} {...this.props}/>:
              <div className="bitcoin-paying-screen">
                <QRCodeModal openModal={openQRModal} value={invoice.crypto_uri || ''} closeModal={this.closeQrCodeModal.bind(this)}/>
        
                {invoice.status == 1 && 
                  <SweetAlert
                    success
                    title="Order completed!"
                    show={showAlert}
                    showConfirm={false}
                    onConfirm={this.hideAlert.bind(this)}
                    onCancel = {this.hideAlert.bind(this)}
                  >
                    Your invoice has been paid. <br/>
                    You will receive the products within minutes, <br/>check your email!
                  </SweetAlert>
                }
        
                {invoice.status == 2 && 
                  <SweetAlert
                    danger
                    title="Invoice Cancelled"
                    show={showAlert}
                    showConfirm={false}
                    onCancel = {this.hideAlert.bind(this)}
                    onConfirm={this.hideAlert.bind(this)}
                  >
                    The invoice has expired or isn't available.
                  </SweetAlert>
                }
        
                {invoice.status == 4 && 
                  <SweetAlert
                    info
                    showConfirm={false}
                    onCancel = {this.hideAlert.bind(this)}
                    title="We haven't received full amount"
                    show={showAlert}
            
                  >
                    Transaction has been received but it’s not enough, make the send to bitcoin address appear again and update the crypto_received and crypto amount to send in the invoice
                  </SweetAlert>
                }
                <div className="animated fadeIn">
                  <Row className="m-3">
                    <Col lg={4} className="ml-auto mr-auto p-0">
                      <div className="float-logo"><img src={sellix_logo} width="153"/></div>
                      
                      <Card className="bg-white p-0 detail pt-3">
                        <div className="text-right pr-3">
                        <img src={backIcon} width="15" height="15"  
                            onClick={() => {clearInterval(this.apiTimer); this.props.history.goBack()}}
                            style={{cursor: "pointer"}}/>
                        </div>
                        
                        <div className="top p-4 pt-5">
                          <div className="d-flex justify-content-between align-items-center ">
                            <h4 className="text-grey">{(invoice.gateway || '').toUpperCase()}</h4>
                            <span className="badge text-primary bold status" id="status">{this.setInvoiceStatus(invoice.status || -1)}</span>
                          </div>
                          <p className="text-grey  mb-4">{invoice.uniqid}</p>
                          <div className="d-flex justify-content-between align-items-center ">
                            <h4 className="text-grey">{(invoice.product || {}).title}</h4>
                            <span className="text-grey d-flex align-items-center">
                              <img src={PAYMENT_ICONS[invoice.gateway]} className="mr-1" width="15" height="15"/>
                              {invoice.crypto_amount || 0}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-grey">{invoice.product_id || ''}</span>
                            <span className="text-grey">{CURRENCY_LIST[invoice.currency] || '$'}{invoice.total_display || 0}</span>
                          </div>
        
                          {
                            invoice.status == 3?'':<div>
                                <p className="text-grey bold mt-5 text-center">
                                    Please send exactly <span className="badge text-primary bold">
                                      {(invoice.crypto_amount || 0) - (invoice.crypto_received || 0)}</span> BTC to
                                </p>
                                <p className="btc-address text-grey bold text-center">
                                  {invoice.crypto_address || ''}
                                </p>
                                <div className="d-flex justify-content-between align-items-center ">
                                  <span className="text-grey cursor-pointer" onClick={this.openQrCodeModal.bind(this)}>QR Code</span>
                                  <span className="text-grey">Pay in Wallet</span>
                                </div>
        
                            </div>
                          }
                          
                        </div>
                        <div className="bottom p-4">
                          <h4 className="text-primary mb-4">Order Details</h4>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-primary">Status</span>
                            <h5 className="text-primary b-4">{this.getInvoiceStatus2(invoice.status || -1)}</h5>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-primary">Seller</span>
                            <h5 className="text-primary b-4">{invoice.username }</h5>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-primary">Quantity</span>
                            <h5 className="text-primary b-4">{invoice.quantity}</h5>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-primary">Email</span>
                            <h5 className="text-primary b-4">{invoice.customer_email}</h5>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="text-primary">Created</span>
                            <h5 className="text-primary b-4">{moment(new Date(invoice.date*1000)).format('hh:mm:ss, DD/MM/YYYY')}</h5>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="text-primary">Received</span>
                            <h5 className="text-primary b-4 d-flex align-items-center">
                              <img src={PAYMENT_ICONS[invoice.gateway]} className="mr-1" width="15" height="15"/>
                              {invoice.crypto_received}</h5>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </div>
            </div>
          }</div>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invoice)
