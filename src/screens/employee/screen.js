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
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import './style.scss'

const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
  })
}

class Employee extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      birthday: new Date()
    }

    this.changeBirthday = this.changeBirthday.bind(this)
  }

  changeBirthday(date){
    this.setState({
      birthday: date
    })
  }

  render() {

    return (
      <div className="employee-screen">
        <div className="animated fadeIn">
          <Row>
            <Col lg={12} className="mx-auto">
              <Card>
                <CardHeader>
                  <Row>
                    <Col lg={12}>
                      <div className="h4 mb-0 d-flex align-items-center">
                        <i className="nav-icon fas fa-user-tie" />
                        <span className="ml-2">Employee</span>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={12}>
                      <Form>
                        <h4 className="mb-4">Contact Name</h4>
                        <Row>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="select">Refrence Code</Label>
                              <Input
                                type="text"
                                id="text-input"
                                name="text-input"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="select">Title</Label>
                              <Input
                                type="text"
                                id="text-input"
                                name="text-input"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="select">Email</Label>
                              <Input
                                type="text"
                                id="text-input"
                                name="text-input"
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="row-wrapper">
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="select">Full Name</Label>
                              <Input
                                type="text"
                                id="text-input"
                                name="text-input"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="select">Middle Name</Label>
                              <Input
                                type="text"
                                id="text-input"
                                name="text-input"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="select">Last Name</Label>
                              <Input
                                type="text"
                                id="text-input"
                                name="text-input"
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="row-wrapper">
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="select">Password</Label>
                              <Input
                                type="text"
                                id="text-input"
                                name="text-input"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="select">Confirm Password</Label>
                              <Input
                                type="text"
                                id="text-input"
                                name="text-input"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="select">Date of Birth</Label>
                              <div>
                                <DatePicker
                                  className="form-control"
                                  id="date"
                                  name="date"
                                  selected={this.state.birthday}
                                  onChange={this.changeBirthday}
                                  placeholderText=""
                                />
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                        <hr/>
                        <h4 className="mb-3 mt-3">Invoicing Details</h4>
                        <Row className="row-wrapper">
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="select">Billing Email</Label>
                              <Input
                                type="text"
                                id="text-input"
                                name="text-input"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="select">Contract PO Number</Label>
                              <Input
                                type="text"
                                id="text-input"
                                name="text-input"
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row className="row-wrapper">
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="select">Vat Registration Number</Label>
                              <Input
                                type="text"
                                id="text-input"
                                name="text-input"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="select">Currency Code</Label>
                              <Input
                                type="text"
                                id="text-input"
                                name="text-input"
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12} className="mt-5">
                            <FormGroup className="text-right">
                              <Button type="submit" color="primary" className="btn-square mr-3">
                                <i className="fa fa-dot-circle-o"></i> Create
                              </Button>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employee)

