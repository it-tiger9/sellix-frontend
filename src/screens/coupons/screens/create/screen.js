import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as _ from 'lodash'
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
  Input,
  Form,
} from 'reactstrap'
import Select from 'react-select'
import { Formik } from 'formik'
import { Loader, DataSlider } from 'components'
import * as ProductActions from './actions'
import { createCoupon } from './actions'
import {
  CommonActions
} from 'services/global'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
    product_list: state.product.product_list
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    productActions: bindActionCreators(ProductActions, dispatch),
    createCoupon: bindActionCreators(createCoupon, dispatch),
    commonActions: bindActionCreators(CommonActions, dispatch),
  })
}

const MockProducts = [
  { label: 'id1', value: '1' },
  { label: 'id2', value: '2' },
  { label: 'id3', value: '3' }
]

class CreateCoupon extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      tooltipOpen: false,
      files: [],
    }
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  }

  unlistedTooltipToggle() {
    this.setState({ tooltipOpen: !this.state.tooltipOpen })
  }

  handleSubmit(values) {
    this.setState({ loading: true })
    const newValues = {
      ...values,
      products_bound: _.map(values.products_bound, item => item.value).join(','),
      max_uses: values.max_uses ? values.max_uses : -1
    }
    // const createOrEditPromise = this.isEdit()
    //   ? this.props.editBlacklist({ ...values, uniqid: this.props.match.params.id })
    //   : this.props.createBlacklist(values)
    this.props.createCoupon(newValues).then(res => {
      this.props.commonActions.tostifyAlert('success', res.message)
      this.props.history.push({
        pathname: '/admin/coupons'
      })
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.message)
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  render() {
    const { loading } = this.state
    return (
      <div className="product-screen">
        <div className="animated fadeIn">
          <Formik
            initialValues={{
              discount_value: [50],
            }}
            onSubmit={(values) => {
              this.handleSubmit(values)
            }}>{props => (
              <Form onSubmit={props.handleSubmit}>
                <Card>
                  <CardHeader>
                    <Row style={{ alignItems: 'center' }}>
                      <Col md={12}>
                        <h1>New Coupon</h1>
                      </Col>
                    </Row>
                  </CardHeader>
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
                            <Row>
                              <Col lg={12}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Code</Label>
                                  <div className="d-flex">
                                    <Input
                                      // type="number" 
                                      name="code"
                                      placeholder="Coupon code"
                                      onChange={props.handleChange}
                                      value={props.values.code}
                                    />
                                    <Button color="primary">Generate</Button>
                                  </div>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={12}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Discount</Label>
                                  <DataSlider
                                    domain={[0, 100]}
                                    ticks={[1, 50, 100]}
                                    suffix="%"
                                    name="discount_value"
                                    receiveValue={(value) => {
                                      props.setFieldValue('discount_value', [value])
                                    }}
                                    value={props.values.discount_value}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={12}>
                                <FormGroup className="mb-4">
                                  <Label htmlFor="product_code">Products</Label>
                                  <Select
                                    className="select-default-width"
                                    id="products_bound"
                                    multi
                                    options={MockProducts}
                                    name="products_bound"
                                    placeholder="Select Products"
                                    onChange={(options) => {
                                      props.setFieldValue('products_bound', options)
                                    }}
                                    value={props.values.products_bound}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={12}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Max Number of Uses</Label>
                                  <Input
                                    type="number"
                                    name="max_uses"
                                    placeholder="Leave blank for unlimited"
                                    onChange={props.handleChange}
                                    value={props.values.max_uses}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                    }
                  </CardBody>
                  <Button color="primary" className="" style={{ width: 200 }}
                  >Save Coupon</Button>

                </Card>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCoupon)
