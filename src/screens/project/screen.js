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

import { Loader } from 'components'

import 'react-toastify/dist/ReactToastify.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import * as ProjectActions from './actions'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
    project_list: state.project.project_list
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    ProjectActions: bindActionCreators(ProjectActions, dispatch)
  })
}

class Project extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }

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
    this.props.ProjectActions.getProjectList().then(res => {
      if (res.status === 200) {
        this.setState({ loading: false })
      }
    })
  }

  goToDetail (row) {
    this.props.history.push({
      pathname: '/admin/master/project/detail',
      search: `?id=${row.id}`
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
    const { project_list } = this.props
    const containerStyle = {
      zIndex: 1999
    }

    return (
      <div className="product-screen">
        <div className="animated fadeIn">
          <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
          <Card>
            <CardHeader>
              <Row>
                <Col lg={12}>
                  <div className="h4 mb-0 d-flex align-items-center">
                    <i className="nav-icon fas fa-project-diagram" />
                    <span className="ml-2">Projects</span>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
            {
              loading ?
                <Loader></Loader>: 
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
                            onClick={() => this.props.history.push(`/admin/master/project/create`)}
                          >
                            <i className="fas fa-plus mr-1" />
                            New Project
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
                            <Input type="text" placeholder="Project Name" />
                          </Col>
                          <Col lg={2} className="mb-1">
                            <Input type="text" placeholder="Expense Budget" />
                          </Col>
                          <Col lg={2} className="mb-1">
                            <Input type="text" placeholder="Revenue Budget" />
                          </Col>
                          <Col lg={2} className="mb-1">
                            <Input type="text" placeholder="VAT Number" />
                          </Col>
                          <Col lg={2} className="mb-1">
                            <Input type="text" placeholder="Currency Code" />
                          </Col>
                        </Row>
                      </div>
                      <div>
                        <BootstrapTable
                          selectRow={ this.selectRowProp }
                          search={false}
                          options={ this.options }
                          data={project_list}
                          version="4"
                          hover
                          pagination
                          totalSize={project_list ? project_list.length : 0}
                          className="product-table"
                          trClassName="cursor-pointer"
                        >
                          <TableHeaderColumn
                            isKey
                            dataField="transactionCategoryName"
                            dataSort
                          >
                            Project Name
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="transactionCategoryCode"
                            dataSort
                          >
                            Expense Budget
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="parentTransactionCategory"
                            dataSort
                          >
                            Revenue Budget
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="transactionCategoryCode"
                            dataSort
                          >
                            VAT Number
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="transactionCategoryCode"
                            dataSort
                          >
                            Currency Code
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="transactionCategoryCode"
                            dataSort
                          >
                            Contact Name
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

export default connect(mapStateToProps, mapDispatchToProps)(Project)
