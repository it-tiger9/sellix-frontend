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
import { LeaveFeedbackModal, Loader} from 'components'
import { PayPalButton } from "react-paypal-button-v2";

import shop_brand from 'assets/images/brand/paypal-logo.svg'
import paypal_white from 'assets/images/brand/paypal-white.svg'
import sellix_logo from 'assets/images/Sellix_logo.svg'
import backIcon from 'assets/images/x.png'

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

const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    commonActions: bindActionCreators(CommonActions, dispatch)
  })
}

class PaypalInvoice extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      invoice: {},
      showAlert: true,
      openFeedbackModal: false
    }

    this.timer = 0;
    this.apiTimer = 1;
    this.getPayPalInvoice = this.getPayPalInvoice.bind(this)
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

  hideAlert() {
    this.setState({showAlert: false})
  }

  okHandler() {
    this.setState({openFeedbackModal: false})

    this.props.history.push({
      pathname: `/shop/${this.props.match.params.username}/feedback/id`
    })
  }


  getPayPalInvoice() {
    this.props.commonActions.getPayPalInvoice(this.props.invoice.uniqid).then(res => {
        if(res && res.data && res.data.invoice) {
            this.setState({
                invoice: res.data.invoice
            })
        }
    })
  }

  componentDidMount() {
      this.setState({
        invoice: this.props.invoice
      })
  }

  render() {
    const {openFeedbackModal, showAlert, invoice} = this.state

    return (
        <div>
            <div className="paypal-paying-screen">

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

                <div className="animated fadeIn">
                    <LeaveFeedbackModal 
                        isOpen={openFeedbackModal} 
                        okHandler={this.okHandler.bind(this)} 
                        product="Cracked Premium"
                        date="March 08, 2020"
                    />
                    <Row>
                        <Col lg={9} className="ml-auto mr-auto">
                            <Card className="bg-white p-5 detail">
                                <div className="d-flex justify-content-between  mb-5">
                                    <h2 className="text-primary">{(invoice.product || {}).title}</h2>
                                    <img src={backIcon} width="15" height="15"  
                                    onClick={() => {this.props.history.goBack()}}
                                    style={{cursor: "pointer"}}/>
                                </div>
                                
                                <div className="text-center">
                                    <img src={shop_brand} className="paypal-brand"></img>
                                    <p className="mt-3 mb-5 text-black">You are paying with PayPal<br/><br/>
                                            Order ID: {invoice.uniqid}</p>

                                        {
                                            invoice.status == 0 && 
                                                <PayPalButton
                                                    createOrder={(data, actions) => {
                                                        return invoice.paypal_tx_id;
                                                    }}
                                                    onApprove={(data, actions) => {
                                                        this.getPayPalInvoice()
                                                    }}
                                                    onError = {() => {

                                                    }}
                                                    amount={invoice.total}
                                                    currency={invoice.currency}
                                                    options={{
                                                        clientId: invoice.paypal_client_id,
                                                        currency: invoice.currency
                                                    }}
                                                />
                                        }
                                        
                                </div>  
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaypalInvoice)
