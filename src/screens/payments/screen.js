import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardBody,
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import { CommonActions, AuthActions } from 'services/global'
import { Loader } from 'components'
import * as Actions from './actions'

import './style.scss'

import bitcoinIcon from "../../assets/images/crypto/btc.svg";
import ethereumIcon from "../../assets/images/crypto/eth.svg";
import litecoinIcon from "../../assets/images/crypto/ltc.svg";

const mapStateToProps = (state) => ({
  product_list: state.product.product_list
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
  authActions: bindActionCreators(AuthActions, dispatch),
  commonActions: bindActionCreators(CommonActions, dispatch)
})


class Payments extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      email_paypal: '',
      wallet_bitcoin: '',
      wallet_litecoin: '',
      wallet_ethereum: ''
    }
  }

  savePayments(){

    this.setState({ loading: true });
    this.props.actions.savePayments({
      email_paypal: this.state.email_paypal || '',
      wallet_bitcoin: this.state.wallet_bitcoin || '',
      wallet_litecoin: this.state.wallet_litecoin || '',
      wallet_ethereum: this.state.wallet_ethereum || '',
    })
      .then(res => this.props.commonActions.tostifyAlert('success', res.message))
      .catch(res => this.props.commonActions.tostifyAlert('error', res.error))
      .finally(() => this.setState({loading: false}))
  }


  componentDidMount() {
    this.setState({ loading: true })
    this.props.authActions.getUserSettings().then(res => {
      const settings = res.data.settings

      this.setState(settings)
    }).finally(() => {
      this.setState({loading: false})
    })
  }

  render() {
    const { loading, email_paypal, wallet_bitcoin, wallet_ethereum, wallet_litecoin } = this.state;

    return (
      <div className="payments-screen">
        <div className="animated fadeIn">
          <Card>
            <CardBody className="p-4 mb-5">
              {
                loading ?
                  <Row>
                    <Col lg={12}>
                      <Loader />
                    </Col>
                  </Row>
                : 
                  <Row className="mt-4 mb-4">
                    <Col lg={12}>
                      <FormGroup className="mb-5">
                        <Label className="title">Payments</Label>
                      </FormGroup>
                    </Col>
                    <Col lg={12}>
                      <Row>
                        <Col lg={12}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code"><i className="fa fa-paypal" style={{ color: '#0097df', marginRight: '.5rem', fontSize: '20px' }}/>PayPal Email</Label>
                            <Input 
                              type="text" 
                              placeholder="PayPal Email"  
                              value={email_paypal}
                              onChange={e => this.setState({email_paypal: e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code"><img src={bitcoinIcon} width="20" height="20" style={{ marginRight: '.5rem' }}/>Bitcoin Address</Label>
                            <Input 
                              type="text" 
                              placeholder="Bitcoin Wallet"
                              value={wallet_bitcoin}
                              onChange={e => this.setState({wallet_bitcoin: e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code"><img src={ethereumIcon} width="20" height="20" style={{ marginRight: '.5rem' }}/>Ethereum Address</Label>
                            <Input 
                              type="text" 
                              placeholder="Ethereum Address"
                              value={wallet_ethereum}
                              onChange={e => this.setState({wallet_ethereum: e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code"><img src={litecoinIcon} width="20" height="20" style={{ marginRight: '.5rem' }}/>Litecoin Address</Label>
                            <Input 
                              type="text" 
                              placeholder="Litecoin Address"
                              value={wallet_litecoin}
                              onChange={e => this.setState({wallet_litecoin: e.target.value})}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      {/* <Row>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Perfect Money ID</Label>
                            <Input type="text" placeholder="Perfect Money ID"></Input>
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Perfect Money Alternate Passphrase</Label>
                            <Input type="text" placeholder="Perfect Money Alternate Passphrase"></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Stripe</Label><br/>
                            <Button color="primary" className="stripe-button">Connect with Stripe</Button>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Skrill Email</Label>
                            <Input type="text" placeholder="Skrill Email"></Input>
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Skrill Secret Word</Label>
                            <Input type="text" placeholder="Skrill Secret Word"></Input>
                          </FormGroup>
                        </Col>
                      </Row> */}
                    </Col>
                  </Row>
              }
            </CardBody>
            <Button color="primary" className="mb-4" style={{ width: 200 }} onClick={this.savePayments.bind(this)}>
              Save Settings
            </Button>
            
          </Card>
          {/* <Card>
            <CardBody className="p-4 mb-5">
              {
                loading ?
                  <Row>
                    <Col lg={12}>
                      <Loader />
                    </Col>
                  </Row>
                : 
                  <Row className="mt-4 mb-4">
                    <Col lg={12}>
                      <FormGroup className="mb-5">
                        <Label className="title">Crypto Currency</Label>
                      </FormGroup>
                    </Col>
                    <Col lg={12}>
                      <FormGroup className="mb-3">
                        <Label htmlFor="product_code">Crypto Currency Integration</Label><br/>
                        <Select placeholder="Select..."/>
                      </FormGroup>
                    </Col>
                  </Row>
              }
              
            </CardBody>
            <Button color="primary" className="mb-4" style={{width: 200}}>Save Settings</Button>
          </Card> */}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments)