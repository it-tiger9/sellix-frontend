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
  FormGroup,
  Label,
  Form,
  Table,
  ButtonGroup,
  Input
} from "reactstrap"
import DatePicker from 'react-datepicker'

import _ from "lodash"
import Select from 'react-select'
import { DateRangePicker2 } from 'components'
import moment from 'moment'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'

import "react-bootstrap-table/dist/react-bootstrap-table-all.min.css"
import "react-toastify/dist/ReactToastify.css"
import 'react-select/dist/react-select.css'
import './style.scss'

const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
  })
}

const vatOptions = [
  { value: 'input', label: 'Input'},
  { value: 'output', label: 'Output'},
  { value: 'all', label: 'All'},
]

const statusOptions = [
  { value: 'paid', label: 'Paid'},
  { value: 'generated', label: 'Generated'},
  { value: 'cancalled', label: 'Cancelled'},
]

const tempdata = [{
  transactionDate: '10/15/2019',
  transactionCategoryId: 2,
  transactionCategoryCode: 2,
  transactionCategoryName: 'temp',
  transactionCategoryDescription: 'temp',
  parentTransactionCategory: 'Loream Ipsume',
  transactionType: 'TEMP'
}, {
  transactionDate: '10/15/2019',
  transactionCategoryId: 1,
  transactionCategoryCode: 4,
  transactionCategoryName: 'temp',
  transactionCategoryDescription: 'temp',
  parentTransactionCategory: 'Loream Ipsume',
  transactionType: 'TEMP'
}, {
  transactionDate: '10/15/2019',
  transactionCategoryId: 1,
  transactionCategoryCode: 4,
  transactionCategoryName: 'temp',
  transactionCategoryDescription: 'temp',
  parentTransactionCategory: 'Loream Ipsume',
  transactionType: 'TEMP'
}, {
  transactionDate: '10/15/2019',
  transactionCategoryId: 1,
  transactionCategoryCode: 4,
  transactionCategoryName: 'temp',
  transactionCategoryDescription: 'temp',
  parentTransactionCategory: 'Loream Ipsume',
  transactionType: 'TEMP'
}, {
  transactionDate: '10/15/2019',
  transactionCategoryId: 1,
  transactionCategoryCode: 4,
  transactionCategoryName: 'temp',
  transactionCategoryDescription: 'temp',
  parentTransactionCategory: 'Loream Ipsume',
  transactionType: 'TEMP'
},{
  transactionDate: '10/15/2019',
  transactionCategoryId: 1,
  transactionCategoryCode: 4,
  transactionCategoryName: 'temp',
  transactionCategoryDescription: 'temp',
  parentTransactionCategory: 'Loream Ipsume',
  transactionType: 'TEMP'
},{
  transactionDate: '10/15/2019',
  transactionCategoryId: 1,
  transactionCategoryCode: 4,
  transactionCategoryName: 'temp',
  transactionCategoryDescription: 'temp',
  parentTransactionCategory: 'Loream Ipsume',
  transactionType: 'TEMP'
}]

const ranges =  {
  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
  'This Week': [moment().startOf('week'), moment().endOf('week')],
  'This Month': [moment().startOf('month'), moment().endOf('month')],
  'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
}

class ReportsFiling extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedVat: '',
      selectedStatus: ''
    }

    this.changeVat = this.changeVat.bind(this)
    this.changeStatus = this.changeStatus.bind(this)
  }


  changeVat(selectedVat) {
    this.setState({ selectedVat })
  }

  changeStatus(selectedStatus) {
    this.setState({ selectedStatus })
  }

  getAction(cell, row) {
    return(<a href="#">Detail</a>)
  }

  render() {
    return (
      <div className="report-filing-screen ">
        <div className="animated fadeIn">
          <Card>
          <CardHeader>
              <Row>
                <Col lg={12}>
                  <div className="h4 mb-0 d-flex align-items-center">
                    <i className="icon-briefcase" />
                    <span className="ml-2">VAT Report</span>
                  </div>
                </Col>
              </Row>  
            </CardHeader>
            <CardBody>
              <Form onSubmit={this.handleSubmit} name="simpleForm">
                  <div className="flex-wrap d-flex justify-content-end">
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
              <div className="py-3">
                <h5>Filter : </h5>
                <Row>
                  <Col lg={2} className="mb-1">
                    <Select
                      className=""
                      options={vatOptions}
                      value={this.state.selectedType}
                      placeholder="Status"
                      onChange={this.changeType}
                    />
                  </Col>
                  <Col lg={2} className="mb-1">
                    <DatePicker
                      className="form-control"
                      id="date"
                      name="date"
                      selected={this.state.birthday}
                      onChange={this.changeBirthday}
                      placeholderText="Date"
                    />
                  </Col>
                </Row>
              </div>
              <div className="table-wrapper">
                <BootstrapTable 
                  data={tempdata} 
                  hover
                  pagination>
                  <TableHeaderColumn isKey dataField="transactionDate">
                    Report No.
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="transactionCategoryDescription">
                    Status
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="transactionType">
                    Status Date
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="parentTransactionCategory">
                    TRN
                  </TableHeaderColumn>
                  <TableHeaderColumn dataFormat={this.getAction} >
                    Action
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
              
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportsFiling)
