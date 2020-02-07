import React from 'react'
import { connect } from 'react-redux'
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

import * as CustomerInvoiceActions from './actions'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
    customer_invoice_list: state.customer_invoice.customer_invoice_list
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    customerInvoiceActions: bindActionCreators(CustomerInvoiceActions, dispatch)
  })
}

class CustomerInvoice extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      stateOptions: [
        { value: 'Paid', label: 'Paid' },
        { value: 'Unpaid', label: 'Unpaid' },
        { value: 'Partially Paid', label: 'Partially Paid' },
      ],
      actionButtons: {}
    }

    this.initializeData = this.initializeData.bind(this)
    this.renderInvoiceNumber = this.renderInvoiceNumber.bind(this)
    this.renderInvoiceStatus = this.renderInvoiceStatus.bind(this)
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
    this.props.customerInvoiceActions.getCustomerInoviceList()
  }

  renderInvoiceNumber (cell, row) {
    return (
    <label
      className="mb-0 my-link"
      onClick={() => this.props.history.push('/admin/revenue/customer-invoice/detail')}
    >
      { row.transactionCategoryName }
    </label>
    )
  }

  renderInvoiceStatus (cell, row) {
    let classname = ''
    if (row.status == 'paid') {
      classname = 'badge-success'
    } else if (row.status == 'unpaid') {
      classname = 'badge-danger'
    } else if (row.status == 'Patially Paid') {
      classname = "badget-info"
    } else {
      classname = 'badge-primary'
    }
    return (
      <span className={ `badge ${classname} mb-0` }>{ row.status }</span>
    )
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

  renderActions (cell, row) {
    return (
      <div>
        <ButtonDropdown
          isOpen={this.state.actionButtons[row.transactionCategoryCode]}
          toggle={() => this.toggleActionButton(row.transactionCategoryCode)}
        >
          <DropdownToggle size="sm" color="primary" className="btn-brand icon">
            {
              this.state.actionButtons[row.transactionCategoryCode] == true ?
                <i className="fas fa-chevron-up" />
              :
                <i className="fas fa-chevron-down" />
            }
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={() => this.props.history.push('/admin/revenue/customer-invoice/detail')}>
              <i className="fas fa-edit" /> Edit
            </DropdownItem>
            <DropdownItem>
              <i className="fas fa-heart" /> Post
            </DropdownItem>
            <DropdownItem>
              <i className="fas fa-adjust" /> Adjust
            </DropdownItem>
            <DropdownItem>
              <i className="fas fa-upload" /> Send
            </DropdownItem>
            <DropdownItem>
              <i className="fas fa-print" /> Print
            </DropdownItem>
            <DropdownItem>
              <i className="fas fa-times" /> Cancel
            </DropdownItem>
            <DropdownItem>
              <i className="fa fa-trash-o" /> Delete
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

    const { loading } = this.state
    const { customer_invoice_list } = this.props
    const containerStyle = {
      zIndex: 1999
    }

    return (
      <div className="customer-invoice-screen">
        <div className="animated fadeIn">
          <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
          <Card>
            <CardHeader>
              <Row>
                <Col lg={12}>
                  <div className="h4 mb-0 d-flex align-items-center">
                    <i className="fas fa-address-book" />
                    <span className="ml-2">Customer Invoices</span>
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
                      <div className="mb-4 status-panel p-3">
                        <Row>
                          <Col lg={3}>
                            <h5>Overdue</h5>
                            <h3 className="status-title">$53.25 USD</h3>
                          </Col>
                          <Col lg={3}>
                            <h5>Due Within This Week</h5>
                            <h3 className="status-title">$220.28 USD</h3>
                          </Col>
                          <Col lg={3}>
                            <h5>Due Within 30 Days</h5>
                            <h3 className="status-title">$220.28 USD</h3>
                          </Col>
                          <Col lg={3}>
                            <h5>Average Time to Get Paid</h5>
                            <h3 className="status-title">0 day</h3>
                          </Col>
                        </Row>
                      </div>
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
                            color="primary"
                            className="btn-square"
                            onClick={() => this.props.history.push(`/admin/revenue/customer-invoice/create`)}
                          >
                            <i className="fas fa-plus mr-1" />
                            New Invoice
                          </Button>
                          <Button
                            color="warning"
                            className="btn-square"
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
                            <Input type="text" placeholder="Customer Name" />
                          </Col>
                          <Col lg={2} className="mb-1">
                            <Input type="text" placeholder="Reference Number" />
                          </Col>
                          <Col lg={2} className="mb-1">
                            <DateRangePicker>
                              <Input type="text" placeholder="Invoice Date" />
                            </DateRangePicker>
                          </Col>
                          <Col lg={2} className="mb-1">
                            <DateRangePicker>
                              <Input type="text" placeholder="Due Date" />
                            </DateRangePicker>
                          </Col>
                          <Col lg={2} className="mb-1">
                            <Select
                              className=""
                              options={this.state.stateOptions}
                              value={this.state.status}
                              onChange={this.changeStatus}
                              placeholder="Status"
                            />
                          </Col>
                        </Row>
                      </div>
                      <div>
                        <BootstrapTable
                          selectRow={ this.selectRowProp }
                          search={false}
                          options={ this.options }
                          data={customer_invoice_list}
                          version="4"
                          hover
                          pagination
                          totalSize={customer_invoice_list ? customer_invoice_list.length : 0}
                          className="customer-invoice-table"
                        >
                          <TableHeaderColumn
                            width="130"
                            dataFormat={this.renderInvoiceStatus}
                          >
                            Status
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            isKey
                            dataField="transactionCategoryCode"
                            dataSort
                          >
                            Customer Name
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="transactionCategoryName"
                            dataFormat={this.renderInvoiceNumber}
                            dataSort
                          >
                            Invoice Number
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="transactionCategoryDescription"
                            dataSort
                          >
                            Invoice Date
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="parentTransactionCategory"
                            dataSort
                          >
                            Due Date
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="transactionType"
                            dataSort
                          >
                            Invoice Amount
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="transactionType"
                            dataSort
                          >
                            VAT Amount
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerInvoice)
