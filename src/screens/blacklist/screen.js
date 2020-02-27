import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardBody,
  Row,
  Col
} from 'reactstrap'

import {
  BlackListChart
} from './sections'

import * as DashboardActions from './actions'

import './style.scss'


const mapStateToProps = (state) => {
  return ({
    // Bank Account
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    DashboardActions: bindActionCreators(DashboardActions, dispatch)
  })
}

class Blacklist extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div className="blacklist-screen">
        <div className="animated fadeIn">
          <Card>
            <CardBody>
              <div className="flex-wrapper align-items-center">
                <h1 className="title">Blacklist</h1>
              </div>
              <Row className="mt-4">
                <Col lg={4}>
                  <Card className="grey">
                    <CardBody className="p-0">
                      <div className="d-flex align-items-center justify-content-between p-3">
                        <h5>Events per day</h5>
                        <div className="new-select fill">
                          <select className="form-control" ref={this.dateRangeSelect}>
                            <option value="12">7 days</option>
                            <option value="6">7 days</option>
                            <option value="3">7 days</option>
                          </select>
                          <i className="fa fa-caret-down fa-lg mt-4"/>
                        </div>
                      </div>
                      <BlackListChart/>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={4}>
                  <Card className="grey">
                    <CardBody>
                      <h1 className="report">0</h1>
                      <p className="report-title">Total events</p>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={12}>
                  <Card className="grey">
                    <CardBody>
                      <p className="title mb-4">VPN/Proxies</p>
                      <div className="custom-checkbox custom-control">
                        <input 
                          className="custom-control-input"
                          type="checkbox"
                          id="paypal-email"
                          name="SMTP-auth"
                          />
                        <label className="custom-control-label" htmlFor="paypal-email">
                          Block buyers using a VPN/Proxy for risky payment methods (PayPal, Stripe)
                        </label>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blacklist)
