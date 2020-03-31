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
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'
import Select from 'react-select'
import {
  CommonActions
} from 'services/global'
import { Formik } from 'formik';
import * as Yup from "yup";
import shop_brand from 'assets/images/brand/shop_brand.png'
import bitcoinIcon from 'assets/images/crypto/btc.svg'
import backIcon from 'assets/images/x.png'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
    user_products: state.common.user_products
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    commonActions: bindActionCreators(CommonActions, dispatch)
  })
}


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

class ShopProductDetail extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      openCoupon: false,
      gateway: null,
      showPaymentOptions: false,
      quantity: 1,
      email: null,
      coupon_code: '',
      product_id: this.props.match.params.id,
      custom_fields: '',
      product_info: {}
    }
  }

  handleSubmit(values) {
    const data = Object.assign({}, this.state)
    delete data['loading']
    delete data['showPaymentOptions']
    delete data["product_info"]
    delete data["openCoupon"]

    data['gateway'] = data['gateway'].toLowerCase()
    data['email'] = values.email

    this.props.commonActions.createInvoice(data).then(res => {
      this.props.history.push({
        pathname: `/payment/invoice/${res.data.invoice.uniqid}`
      })
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error)
    })
  }

  showPaymentOptions(){
    this.setState({
      showPaymentOptions: true
    })
  }

  setPaymentOptions(e, opt) {
    this.setState({
      gateway: opt
    })
  }

  increaseCount() {
    if((this.state.product_info.quantity_max != -1 && this.state.quantity < this.state.product_info.quantity_max) || 
      (this.state.product_info.quantity_max == -1 && this.state.quantity < this.state.product_info.stock)) {
      this.setState({
        quantity: this.state.quantity + 1
      })
    }
  }

  decreaseCount() {
    if(this.state.quantity > this.state.product_info.quantity_min) {
      this.setState({
        quantity: this.state.quantity - 1
      })
    }
  }

  init(){
    this.setState({
      loading: false,
      gateway: null,
      showPaymentOptions: false,
      quantity: 1
    })
  }

  backToProducts(){
    this.props.history.goBack()
  }

  openCoupon() {
    this.setState({
      openCoupon: true
    })
  }

  componentDidMount() {
    this.props.commonActions.getUserProductById(this.props.match.params.id).then(res => {
      this.setState({
        product_info: res.data.product,
        custom_fields: res.data.product.custom_fields
      })
    })
  }

  render() {
    const {gateway, showPaymentOptions, quantity, email, product_info, openCoupon} = this.state

    return (
      <div className="detail-product-screen">
        <div className="animated fadeIn">
          <Row>
            <Col lg={9} className="ml-auto mr-auto">
              <Row>
                <Col lg={4}>
                  <Card className="bg-white">
                    {
                      gateway?
                        <div className="p-3 pt-2 pb-2 mb-2">
                          <div className="d-flex justify-content-between align-items-center mb-5">
                            <h4 className="mt-2  grey">Checkout with {gateway}</h4>
                            <img src={backIcon} width="15" onClick={this.init.bind(this)} style={{cursor: "pointer"}}/>
                          </div>
                          
                          <Formik
                            initialValues={{email: ''}}
                            onSubmit={(values) => {
                              this.handleSubmit(values)
                            }}
                            validationSchema={Yup.object().shape({
                              email: Yup.string()
                                .required('Email is required'),
                            })}>
                              {props => (
                                <Form onSubmit={props.handleSubmit}>
                                  <FormGroup className="mb-5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                      type="text"
                                      id="email"
                                      name="email"
                                      onChange={props.handleChange}
                                      value={props.values.email}
                                      placeholder="Email to have the product sent to"
                                      className={
                                        props.errors.email && props.touched.email
                                          ? "is-invalid"
                                          : ""
                                      }
                                    />
                                    {props.errors.email && props.touched.email && (
                                      <div className="invalid-feedback">{props.errors.email}</div>
                                    )}
                                  </FormGroup>
                                  <div className="text-center">
                                    <p className="text-center grey" style={{fontSize: 12}}>
                                      By continuing, you agree to our Terms of Service</p>
                                    <Button color="primary" type="submit" className="mr-auto ml-auto mt-2" >Purchase</Button>
                                  </div>
                                </Form> )}
                            </Formik>
                        </div>:
                        <div className="p-3 pt-2 pb-2 mb-2">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="mt-2 grey">Purchase</h4>
                            <img src={backIcon} width="15" onClick={this.backToProducts.bind(this)} style={{cursor: "pointer"}}/>
                          </div>
                          <div className="text-center">
                            <h3>{CURRENCY_LIST[product_info.currency]}{product_info.price_display || 0}</h3>
                            <Button color="primary" className="mr-auto ml-auto mt-3 d-block" 
                              onClick={this.showPaymentOptions.bind(this)} style={{width: 170}}>Purchase</Button>

                            {showPaymentOptions && <Button className="pay-button mt-3 pl-3 mr-auto ml-auto pr-3 d-block" 
                                onClick={(e) => this.setPaymentOptions(e, 'Paypal')}
                                style={{width: 170}}>
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <i className="fa fa-paypal mr-2"/>
                                    PayPal
                                  </div>
                                  <div>></div>
                                </div>
                                
                              </Button>}
                            {showPaymentOptions && <Button className="pay-button mt-3 mr-auto ml-auto pl-3 pr-3 d-block" 
                                onClick={(e) => this.setPaymentOptions(e, 'Bitcoin')}
                                style={{width: 170}}>
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <img src={bitcoinIcon} className="mr-2" width="20" height="20"/>
                                    Bitcoin
                                  </div>
                                  <div>></div>
                                </div>
                                
                              </Button>}
                            <div className="d-flex justify-content-center align-items-center mt-3 stock-count">
                              <span className={quantity == 1?'text-grey':''} onClick={this.decreaseCount.bind(this)}>-</span>
                              <span style={{fontSize: 18}} className="ml-3 mr-3">{quantity}</span>
                              <span onClick={this.increaseCount.bind(this)}>+</span>
                            </div>
                            {openCoupon?
                              <div className="mt-3">
                                <Input 
                                  type="text"
                                  id="coupon"
                                  name="coupon"
                                
                                  placeholder="Coupon code"
                                  onChange={(e) => {this.setState({coupon_code: e.target.value})}}/>
                                  <p className="text-grey text-left mt-2 coupon-help">This coupon will be automatically checked and applied if working when you proceed with the invoice</p>
                              </div>:
                              <p className="text-grey mt-3 cursor-pointer" onClick={this.openCoupon.bind(this)}>Apply a Coupon</p>
                            }
                            
                          </div>
                        
                        </div>
                    }
                    
                
                    <div className="stock-info p-2">
                      <div className="d-flex justify-content-between p-2">
                        <span className="text-primary">Seller</span>
                        <span className="text-primary bold">{product_info.username || ''}</span>
                      </div>
                      <div className="d-flex justify-content-between p-2">
                        <span className="text-primary">Stock</span>
                        <span className="text-primary bold">{product_info.stock || 0}</span>
                      </div>
                      <div className="d-flex justify-content-between p-2">
                        <span className="text-primary">Feedback</span>
                        <span className="text-primary bold">20</span>
                      </div>
                    </div>
                  </Card>
                </Col>  
                <Col lg={8}>
                  <Card className="bg-white p-4 detail">
                    <h4 className="text-primary mb-4">100k vbuks [Nitendo]</h4>
                    <p>
                      Leave a good feedback pls
                    </p>
                  </Card>
                </Col>
              </Row>
            </Col>
            
          </Row>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopProductDetail)
