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
  Table ,
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
  field: 'Cash, beginning',
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
},{
  field: 'Cash provided by operations',
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
  field: 'Net income (loss)',
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
  field: 'Adjustments',
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
  field: 'Changes to current asset & current liabilities',
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
},  {
  field: 'Cash used for investment activities',
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
  field: 'Purchase of Noncurrent Assets',
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
  field: 'Cash provided by (used for) financing activities',
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
  field: 'Increase (decrease) Loans Payable',
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
  field: 'Increase (decrease) Mortgage Payable',
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
  field: 'Dividend Payment',
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
  field: "Increase (decrease) in owner's capital",
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
  field: 'Increase (decrease) in cash',
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
  field: 'Cash, ending',
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
  'Today': [moment(), moment()],
  'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
  'This Week': [moment().startOf('week'), moment().endOf('week')],
  'This Month': [moment().startOf('month'), moment().endOf('month')],
  'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
}

class CashFlowStatement extends React.Component {
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
      <div className="cashflow-report-section">
        <div className="animated fadeIn">
          <div className="flex-wrap d-flex mb-3 align-items-start justify-content-between">
            <div className="info-block">
              <h4>Company Name - <small><i>Cash Flow Statement</i></small></h4>
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
                      Object.keys(item.data).map((key, i) => <td className={key==='Total'?'bold':''} key={i}>{item.data[key].toFixed(2)}</td>)
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

export default connect(mapStateToProps, mapDispatchToProps)(CashFlowStatement)