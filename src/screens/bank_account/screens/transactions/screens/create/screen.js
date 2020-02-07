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

class CreateBankTransaction extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      
    }

  }

  render() {

    return (
      <div className="create-bank-transaction-screen">
        <div className="animated fadeIn">
          <Row>
            <Col lg={12} className="mx-auto">
              <Card>
                <CardHeader>
                  <Row>
                    <Col lg={12}>
                      <div className="h4 mb-0 d-flex align-items-center">
                        <i className="icon-doc" />
                        <span className="ml-2">Create Bank Transaction</span>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={12}>
                      <Form>
                        <Row>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="statement_type">Transaction Type</Label>
                              <Select
                                className="select-default-width"
                                options={[]}
                                id="statement_type"
                                name="statement_type"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="date">Date</Label>
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
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="total_amount">Total Amount</Label>
                              <Input
                                type="text"
                                id="total_amount"
                                name="total_amount"
                                placeholder=""
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="category">Category</Label>
                              <Select
                                className="select-default-width"
                                options={[]}
                                id="category"
                                name="category"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={8}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="description">Description</Label>
                              <Input
                                type="textarea"
                                name="description"
                                id="description"
                                rows="6"
                                placeholder="Description..."
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="project">Project</Label>
                              <Select
                                className="select-default-width"
                                options={[]}
                                id="project"
                                name="project"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <hr/>
                        <Row>
                          <Col lg={8}>
                            <Row>
                              <Col lg={6}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="reciept_number">Reciept Number</Label>
                                  <Input
                                    type="text"
                                    id="reciept_number"
                                    name="reciept_number"
                                    placeholder="Enter Reciept Number"
                                    required
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={12}>
                                <FormGroup className="">
                                  <Label htmlFor="attachment_description">Attachment Description</Label>
                                  <Input
                                    type="textarea"
                                    name="attachment_description"
                                    id="attachment_description"
                                    rows="5"
                                    placeholder="Description..."
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </Col>
                          <Col lg={4}>
                            <Row>
                              <Col lg={12}>
                                <FormGroup className="">
                                  <Label>Reciept Attachment</Label><br/>
                                  <Button color="primary" className="btn-square mr-3">
                                    <i className="fa fa-upload"></i> Upload
                                  </Button>
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
                                onClick={() => this.props.history.push('/admin/banking/bank-account/transaction')}>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateBankTransaction)
