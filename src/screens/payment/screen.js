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
} from 'reactstrap'
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'
import DateRangePicker from 'react-bootstrap-daterangepicker'

import { Loader } from 'components'

import 'react-toastify/dist/ReactToastify.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import 'bootstrap-daterangepicker/daterangepicker.css'

import * as PaymentActions from './actions'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
    payment_list: state.payment.payment_list
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    paymentActions: bindActionCreators(PaymentActions, dispatch)
  })
}

class Payment extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      stateOptions: [
        { value: 'Paid', label: 'Paid' },
        { value: 'Unpaid', label: 'Unpaid' },
        { value: 'Partially Paid', label: 'Partially Paid' },
      ],
    }

    this.initializeData = this.initializeData.bind(this)
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
    this.props.paymentActions.getPaymentList()
  }

  goToDetail (row) {
    this.props.history.push('/admin/expense/payment/detail')
  }

  onRowSelect (row, isSelected, e) {
    console.log('one row checked ++++++++', row)
  }
  onSelectAll (isSelected, rows) {
    console.log('current page all row checked ++++++++', rows)
  }

  render() {

    const { loading } = this.state
    const { payment_list } = this.props
    const containerStyle = {
      zIndex: 1999
    }

    return (
      <div className="payment-screen">
        <div className="animated fadeIn">
          <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
          <Card>
            <CardHeader>
              <Row>
                <Col lg={12}>
                  <div className="h4 mb-0 d-flex align-items-center">
                    <i className="fas fa-money-check" />
                    <span className="ml-2">Payments</span>
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
                            onClick={() => this.props.history.push(`/admin/expense/payment/create`)}
                          >
                            <i className="fas fa-plus mr-1" />
                            New Payment
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
                            <Input type="text" placeholder="Payment Number" />
                          </Col>
                          <Col lg={2} className="mb-1">
                            <Input type="text" placeholder="Reference Number" />
                          </Col>
                          <Col lg={2} className="mb-1">
                            <Input type="text" placeholder="Supplier Name" />
                          </Col>
                          <Col lg={2} className="mb-1">
                            <Input type="text" placeholder="Invoice" />
                          </Col>
                          <Col lg={2} className="mb-1">
                            <DateRangePicker>
                              <Input type="text" placeholder="Payment Date" />
                            </DateRangePicker>
                          </Col>
                        </Row>
                      </div>
                      <div>
                        <BootstrapTable
                          selectRow={ this.selectRowProp }
                          search={false}
                          options={ this.options }
                          data={payment_list}
                          version="4"
                          hover
                          pagination
                          totalSize={payment_list ? payment_list.length : 0}
                          className="payment-table"
                          trClassName="cursor-pointer"
                        >
                          <TableHeaderColumn
                            isKey
                            dataField="transactionCategoryName"
                            dataSort
                          >
                            Payment Number
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="transactionCategoryCode"
                            dataSort
                          >
                            Reference #
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="parentTransactionCategory"
                            dataSort
                          >
                            Invoice
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="transactionType"
                            dataSort
                          >
                            Bank Name
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
                            Date
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

export default connect(mapStateToProps, mapDispatchToProps)(Payment)
