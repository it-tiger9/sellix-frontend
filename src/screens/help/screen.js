import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardBody,
  Col,
  Row,
} from "reactstrap"

import './style.scss'

const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
  })
}

class Help extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const faqIcon = require('assets/images/settings/faq.png')
    const userIcon = require('assets/images/settings/user.png')

    return (
      <div className="help-screen">
        <div className="animated fadeIn">
          <Row>
            <Col lg='8' className="mx-auto my-auto">
              <Row>
                <Col md="6">
                  <Card>
                    <CardBody>
                      <div><img src={faqIcon} width="40%"></img></div>
                      <h3>Have a question?</h3>
                      <p>
                        Find detailed answers to the most common questions you might have while using our site
                      </p>
                      <Link to="/admin/settings/help/Faq">Go to FAQ</Link>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="6">
                  <Card>
                    <CardBody>
                      <div><img src={userIcon} width="40%"></img></div>
                      <h3>Customer Support</h3>
                      <p>
                        Find detailed answers to the most common questions you might have while using our site
                      </p>
                      <div className="d-flex">
                        <button className="btn-pill btn btn-danger btn-lg">
                          <i className="icon-phone icons font-2xl d-block"></i>
                        </button>
                        <button className="btn-pill btn btn-danger btn-lg">
                          <i className="cui-comment-square icons font-2xl d-block"></i>
                        </button>
                        <button className="btn-pill btn btn-danger btn-lg">
                          <i className="cui-envelope-closed icons font-2xl d-block" style={{marginTop: -5}}></i>
                        </button>
                      </div>
                    </CardBody>
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

export default connect(mapStateToProps, mapDispatchToProps)(Help)
