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


import './style.scss'

const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
  })
}

class DetailContact extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }

  }

  render() {

    return (
      <div className="create-contact-screen">
        <div className="animated fadeIn">
          <Row>
            <Col lg={12} className="mx-auto">
              <Card>
                <CardHeader>
                  <Row>
                    <Col lg={12}>
                      <div className="h4 mb-0 d-flex align-items-center">
                        <i className="nav-icon fas fa-id-card-alt" />
                        <span className="ml-2">Update Contact</span>
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
                              <Label htmlFor="select">Type</Label>
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
                        <hr/>
                        <h4 className="mb-3 mt-3">Contact Details</h4>
                        <Row className="row-wrapper">
                          <Col md="4">
                            <FormGroup>
                              <Label htmlFor="select">Contact Type</Label>
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
                              <Label htmlFor="select">Organization Name</Label>
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
                              <Label htmlFor="select">PO Box Number</Label>
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
                              <Label htmlFor="select">Email</Label>
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
                              <Label htmlFor="select">Telephone</Label>
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
                              <Label htmlFor="select">Mobile Number</Label>
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
                              <Label htmlFor="select">Address Line1</Label>
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
                              <Label htmlFor="select">Address Line2</Label>
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
                              <Label htmlFor="select">Address Line3</Label>
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
                              <Label htmlFor="select">Country</Label>
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
                              <Label htmlFor="select">State Region</Label>
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
                              <Label htmlFor="select">City</Label>
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
                              <Label htmlFor="select">Post Zip Code</Label>
                              <Input
                                type="text"
                                id="text-input"
                                name="text-input"
                                required
                              />
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
                          <Col lg={12} className="mt-5 d-flex align-items-center justify-content-between">
                            <FormGroup>
                              <Button color="danger" className="btn-square">
                                <i className="fa fa-trash"></i> Delete
                              </Button>
                            </FormGroup>
                            <FormGroup className="text-right">
                              <Button type="submit" color="primary" className="btn-square mr-3">
                                <i className="fa fa-dot-circle-o"></i> Update
                              </Button>
                              <Button color="secondary" className="btn-square" 
                                onClick={() => {this.props.history.push('/admin/master/contact')}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailContact)