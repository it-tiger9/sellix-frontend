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
  ButtonGroup,
  Form,
  FormGroup,
  Input,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import Select from 'react-select'

import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'

import {
  Loader,
  ConfirmDeleteModal
} from 'components'
import {
  selectOptionsFactory,
  filterFactory
} from 'utils'

import {
  CommonActions
} from 'services/global'
import * as BankAccountActions from './actions'

import 'react-toastify/dist/ReactToastify.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import './style.scss'

const mapStateToProps = (state) => {
  return ({
    is_authed: state.auth.is_authed,
    account_type_list: state.bank_account.account_type_list,
    currency_list: state.bank_account.currency_list,
    bank_account_list: state.bank_account.bank_account_list
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    commonActions: bindActionCreators(CommonActions, dispatch),
    bankAccountActions: bindActionCreators(BankAccountActions, dispatch)
  })
}

class BankAccount extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      dialog: null,
      actionButtons: {},

      selected_id_list: [],

      filter_bank: '',
      filter_account_type: null,
      filter_account_name: '',
      filter_account_number: '',
      filter_currency: null
    }

    this.initializeData = this.initializeData.bind(this)
    this.inputHandler = this.inputHandler.bind(this)
    this.filterBankAccountList = this.filterBankAccountList.bind(this)

    this.closeBankAccount = this.closeBankAccount.bind(this)
    this.removeDialog = this.removeDialog.bind(this)
    this.removeBankAccount = this.removeBankAccount.bind(this)
    this.bulkDeleteBankAccount = this.bulkDeleteBankAccount.bind(this)
    this.removeBulkBankAccount = this.removeBulkBankAccount.bind(this)

    this.renderAccountNumber = this.renderAccountNumber.bind(this)
    this.renderAccountType = this.renderAccountType.bind(this)
    this.renderCurrency = this.renderCurrency.bind(this)
    this.renderActions = this.renderActions.bind(this)
    this.renderLastReconciled = this.renderLastReconciled.bind(this)

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
    this.props.bankAccountActions.getAccountTypeList()
    this.props.bankAccountActions.getCurrencyList()
    this.setState({
      loading: true
    })
    this.props.bankAccountActions.getBankAccountList().then(() => {
      this.setState({
        loading: false
      })
    }).catch(() => {
      this.setState({
        loading: false
      })
    })
  }

  inputHandler (key, value) {
    this.setState({
      [key]: value
    })
  }

  filterBankAccountList (bank_account_list) {
    let data = []
    const {
      filter_bank,
      filter_account_type,
      filter_account_name,
      filter_account_number,
      filter_currency
    } = this.state
    
    data = filterFactory.filterDataList(filter_bank, 'bankName', 'contain', bank_account_list)
    let data_temp = []
    data.map(item => {
      let flag = true
      flag = filterFactory.compareString(
        filter_account_type ? filter_account_type.value : '',
        item.bankAccountType && item.bankAccountType.id ? item.bankAccountType.id : '',
        'match'
      )
      if (flag) {
        let temp = Object.assign({}, item)
        data_temp.push(temp)
      }
    })
    data = filterFactory.filterDataList(filter_account_name, 'bankAccountName', 'contain', data_temp)
    data_temp = filterFactory.filterDataList(filter_account_number, 'accountNumber', 'contain', data)
    data = []
    data_temp.map(item => {
      let flag = true
      flag = filterFactory.compareString(
        filter_currency ? filter_currency.value : '',
        item.bankAccountCurrency && item.bankAccountCurrency.currencyCode ? item.bankAccountCurrency.currencyCode : '',
        'match'
      )
      if (flag) {
        let temp = Object.assign({}, item)
        data.push(temp)
      }
    })
    return data
  }

  renderAccountType (cell, row) {
    if (row.bankAccountType) {
      let data = null
      switch(row.bankAccountType.name) {
        case 'Saving':
          data = <label className="badge badge-primary text-white mb-0">{ row.bankAccountType.name }</label>
          break
        case 'Current':
          data = <label className="badge badge-info text-white mb-0">{ row.bankAccountType.name }</label>
          break
        case 'Checking':
          data = <label className="badge badge-warning text-white mb-0">{ row.bankAccountType.name }</label>
          break
        case 'Credit Card':
          data = <label className="badge badge-success text-white mb-0">{ row.bankAccountType.name }</label>
          break
        case 'Others':
          data = <label className="badge badge-info text-white mb-0">{ row.bankAccountType.name }</label>
          break
        case 'Paypal':
          data = <label className="badge badge-danger text-white mb-0">{ row.bankAccountType.name }</label>
          break
        default:
          data = <label className="badge badge-default mb-0">No Specified</label>
          break
      }
      return data
    } else {
      return (
        <label className="badge badge-danger mb-0">No Specified</label>
      )
    }
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
        onClick={() => this.props.history.push('/admin/banking/bank-account/transaction',
          {bankAccountId: row.bankAccountId })}
      >
        { row.accountNumber }
      </label>
    )
  }

  renderCurrency (cell, row) {
    if (
      row.bankAccountCurrency &&
      row.bankAccountCurrency.currencyIsoCode
    ) {
      return (
        <label className="badge badge-primary mb-0">{ row.bankAccountCurrency.currencyIsoCode }</label>
      )  
    } else {
      return (
        <label className="badge badge-danger mb-0">No Specified</label>
      )
    }
  }

  renderActions (cell, row) {
    return (
      <div>
        <ButtonDropdown
          isOpen={this.state.actionButtons[row.bankAccountId]}
          toggle={() => this.toggleActionButton(row.bankAccountId)}
        >
          <DropdownToggle size="sm" color="primary" className="btn-brand icon">
            {
              this.state.actionButtons[row.bankAccountId] == true ?
                <i className="fas fa-chevron-up" />
              :
                <i className="fas fa-chevron-down" />
            }
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => this.props.history.push('/admin/banking/bank-account/detail', {
              bankAccountId: row.bankAccountId
            })}>
              <i className="fas fa-edit" /> Edit
            </DropdownItem>
            <DropdownItem onClick={() => this.props.history.push('/admin/banking/bank-account/transaction', {
              bankAccountId: row.bankAccountId
            })}>
              <i className="fas fa-eye" /> View Transactions
            </DropdownItem>
            <DropdownItem onClick={() => this.props.history.push('/admin/banking/upload-statement')}>
              <i className="fas fa-upload" /> Upload Statement
            </DropdownItem>
            <DropdownItem>
              <i className="fa fa-connectdevelop" /> Reconcile
            </DropdownItem>
            <DropdownItem onClick={() => this.closeBankAccount(row.bankAccountId)}>
              <i className="fa fa-trash" /> Close
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    )
  }

  closeBankAccount (_id) {
    this.setState({
      dialog: <ConfirmDeleteModal
        isOpen={true}
        okHandler={() => this.removeBankAccount(_id)}
        cancelHandler={this.removeDialog}
      />
    })
  }

  removeBankAccount(_id) {
    this.removeDialog()
    this.props.bankAccountActions.removeBankAccountByID(_id).then(() => {
      this.props.commonActions.tostifyAlert('success', 'Removed Successfully')
      this.props.bankAccountActions.getBankAccountList()
      let temp_List = []
      this.state.selected_id_list.map(item => {
        if (item != _id) {
          temp_List.push(item)
        }
      })
      this.setState({
        selected_id_list: temp_List
      })
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.data ? err.data.message : null)
    })
  }

  removeDialog () {
    this.setState({
      dialog: null
    })
  }

  renderLastReconciled (cell, row) {
    return (
      <div>
        <div>
          <label className="font-weight-bold mr-2">Balance : </label>
          <label className="badge badge-success mb-0">2034234</label>
        </div>
        <div>
          <label className="font-weight-bold mr-2">Date : </label><label>2019/12/05</label>
        </div>
      </div>
    )
  }


  onRowSelect (row, isSelected, e) {
    let temp_list = []
    if (isSelected) {
      temp_list = Object.assign([], this.state.selected_id_list)
      temp_list.push(row.bankAccountId)
    } else {
      this.state.selected_id_list.map(item => {
        if (item != row.bankAccountId) {
          temp_list.push(item)
        }
      })
    }
    this.setState({
      selected_id_list: temp_list
    })
  }
  onSelectAll (isSelected, rows) {
    let temp_list = []
    if (isSelected) {
      rows.map(item => {
        temp_list.push(item.bankAccountId)
      })
    }
    this.setState({
      selected_id_list: temp_list
    })
  }

  bulkDeleteBankAccount () {
    let {
      selected_id_list
    } = this.state
    if (selected_id_list.length > 0) {
      this.setState({
        dialog: <ConfirmDeleteModal
          isOpen={true}
          okHandler={this.removeBulkBankAccount}
          cancelHandler={this.removeDialog}
        />
      })
    } else {
      this.props.commonActions.tostifyAlert('info', 'Please select the rows of the table and try again.')
    }
  }

  removeBulkBankAccount () {
    this.removeDialog()
    let {
      selected_id_list
    } = this.state
    let obj = {
      ids: selected_id_list
    }
    this.props.bankAccountActions.removeBulkBankAccount(obj).then(() => {
      this.props.commonActions.tostifyAlert('success', 'Removed Successfully')
      this.props.bankAccountActions.getBankAccountList()
      this.setState({
        selected_id_list: []
      })
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.data ? err.data.message : null)
    })
  }


  render() {

    const {
      loading,
      filter_bank,
      filter_account_type,
      filter_account_name,
      filter_account_number,
      filter_currency,
      dialog
    } = this.state
    const {
      account_type_list,
      currency_list,
      bank_account_list
    } = this.props

    let displayData = this.filterBankAccountList(bank_account_list)

    return (
      <div className="bank-account-screen">
        <div className="animated fadeIn">
          { dialog }
          <Card>
            <CardHeader>
              <Row>
                <Col lg={12}>
                  <div className="h4 mb-0 d-flex align-items-center">
                    <i className="fas fa-university" />
                    <span className="ml-2">Bank Accounts</span>
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
                            color="success"
                            className="btn-square"
                          >
                            <i className="fa glyphicon glyphicon-export fa-download mr-1" />
                            Export to CSV
                          </Button>
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
                            onClick={() => this.props.history.push(`/admin/banking/bank-account/create`)}
                          >
                            <i className="fas fa-plus mr-1" />
                            New Account
                          </Button>
                          <Button
                            color="warning"
                            className="btn-square"
                            onClick={this.bulkDeleteBankAccount}
                          >
                            <i className="fa glyphicon glyphicon-trash fa-trash mr-1" />
                            Bulk Delete
                          </Button>
                        </ButtonGroup>
                      </div>
                      <div className="py-3">
                        <h5>Filter : </h5>
                        <Row>
                          <Col lg={2} className="mb-1">
                            <Input
                              type="text"
                              placeholder="Bank"
                              value={filter_bank}
                              onChange={e => this.inputHandler('filter_bank', e.target.value)}
                            />
                          </Col>
                          <Col lg={2} className="mb-1">
                            <Select
                              className=""
                              options={selectOptionsFactory.renderOptions('name', 'id', account_type_list)}
                              value={filter_account_type}
                              onChange={option => this.setState({
                                filter_account_type: option
                              })}
                              placeholder="Account Type"
                            />
                          </Col>
                          <Col lg={2} className="mb-1">
                            <Input
                              type="text"
                              placeholder="Account Name"
                              value={filter_account_name}
                              onChange={e => this.inputHandler('filter_account_name', e.target.value)}
                            />
                          </Col>
                          <Col lg={2} className="mb-1">
                            <Input
                              type="text"
                              placeholder="Account Number"
                              value={filter_account_number}
                              onChange={e => this.inputHandler('filter_account_number', e.target.value)}
                            />
                          </Col>
                          <Col lg={2} className="mb-1">
                            <Select
                              className=""
                              options={selectOptionsFactory.renderOptions('currencyName', 'currencyCode', currency_list)}
                              value={filter_currency}
                              onChange={option => this.setState({
                                filter_currency: option
                              })}
                              placeholder="Currency"
                            />
                          </Col>
                        </Row>
                      </div>
                      <div>
                        <BootstrapTable
                          selectRow={ this.selectRowProp }
                          search={false}
                          options={ this.options }
                          data={displayData}
                          version="4"
                          hover
                          pagination
                          totalSize={displayData ? displayData.length : 0}
                          className="bank-account-table"
                        >
                          <TableHeaderColumn
                            isKey
                            dataField="bankAccountId"
                            width="0"
                          >
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="bankName"
                            dataSort
                          >
                            Bank
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataFormat={this.renderAccountType}
                            dataSort
                          >
                            Account Type
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="accountNumber"
                            dataFormat={this.renderAccountNumber}
                            dataSort
                          >
                            Account Number
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="bankAccountName"
                            dataSort
                          >
                            Account Name
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataFormat={this.renderCurrency}
                            dataSort
                          >
                            Currency
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="openingBalance"
                            dataSort
                          >
                            Book Balance
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="swift_code"
                            dataFormat={this.renderLastReconciled}
                          >
                            Last Reconciled
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
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BankAccount)
