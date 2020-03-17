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

class OrderDetail extends React.Component {
  
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

    this.setState({ loading: false })
  }


  render() {
    const { loading, openModal } = this.state
    const { product_list } = this.props

    return (
      <div className="order-detail-screen">
        <div className="animated fadeIn">
          <Card>
            <CardBody className="p-4">
              {
                loading ?
                  <Row>
                    <Col lg={12}>
                      <Loader />
                    </Col>
                  </Row>
                : 
                  <Row className="mt-3">
                    <Col lg={12}>
                      <FormGroup className="mb-4">
                        <Label className="title">View Order</Label>
                      </FormGroup>
                    </Col>
                    <Col lg={12}>
                      <Row className="flex">
                        <Col lg={12} className="mb-5">
                          <div className="d-flex align-items-center">
                            <i className="fas fa-user avatar mr-3"/>
                            <div>
                              <p className="email text-primary mb-1 d-flex align-items-center">olivia.messla@hotmail.de 
                                <span className="risk-level ml-2">Completed</span>
                              </p>
                              <p className="mb-0">365efcd4-e9a8-4025-b696-f8a3ed1795c4</p>
                            </div>
                          </div>
                        </Col>
                        <Col lg={6}>
                          <div className="d-flex">
                            <p className="title">Product</p>
                            <p><a href="#">Selly Pay API</a></p>
                          </div>
                          <div className="d-flex">
                            <p className="title">Value</p>
                            <p>$3.00 USD</p>
                          </div>
                          <div className="d-flex">
                            <p className="title">Created At</p>
                            <p>21 Jan 7:06:18 pm</p>
                          </div>
                          <div className="d-flex">
                            <p className="title">Quantity</p>
                            <p>1</p>
                          </div>
                          <div className="d-flex">
                            <p className="title">Coupon</p>
                            <p>No Coupon</p>
                          </div>
                          <div className="d-flex">
                            <p className="title">Risk Level</p>
                            <p className="risk-level">15%</p>
                          </div>
                          
                        </Col>
                        <Col lg={6}>
                          <div className="d-flex">
                            <p className="title">Gateway</p>
                            <p>PayPal</p>
                          </div>
                          <div className="d-flex">
                            <p className="title">Payment Details</p>
                            <p>BTC</p>
                          </div>
                          <div className="d-flex">
                            <p className="title">Fee</p>
                            <p>$0.00 USD</p>
                          </div>
                          <div className="d-flex">
                              <p className="title">IP Address</p>
                              <p>138.197.31.58 <span className="proxy-label">VPN/Proxy</span></p>
                            </div>
                            <div className="d-flex">
                              <p className="title">Device</p>
                              <p>Chrome, Windows, Desktop</p>
                            </div>
                            <div className="d-flex">
                              <p className="title">Country</p>
                              <p><i className="flag-icon flag-icon-be mr-2"/> Clifton, New Jersey, United States</p>
                            </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
              }
            </CardBody>
          </Card>
         
          <Row>
            <Col lg={6}>
              <Card>
                <CardBody className="">
                  {
                    loading ?
                      <Row>
                        <Col lg={12}>
                          <Loader />
                        </Col>
                      </Row>
                    :
                    <Row className="mt-3">
                      <Col lg={12}>
                        <FormGroup className="mb-4">
                          <Label className="title">Delivered Goods</Label>
                        </FormGroup>
                      </Col>
                      <Col lg={12}>
                        <Row flex jusity-content-between>
                          <Col lg={8}>
                            <label>No product has been delivered</label>
                          </Col>
                          
                        </Row>
                      </Col>
                    </Row>
                  }
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardBody className="">
                  {
                    loading ?
                      <Row>
                        <Col lg={12}>
                          <Loader />
                        </Col>
                      </Row>
                    :
                    <Row className="mt-3">
                      <Col lg={12}>
                        <FormGroup className="mb-4">
                          <Label className="title">Delivered Webhooks</Label>
                        </FormGroup>
                      </Col>
                      <Col lg={12}>
                        <Row flex jusity-content-between>
                          <Col lg={8}>
                            <label>No webhooks sent for this order</label>
                          </Col>
                          
                        </Row>
                      </Col>
                    </Row>
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <Card>
                <CardBody className="">
                  {
                    loading ?
                      <Row>
                        <Col lg={12}>
                          <Loader />
                        </Col>
                      </Row>
                    :
                    <Row className="mt-3">
                      <Col lg={12}>
                        <FormGroup className="mb-4">
                          <Label className="title">Provided Custom Fields</Label>
                        </FormGroup>
                      </Col>
                      <Col lg={12}>
                      <BootstrapTable
                          options={ tableOptions() }
                          data={product_list}
                          version="4"
                          hover
                          pagination
                          totalSize={product_list ? product_list.length : 0}
                          className="product-table"
                          trClassName="cursor-pointer"
                        >
                          <TableHeaderColumn
                            isKey
                            dataField="mail"
                            dataSort
                            width='50%'
                          >
                            Field
                          </TableHeaderColumn>
                          <TableHeaderColumn
                            dataField="id"
                            dataSort
                          >
                            Value
                          </TableHeaderColumn>
                        </BootstrapTable>
                      </Col>
                    </Row>
                  }
                </CardBody>
              </Card>
            </Col>
          </Row>
          
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
