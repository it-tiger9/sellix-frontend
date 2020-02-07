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
  Label,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap'
import Select from 'react-select'
import ImagesUploader from 'react-images-uploader'
import DatePicker from 'react-datepicker'


import 'react-datepicker/dist/react-datepicker.css'
import 'react-images-uploader/styles.css'
import 'react-images-uploader/font.css'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
  })
}

class Profile extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      activeTab: new Array(2).fill('1')
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray
    })
  }

  render() {

    return (
      <div className="profile-screen">
        <div className="animated fadeIn">
          <Row>
            <Col lg={12} className="mx-auto">
              <Card>
                <CardHeader>
                  <Row>
                    <Col lg={12}>
                      <div className="h4 mb-0 d-flex align-items-center">
                        <i className="nav-icon fas fa-user" />
                        <span className="ml-2">Profile</span>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        active={this.state.activeTab[0] === '1'}
                        onClick={() => { this.toggle(0, '1') }}
                      >
                        Account
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        active={this.state.activeTab[0] === '2'}
                        onClick={() => { this.toggle(0, '2') }}
                      >
                        Company Profile
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab[0]}>
                    <TabPane tabId="1"> 
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
                                <div className="mt-4"></div>
                                <Row>
                                  <Col lg={6}>
                                    <FormGroup className="mb-3">
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
                                    <FormGroup className="mb-3">
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
                                    <i className="fa fa-dot-circle-o"></i> Save
                                  </Button>
                                  <Button color="secondary" className="btn-square" 
                                    onClick={() => {this.props.history.push('/admin/master/user')}}>
                                    <i className="fa fa-ban"></i> Cancel
                                  </Button>
                                </FormGroup>
                              </Col>
                            </Row>
                          </Form>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col lg={12}>
                          <Form>
                            <h5 className="mt-3 mb-3">Company Detail</h5>
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
                                  <Col lg={4}>
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="product_code">Company Name</Label>
                                      <Input
                                        type="text"
                                        id="product_code"
                                        name="product_code"
                                        placeholder="Enter Company Name"
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col lg={4}>
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="product_code">Company Registration No</Label>
                                      <Input
                                        type="text"
                                        id="product_code"
                                        name="product_code"
                                        placeholder="Enter Company Registration No"
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col lg={4}>
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="product_code">VAT Registration No</Label>
                                      <Input
                                        type="text"
                                        id="product_code"
                                        name="product_code"
                                        placeholder="Enter VAT Registration No"
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col lg={4}>
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="product_code">Company Type Code</Label>
                                      <Input
                                        type="text"
                                        id="product_code"
                                        name="product_code"
                                        placeholder="Enter Company Type Code"
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col lg={4}>
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="product_code">Industry Type Code</Label>
                                      <Input
                                        type="text"
                                        id="product_code"
                                        name="product_code"
                                        placeholder="Enter Industry Type Code"
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col lg={4}>
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="product_code">Currency Code</Label>
                                      <Input
                                        type="text"
                                        id="product_code"
                                        name="product_code"
                                        placeholder="Enter Currency Code"
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col lg={4}>
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="product_code">Website</Label>
                                      <Input
                                        type="text"
                                        id="product_code"
                                        name="product_code"
                                        placeholder="Enter Website"
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col lg={4}>
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="product_code">Email Address</Label>
                                      <Input
                                        type="text"
                                        id="product_code"
                                        name="product_code"
                                        placeholder="Enter Email Address"
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col lg={4}>
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="product_code">Phone Number</Label>
                                      <Input
                                        type="text"
                                        id="product_code"
                                        name="product_code"
                                        placeholder="Enter Phone Number"
                                        required
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                            
                            <h5 className="mt-3 mb-3">Company Cost</h5>
                            <Row>
                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Expense Budget</Label>
                                  <Input
                                    type="text"
                                    id="product_code"
                                    name="product_code"
                                    placeholder="Enter Expense Budget"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Revenue Budget</Label>
                                  <Input
                                    type="text"
                                    id="product_code"
                                    name="product_code"
                                    placeholder="Enter Revenue Budget"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <h5 className="mt-3 mb-3">Invoicing Address</h5>
                            <Row>
                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Invoicing Address Line1</Label>
                                  <Input
                                    type="textarea"
                                    id="categoryDiscription"
                                    name="categoryDiscription"
                                    placeholder="Enter Invoicing Address Line1"
                                    required
                                    rows="5"
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Invoicing Address Line1</Label>
                                  <Input
                                    type="textarea"
                                    id="categoryDiscription"
                                    name="categoryDiscription"
                                    placeholder="Enter Invoicing Address Line2"
                                    required
                                    rows="5"
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Invoicing Address Line3</Label>
                                  <Input
                                    type="textarea"
                                    id="categoryDiscription"
                                    name="categoryDiscription"
                                    placeholder="Enter Invoicing Address Line3"
                                    required
                                    rows="5"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">City</Label>
                                  <Input
                                    type="text"
                                    id="product_code"
                                    name="product_code"
                                    placeholder="Enter City"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">State Region</Label>
                                  <Input
                                    type="text"
                                    id="product_code"
                                    name="product_code"
                                    placeholder="Enter State Region"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Country Code</Label>
                                  <Input
                                    type="text"
                                    id="product_code"
                                    name="product_code"
                                    placeholder="Enter Country Code"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">PO Box No</Label>
                                  <Input
                                    type="text"
                                    id="product_code"
                                    name="product_code"
                                    placeholder="Enter PO Box No"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Post Zip Code</Label>
                                  <Input
                                    type="text"
                                    id="product_code"
                                    name="product_code"
                                    placeholder="Enter Post Zip Code"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Date Format</Label>
                                  <Input
                                    type="text"
                                    id="product_code"
                                    name="product_code"
                                    placeholder="Enter Date Format"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                            </Row>


                            <h5 className="mt-3 mb-3">Company Address</h5>
                            <Row>
                              <Col lg={12}>
                                <FormGroup check inline className="mb-3">
                                  <div className="custom-checkbox custom-control">
                                    <input 
                                      className="custom-control-input"
                                      type="checkbox"
                                      id="inline-radio1"
                                      name="SMTP-auth"
                                     />
                                    <label className="custom-control-label" htmlFor="inline-radio1">
                                      Company Address is same as Invoicing Address
                                    </label>
                                  </div>
                                </FormGroup>
                              </Col>
                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Company Address Line1</Label>
                                  <Input
                                    type="textarea"
                                    id="categoryDiscription"
                                    name="categoryDiscription"
                                    placeholder="Enter Company Address Line1"
                                    required
                                    rows="5"
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Company Address Line1</Label>
                                  <Input
                                    type="textarea"
                                    id="categoryDiscription"
                                    name="categoryDiscription"
                                    placeholder="Enter Company Address Line2"
                                    required
                                    rows="5"
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Company Address Line3</Label>
                                  <Input
                                    type="textarea"
                                    id="categoryDiscription"
                                    name="categoryDiscription"
                                    placeholder="Enter Company Address Line3"
                                    required
                                    rows="5"
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">City</Label>
                                  <Input
                                    type="text"
                                    id="product_code"
                                    name="product_code"
                                    placeholder="Enter City"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">State Region</Label>
                                  <Input
                                    type="text"
                                    id="product_code"
                                    name="product_code"
                                    placeholder="Enter State Region"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Country Code</Label>
                                  <Input
                                    type="text"
                                    id="product_code"
                                    name="product_code"
                                    placeholder="Enter Country Code"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">PO Box No</Label>
                                  <Input
                                    type="text"
                                    id="product_code"
                                    name="product_code"
                                    placeholder="Enter PO Box No"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Post Zip Code</Label>
                                  <Input
                                    type="text"
                                    id="product_code"
                                    name="product_code"
                                    placeholder="Enter Post Zip Code"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg={12} className="mt-5">
                                <FormGroup className="text-right">
                                  <Button type="submit" color="primary" className="btn-square mr-3">
                                    <i className="fa fa-dot-circle-o"></i> Save
                                  </Button>
                                  <Button color="secondary" className="btn-square" 
                                    onClick={() => {this.props.history.push('/admin/master/user')}}>
                                    <i className="fa fa-ban"></i> Cancel
                                  </Button>
                                </FormGroup>
                              </Col>
                            </Row>
                          </Form>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                  
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)