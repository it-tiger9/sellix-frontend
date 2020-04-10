import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Form,
  Col,
  FormGroup,
  Label,
  Tooltip,
  Input
} from 'reactstrap'
import Select from 'react-select'
import { Formik } from 'formik';
import * as Yup from "yup";
import _ from "lodash"
import { Spin, ImageUpload, Loader } from 'components'
import config from 'constants/config'
import { Product } from 'screens'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {
  CommonActions
} from 'services/global'
import * as CategoryActions from '../../actions'
import './style.scss'


const user = window.localStorage.getItem('userId')

const mapStateToProps = (state) => {
  return ({
    all_products: state.product.all_products
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    commonActions: bindActionCreators(CommonActions, dispatch),
    productActions: bindActionCreators(Product.actions, dispatch),
    actions: bindActionCreators(CategoryActions, dispatch)
  })
}

class EditCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      saving: false,
      tooltipOpen: false,
      initialData: {
      },
      files: [],
      selected_products: []
    }

    this.handleMultiChange = this.handleMultiChange.bind(this);
    this.id = this.props.match.params.id
  }

  // componentWillUnmount() {
  //   // Make sure to revoke the data uris to avoid memory leaks
  //   this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  // }
  

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


  handleSubmit(values) {
    this.setState({saving: true})
    const { selected_products } = this.state

    values.products_bound = selected_products.map(o => o.value).toString()
    this.props.actions.editCategory(values).then(res => {
      this.props.commonActions.tostifyAlert('success', res.message)
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.message)
    }).finally(() => {
      this.setState({saving: false})
    })
  }

  handleMultiChange(option) {
    this.setState(state => {
      return {
        selected_products: option
      };
    });
  }

  componentDidMount() {
    if (this.id) {
      this.setState({ loading: true });
      this.props.actions.getCategoryByID(this.id).then(res => {
        this.setState({
          initialData: res.data.category,
          files: res.data.category.image_attachment === ''?[]:
            [{preview: config.API_ROOT_URL+'/attachments/image/'+res.data.category.image_attachment}],
        })
      }).finally(() => {
        this.props.productActions.getProductList().then(res => {
          this.setState({
            selected_products: this.state.initialData.products_bound.map(pro => {return {value: pro.uniqid, label:pro.title}})
          })
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          this.setState({loading: false})
        })
      })
    }
  }

  render() {
    const { loading, tooltipOpen, files, initialData, saving } = this.state

    const { all_products } = this.props
    const product_options = all_products.map(pro => {return {value: pro.uniqid, label: pro.title}})

    return (
      <div className="product-screen mt-3">
        <div className="animated fadeIn">
            <Breadcrumb className="mb-0">
              <BreadcrumbItem active className="mb-0">
                <a onClick={(e) => this.props.history.goBack()}><i className="fas fa-chevron-left"/> Categories</a>
              </BreadcrumbItem>
            </Breadcrumb>
          <Formik
            initialValues={initialData}
            enableReinitialize={true}
            onSubmit={(values) => {
              this.handleSubmit(values)
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string()
                .required('Title is required'),
              products_bound: Yup.string()
                .required('Products is required'),
              sort_priority: Yup.number()
                .required("Sort Priority is required"),
              unlisted: Yup.number()
            })}>
              {props => (
                <Form onSubmit={props.handleSubmit}>
                  <Card>
                    <CardHeader>
                      <Row style={{alignItems: 'center'}}>
                        <Col md={12}>
                          <h1>Edit Category</h1>
                        </Col>
                      </Row>
                    </CardHeader>
                    <CardBody className="p-4 mb-5">
                      {loading ? (
                          <Loader></Loader>
                        ) : (
                          <Row className="mt-4 mb-4">
                            <Col lg={12}>
                              <Row>
                                <Col lg={12}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                      type="text"
                                      id="title"
                                      name="title"
                                      placeholder="Enter Category Title"
                                      onChange={props.handleChange}
                                      value={props.values.title}
                                      className={
                                        props.errors.title && props.touched.title
                                          ? "is-invalid"
                                          : ""
                                      }
                                    />
                                    {props.errors.title && props.touched.title && (
                                      <div className="invalid-feedback">{props.errors.title}</div>
                                    )}
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={12}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="product_bounds">Products</Label>
                                    <Select
                                      className="select-default-width"
                                      id="product_bounds"
                                      name="product_bounds"
                                      multi
                                      options={product_options}
                                      placeholder="Select Products"
                                      value={this.state.selected_products}
                                      onChange={(option) => {
                                        this.setState({
                                          selected_products: option
                                        })

                                        props.handleChange("products_bound")(option.map(o => o.value).toString());
                                      }}
                                      className={
                                        props.errors.products_bound && props.touched.products_bound
                                          ? "is-invalid"
                                          : ""
                                      }
                                    />
                                    {props.errors.products_bound && props.touched.products_bound && (
                                      <div className="invalid-feedback">{props.errors.products_bound}</div>
                                    )}
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={4}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="product_code">Image <small className="font-italic">(optional)</small></Label>
                                    <ImageUpload addFile={(file) => {
                                      
                                      props.handleChange('image')(file.length>0?file[0]:null); 
                                      this.addFile(file)}} files={files} files={files}/>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={2}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="sort_priority">Priority</Label>
                                    <Input
                                      type="number"
                                      id="sort_priority"
                                      name="sort_priority"
                                      placeholder="Sort Priority"
                                      onChange={props.handleChange}
                                      value={props.values.sort_priority}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={2}>
                                  <FormGroup check inline className="mb-3">
                                      <div className="custom-checkbox custom-control">
                                        <input 
                                          className="custom-control-input"
                                          type="checkbox"
                                          id="inline-radio1"
                                          name="SMTP-auth"
                                          onChange={(e) => {
                                            props.handleChange('unlisted')(e.target.checked?1:0)

                                            console.log(props.values)
                                          }}
                                          checked={(props.values.unlisted === '1' || props.values.unlisted === 1)?true:false}
                                        />
                                        <label className="custom-control-label" htmlFor="inline-radio1">
                                          Unlisted &nbsp;<span href="#" id="unlistedTooltip"><i className="fa fa-question-circle"></i></span>
                                          <Tooltip placement="right" isOpen={tooltipOpen} target="unlistedTooltip" 
                                            toggle={this.unlistedTooltipToggle.bind(this)}>
                                            This product won't show on your user profile page
                                          </Tooltip>
                                        </label>
                                      </div>
                                    </FormGroup>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        )}
                    </CardBody>
                    <Button color="primary" type="submit" className="" style={{width: 200}} disabled={loading || saving}
                    >{saving ?<Spin/>:'Save Category' }</Button>                   
                  </Card>
                </Form> )}
              </Formik>
            </div>  
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory)
