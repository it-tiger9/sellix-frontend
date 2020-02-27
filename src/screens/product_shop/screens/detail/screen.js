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
            <Col lg={3}>
              <Card className="bg-white">
                <img src={shop_brand} width="100%"/>
                <h1 className="p-3 text-center mt-2">$15.00</h1>
                <div className="paypal-instant p-3 pt-2 pb-2 d-flex mb-5">
                  <h4><i className="fa fa-paypal"></i>Paypal</h4>
                  <Button onClick={(e) => this.gotoPaypal(e, '')}>INSTANT</Button>
                </div>
                <div className="bg-primary p-2"><i className="fas fa-chevron-left icons-font-2xl"></i></div>
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
            <Col lg={9}>
              <Card className="bg-white p-5 detail">
                <h1 className="text-primary mb-5">[FA] Ikonik</h1>
                <p>
                  Account: <br/>
                  -Full Access Account <br/>
                  -Login and Password <br/>
                  -Account For PC,PS4,XBOX <br/>
                  • Have More Skins<br/>
                  •Warranty 24hours
                </p>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopProductDetail)
