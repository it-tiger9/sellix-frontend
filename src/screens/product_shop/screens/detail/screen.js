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
    }

  }

  gotoPaypal(e, id) {
    this.props.history.push({
      pathname: '/payment/paypal',
      search: `?id=${id}`
    })
  }

  render() {

    return (
      <div className="detail-product-screen">
        <div className="animated fadeIn">
          <Row>
            <Col lg={9} className="ml-auto mr-auto">
              <Row>
                <Col lg={4}>
                  <Card className="bg-white">
                
                    <div className="p-3 pt-2 pb-2 mb-2">
                      <h4 className="mt-2 mb-5 grey">Checkout with PayPal</h4>
                      <FormGroup className="mb-5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          type="text"
                          id="email"
                          name="email"
                          placeholder="Email to have the product sent to"
                        />
                      </FormGroup>
                      <div className="text-center">
                        <p className="text-center grey" style={{fontSize: 12}}>
                          By continuing, you agree to our Terms of Service</p>
                        <Button color="primary" className="mr-auto ml-auto mt-2" 
                          onClick={(e) => this.gotoPaypal()}>Purchase</Button>
                      </div>
                      
                    </div>
                
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
