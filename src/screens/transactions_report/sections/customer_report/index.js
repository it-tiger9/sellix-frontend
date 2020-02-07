import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Form,
  Badge,
  Row,
  Col,
  Input,
  Button,
  ButtonGroup
} from "reactstrap"

import _ from "lodash"
import Select from 'react-select'
import { DateRangePicker2 } from 'components'
import moment from 'moment'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'
import DateRangePicker from 'react-bootstrap-daterangepicker'

import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import "react-toastify/dist/ReactToastify.css"
import 'react-select/dist/react-select.css'
import 'bootstrap-daterangepicker/daterangepicker.css'
import './style.scss'

const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
  })
}

const tempdata = [{
  status: 'paid',
  transactionCategoryId: 2,
  transactionCategoryCode: 2,
  transactionCategoryName: 'temp',
  transactionCategoryDescription: 'temp',
  parentTransactionCategory: 'Loream Ipsume',
  transactionType: 'TEMP'
}, {
  status: 'paid',
  transactionCategoryId: 1,
  transactionCategoryCode: 4,
  transactionCategoryName: 'temp',
  transactionCategoryDescription: 'temp',
  parentTransactionCategory: 'Loream Ipsume',
  transactionType: 'TEMP'
}, {
  status: 'paid',
  transactionCategoryId: 1,
  transactionCategoryCode: 4,
  transactionCategoryName: 'temp',
  transactionCategoryDescription: 'temp',
  parentTransactionCategory: 'Loream Ipsume',
  transactionType: 'TEMP'
}, {
  status: 'unpaid',
  transactionCategoryId: 1,
  transactionCategoryCode: 4,
  transactionCategoryName: 'temp',
  transactionCategoryDescription: 'temp',
  parentTransactionCategory: 'Loream Ipsume',
  transactionType: 'TEMP'
}, {
  status: 'unpaid',
  transactionCategoryId: 1,
  transactionCategoryCode: 4,
  transactionCategoryName: 'temp',
  transactionCategoryDescription: 'temp',
  parentTransactionCategory: 'Loream Ipsume',
  transactionType: 'TEMP'
},{
  status: 'paid',
  transactionCategoryId: 1,
  transactionCategoryCode: 4,
  transactionCategoryName: 'temp',
  transactionCategoryDescription: 'temp',
  parentTransactionCategory: 'Loream Ipsume',
  transactionType: 'TEMP'
},{
  status: 'unpaid',
  transactionCategoryId: 1,
  transactionCategoryCode: 4,
  transactionCategoryName: 'temp',
  transactionCategoryDescription: 'temp',
  parentTransactionCategory: 'Loream Ipsume',
  transactionType: 'TEMP'
}]


const ranges =  {
  'This Week': [moment().startOf('week'), moment().endOf('week')],
  'This Month': [moment().startOf('month'), moment().endOf('month')],
  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
  'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
}

class CustomerReport extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: '',
    }

    this.handleChange = this.handleChange.bind(this)
  }


  handleChange(selectedOption) {
    this.setState({ selectedOption })
  }

  getInvoiceStatus(cell, row) {
    return(<Badge color={cell === 'paid'?'success':'danger'}>{cell}</Badge>)
  }

  render() {
    return (
      <div className="invoice-report-section">
        <div className="animated fadeIn">
          <Row>
            <Col lg={12}>
              <div className="flex-wrap d-flex align-items-start justify-content-between">
                <div className="info-block">
                  <h4>Company Name - <small><i>Invoices</i></small></h4>
                </div>
                <Form onSubmit={this.handleSubmit} name="simpleForm">
                  <div className="flex-wrap d-flex align-items-center">
                    <FormGroup>
                      <ButtonGroup className="mr-3">
                        <Button
                          color="success"
                          className="btn-square"
                        >
                          <i className="fa glyphicon glyphicon-export fa-download mr-1" />
                          Export to CSV
                        </Button>
                      </ButtonGroup>
                    </FormGroup>
                    <FormGroup>
                      <div className="date-range">
                        <DateRangePicker2
                          ranges={ranges}
                          opens={'left'}
                        />
                      </div>
                    </FormGroup>  
                  </div>
                </Form>
              </div>
              <div className="py-3">
                <h5>Filter : </h5>
                <Row>
                  <Col lg={2} className="mb-1">
                    <Input type="text" placeholder="Ref. Number" />
                  </Col>
                  <Col lg={2} className="mb-1">
                    <DateRangePicker>
                      <Input type="text" placeholder="Date" />
                    </DateRangePicker>
                  </Col>
                  <Col lg={2} className="mb-1">
                    <DateRangePicker>
                      <Input type="text" placeholder="Due Date" />
                    </DateRangePicker>
                  </Col>
                  <Col lg={2} className="mb-1">
                    <Input type="text" placeholder="Contact Name" />
                  </Col>
                </Row>
              </div>
              <div className="table-wrapper">
                <BootstrapTable 
                  data={tempdata} 
                  hover
                  pagination
                  filter = {true}
                  responsive={true}
                  version="4"
                >
                  <TableHeaderColumn
                    width="130"
                    dataField="status" 
                    dataFormat={this.getInvoiceStatus}
                  >
                    Status
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    isKey
                    dataField="transactionCategoryCode"
                    dataSort
                  >
                    Ref. Number
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="transactionCategoryName"
                    dataSort
                  >
                    Date
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="transactionCategoryDescription"
                    dataSort
                  >
                    Due Date
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="parentTransactionCategory"
                    dataSort
                  >
                    Contact Name
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="transactionType"
                    dataSort
                  >
                    No. of Items
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="transactionType"
                    dataSort
                  >
                    Total Cost
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerReport)
