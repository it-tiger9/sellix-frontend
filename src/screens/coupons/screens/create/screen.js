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
import { Formik } from 'formik'
import { Loader, ImageUpload, DataSlider } from 'components'


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
    this.setState({tooltipOpen: !this.state.tooltipOpen})
  }

  addFile = file => {
    console.log(file);
    this.setState({
      files: file.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    });
  };

  render() {
    const { loading, tooltipOpen, files } = this.state

    console.log(files)

    return (
      <div className="product-screen">
        <div className="animated fadeIn">
          <Formik initialValues={{
            discount: []
          }}>{props => (
            <Card>
            <CardHeader>
              <Row style={{alignItems: 'center'}}>
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
                                type="number" 
                                name="CouponCode"
                                placeholder="Coupon code"
                                onChange={props.handleChange}
                                value={props.values.CouponCode}
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
                              value={[50]} 
                              ticks={[1, 50, 100]} 
                              suffix="%"
                              name="discount"
                              onChange={props.handleChange}
                              value={props.values.discount}
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
                              id="parentProduct"
                              name="parentProduct"
                              placeholder="Select Products"
                              onChange={props.handleChange}
                              value={props.values.parentProduct}
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
                              name="maxNumbersOfUses"
                              placeholder="Leave blank for unlimited" 
                              onChange={props.handleChange}
                              value={props.values.maxNumbersOfUses}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
              }
            </CardBody>
            <Button color="primary" className="" style={{width: 200}}
            >Save Coupon</Button>
            
          </Card>
          )}
          </Formik>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCoupon)
