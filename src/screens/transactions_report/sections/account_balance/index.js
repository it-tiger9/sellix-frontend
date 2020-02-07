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
  Input,
  ButtonGroup
} from 'reactstrap'

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

import * as actions from '../../actions'

const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    reportActions: bindActionCreators(actions, dispatch)
  })
}

const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forestasd fsad fas fsad fsad fsa', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
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

class AccountBalances extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTransactionType: '',
      selectedTransactionCategory: '',
      startDate: '',
      endDate: '',

      transactionType: [],
      transactionCategory: []
    }

    this.changeType = this.changeType.bind(this)
    this.changeCategory = this.changeCategory.bind(this)
  }


  changeType(selectedTransactionType) {
    this.setState({ 
      selectedTransactionType: selectedTransactionType,
      selectedTransactionCategory: ''
    })

    this.props.reportActions.getTransactionCategory(selectedTransactionType.value).then(res => {
      const options = res.data.map(type => {
        return {label: type.transactionCategoryName, value: type.transactionCategoryId}
      })

      this.setState({
        transactionCategory: options
      })
    })
  }

  async changeCategory(selectedTransactionCategory) {
    await this.setState({ selectedTransactionCategory })
    this.getReport()
  }


  getReport() {
    const data = {
      transactionTypeCode: this.state.selectedTransactionType.value,
      transactionCategoryId: this.state.selectedTransactionCategory.value,
      startDate: this.state.startDate,
      endDate: this.state.endDate
    }
    this.props.reportActions.getTransactionReport(data).then(res => {
      alert()
      console.log(res)
    })
  }

  componentDidMount(){
    this.props.reportActions.getTransactionType().then(res => {
      const options = res.data.map(type => {
        return {label: type.transactionTypeName, value: type.transactionTypeCode}
      })

      this.setState({
        transactionType: options
      })
    })
  }

  render() {
    const { transactionType, transactionCategory} = this.state

    return (
      <div className="transaction-report-section">
        <div className="animated fadeIn">
          <Row>
            <Col lg={12}>
              <div className="flex-wrap d-flex align-items-start justify-content-between">
                <div className="info-block">
                  <h4>Company Name - <small><i>Transactions</i></small></h4>
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
                          getDate={(picker) => {
                            this.setState({
                              startDate: picker.startDate.format('MM/DD/YYYY'),
                              endDate: picker.endDate.format('MM/DD/YYYY')
                            })
                          }}
                        />
                      </div>
                    </FormGroup>  
                  </div>
                </Form>
              </div>
              <div className="py-3">
                <h5>Filter : </h5>
                <Row>
                  <Col lg={4} className="mb-1">
                    <Select
                      className=""
                      options={transactionType}
                      value={this.state.selectedTransactionType}
                      placeholder="Transaction Type"
                      onChange={this.changeType}
                    />
                  </Col>
                  <Col lg={4} className="mb-1">
                    <Select
                      className=""
                      options={transactionCategory}
                      value={this.state.selectedTransactionCategory}
                      placeholder="Transaction Category"
                      onChange={this.changeCategory}
                    />
                  </Col>
                </Row>
              </div>
              <div className="table-wrapper">
                <BootstrapTable 
                  data={tempdata} 
                  hover
                  pagination
                  version="4"
                >
                  <TableHeaderColumn
                    isKey
                    dataField="transactionDate"
                    dataSort
                  >
                    Transaction Date
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="transactionDate"
                    dataSort
                  >
                    Account
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="transactionType"
                    dataSort
                  >
                    Transaction Type
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="parentTransactionCategory"
                    dataSort
                  >
                    Transaction Category
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="transactionCategoryDescription"
                    dataSort
                  >
                    Transaction Description
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="transactionType"
                    dataSort
                  >
                    Transaction Amount
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountBalances)
