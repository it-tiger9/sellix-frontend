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
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
  })
}

class CreateExpense extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      data: [
        {},
        {}
      ]
    }

    this.options = {
      paginationPosition: 'top'
    }

    this.renderActions = this.renderActions.bind(this)
    this.renderProductName = this.renderProductName.bind(this)
    this.renderAmount = this.renderAmount.bind(this)
    this.renderVat = this.renderVat.bind(this)
    this.renderSubTotal = this.renderSubTotal.bind(this)

  }

  renderActions (cell, row) {
    return (
      <Button
        size="sm"
        className="btn-twitter btn-brand icon"
      >
        <i className="fas fa-trash"></i>
      </Button>
    )
  }

  renderProductName (cell, row) {
    return (
      <div className="d-flex align-items-center">
        <Input type="select" className="mr-1">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </Input>
        <Button
          size="sm"
          color="primary"
          className="btn-brand icon"
        >
          <i className="fas fa-plus"></i>
        </Button>
      </div>
    )
  }

  renderAmount (cell, row) {
    return (
      <Input
        type="text"
        value="0"
      />
    )
  }

  renderVat (cell, row) {
    return (
      <Input type="select">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </Input>
    )
  }

  renderSubTotal (cell, row) {
    return (
      <label className="mb-0">0.00</label>
    )
  }

  render() {

    const { data } = this.state

    return (
      <div className="create-expense-screen">
        <div className="animated fadeIn">
          <Row>
            <Col lg={12} className="mx-auto">
              <Card>
                <CardHeader>
                  <Row>
                    <Col lg={12}>
                      <div className="h4 mb-0 d-flex align-items-center">
                        <i className="fab fa-stack-exchange" />
                        <span className="ml-2">Create Expense</span>
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
                              <Label htmlFor="payee">Payee</Label>
                              <Input
                                type="text"
                                id="payee"
                                name="payee"
                                placeholder="Enter Payment"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="expense_date">Expense Date</Label>
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
                              <Label htmlFor="currency">Currency</Label>
                              <Select
                                className="select-default-width"
                                options={[]}
                                id="currency"
                                name="currency"
                              />
                            </FormGroup>
                          </Col>
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
                        <Row>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="bank">Bank</Label>
                              <Select
                                className="select-default-width"
                                options={[]}
                                id="bank"
                                name="bank"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="payment_date">Payment Date</Label>
                              <div>
                                <DatePicker
                                  className="form-control"
                                  id="payment_date"
                                  name="payment_date"
                                  placeholderText=""
                                />
                              </div>
                            </FormGroup>
                          </Col>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="payment_reference_number">Payment Reference Number</Label>
                              <Select
                                className="select-default-width"
                                options={[]}
                                id="payment_reference_number"
                                name="payment_reference_number"
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
                                rows="5"
                                placeholder="1024 characters..."
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
                                <FormGroup className="mb-3">
                                  <Label htmlFor="attachment_description">Attachment Description</Label>
                                  <Input
                                    type="textarea"
                                    name="attachment_description"
                                    id="attachment_description"
                                    rows="5"
                                    placeholder="1024 characters..."
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </Col>
                          <Col lg={4}>
                            <Row>
                              <Col lg={12}>
                                <FormGroup className="mb-3">
                                  <Label>Reciept Attachment</Label><br/>
                                  <Button color="primary" className="btn-square mr-3">
                                    <i className="fa fa-upload"></i> Upload
                                  </Button>
                                </FormGroup>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <hr/>
                        <Row>
                          <Col lg={12} className="mb-3">
                            <Button color="primary" className="btn-square mr-3">
                              <i className="fa fa-plus"></i> Add More
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12}>
                            <BootstrapTable
                              options={ this.options }
                              data={data}
                              version="4"
                              hover
                              className="expense-create-table"
                            >
                              <TableHeaderColumn
                                width="55"
                                dataAlign="center"
                                dataFormat={this.renderActions}
                              >
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                isKey
                                dataField="product_name"
                                dataFormat={this.renderProductName}
                              >
                                Account Code
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="quantity"
                                dataFormat={this.renderAmount}
                              >
                                Amount
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="vat"
                                dataFormat={this.renderVat}
                              >
                                Vat (%)
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="sub_total"
                                dataFormat={this.renderSubTotal}
                                className="text-right"
                                columnClassName="text-right"
                              >
                                Sub Total (All)
                              </TableHeaderColumn>
                            </BootstrapTable>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4} className="ml-auto">
                      <div className="">
                        <div className="total-item p-2">
                          <Row>
                            <Col lg={6}>
                              <h5 className="mb-0 text-right">Total Net</h5>
                            </Col>
                            <Col lg={6} className="text-right">
                              <label className="mb-0">0.00</label>
                            </Col>
                          </Row>
                        </div>
                        <div className="total-item p-2">
                          <Row>
                            <Col lg={6}>
                              <h5 className="mb-0 text-right">Total Vat</h5>
                            </Col>
                            <Col lg={6} className="text-right">
                              <label className="mb-0">0.00</label>
                            </Col>
                          </Row>
                        </div>
                        <div className="total-item p-2">
                          <Row>
                            <Col lg={6}>
                              <h5 className="mb-0 text-right">Total</h5>
                            </Col>
                            <Col lg={6} className="text-right">
                              <label className="mb-0">0.00</label>
                            </Col>
                          </Row>
                        </div>
                      </div>
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
                          onClick={() => {this.props.history.push('/admin/expense/expense')}}>
                          <i className="fa fa-ban"></i> Cancel
                        </Button>
                      </FormGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateExpense)
