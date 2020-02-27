import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Input,
  Col,
  Form,     
  FormGroup,
  Label
} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import { AppSwitch } from '@coreui/react'

import { Loader } from 'components'

import 'react-toastify/dist/ReactToastify.css'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
    
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    
  })
}

class Notification extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  render() {
    const { loading } = this.state;

    return (
      <div className="notification-screen">
        <div className="animated fadeIn">
          <Card>
            <CardBody>
            {
              loading ?
                <Loader></Loader>: 
                <Row>
                  <Col lg={12}>
                    <FormGroup>
                      <Label>Notifications</Label>
                    </FormGroup>
                  </Col>
                  <Col lg={12}>
                    <Form className="mt-3">
                      <Row>
                        <Col>
                          <FormGroup row>
                            <Col className="d-flex align-items-center">
                              <AppSwitch className="mx-1 file-switch mr-2"
                                style={{width: 50}}
                                variant={'pill'} 
                                color={'primary'}
                                size="sm"
                                />
                              <div className="ml-2">
                                <Label>Successful Order</Label>
                                <p>Receive an email notification when a order is successfully processed</p>
                              </div>
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                  <Col lg={12}>
                    <Form className="mt-3">
                      <Row>
                        <Col>
                          <FormGroup row>
                            <Col className="d-flex align-items-center">
                              <AppSwitch className="mx-1 file-switch mr-2"
                                style={{width: 50}}
                                variant={'pill'} 
                                color={'primary'}
                                size="sm"
                                />
                              <div className="ml-2">
                                <Label>Successful Order</Label>
                                <p>Receive an email notification when a order is successfully processed</p>
                              </div>
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                  <Col lg={12}>
                    <Form className="mt-3">
                      <Row>
                        <Col>
                          <FormGroup row>
                            <Col className="d-flex align-items-center">
                              <AppSwitch className="mx-1 file-switch mr-2"
                                style={{width: 50}}
                                variant={'pill'} 
                                color={'primary'}
                                size="sm"
                                />
                              <div className="ml-2">
                                <Label>Successful Order</Label>
                                <p>Receive an email notification when a order is successfully processed</p>
                              </div>
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
            }
            </CardBody>
            <Button color="primary" className="mt-5" style={{width: 200}}
            >Save Settings</Button>
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
