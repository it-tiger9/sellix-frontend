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

class CreateReceipt extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      
    }

  }

  render() {

    return (
      <div className="create-receipt-screen">
        <div className="animated fadeIn">
          <Row>
            <Col lg={12} className="mx-auto">
              <Card>
                <CardHeader>
                  <Row>
                    <Col lg={12}>
                      <div className="h4 mb-0 d-flex align-items-center">
                        <i className="fa fa-file-o" />
                        <span className="ml-2">Create Receipt</span>
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
                              <Label htmlFor="receipt_number">Receipt Number</Label>
                              <Input
                                type="text"
                                id="receipt_number"
                                name="receipt_number"
                                placeholder=""
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="receipt_date">Receipt Date</Label>
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
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="reference_number">Reference Number</Label>
                              <Input
                                type="text"
                                id="reference_number"
                                name="reference_number"
                                placeholder=""
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="customer_name">Customer Name</Label>
                              <Input
                                type="text"
                                id="customer_name"
                                name="customer_name"
                                placeholder=""
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="invoice">Invoice</Label>
                              <Select
                                className="select-default-width"
                                options={[]}
                                id="invoice"
                                name="invoice"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <hr/>
                        <Row>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="mode">Mode</Label>
                              <Select
                                className="select-default-width"
                                options={[]}
                                id="mode"
                                name="mode"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="amount">Amount</Label>
                              <Input
                                type="text"
                                id="amount"
                                name="amount"
                                placeholder=""
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="unused_amount">Unused Amount</Label>
                              <Input
                                type="text"
                                id="unused_amount"
                                name="unused_amount"
                                placeholder=""
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
                              <Button type="submit" color="primary" className="btn-square mr-3">
                                <i className="fa fa-repeat"></i> Create and More
                              </Button>
                              <Button color="secondary" className="btn-square" 
                                onClick={() => {this.props.history.push('/admin/revenue/receipt')}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateReceipt)
