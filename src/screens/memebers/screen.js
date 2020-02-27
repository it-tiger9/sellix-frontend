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
  ButtonGroup,
  Input,
  Form,
  FormGroup,
  Label
} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'
import moment from 'moment'

import { Loader } from 'components'
import { tableOptions } from 'constants/tableoptions'

import 'react-toastify/dist/ReactToastify.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'

import * as ProductActions from './actions'
import './style.scss'

import avatar from 'assets/images/avatars/6.jpg'
import { NewMemberModal } from './sections'


const mapStateToProps = (state) => {
  return ({
    product_list: state.product.product_list
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    productActions: bindActionCreators(ProductActions, dispatch)
  })
}


class Members extends React.Component { 
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      openModal: false
    }

    this.initializeData = this.initializeData.bind(this)
  }

  componentDidMount () {
    this.initializeData()
  }

  initializeData () {
    // this.props.productActions.getProductList().then(res => {
    //   if (res.status === 200) {
    //     this.setState({ loading: false })
    //   }
    // })

    this.props.productActions.getProductList()
    this.setState({ loading: false })
  }

  renderOrderInfo (cell, row) {
    if (
      row.mail && row.id
    ) {
      return (
        <div className="d-flex align-items-center">
          <img src={avatar} className="img-circle" width="30" height="30"/>
          <div className="ml-3">
            <p>{`${row.unit}-${row.mail}`}</p>
            <p className="caption">{row.id}</p>
          </div>
          
        </div>
      )  
    } else {
      return (
        <p className="caption">No specified</p>
      )
    }
  }

  renderOrderStatus (cell, row) {
    if (
      row.status
    ) {
      return (
        <div className={`badge badge-${row.status.toLowerCase()}`}>
          {row.status}
        </div>
      )  
    } else {
      return (
        <p className="caption">No specified</p>
      )
    }
  }

  renderOrderValue(cell, row) {
    if (
      row.value
    ) {
      return (
        <div className="order">
          <p className="order-value">{row.value}</p>
          <p className="caption">{row.rate}</p>
        </div>
      )  
    } else {
      return (
        <p className="caption">No specified</p>
      )
    }
  }

  renderOrderTime(cell, row) {
    if (
      row.datetime
    ) {
      return (
        <div>
          <p>{new moment(row.datetime).format('ddd MM')}</p>
          <p>{new moment(row.datetime).format('HH:mm')}</p>
        </div>
      )  
    } else {
      return (
        <p className="caption">No specified</p>
      )
    }
  }

  renderOptions(cell, row) {
    return (
      <div className="d-flex actions">
        <a>
          <i className="fas fa-pen"/>
        </a>
        <a>
          <i className="fas fa-trash"/>
        </a>
      </div>
    )
  }

  openNewMemberModal() {
    this.setState({openModal: true})
  }

  closeNewMemberModal() {
    this.setState({openModal: false})
  }

  render() {
    const { loading, openModal } = this.state
    const { product_list } = this.props

    return (
      <div className="member-screen">
        <div className="animated fadeIn">
          <NewMemberModal openModal={openModal} closeModal={this.closeNewMemberModal.bind(this)}/>
          <Card className="bg-white">
            <CardBody className="p-0">
              {
                loading ?
                  <Row>
                    <Col lg={12}>
                      <Loader />
                    </Col>
                  </Row>
                :
                  <Row>
                    <Col lg={12} className="pt-5 pl-5">
                      <FormGroup className="mb-0">
                        <Label>Members</Label>
                      </FormGroup>
                    </Col>
                    <Col lg={12}>
                      <div>
                        <BootstrapTable
                          options={ tableOptions() }
                          data={product_list}
                          version="4"
                          hover
                          
                          totalSize={product_list ? product_list.length : 0}
                          className="product-table"
                          trClassName="cursor-pointer"
                        >
                          <TableHeaderColumn
                            isKey
                            dataField="email"
                            dataFormat={this.renderOrderInfo}
                            dataSort
                            width='50%'
                          >
                            User
                          </TableHeaderColumn>
                          
                          <TableHeaderColumn
                            dataField="value"
                            dataSort
                          >
                            Last Seen
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="status"
                            dataFormat={this.renderOrderStatus}
                            dataSort
                            width='20%'
                          >
                            
                            Two-factor
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="datetime"
                            dataAlign="right"
                            dataFormat={this.renderOptions}
                          >
                            Options
                          </TableHeaderColumn>
                        </BootstrapTable>

                        <Button color="primary" className="ml-4 mb-5" 
                          onClick={this.openNewMemberModal.bind(this)}>Invite Member</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Members)
