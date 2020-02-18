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

import { Formik } from 'formik';
import * as Yup from "yup";

import './style.scss'

import * as ProductActions from '../../actions'

import {WareHouseModal} from '../../sections'

const mapStateToProps = (state) => {
  return ({
    vat_list: state.product.product_vat_list,
    product_ware_house: state.product.product_ware_house,
    product_parent: state.product.product_parent
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    productActions: bindActionCreators(ProductActions, dispatch)
  })
}

class CreateProduct extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      openWarehouseModal:false,

      selectedParentProduct: null,
      selectedVatCategory: null,
      selectedWareHouse: null,

      initProductValue: {
        productName: '', 
        productDescription: '',
        productCode:'',
        vatIncluded : false,
        unitPrice : 8,
        parentProduct : 1,
        vatCategory: '', 
        productWarehouse: ''
      },
    }

    this.showWarehouseModal = this.showWarehouseModal.bind(this)
    this.closeWarehouseModal = this.closeWarehouseModal.bind(this)
  }


  componentDidMount(){
    this.props.productActions.getProductVatCategoryList()
    this.props.productActions.getParentProductList()
    this.props.productActions.getProductWareHouseList()
  }


  // Show Invite User Modal
  showWarehouseModal() {
    this.setState({ openWarehouseModal: true })
  }
  // Cloase Confirm Modal
  closeWarehouseModal() {
    this.setState({ openWarehouseModal: false })
  }


  // Create or Edit Product
  productHandleSubmit(data) {
    this.props.productActions.createAndSaveProduct(data).then(res => {
      if (res.status === 200) {
        // this.success()

        if(this.state.readMore){
          this.setState({
            readMore: false
          })
        } else this.props.history.push('/admin/master/product')
      }
    })
  }

  render() {

    const  {vat_list, product_parent, product_ware_house } = this.props

    console.log()

    return (
      <div className="create-product-screen">
        <div className="animated fadeIn">
          <Row>
            <Col lg={12} className="mx-auto">
              <Card>
                <CardHeader>
                  <Row>
                    <Col lg={12}>
                      <div className="h4 mb-0 d-flex align-items-center">
                        <i className="fas fa-object-group" />
                        <span className="ml-2">Create Product</span>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={12}>
                      <Formik
                        initialValues={this.state.initProductValue}
                        onSubmit={(values, {resetForm}) => {

                          this.productHandleSubmit(values)
                          resetForm(this.state.initProductValue)

                          this.setState({
                            selectedWareHouse: null,
                            selectedParentProduct: null,
                            selectedVatCategory: null,
                          })
                        }}
                        validationSchema={Yup.object().shape({
                          productName: Yup.string()
                            .required("Product Name is Required"),
                          vatCategory: Yup.string()
                            .required("Vat Category is Required"),
                        })}>
                          {props => (
                            <Form onSubmit={props.handleSubmit}>
                              <Row>
                                <Col lg={4}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="productName">
                                      <span className="text-danger">*</span>Name
                                    </Label>
                                    <Input
                                      type="text"
                                      id="productName"
                                      name="productName"
                                      onChange={props.handleChange}
                                      value={props.values.productName}
                                      placeholder="Enter Product Name"
                                      className={
                                        props.errors.productName && props.touched.productName
                                          ? "is-invalid"
                                          : ""
                                      }
                                    />
                                    {props.errors.productName && props.touched.productName && (
                                      <div className="invalid-feedback">{props.errors.productName}</div>
                                    )}
                                  </FormGroup>
                                </Col>
                                
                                <Col lg={4}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="productCode">Product Code</Label>
                                    <Input
                                      type="text"
                                      id="productCode"
                                      name="productCode"
                                      onChange={props.handleChange}
                                      value={props.values.productCode}
                                      placeholder="Enter Product Code"
                                    />
                                  </FormGroup>
                                </Col>

                                <Col lg={4}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="parent_product">Parent Product</Label>
                                    <Select
                                      className="select-default-width"
                                      options={product_parent}
                                      id="parentProduct"
                                      name="parentProduct"
                                      value={this.state.selectedParentProduct}
                                      onChange={(option) => {
                                        this.setState({
                                          selectedParentProduct: option.value
                                        })
                                        props.handleChange("parentProduct")(option.value);
                                      }}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                
                                <Col lg={4}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="unitPrice">Product Price</Label>
                                    <Input
                                      type="text"
                                      id="unitPrice"
                                      name="unitPrice"
                                      placeholder="Enter Product Price"
                                      onChange={props.handleChange}
                                      value={props.values.unitPrice}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col lg={4}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="vatCategory"><span className="text-danger">*</span>Vat Percentage</Label>
                                    <Select
                                      className="select-default-width"
                                      options={vat_list}
                                      id="vatCategory"
                                      name="vatCategory"
                                      value={this.state.selectedVatCategory}
                                      onChange={(option) => {
                                        this.setState({
                                          selectedVatCategory: option.value
                                        })
                                        props.handleChange("vatCategory")(option.value);
                                      }}
                                      className={
                                        props.errors.vatCategory && props.touched.vatCategory
                                          ? "is-invalid"
                                          : ""
                                      }
                                    />
                                    {props.errors.vatCategory && props.touched.vatCategory && (
                                      <div className="invalid-feedback">{props.errors.vatCategory}</div>
                                    )}
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={12}>
                                  <FormGroup check inline className="mb-3">
                                    <Input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="vatIncluded"
                                      name="vatIncluded"
                                      onChange={props.handleChange}
                                      value={props.values.vatIncluded}
                                    />
                                    <Label className="form-check-label" check htmlFor="vatIncluded">Vat Include</Label>
                                  </FormGroup>
                                </Col>
                              </Row>
                  
                              <Row>
                                <Col lg={4}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="warehourse">Warehourse</Label>
                                    <Select
                                      className="select-default-width"
                                      options={product_ware_house}
                                      id="productWarehouse"
                                      name="productWarehouse"
                                      value={this.state.selectedWareHouse}
                                      onChange={(option) => {
                                        this.setState({
                                          selectedWareHouse: option.value
                                        })
                                        props.handleChange("productWarehouse")(option.value);
                                      }}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={4}>
                                  <FormGroup className="text-right">
                                    <Button color="primary" type="button" className="btn-square" 
                                        onClick={this.showWarehouseModal}>
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
                                      name="productDescription"
                                      id="productDescription"
                                      rows="6"
                                      placeholder="Description..."
                                      onChange={props.handleChange}
                                      value={props.values.productDescription}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={12} className="mt-5">
                                  <FormGroup className="text-right">
                                    <Button type="submit" color="primary" className="btn-square mr-3">
                                      <i className="fa fa-dot-circle-o"></i> Create
                                    </Button>
                                    <Button type="submit" color="primary" className="btn-square mr-3">
                                      <i className="fa fa-repeat"></i> Create and More
                                    </Button>
                                    <Button color="secondary" className="btn-square" 
                                      onClick={() => {this.props.history.push('/admin/master/product')}}>
                                      <i className="fa fa-ban"></i> Cancel
                                    </Button>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Form>
                          )}
                      </Formik>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>

        <WareHouseModal openModal={this.state.openWarehouseModal} closeWarehouseModal={this.closeWarehouseModal}/>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct)
