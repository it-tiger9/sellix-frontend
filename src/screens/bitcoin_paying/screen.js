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
import shop_brand from 'assets/images/brand/paypal-logo.svg'
import paypal_white from 'assets/images/brand/paypal-white.svg'
import sellix_logo from 'assets/images/Sellix_logo.svg'
import backIcon from 'assets/images/x.png'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    commonActions: bindActionCreators(CommonActions, dispatch)
  })
}

class PaypalPaying extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      invoice: {}
    }

  }

  gotoPaypal(e, id) {
    this.props.history.push({
      pathname: '/paypal-pay',
      search: `?id=${id}`
    })
  }

  componentDidMount() {
    this.props.commonActions.getInvoice(this.props.match.params.id).then(res => {
      this.setState({
        invoice: res.data.invoice
      })
    })
  }

  render() {

    return (
      <div className="bitcoin-paying-screen">

        <div className="animated fadeIn">
          <Row className="m-3">
            <Col lg={4} className="ml-auto mr-auto p-0">
              <div className="float-logo"><img src={sellix_logo} width="153"/></div>
              
              <Card className="bg-white p-0 detail pt-3">
                <div className="text-right pr-3">
                <img src={backIcon} width="15" height="15"  
                    onClick={() => {this.props.history.goBack()}}
                    style={{cursor: "pointer"}}/>
                </div>
                
                <div className="top p-4 pt-5">
                  <div className="d-flex justify-content-between align-items-center ">
                    <h4 className="text-grey">BITCOIN</h4>
                    <span className="badge text-primary bold">58.22</span>
                  </div>
                  <p className="text-grey  mb-4">62342B-12390183948-132EW121</p>
                  <div className="d-flex justify-content-between align-items-center ">
                    <h4 className="text-grey">Pornhub Premium Accounts</h4>
                    <span className="text-grey ">0.0000214</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-grey">5e3cx322adab3</span>
                    <span className="text-grey mr-4">$2.45</span>
                  </div>
                  <p className="text-grey bold mt-5 text-center">
                    Please send exactly <span className="badge text-primary bold">0.00028104</span> BTC to
                  </p>
                  <p className="btc-address text-grey bold text-center">
                    1gfasg0sa9d8f213908fsdg738283742
                  </p>
                  <div className="d-flex justify-content-between align-items-center ">
                    <span className="text-grey">QR Code</span>
                    <span className="text-grey">Pay in Wallet</span>
                  </div>
                </div>
                <div className="bottom p-4">
                  <h4 className="text-primary mb-4">Order Details</h4>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-primary">Seller</span>
                    <h5 className="text-primary b-4">Awaiting Payment</h5>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-primary">Quantity</span>
                    <h5 className="text-primary b-4">25</h5>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-primary">Email</span>
                    <h5 className="text-primary b-4">olivia.messla@outlook.de</h5>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-primary">Received</span>
                    <h5 className="text-primary b-4">0.00B</h5>
                  </div>
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
