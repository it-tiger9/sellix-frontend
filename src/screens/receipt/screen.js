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
  Input
} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'
import DateRangePicker from 'react-bootstrap-daterangepicker'

import { Loader } from 'components'

import 'react-toastify/dist/ReactToastify.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import 'bootstrap-daterangepicker/daterangepicker.css'


import * as ReceiptActions from './actions'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
    receipt_list: state.receipt.receipt_list
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    receiptActions: bindActionCreators(ReceiptActions, dispatch)
  })
}

class Receipt extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }

    this.initializeData = this.initializeData.bind(this)
    this.renderMode = this.renderMode.bind(this)
    this.onRowSelect = this.onRowSelect.bind(this)
    this.onSelectAll = this.onSelectAll.bind(this)
    this.goToDetail = this.goToDetail.bind(this)

    this.options = {
      onRowClick: this.goToDetail,
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
    this.props.receiptActions.getReceiptList()
  }

  goToDetail (row) {
    this.props.history.push('/admin/revenue/receipt/detail')
  }

  renderMode (cell, row) {
    return (
      <span className="badge badge-success mb-0">Cash</span>
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
    const { receipt_list } = this.props
    const containerStyle = {
      zIndex: 1999
    }

    return (
      <div className="receipt-screen">
        <div className="animated fadeIn">
          <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
          <Card>
            <CardHeader>
              <Row>
                <Col lg={12}>
                  <div className="h4 mb-0 d-flex align-items-center">
                    <i className="nav-icon fa fa-file-o" />
                    <span className="ml-2">Receipts</span>
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
                            color="primary"
                            className="btn-square"
                            onClick={() => this.props.history.push(`/admin/revenue/receipt/create`)}
                          >
                            <i className="fas fa-plus mr-1" />
                            New Receipt
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
                            <DateRangePicker>
                              <Input type="text" placeholder="Payment Date" />
                            </DateRangePicker>
                          </Col>
                          <Col lg={2} className="mb-1">
                            <Input type="text" placeholder="Reference Number" />
                          </Col>
                          <Col lg={2} className="mb-1">
                            <Input type="text" placeholder="Invoice Number" />
                          </Col>
                          <Col lg={2} className="mb-1">
                            <Input type="text" placeholder="Customer Name" />
                          </Col>
                        </Row>
                      </div>
                      <div>
                        <BootstrapTable
                          selectRow={ this.selectRowProp }
                          search={false}
                          options={ this.options }
                          data={receipt_list}
                          version="4"
                          hover
                          pagination
                          totalSize={receipt_list ? receipt_list.length : 0}
                          className="receipt-table"
                          trClassName="cursor-pointer"
                        >
                          <TableHeaderColumn
                            dataField="transactionCategoryCode"
                            dataSort
                          >
                            Date
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="transactionCategoryCode"
                            dataSort
                          >
                            Reference Number
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="parentTransactionCategory"
                            dataSort
                          >
                            Customer Name
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            isKey
                            dataField="transactionType"
                            dataSort
                          >
                            Invoice #
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="transactionType"
                            dataFormat={this.renderMode}
                            dataSort
                          >
                            Mode
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="transactionType"
                            dataSort
                          >
                            Amount
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="transactionType"
                            dataSort
                          >
                            Unused Amount
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

export default connect(mapStateToProps, mapDispatchToProps)(Receipt)
