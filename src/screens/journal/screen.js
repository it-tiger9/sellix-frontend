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

import * as JournalActions from './actions'


import './style.scss'

const mapStateToProps = (state) => {
  return ({
    journal_list: state.journal.journal_list
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    journalActions: bindActionCreators(JournalActions, dispatch)
  })
}

class Journal extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      actionButtons: {}
    }

    this.initializeData = this.initializeData.bind(this)
    this.renderJournalNumber = this.renderJournalNumber.bind(this)
    this.renderStatus = this.renderStatus.bind(this)
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
    this.props.journalActions.getJournalList()
  }

  renderStatus (cell, row) {
    let label = ''
    let class_name = ''
    if (row.transactionCategoryCode == 4) {
      label = 'New'
      class_name = 'badge-danger'
    } else {
      label = 'Posted'
      class_name = 'badge-success'
    }
    return (
      <span className={`badge ${class_name} mb-0`}>{ label }</span>
    )
  }

  renderJournalNumber (cell, row) {
    return (
      <label
        className="mb-0 my-link"
        onClick={() => this.props.history.push('/admin/accountant/journal/detail')}
      >
        { row.transactionCategoryCode }3443543
      </label>
    )
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
            <DropdownItem onClick={() => this.props.history.push('/admin/accountant/journal/detail')}>
              <i className="fas fa-edit" /> Edit
            </DropdownItem>
            <DropdownItem>
              <i className="fas fa-file" /> Post
            </DropdownItem>
            <DropdownItem>
              <i className="fa fa-trash" /> Cancel
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
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

  onRowSelect (row, isSelected, e) {
    console.log('one row checked ++++++++', row)
  }
  onSelectAll (isSelected, rows) {
    console.log('current page all row checked ++++++++', rows)
  }

  render() {

    const { loading } = this.state
    const { journal_list } = this.props
    const containerStyle = {
      zIndex: 1999
    }

    return (
      <div className="journal-screen">
        <div className="animated fadeIn">
          <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
          <Card>
            <CardHeader>
              <Row>
                <Col lg={12}>
                  <div className="h4 mb-0 d-flex align-items-center">
                    <i className="fa fa-diamond" />
                    <span className="ml-2">Journals</span>
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
                            onClick={() => this.props.history.push(`/admin/accountant/journal/create`)}
                          >
                            <i className="fas fa-plus mr-1" />
                            New Journal
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
                            <Select
                              className=""
                              options={[]}
                              placeholder="Status"
                            />
                          </Col>
                          <Col lg={2} className="mb-1">
                            <DateRangePicker>
                              <Input type="text" placeholder="Period" />
                            </DateRangePicker>
                          </Col>
                        </Row>
                      </div>
                      <div>
                        <BootstrapTable
                          selectRow={ this.selectRowProp }
                          search={false}
                          options={ this.options }
                          data={ journal_list }
                          version="4"
                          hover
                          pagination
                          totalSize={journal_list ? journal_list.length : 0}
                          className="journal-table"
                        >
                          <TableHeaderColumn
                            isKey
                            dataField="transactionCategoryName"
                            dataSort
                          >
                            Post Date
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="transactionCategoryCode"
                            dataFormat={this.renderJournalNumber}
                            dataSort
                          >
                            Journal No.
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="transactionType"
                            dataFormat={this.renderStatus}
                            dataSort
                          >
                            Status
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
                            Created By
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

export default connect(mapStateToProps, mapDispatchToProps)(Journal)
