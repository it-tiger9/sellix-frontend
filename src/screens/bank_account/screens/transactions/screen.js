import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  ButtonGroup,
  Form,
  FormGroup,
  Input,
  Label,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'
import DateRangePicker from 'react-bootstrap-daterangepicker'

import { Loader } from 'components'

import 'react-toastify/dist/ReactToastify.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import 'bootstrap-daterangepicker/daterangepicker.css'


import * as TransactionsActions from './actions'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
    bank_transaction_list: state.bank_account.bank_transaction_list
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    transactionsActions: bindActionCreators(TransactionsActions, dispatch)
  })
}

class BankTransactions extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      openDeleteModal: false,
      typeOptions: [
        { value: 'Withdrawal', label: 'Withdrawal' },
        { value: 'Deposit', label: 'Deposit' }
      ],
      statusOptions: [
        { value: 'All', label: 'All' },
        { value: 'Matched', label: 'Matched' },
        { value: 'Manually Added', label: 'Manually Added' },
        { value: 'Categorized', label: 'Categorized' },
        { value: 'Reconciled', label: 'Reconciled' },
        { value: 'Unreconciled', label: 'Unreconciled' }
      ]
      ,
      actionButtons: {},

      selectedData: null
    }

    this.initializeData = this.initializeData.bind(this)
    this.toggleDangerModal = this.toggleDangerModal.bind(this)
    this.renderAccountNumber = this.renderAccountNumber.bind(this)
    this.renderTransactionStatus = this.renderTransactionStatus.bind(this)
    this.renderTransactionType = this.renderTransactionType.bind(this)
    this.renderActions = this.renderActions.bind(this)
    this.onRowSelect = this.onRowSelect.bind(this)
    this.onSelectAll = this.onSelectAll.bind(this)
    this.toggleActionButton = this.toggleActionButton.bind(this)

    this.options = {
      paginationPosition: 'top'
    }

    this.selectRowProp = {
      mode: 'checkbox',
      bgColor: 'rgba(0,0,0, 0.05)',
      clickToSelect: false,
      onSelect: this.onRowSelect,
      onSelectAll: this.onSelectAll
    }

  }

  componentDidMount () {
    this.initializeData()
  }

  initializeData () {
    this.props.transactionsActions.getTransactionList()
  }

  toggleDangerModal () {
    this.setState({
      openDeleteModal: !this.state.openDeleteModal
    })
  }

  toggleActionButton (index) {
    let temp = Object.assign({}, this.state.actionButtons)
    if (temp[index]) {
      temp[index] = false
    } else {
      temp[index] = true
    }
    this.setState({
      actionButtons: temp
    })
  }

  renderAccountNumber (cell, row) {
    return (
    <label
      className="mb-0 my-link"
      onClick={() => this.props.history.push('/admin/banking/bank-account/transaction/detail')}
    >
      { row.reference_number }
    </label>
    )
  }

  renderTransactionStatus (cell, row) {
    let classname = ''
    if (row.status == 'Explained') {
      classname = 'badge-success'
    } else if (row.status == 'Unexplained') {
      classname = 'badge-danger'
    } else {
      classname = 'badge-primary'
    }
    return (
      <span className={ `badge ${classname} mb-0` }>{ row.status }</span>
    )
  }

  renderTransactionType (cell, row) {
    let classname = ''
    let value = ''
    if (row.status == 'Explained') {
      classname = 'badge-success'
      value = 'Withdrawal'
    } else if (row.status == 'Unexplained') {
      classname = 'badge-danger'
      value = 'Deposit'
    } else {
      classname = 'badge-primary'
      value = 'Tax Claim'
    }
    return (
      <span className={ `badge ${classname} mb-0` }>{ value }</span>
    )
  }

  renderActions (cell, row) {
    return (
      <div>
        <ButtonDropdown
          isOpen={this.state.actionButtons[row.reference_number]}
          toggle={() => this.toggleActionButton(row.reference_number)}
        >
          <DropdownToggle size="sm" color="primary" className="btn-brand icon">
            {
              this.state.actionButtons[row.reference_number] == true ?
                <i className="fas fa-chevron-up" />
              :
                <i className="fas fa-chevron-down" />
            }
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => this.props.history.push('/admin/banking/bank-account/transaction/detail')}>
              <i className="fas fa-edit" /> Edit
            </DropdownItem>
            <DropdownItem>
              <i className="fas fa-wrench" /> Archive
            </DropdownItem>
            <DropdownItem>
              <i className="fa fa-trash" /> Delete
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    )
  }

  onRowSelect (row, isSelected, e) {
    console.log('one row checked ++++++++', row)
  }
  onSelectAll (isSelected, rows) {
    console.log('current page all row checked ++++++++', rows)
  }

  render() {

    const {
      loading,
      typeOptions,
      statusOptions
    } = this.state
    const { bank_transaction_list } = this.props
    const containerStyle = {
      zIndex: 1999
    }

    return (
      <div className="bank-transaction-screen">
        <div className="animated fadeIn">
          <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
          <Card>
            <CardHeader>
              <Row>
                <Col lg={12}>
                  <div className="h4 mb-0 d-flex align-items-center">
                    <i className="icon-doc" />
                    <span className="ml-2">Bank Transactions</span>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              {
                loading ?
                  <Row>
                    <Col lg={12}>
                      <Loader />
                    </Col>
                  </Row>
                :
                  <Row>
                    <Col lg={12}>
                      <div className="d-flex justify-content-end">
                        <ButtonGroup size="sm">
                          <Button
                            color="info"
                            className="btn-square"
                            onClick={() => this.props.history.push('/admin/banking/upload-statement')}
                          >
                            <i className="fa glyphicon glyphicon-export fa-upload mr-1" />
                            Upload Statement
                          </Button>
                          <Button
                            color="primary"
                            className="btn-square"
                            onClick={() => this.props.history.push('/admin/banking/bank-account/transaction/create')}
                          >
                            <i className="fas fa-plus mr-1" />
                            New Transaction
                          </Button>
                          <Button
                            color="success"
                            className="btn-square"
                            onClick={() => this.props.history.push('/admin/banking/bank-account/detail')}
                          >
                            <i className="fas fa-edit mr-1" />
                            Edit Account
                          </Button>
                        </ButtonGroup>
                      </div>
                      <div className="py-3">
                        <h6>Filter : </h6>
                        <Row>
                          <Col lg={2} className="mb-1">
                            <Select
                              className=""
                              options={statusOptions}
                              placeholder="Transaction Status"
                            />
                          </Col>
                          <Col lg={2} className="mb-1">
                            <Select
                              className=""
                              options={typeOptions}
                              placeholder="Transaction Type"
                            />
                          </Col>
                          <Col lg={2} className="mb-1">
                            <DateRangePicker>
                              <Input type="text" placeholder="Transaction Date" />
                            </DateRangePicker>
                          </Col>
                        </Row>
                      </div>
                      <div>
                        <BootstrapTable
                          search={false}
                          options={ this.options }
                          data={bank_transaction_list}
                          version="4"
                          hover
                          pagination
                          totalSize={bank_transaction_list ? bank_transaction_list.length : 0}
                          className="bank-transaction-table"
                        >
                          <TableHeaderColumn
                            width="120"
                            dataFormat={this.renderTransactionStatus}
                          >
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="amount"
                            dataSort
                          >
                            Date
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            isKey
                            dataField="reference_number"
                            dataFormat={this.renderAccountNumber}
                            dataSort
                          >
                            Reference No.
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="description"
                            dataFormat={this.renderTransactionType}
                            dataSort
                          >
                            Transaction Type
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="amount"
                            dataSort
                          >
                            Deposit
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="amount"
                            dataSort
                          >
                            Withdrawal
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="amount"
                            dataSort
                          >
                            Running Balance
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            className="text-right"
                            columnClassName="text-right"
                            width="55"
                            dataFormat={this.renderActions}
                          >
                          </TableHeaderColumn>
                        </BootstrapTable>
                      </div>
                    </Col>
                  </Row>
              }
            </CardBody>
          </Card>
          <Modal
            isOpen={this.state.openDeleteModal}
            centered
            className="modal-primary"
          >
            <ModalHeader toggle={this.toggleDangerModal}>
              <h4 className="mb-0">Are you sure ?</h4>
            </ModalHeader>
            <ModalBody>
              <h5 className="mb-0">This record will be deleleted permanently.</h5>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" className="btn-square" onClick={this.deleteBank}>Yes</Button>{' '}
              <Button color="secondary" className="btn-square" onClick={this.toggleDangerModal}>No</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankTransactions)
