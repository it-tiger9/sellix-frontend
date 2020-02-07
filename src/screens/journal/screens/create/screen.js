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

class CreateJournal extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      data: [
        {
          transactionCategoryCode: 3
        },
        {
          transactionCategoryCode: 4
        }
      ]
    }

    this.options = {
      paginationPosition: 'top'
    }

    this.renderActions = this.renderActions.bind(this)
    this.renderAccount = this.renderAccount.bind(this)
    this.renderDescription = this.renderDescription.bind(this)
    this.renderContact = this.renderContact.bind(this)
    this.renderTaxCode = this.renderTaxCode.bind(this)
    this.renderDebits = this.renderDebits.bind(this)
    this.renderCredits = this.renderCredits.bind(this)

  }

  renderActions (cell, row) {
    return (
      <Button
        size="sm"
        color="primary"
        className="btn-brand icon"
      >
        <i className="fas fa-trash"></i>
      </Button>
    )
  }

  renderAccount (cell, row) {
    return (
      <Input type="select">
        <option value="1">account 1</option>
        <option value="2">account 2</option>
        <option value="3">account 3</option>
        <option value="4">account 4</option>
        <option value="5">account 5</option>
        <option value="6">account 6</option>
      </Input>
    )
  }

  renderDescription (cell, row) {
    return (
      <Input
        type="text"
        placeholder=""
      />
    )
  }

  renderContact (cell, row) {
    return (
      <Input type="select">
        <option value="1">contact 1</option>
        <option value="2">contact 2</option>
        <option value="3">contact 3</option>
        <option value="4">contact 4</option>
        <option value="5">contact 5</option>
        <option value="6">contact 6</option>
      </Input>
    )
  }

  renderTaxCode (cell, row) {
    return (
      <Input type="select">
        <option value="1">tax 1</option>
        <option value="2">tax 2</option>
        <option value="3">tax 3</option>
        <option value="4">tax 4</option>
        <option value="5">tax 5</option>
        <option value="6">tax 6</option>
      </Input>
    )
  }

  renderDebits (cell, row) {
    return (
      <Input
        type="text"
        placeholder="0.00"
      />
    )
  }

  renderCredits (cell, row) {
    return (
      <Input
        type="text"
        placeholder="0.00"
      />
    )
  }



  render() {

    const {
      data
    } = this.state

    return (
      <div className="create-journal-screen">
        <div className="animated fadeIn">
          <Row>
            <Col lg={12} className="mx-auto">
              <Card>
                <CardHeader>
                  <Row>
                    <Col lg={12}>
                      <div className="h4 mb-0 d-flex align-items-center">
                        <i className="fa fa-diamond" />
                        <span className="ml-2">Create Journal</span>
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
                        </Row>
                        <Row>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="reference_number">Reference #</Label>
                              <Input
                                type="text"
                                id="reference_number"
                                name="reference_number"
                                placeholder=""
                                required
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
                              className="journal-create-table"
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
                                dataFormat={this.renderAccount}
                              >
                                Account
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="description"
                                dataFormat={this.renderDescription}
                              >
                                Description
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="quantity"
                                dataFormat={this.renderContact}
                              >
                                Contact
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="vat"
                                dataFormat={this.renderTaxCode}
                              >
                                Tax Code
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="vat"
                                dataFormat={this.renderDebits}
                              >
                                Debits
                              </TableHeaderColumn>
                              <TableHeaderColumn
                                dataField="vat"
                                dataFormat={this.renderCredits}
                              >
                                Credits
                              </TableHeaderColumn>
                            </BootstrapTable>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={4} className="ml-auto">
                            <div className="total-item p-2">
                              <Row>
                                <Col xs={4}></Col>
                                <Col xs={4}>
                                  <h5 className="mb-0 text-right">Debits</h5>
                                </Col>
                                <Col xs={4}>
                                  <h5 className="mb-0 text-right">Credits</h5>
                                </Col>
                              </Row>
                            </div>
                            <div className="total-item p-2">
                              <Row>
                                <Col xs={4}>
                                  <h5 className="mb-0 text-right">Sub Total</h5>
                                </Col>
                                <Col xs={4} className="text-right">
                                  <label className="mb-0">0.00</label>
                                </Col>
                                <Col xs={4} className="text-right">
                                  <label className="mb-0">0.00</label>
                                </Col>
                              </Row>
                            </div>
                            <div className="total-item p-2">
                              <Row>
                                <Col xs={4}>
                                  <h5 className="mb-0 text-right">Total</h5>
                                </Col>
                                <Col xs={4} className="text-right">
                                  <label className="mb-0">0.00</label>
                                </Col>
                                <Col xs={4} className="text-right">
                                  <label className="mb-0">0.00</label>
                                </Col>
                              </Row>
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
                                onClick={() => {this.props.history.push('/admin/accountant/journal')}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateJournal)
