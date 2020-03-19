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

import shop_brand from 'assets/images/brand/shop_brand.png'
import bitcoinIcon from 'assets/images/crypto/btc.svg'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
  })
}

class ShopProductDetail extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      paymentOpt: null,
      showPaymentOptions: false,
      stockCount: 1
    }

  }

  gotoPaymentWindow(e, id) {
    this.props.history.push({
      pathname: `/payment/${this.state.paymentOpt.toLowerCase()}`,
      search: `?id=${id}`
    })
  }

  showPaymentOptions(){
    this.setState({
      showPaymentOptions: true
    })
  }

  setPaymentOptions(e, opt) {
    this.setState({
      paymentOpt: opt
    })
  }

  increaseCount() {
    this.setState({
      stockCount: this.state.stockCount + 1
    })
  }

  decreaseCount() {
    if(this.state.stockCount > 1) {
      this.setState({
        stockCount: this.state.stockCount - 1
      })
    }
  }

  render() {
    const  {paymentOpt, showPaymentOptions, stockCount} = this.state

    return (
      <div className="detail-product-screen">
        <div className="animated fadeIn">
          <Row>
            <Col lg={9} className="ml-auto mr-auto">
              <Row>
                <Col lg={4}>
                  <Card className="bg-white">
                    {
                      paymentOpt?
                        <div className="p-3 pt-2 pb-2 mb-2">
                          <h4 className="mt-2 mb-5 grey">Checkout with {paymentOpt}</h4>
                          <form>
                          <FormGroup className="mb-5">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              type="text"
                              id="email"
                              name="email"
                              required
                              placeholder="Email to have the product sent to"
                            />
                          </FormGroup>
                          <div className="text-center">
                            <p className="text-center grey" style={{fontSize: 12}}>
                              By continuing, you agree to our Terms of Service</p>
                            <Button color="primary" className="mr-auto ml-auto mt-2" 
                              onClick={(e) => this.gotoPaymentWindow()}>Purchase</Button>
                          </div>
                          </form>
                        </div>:
                        <div className="p-3 pt-2 pb-2 mb-2">
                          <h4 className="mt-2 mb-5 grey">Purchase</h4>
                          <div className="text-center">
                            <h3>$15.00</h3>
                            <Button color="primary" className="mr-auto ml-auto mt-2" 
                              onClick={this.showPaymentOptions.bind(this)} style={{width: 170}}>Purchase</Button>

                            {showPaymentOptions && <Button className="pay-button mt-3 pl-3 pr-3" 
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
                            {showPaymentOptions && <Button className="pay-button mt-3 pl-3 pr-3" 
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
                              <span className={stockCount == 1?'text-grey':''} onClick={this.decreaseCount.bind(this)}>-</span>
                              <span style={{fontSize: 18}} className="ml-3 mr-3">{stockCount}</span>
                              <span onClick={this.increaseCount.bind(this)}>+</span>
                            </div>
                            <p className="text-grey mt-3">Apply a Coupon</p>
                          </div>
                        
                        </div>
                    }
                    
                
                    <div className="stock-info p-2">
                      <div className="d-flex justify-content-between p-2">
                        <span className="text-primary">Seller</span>
                        <span className="text-primary bold">PixelStore</span>
                      </div>
                      <div className="d-flex justify-content-between p-2">
                        <span className="text-primary">Stock</span>
                        <span className="text-primary bold">2</span>
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
