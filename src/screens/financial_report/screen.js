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
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

import _ from "lodash"
import Select from 'react-select'
import { DateRangePicker2 } from 'components'
import moment from 'moment'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'

import {
  ProfitAndLoss,
  BalanceSheet,
  CashFlowStatement
} from './sections'

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


class FinancialReport extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: new Array(3).fill('1')
    }

    this.toggle = this.toggle.bind(this)
  }


  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray
    })
  }

  render() {
    return (
      <div className="financial-report-screen">
        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              <Row>
                <Col lg={12}>
                  <div className="h4 mb-0 d-flex align-items-center">
                    <i className="nav-icon fas fa-usd" />
                    <span className="ml-2">Financial Report</span>
                  </div>
                </Col>
              </Row>  
            </CardHeader>
            <CardBody>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[0] === '1'}
                    onClick={() => { this.toggle(0, '1') }}
                  >
                    Profit and Loss
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[0] === '2'}
                    onClick={() => { this.toggle(0, '2') }}
                  >
                    Balance Sheet
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[0] === '3'}
                    onClick={() => { this.toggle(0, '3') }}
                  >
                    Cash Flow Statement
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab[0]}>
                <TabPane tabId="1"> 
                  <div className="table-wrapper">
                    <ProfitAndLoss/>
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <div className="table-wrapper">
                    <BalanceSheet/>
                  </div>
                </TabPane>
                <TabPane tabId="3">
                  <div className="table-wrapper">
                    <CashFlowStatement/>
                  </div>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FinancialReport)

