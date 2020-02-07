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
  Input,
  ButtonGroup,
  Col,
  Form, 
  FormGroup,
  Label
} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'

import moment from 'moment'
import Select from 'react-select'

import { Loader } from 'components'

import 'react-toastify/dist/ReactToastify.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import './style.scss'

import * as TransactionActions from './actions'

const mapStateToProps = (state) => {
  return ({
    transaction_list: state.transaction.transaction_list
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    transactionActions: bindActionCreators(TransactionActions, dispatch)
  })
}

class UsersRoles extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      openInviteUserModal: false,
      loading: false,
      users: [
        {name: 'niklas', email: 'niklas@niklas.com', avatar: 'assets/images/avatars/6.jpg', role: 'Admin', status: 'active'},
        {name: 'admin', email: 'admin@admin.com', avatar: 'assets/images/avatars/6.jpg', role: 'Accountant', status: 'pending'},
        {name: 'user', email: 'user@user.com', avatar: 'assets/images/avatars/6.jpg', role: 'Employee', status: 'active'}
      ]
    }

    this.closeInviteUserModal = this.closeInviteUserModal.bind(this)
    this.showInviteUserModal = this.showInviteUserModal.bind(this)
    this.getUserName = this.getUserName.bind(this)
    this.goToDetail = this.goToDetail.bind(this)

    this.options = {
      onRowClick: this.goToDetail,
      paginationPosition: 'top'
    }

    this.selectRowProp = {
      mode: 'checkbox',
      bgColor: 'rgba(0,0,0, 0.05)',
      onSelect: this.onRowSelect,
      onSelectAll: this.onSelectAll
    }
  }

  componentDidMount() {
  }

  // Show Invite User Modal
  showInviteUserModal() {
    this.setState({ openInviteUserModal: true })
  }
  // Cloase Confirm Modal
  closeInviteUserModal() {
    this.setState({ openInviteUserModal: false })
  }

  goToDetail(row) {
    this.showInviteUserModal()
  }


  getUserName(cell, row) {
    const avatar = require('assets/images/avatars/6.jpg')

    return(<div className="d-flex">
      <img src={avatar} width="50" height="50" className="img-avatar"></img> 
      <div className="ml-2">
        <div>
          <label
            className="text-primary my-link mb-0"
          >
            {row.name}({row.status})
          </label>
        </div>
        <div>
          {row.email}
        </div>
      </div>
    </div>)
  }

  render() {
    const { loading, users, openInviteUserModal } = this.state;
    const containerStyle = {
      zIndex: 1999
    };

    return (
      <div className="transaction-category-screen">
        <div className="animated fadeIn">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            style={containerStyle}
          />

          <Card>
            <CardHeader>
              <div className="h4 mb-0 d-flex align-items-center">
                <i className="nav-icon fas fa-users" />
                <span className="ml-2">Users & Roles</span>
              </div>
            </CardHeader>
            <CardBody>
            {
              loading ?
                <Loader></Loader>: 
                <Row>
                  <Col lg='12'>
                    <div className="d-flex justify-content-end">
                        <ButtonGroup className="toolbar" size="sm">
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
                            onClick={this.showInviteUserModal}
                          >
                            <i className="fas fa-plus mr-1" />
                            Invite User
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
                              <Input type="text" placeholder="User Name" />
                            </Col>
                            <Col lg={2} className="mb-1">
                              <Select
                                className=""
                                options={[]}
                                placeholder="User Role"
                              />
                            </Col>
                          </Row>
                        </div>
                        <BootstrapTable 
                          data={users} 
                          hover
                          pagination
                          version="4"
                          search={false}
                          selectRow={ this.selectRowProp }
                          options={this.options}
                          trClassName="cursor-pointer"
                        >
                          <TableHeaderColumn
                            isKey
                            dataField="email"
                            dataFormat={this.getUserName}
                            dataSort
                          >
                            User Detail
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="role"
                            dataSort
                          >
                            Role
                          </TableHeaderColumn>
                        </BootstrapTable>
                  </Col>
                </Row>
            }
            </CardBody>
          </Card>

          <Modal isOpen={openInviteUserModal}
            className={"modal-success " + this.props.className}
          >
            <ModalHeader toggle={this.toggleDanger}>Invite User</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleSubmit} name="simpleForm">
                <FormGroup>
                  <Label htmlFor="categoryName">*Company Name</Label>
                  <Input
                    type="text"
                    id="categoryName"
                    name="categoryName"
                    placeholder="Enter User Name"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="categoryCode">*Email</Label>
                  <Input
                    type="text"
                    id="categoryCode"
                    name="categoryCode"
                    placeholder="Enter Email"
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="categoryCode">Position</Label>
                  <Select
                    className="select-min-width"
                    options={[]}
                    placeholder="Position"
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="success" className="btn-square" onClick={this.closeInviteUserModal}>Send</Button>&nbsp;
              <Button color="secondary" className="btn-square" onClick={this.closeInviteUserModal}>No</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersRoles)
