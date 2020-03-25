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
  Tooltip,
  Input
} from 'reactstrap'
import Select from 'react-select'
import { Loader, ImageUpload, DataSlider } from 'components'
import { BootstrapTable, TableHeaderColumn, SearchField } from 'react-bootstrap-table'
import { TwoFactorModal } from './sections'
import { tableOptions } from 'constants/tableoptions'

import * as ProductActions from './actions'

import './style.scss'

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

class BillingPage extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      openModal: false
    }
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

  openTwoFactorModal() {
    this.setState({openModal: true})
  }

  closeTwoFactorModal() {
    this.setState({openModal: false})
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

  render() {
    const { loading, openModal } = this.state
    const { product_list } = this.props

    return (
      <div className="create-pages-screen">
        <div className="animated fadeIn">
          <TwoFactorModal openModal={openModal} closeModal={this.closeTwoFactorModal.bind(this)}/>
          <Card>
            <CardBody className="p-4 mb-5">
              {
                loading ?
                  <Row>
                    <Col lg={12}>
                      <Loader />
                    </Col>
                  </Row>
                : 
                  <Row className="mt-4 mb-4">
                    <Col lg={12}>
                      <FormGroup className="mb-5">
                        <Label className="title">Subscription</Label>
                      </FormGroup>
                    </Col>
                    <Col lg={12}>
                      <Row className="flex align-items-center">
                        <Col lg={8}>
                          <label>No subscription is currently active.</label>
                        </Col>
                        <Col lg={4} className="text-right"><Button color="primary">Save Settings</Button></Col>
                      </Row>
                    </Col>
                  </Row>
              }
            </CardBody>
          </Card>
          <Row>
            <Col lg={6}>
              <Card>
                <CardBody className="p-4 mb-5">
                  {
                    loading ?
                      <Row>
                        <Col lg={12}>
                          <Loader />
                        </Col>
                      </Row>
                    : 
                      <Row className="mt-4 mb-4">
                        <Col lg={12}>
                          <FormGroup className="mb-5">
                            <Label className="title">Billing Details</Label>
                          </FormGroup>
                        </Col>
                        <Col lg={12}>
                          <Row className="flex-wrap justify-content-between pl-3 pr-3 align-items-center">
                            <label>A billing address has not been set.</label>
                            <Button color="default">Edit</Button>
                          </Row>
                        </Col>
                      </Row>
                  }
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardBody className="p-4 mb-5">
                  {
                    loading ?
                      <Row>
                        <Col lg={12}>
                          <Loader />
                        </Col>
                      </Row>
                    : 
                      <Row className="mt-4 mb-4">
                        <Col lg={12}>
                          <FormGroup className="mb-5">
                            <Label className="title">Payment Method</Label>
                          </FormGroup>
                        </Col>
                        <Col lg={12}>
                          <Row flex jusity-content-between>
                            <Col lg={8}>
                              <label>Payment Method</label>
                            </Col>
                            
                          </Row>
                        </Col>
                      </Row>
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Card>
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
                        <Label>Billing History</Label>
                      </FormGroup>
                    </Col>
                    <Col lg={12}>
                      <div>
                        <BootstrapTable
                          options={ tableOptions() }
                          data={product_list}
                          version="4"
                          
                          totalSize={product_list ? product_list.length : 0}
                          className="product-table"
                          trClassName="cursor-pointer"
                        >
                          <TableHeaderColumn
                            isKey
                            dataField="mail"
                            dataSort
                          >
                            ID
                          </TableHeaderColumn>
                          
                          <TableHeaderColumn
                            dataField="value"
                            dataSort
                          >
                            Price
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="status"
                            dataFormat={this.renderOrderStatus}
                            dataSort
                            width='20%'
                          >
                            
                            Status
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="datetime"
                          >
                            Paid at
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

export default connect(mapStateToProps, mapDispatchToProps)(BillingPage)
