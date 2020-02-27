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
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap'
import Select from 'react-select'


import './style.scss'

const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
  })
}

class DetailProduct extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }

  }

  render() {

    return (
      <div className="detail-product-screen">
        <div className="animated fadeIn">
          <Row>
            <Col lg={12} className="mx-auto">
              <Card>
                <CardHeader>
                  <Row>
                    <Col lg={12}>
                      <div className="h4 mb-0 d-flex align-items-center">
                        <i className="fas fa-object-group" />
                        <span className="ml-2">Update Product</span>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={12}>
                      <Form>
                        <Row>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="name">Name</Label>
                              <Input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter Product Name"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="account_code">Account Code</Label>
                              <Input
                                type="text"
                                id="account_code"
                                name="account_code"
                                placeholder="Enter Account Code"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="product_code">Product Code</Label>
                              <Input
                                type="text"
                                id="product_code"
                                name="product_code"
                                placeholder="Enter Product Code"
                                required
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="parent_product">Parent Product</Label>
                              <Select
                                className="select-default-width"
                                options={[]}
                                id="parent_product"
                                name="parent_product"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="product_price">Product Price</Label>
                              <Input
                                type="text"
                                id="product_price"
                                name="product_price"
                                placeholder="Enter Product Price"
                                required
                              />
                            </FormGroup>
                          </Col>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="vat_percentage">Vat Percentage</Label>
                              <Select
                                className="select-default-width"
                                options={[]}
                                id="vat_percentage"
                                name="vat_percentage"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12}>
                            <FormGroup check inline>
                              <Input
                                className="form-check-input"
                                type="checkbox"
                                id="vat_include"
                                name="vat_include"
                              />
                              <Label className="form-check-label" check htmlFor="vat_include">Vat Include</Label>
                            </FormGroup>
                          </Col>
                        </Row>
                        <hr/>
                        <Row>
                          <Col lg={4}>
                            <FormGroup className="mb-3">
                              <Label htmlFor="warehourse">Warehourse</Label>
                              <Select
                                className="select-default-width"
                                options={[]}
                                id="warehourse"
                                name="warehourse"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={4}>
                            <FormGroup className="">
                              <Button color="primary" className="btn-square">
                                <i className="fa fa-plus"></i> Add a Warehouse
                              </Button>
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={8}>
                            <FormGroup className="">
                              <Label htmlFor="description">Description</Label>
                              <Input
                                type="textarea"
                                name="description"
                                id="description"
                                rows="6"
                                placeholder="Description..."
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12} className="mt-5 d-flex align-items-center justify-content-between flex-wrap">
                            <FormGroup>
                              <Button color="danger" className="btn-square">
                                <i className="fa fa-trash"></i> Delete
                              </Button>
                            </FormGroup>
                            <FormGroup className="text-right">
                              <Button type="submit" color="primary" className="btn-square mr-3">
                                <i className="fa fa-dot-circle-o"></i> Update
                              </Button>
                              <Button color="secondary" className="btn-square" 
                                onClick={() => {this.props.history.push('/admin/master/product')}}>
                                <i className="fa fa-ban"></i> Cancel
                              </Button>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct)
