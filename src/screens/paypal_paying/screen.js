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

import shop_brand from 'assets/images/brand/paypal-logo.svg'
import paypal_white from 'assets/images/brand/paypal-white.svg'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
  })
}

class PaypalPaying extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }

  }

  gotoPaypal(e, id) {
    this.props.history.push({
      pathname: '/paypal-pay',
      search: `?id=${id}`
    })
  }

  render() {

    return (
      <div className="paypal-paying-screen">
        <div className="animated fadeIn">
          <Row>
            <Col lg={9} className="ml-auto mr-auto">
              <Card className="bg-white p-5 detail">
                <h1 className="text-primary mb-5">[FA] Ikonik</h1>
                <div className="text-center">
                  <img src={shop_brand} className="paypal-brand"></img>
                  <p className="mt-3 mb-5 text-black">You are paying with PayPal<br/>
                      Order ID: a73703a4-38ed-43b3-b5f4-583670e61a19</p>
                  <Button className="paypal-button"><img src={paypal_white}></img></Button>
                </div>  
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaypalPaying)
