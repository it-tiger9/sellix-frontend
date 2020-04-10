import React, { Suspense } from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  Col,
  Container,
  Row,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'

import './style.scss'


import top1 from 'assets/images/home/top1.svg'
import service1 from 'assets/images/crypto/b_paypal.jpg'
import service2 from 'assets/images/crypto/b_btc.jpg'
import service3 from 'assets/images/crypto/b_ltc.jpg'
import service4 from 'assets/images/crypto/b_skrill.jpg'
import undraw from 'assets/images/home/undraw.svg'
import undraw1 from 'assets/images/home/undraw2.svg'
import sellix_logo from 'assets/images/Sellix_logo.svg'

import * as feeAction from './actions'

class Fees extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,

      site_fee_percentage: 0,
      paypal: null,
      bitcoin: {},
      ethereum: {},
      litecoin: {}
    }
  }

  toggle() {
    this.setState({isOpen: !this.state.isOpen})
  }

  componentDidMount() {
    feeAction.getFees().then(res => {
      const data = res.data.fees
      console.log(data)
      this.setState({
        site_fee_percentage: data.site_fee_percentage,
        paypal: data.paypal,
        bitcoin: data.bitcoin,
        ethereum: data.ethereum,
        litecoin: data.litecoin
      })
    }).catch((err) => {
      
    })
  }

  render() {
    const { isOpen, paypal, bitcoin, ethereum, litecoin, site_fee_percentage } = this.state

    return (
      <div className="fees-screen">
        <div className="animated fadeIn">
          <div className="section text-center " style={{paddingTop: 100, paddingBottom: 50}}>
            <Container className="home-container" fluid>
              <h3>Fees</h3>
              <p className="large">
                How much we charge over orders
              </p>
            </Container>
          </div>
          <div className="section text-center bg-white" style={{paddingBottom:50}}>
              <Container className="home-container">
                <Row className="service-row ">
                    <Col md={3}>
                        <div className="payment-card">
                            <div className="method">
                                <h4 className="mt-4">Paypal</h4>
                                <img className="service-img" src={service1}/>
                            </div>
                            <div className="content">
                                <p className="small text-primary">
                                  {paypal?
                                    'Paypal':
                                    'Sellix does not take any additional fee to process PayPal invoices.'
                                  }
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="payment-card">
                            <div className="method">
                                <h4 className="mt-4">Bitcoin</h4>
                                <img className="service-img" src={service2}/>
                            </div>
                            <div className="content">
                                <p className="small1 text-primary">
                                  Transaction Fees: <b>${bitcoin.transaction_fee_usd || 0}</b>
                                </p>
                                <p className="small1 text-primary">Sellix Fees: <img src={service2} width="25" height="25"/>
                                    <b>{bitcoin.site_fee_low_price || 0} (${bitcoin.site_fee_low_price_usd || 0})</b>
                                </p>
                                <p className="small1 text-primary">
                                if the order is less than ${bitcoin.low_price_usd || 0}, else {site_fee_percentage}% over the total.
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="payment-card">
                            <div className="method">
                                <h4 className="mt-4">Litecoin</h4>
                                <img className="service-img" src={service3}/>
                            </div>
                            <div className="content">
                                <p className="small1 text-primary">
                                    Transaction Fees: <b>${litecoin.transaction_fee_usd || 0}</b>
                                </p>
                                <p className="small1 text-primary">Sellix Fees: <img src={service3} width="25" height="25"/>
                                    <b>{litecoin.site_fee_low_price || 0} (${litecoin.site_fee_low_price_usd || 0})</b>
                                </p>
                                <p className="small1 text-primary">
                                if the order is less than ${litecoin.low_price_usd || 0}, else {site_fee_percentage}% over the total.
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="payment-card">
                            <div className="method">
                                <h4 className="mt-4">Ethereum</h4>
                                <img className="service-img" src={service4}/>
                            </div>
                            <div className="content">
                                <p className="small1 text-primary">
                                    Transaction Fees: <b>{ethereum.transaction_fee || 0} (${ethereum.transaction_fee_usd || 0})</b>
                                </p>
                                <p className="small1 text-primary">Sellix Fees: <img src={service4} width="25" height="25"/>
                                    <b>{site_fee_percentage}% over the total</b>
                                </p>
                                
                            </div>
                        </div>
                    </Col>
                </Row>
              </Container>
          </div>
        </div>
      </div>
    )
  }
}

export default Fees
