
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
import ImagesUploader from 'react-images-uploader'
import DatePicker from 'react-datepicker'

import 'react-images-uploader/styles.css'
import 'react-images-uploader/font.css'
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

class CreateUser extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }

  }

  render() {

    return (
      <div className="create-user-screen">
        <div className="animated fadeIn">
          <Row>
            <Col lg={12} className="mx-auto">
              <Card>
                <CardHeader>
                  <Row>
                    <Col lg={12}>
                      <div className="h4 mb-0 d-flex align-items-center">
                        <i className="nav-icon fas fa-users" />
                        <span className="ml-2">Create User</span>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={12}>
                      <Form>
                        <Row>
                          <Col lg={2}>
                            <FormGroup className="mb-3 text-center">
                              <ImagesUploader
                                url="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                optimisticPreviews
                                multiple={false}
                                onLoadEnd={(err) => {
                                  if (err) {
                                    console.error(err);
                                  }
                                }}
                                
                              />
                            </FormGroup>
                          </Col>
                          <Col lg={10}>
                            <Row>
                              <Col lg={6}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">First Name</Label>
                                  <Input
                                    type="text"
                                    id="product_code"
                                    name="product_code"
                                    placeholder="Enter First Name"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg={6}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Last Name</Label>
                                  <Input
                                    type="text"
                                    id="product_code"
                                    name="product_code"
                                    placeholder="Enter Last Name"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={6}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Email ID</Label>
                                  <Input
                                    type="text"
                                    id="product_code"
                                    name="product_code"
                                    placeholder="Enter Email ID"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg={6}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Date of Birth</Label>
                                  <div>
                                    <DatePicker
                                      className="form-control"
                                      id="date"
                                      name="date"
                                      placeholderText=""
                                    />
                                  </div>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={6}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Role</Label>
                                  <Select
                                    options={[]}
                                    id="vat_percentage"
                                    name="vat_percentage"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={6}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Status</Label>
                                  <div>
                                    <FormGroup check inline>
                                      <div className="custom-radio custom-control">
                                        <input 
                                          className="custom-control-input"
                                          type="radio"
                                          id="inline-radio1"
                                          name="SMTP-auth"
                                          value="Y"
                                          checked
                                          onChange={this.handleChange} />
                                        <label className="custom-control-label" htmlFor="inline-radio1">Active</label>
                                      </div>
                                    </FormGroup>
                                    <FormGroup check inline>
                                      <div className="custom-radio custom-control">
                                        <input 
                                          className="custom-control-input"
                                          type="radio"
                                          id="inline-radio2"
                                          name="SMTP-auth"
                                          value="N"
                                          onChange={this.handleChange}/>
                                        <label className="custom-control-label" htmlFor="inline-radio2">Inactive</label>
                                      </div>
                                    </FormGroup>
                                  </div>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={6}>
                                <FormGroup className="">
                                  <Label htmlFor="product_code">Password</Label>
                                  <Input
                                    type="text"
                                    id="product_code"
                                    name="product_code"
                                    placeholder="Enter Password"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg={6}>
                                <FormGroup className="">
                                  <Label htmlFor="product_code">Confirm Password</Label>
                                  <Input
                                    type="text"
                                    id="product_code"
                                    name="product_code"
                                    placeholder="Enter Confirm Password"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12} className="mt-5">
                            <FormGroup className="text-right">
                              <Button type="submit" color="primary" className="btn-square mr-3">
                                <i className="fa fa-dot-circle-o"></i> Create
                              </Button>
                              <Button type="submit" color="primary" className="btn-square mr-3">
                                <i className="fa fa-repeat"></i> Create and More
                              </Button>
                              <Button color="secondary" className="btn-square" 
                                onClick={() => {this.props.history.push('/admin/settings/user')}}>
                                <i className="fa fa-ban"></i> Cancel
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)
