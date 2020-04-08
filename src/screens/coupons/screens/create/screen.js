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
  Input,
  Form,
} from 'reactstrap'
import Select from 'react-select'
import { Formik } from 'formik'
import { Loader, DataSlider } from 'components'
import { createCoupon } from './actions'
import { getCoupons } from '../../actions'
import { editCoupon } from '../detail/actions'
import { getProducts } from './actions'
import {
  CommonActions
} from 'services/global'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import './style.scss'
var random = require('random-letters');
const user = window.localStorage.getItem('userId')

const mapStateToProps = (state) => {
  return ({
    coupons: _.map(state.coupons.coupons, coupon => ({
      ...coupon,
      discount_value: [+coupon.discount]
    })),
    products: [{ label: 'Select all products', value: ''}, ..._.map(state.coupons.products, product => ({label: product.title, value: product.id})) ] 
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators({ getCoupons }, dispatch),
    editCoupon: bindActionCreators(editCoupon, dispatch),
    createCoupon: bindActionCreators(createCoupon, dispatch),
    commonActions: bindActionCreators(CommonActions, dispatch),
    getProducts: bindActionCreators(getProducts, dispatch),
  })
}

const MockProducts = [
  { label: 'Select all products', value: ''},
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
      codeFromGenerator: null
    }
  }

  componentDidMount() {
    this.props.actions.getCoupons()
    this.props.getProducts()
  }

  isEdit = () => {
    return this.props.match.params.id
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
    const createOrEditPromise = this.isEdit()
      ? this.props.editCoupon({ ...newValues, uniqid: this.props.match.params.id })
      : this.props.createCoupon(newValues)
    createOrEditPromise.then(res => {
      this.props.commonActions.tostifyAlert('success', res.message)
      this.props.history.push({
        pathname: `/${user}/coupons/`
      })
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.message)
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  render() {

    
    console.log(random(16))
    const { loading } = this.state
    const currentCouponData = _.find(this.props.coupons, item => item.uniqid === this.props.match.params.id)

    if (this.isEdit() && !currentCouponData) {
      return 'load'
    }
    let initialValues = this.isEdit()
      ? { ...currentCouponData, products_bound: currentCouponData.products_bound.length === 0 ? [''] : currentCouponData.products_bound}
      : { discount_value: [50] }
    return (
      <div className="product-screen mt-3">
        <div className="animated fadeIn">
          <Breadcrumb className="mb-0">
						<BreadcrumbItem active className="mb-0">
							<a onClick={(e) => this.props.history.goBack()}><i className="fas fa-chevron-left"/> Coupons</a>
						</BreadcrumbItem>
					</Breadcrumb>
          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
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
                                    <Button onClick={() => props.setFieldValue('code', random(16))} color="primary" style={{marginLeft: -15}}>Generate</Button>
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
                                    options={this.props.products}
                                    name="products_bound"
                                    placeholder="Select Products"
                                    onChange={(options) => {
                                      let newOptions = []
                                      const oldHaveAll = _.some(props.values.products_bound, option => option.value === '')
                                      const newHaveAll = _.some(options, option => option.value === '')
                                      const newHaveSome = _.some(options, option => option.value != '')
                                      if (oldHaveAll) {
                                        if (newHaveSome) {
                                          newOptions = _.remove(options, option => option.value != '')
                                        } else {
                                          newOptions = options
                                        }
                                      } else {
                                        if (newHaveAll) {
                                          newOptions = _.remove(options, option => option.value === '')
                                        } else {
                                          newOptions = options
                                        }
                                      }
                                      props.setFieldValue('products_bound', newOptions  )
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
                                    value={props.values.max_uses === '-1' ? "" : props.values.max_uses}
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
