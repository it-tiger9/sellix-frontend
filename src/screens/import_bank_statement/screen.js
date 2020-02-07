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
  NavLink,
} from 'reactstrap'
import Select from 'react-select'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'
import Stepper from 'react-stepper-horizontal'

import BankTransactions from '../bank_account/screens/transactions'

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import './style.scss'

const mapStateToProps = (state) => {
  return ({
    bank_transaction_list: state.bank_account.bank_transaction_list
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    transactionActions: bindActionCreators(BankTransactions.actions, dispatch)
  })
}

class ImportBankStatement extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      
    }

    this.options = {
      paginationPosition: 'top'
    }

    this.initializeData = this.initializeData.bind(this)
    this.renderTransactionType = this.renderTransactionType.bind(this)

  }

  componentDidMount () {
    this.initializeData()
  }

  initializeData () {
    this.props.transactionActions.getTransactionList()
  }

  renderTransactionType (cell, row) {
    let classname = ''
    let value = ''
    if (row.status == 'Explained') {
      classname = 'badge-success'
      value = 'Cost of Goods Sold'
    } else if (row.status == 'Unexplained') {
      classname = 'badge-danger'
      value = 'Expense'
    } else {
      classname = 'badge-primary'
      value = 'Tax Claim'
    }
    return (
      <span className={ `badge ${classname} mb-0` }>{ value }</span>
    )
  }

  render() {

    const { bank_transaction_list } = this.props

    return (
      <div className="import-bank-statement-screen">
        <div className="animated fadeIn">
          <Row>
            <Col lg={12} className="mx-auto">
              <Card>
                <CardHeader>
                  <Row>
                    <Col lg={12}>
                      <div className="h4 mb-0 d-flex align-items-center">
                        <i className="fa glyphicon glyphicon-export fa-upload" />
                        <span className="ml-2">Import Statement</span>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={12}>
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            active={true}
                          >
                            <Label className="mb-0 text-primary">
                              Preview for Imported Statement
                            </Label>
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={'1'}>
                        <TabPane tabId="1"> 
                          <Row>
                            <Col lg={12}>
                              <BootstrapTable
                                search={false}
                                options={ this.options }
                                data={bank_transaction_list}
                                version="4"
                                hover
                                pagination
                                totalSize={ bank_transaction_list ? bank_transaction_list.length : 0}
                                className="preview-bank-transaction-table"
                              >
                                <TableHeaderColumn
                                  isKey
                                  dataField="reference_number"
                                  dataSort
                                >
                                  Reference Number
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  dataField="transaction_type"
                                  dataFormat={this.renderTransactionType}
                                  dataSort
                                >
                                  Transaction Type
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  dataField="amount"
                                  dataSort
                                >
                                  Amount
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  dataField="description"
                                  dataSort
                                >
                                  Description
                                </TableHeaderColumn>
                                <TableHeaderColumn
                                  dataField="transaction_date"
                                  dataSort
                                >
                                  Transaction Date
                                </TableHeaderColumn>
                              </BootstrapTable>
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12} className="mt-5">
                      <FormGroup className="text-right">
                        <Button type="submit" color="primary" className="btn-square mr-3">
                          <i className="fa fa-dot-circle-o"></i> Import
                        </Button>
                        <Button color="secondary" className="btn-square" 
                          onClick={() => this.props.history.push('/admin/banking/bank-account')}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ImportBankStatement)
