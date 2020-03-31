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
import { LeaveFeedbackModal } from 'components'

import shop_brand from 'assets/images/brand/paypal-logo.svg'
import paypal_white from 'assets/images/brand/paypal-white.svg'
import backIcon from 'assets/images/x.png'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
  })
}

const user = window.localStorage.getItem('userId')

class PaypalPaying extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      openModal: false
    }

  }

  openFeedBackModal() {
    this.setState({openModal: true})
  }

  okHandler() {
    this.setState({openModal: false})

    this.props.history.push({
      pathname: `/shop/${this.props.match.params.username}/feedback/id`
    })
  }

  gotoPaypal(e, id) {
    this.props.history.push({
      pathname: '/paypal-pay',
      search: `?id=${id}`
    })
  }

  render() {
    const {openModal} = this.state

    return (
      <div className="paypal-paying-screen">
        <div className="animated fadeIn">
          <LeaveFeedbackModal 
            isOpen={openModal} 
            okHandler={this.okHandler.bind(this)} 
            product="Cracked Premium"
            date="March 08, 2020"
          />
          <Row>
            <Col lg={9} className="ml-auto mr-auto">
              <Card className="bg-white p-5 detail">
                <div className="d-flex justify-content-between  mb-5">
                  <h2 className="text-primary">[FA] Ikonik</h2>
                  <img src={backIcon} width="15" height="15"  
                    onClick={() => {this.props.history.goBack()}}
                    style={{cursor: "pointer"}}/>
                </div>
                
                <div className="text-center">
                  <img src={shop_brand} className="paypal-brand"></img>
                  <p className="mt-3 mb-5 text-black">You are paying with PayPal<br/>
                      Order ID: a73703a4-38ed-43b3-b5f4-583670e61a19</p>
                  <Button className="paypal-button" onClick={this.openFeedBackModal.bind(this)}><img src={paypal_white}></img></Button>
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
