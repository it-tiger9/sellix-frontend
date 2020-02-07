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
  ButtonGroup
} from "reactstrap"

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


const tempdata1 = [{
  field: 'Sales',
  type: 'type',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
}, {
  field: 'Sales Hotel',
  type: 'item',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
}, {
  field: 'Sales Restaurant',
  type: 'item',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
}, {
  field: 'Sales Conference Hall',
  type: 'item',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
},
{
  field: 'Cost of Sales',
  type: 'type',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
}, {
  field: 'Hotel Costs',
  type: 'item',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
}, {
  field: 'Purchased Goods',
  type: 'item',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
},
{
  field: 'Conference Costs',
  type: 'item',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
},
{
  field: 'Gross Profit',
  type: 'total',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
},
{
  field: 'Operating Expenses',
  type: 'type',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
},
{
  field: 'Staff salaries',
  type: 'item',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
},{
  field: 'Staff salaries',
  type: 'item',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
},
{
  field: 'Administration salaries',
  type: 'item',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
},
{
  field: 'Other Revenues & Expenses',
  type: 'type',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
},
{
  field: 'Rent and utilities',
  type: 'item',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
},
{
  field: '*EBITDA',
  type: 'total',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
},
{
  field: 'Amortization & Depreciation',
  type: 'type',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
},
{
  field: 'Rent and utilities',
  type: 'item',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
},{
  field: 'Interest Income & Expense',
  type: 'type',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
},
{
  field: 'Rent and utilities',
  type: 'item',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
},{
  field: '*EBIT',
  type: 'total',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
},
{
  field: 'Corporate Income Tax',
  type: 'item',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
},{
  field: 'Net income',
  type: 'total',
  data: {
    'JAN': Math.random()*2000,
    'FEB': Math.random()*2000,
    'MAR': Math.random()*2000,
    'APR': Math.random()*2000,
    'MAY': Math.random()*2000,
    'JUN': Math.random()*2000,
    'JUL': Math.random()*2000,
    'AUG': Math.random()*2000,
    'SEP': Math.random()*2000,
    'OCT': Math.random()*2000,
    'NOV': Math.random()*2000,
    'DEC': Math.random()*2000,
    'Total': Math.random()*2000,
  }
},]

const ranges =  {
  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
  'This Week': [moment().startOf('week'), moment().endOf('week')],
  'This Month': [moment().startOf('month'), moment().endOf('month')],
  'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
}

const dateRanges = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']


class ProfitAndLoss extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedType: '',
      selectedCategory: ''
    }

    this.changeType = this.changeType.bind(this)
    this.changeCategory = this.changeCategory.bind(this)
  }


  changeType(selectedType) {
    this.setState({ selectedType })
  }

  changeCategory(selectedCategory) {
    this.setState({ selectedCategory })
  }

  render() {
    return (
      <div className="profitAndLoss-report-section">
        <div className="animated fadeIn">
          <div className="flex-wrap d-flex mb-3 align-items-start justify-content-between">
            <div className="info-block">
              <h4>Company Name - <small><i>Profit & Loss</i></small></h4>
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
          <div className="table-wrapper">
            <Table responsive>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Jan</th>
                  <th>Feb</th>
                  <th>Mar</th>
                  <th>Apr</th>
                  <th>May</th>
                  <th>Jun</th>
                  <th>Jul</th>
                  <th>Aug</th>
                  <th>Sep</th>
                  <th>Oct</th>
                  <th>Nov</th>
                  <th>Dec</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {
                  tempdata1.map((item) => <tr className={item.type}>
                    <td>{item.field}</td>
                    {
                      Object.keys(item.data).map((key, i) => 
                              <td className={key==='Total'?'bold':''} key={i}>{item.data[key].toFixed(2)}</td>)
                    }
                  </tr>)
                }
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfitAndLoss)
