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
  Label,
} from 'reactstrap'
import Select from 'react-select'
import _ from 'lodash'

import { Formik } from 'formik';
import * as Yup from "yup";

import {ContactModal} from '../../sections'

import * as ProjectActions from '../../actions'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
    currency_list: state.project.project_currency_list,
    country_list: state.project.project_country_list
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    projectActions: bindActionCreators(ProjectActions, dispatch)
  })
}


const INVOICE_LANGUAGE_OPTIONS = [
  { value: 1, label: 'English'},
  { value: 2, label: 'Arabic'}
]

class DetailProject extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      openContactModel: false,
      loading: false,

      selectedContact: null,
      selectedCurrency: null,
      selectedInvoiceLanguage: null,

      selectedContactCountry: null,
      selectedContactCurrency: null,
      selectedContactTitle: null,

      initProjectValue: {
          projectName: '', 
          invoiceLanguageCode: '',
          contact:'',
          contractPoNumber : '',
          vatRegistrationNumber : '',
          projectExpenseBudget : '',
          projectRevenueBudget: '', 
          currency: ''
      },
    }

    this.showContactModel = this.showContactModel.bind(this)
    this.closeContactModel = this.closeContactModel.bind(this)
    
    this.projectHandleSubmit = this.projectHandleSubmit.bind(this)
    this.success = this.success.bind(this)
  }


   // Show Invite User Modal
  showContactModel() {
    this.setState({ openContactModel: true })
  }
  // Cloase Confirm Modal
  closeContactModel() {
    this.setState({ openContactModel: false })
  }

  componentDidMount(){
    this.props.projectActions.getProjectCountryList()
    this.props.projectActions.getProjectCurrencyList()
    this.props.projectActions.getProjectTitleList()
  }

  // Show Success Toast
  success() {
    // toast.success('Vat Code Updated successfully... ', {
    //   position: toast.POSITION.TOP_RIGHT
    // })
  }

  // Create or Edit Vat
  projectHandleSubmit(data) {
    this.props.projectActions.createAndSaveProject(data).then(res => {
      if (res.status === 200) {
        // this.success()

        if(this.state.readMore){
          this.setState({
            readMore: false
          })
        } else this.props.history.push('/admin/master/project')
      }
    })
  }


  render() {
    const {currency_list, country_list} = this.props

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
                        <i className="nav-icon fas fa-project-diagram" />
                        <span className="ml-2">Update Project</span>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={12}>
                      <Formik
                          initialValues={this.state.initProjectValue}
                          onSubmit={(values, {resetForm}) => {
                            this.projectHandleSubmit(values)
                            resetForm(this.state.initProjectValue)
                          }}
                          validationSchema={Yup.object().shape({
                            projectName: Yup.string()
                              .required("Project Name is Required"),
                            contact: Yup.string()
                              .required("Contact is Required"),
                            currency: Yup.string()
                              .required("Currency is Required"),
                            invoiceLanguageCode: Yup.string()
                              .required("Invoice Language is Required")
                          })}>
                            {props => (
                              <Form onSubmit={props.handleSubmit}>
                                <Row>
                                  <Col lg={4}>
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="projectName"><span className="text-danger">*</span>Project Name</Label>
                                      <Input
                                        type="text"
                                        id="name"
                                        name="projectName"
                                        onChange={props.handleChange}
                                        placeholder="Enter Project Name"
                                        value={props.values.projectName}
                                        className={
                                          props.errors.projectName && props.touched.projectName
                                            ? "is-invalid"
                                            : ""
                                        }
                                      />
                                      {props.errors.projectName && props.touched.projectName && (
                                        <div className="invalid-feedback">{props.errors.projectName}</div>
                                      )}
                                    </FormGroup>
                                  </Col>
                                  <Col lg={4}>
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="contact"><span className="text-danger">*</span>Contact</Label>
                                      <Select
                                        options={INVOICE_LANGUAGE_OPTIONS}
                                        onChange={(option) => {
                                          this.setState({
                                            selectedContact: option.value
                                          })
                                          props.handleChange("contact")(option.value);
                                        }}
                                        id="contact"
                                        name="contact"
                                        placeholder="Select Contact"
                                        value={this.state.selectedContact}
                                        className={
                                          props.errors.contact && props.touched.contact
                                            ? "is-invalid"
                                            : ""
                                        }
                                      />
                                      {props.errors.contact && props.touched.contact && (
                                        <div className="invalid-feedback">{props.errors.contact}</div>
                                      )}
                                    </FormGroup>
                                    <FormGroup className="mb-5 text-right">
                                      <Button color="primary" className="btn-square " onClick={this.showContactModel}>
                                        <i className="fa fa-plus"></i> Add a Contact
                                      </Button>
                                    </FormGroup>
                                  </Col>
                                  
                                </Row>
                                <Row>
                                  <Col lg={4}>
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="contractPoNumber">Contract PO Number</Label>
                                      <Input
                                        type="text"
                                        id="contractPoNumber"
                                        name="contractPoNumber"
                                        onChange={props.handleChange}
                                        placeholder="Enter Contract PO Number"
                                        value={props.values.contractPoNumber}
                                        className={
                                          props.errors.contractPoNumber && props.touched.contractPoNumber
                                            ? "is-invalid"
                                            : ""
                                        }
                                      />
                                      {props.errors.contractPoNumber && props.touched.contractPoNumber && (
                                        <div className="invalid-feedback">{props.errors.contractPoNumber}</div>
                                      )}
                                    </FormGroup>
                                  </Col>
                                  <Col lg={4}>
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="vatRegistrationNumber">VAT Registration Number</Label>
                                      <Input
                                        type="text"
                                        id="vatRegistrationNumber"
                                        name="vatRegistrationNumber"
                                        onChange={props.handleChange}
                                        placeholder="Enter VAT Registration Number"
                                        value={props.values.vatRegistrationNumber}
                                        className={
                                          props.errors.vatRegistrationNumber && props.touched.vatRegistrationNumber
                                            ? "is-invalid"
                                            : ""
                                        }
                                      />
                                      {props.errors.vatRegistrationNumber && props.touched.vatRegistrationNumber && (
                                        <div className="invalid-feedback">{props.errors.vatRegistrationNumber}</div>
                                      )}
                                    </FormGroup>
                                  </Col>
                                  <Col lg={4}>
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="currency">
                                        <span className="text-danger">*</span>Currency
                                      </Label>
                                      <Select
                                        className="select-default-width"
                                        options={currency_list}
                                        onChange={(option) => {
                                          this.setState({
                                            selectedCurrency: option.value
                                          })
                                          props.handleChange("currency")(option.value);
                                        }}
                                        placeholder="Select currency"
                                        value={this.state.selectedCurrency}
                                        id="currency"
                                        name="currency"
                                        className={
                                          props.errors.currency && props.touched.currency
                                            ? "is-invalid"
                                            : ""
                                        }
                                      />
                                      {props.errors.currency && props.touched.currency && (
                                        <div className="invalid-feedback">{props.errors.currency}</div>
                                      )}
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col lg={4}>
                                    <FormGroup className="">
                                      <Label htmlFor="projectExpenseBudget">Expense Budget</Label>
                                      <Input
                                        type="number"
                                        id="projectExpenseBudget"
                                        name="projectExpenseBudget"
                                        onChange={props.handleChange}
                                        placeholder="Enter Expense Budgets"
                                        value={props.values.projectExpenseBudget}
                                        className={
                                          props.errors.projectExpenseBudget && props.touched.projectExpenseBudget
                                            ? "is-invalid"
                                            : ""
                                        }
                                      />
                                      {props.errors.projectExpenseBudget && props.touched.projectExpenseBudget && (
                                        <div className="invalid-feedback">{props.errors.projectExpenseBudget}</div>
                                      )}
                                    </FormGroup>
                                  </Col>
                                  <Col lg={4}>
                                    <FormGroup className="">
                                      <Label htmlFor="projectRevenueBudget">Revenue Budget</Label>
                                      <Input
                                        type="number"
                                        id="projectRevenueBudget"
                                        name="projectRevenueBudget"
                                        onChange={props.handleChange}
                                        placeholder="Enter VAT Revenue Budget"
                                        value={props.values.projectRevenueBudget}
                                        className={
                                          props.errors.projectRevenueBudget && props.touched.projectRevenueBudget
                                            ? "is-invalid"
                                            : ""
                                        }
                                      />
                                      {props.errors.projectRevenueBudget && props.touched.projectRevenueBudget && (
                                        <div className="invalid-feedback">{props.errors.projectRevenueBudget}</div>
                                      )}
                                    </FormGroup>
                                  </Col>
                                  <Col lg={4}>
                                    <FormGroup className="">
                                      <Label htmlFor="invoiceLanguageCode">
                                        <span className="text-danger">*</span>Invoice Language
                                      </Label>
                                      <Select
                                        className="select-default-width"
                                        options={INVOICE_LANGUAGE_OPTIONS}
                                        id="invoiceLanguageCode"
                                        onChange={(option) => {
                                          this.setState({
                                            selectedInvoiceLanguage: option.value
                                          })
                                          props.handleChange("invoiceLanguageCode")(option.value);
                                        }}
                                        placeholder="Select invoiceLanguageCode"
                                        value={this.state.selectedInvoiceLanguage}
                                        name="invoiceLanguageCode"
                                        className={
                                          props.errors.invoiceLanguageCode && props.touched.invoiceLanguageCode
                                            ? "is-invalid"
                                            : ""
                                        }
                                      />
                                      {props.errors.invoiceLanguageCode && props.touched.invoiceLanguageCode && (
                                        <div className="invalid-feedback">{props.errors.invoiceLanguageCode}</div>
                                      )}
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col lg={12} className="mt-5 d-flex flex-wrap align-items-center justify-content-between">
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
                                        onClick={() => {this.props.history.push('/admin/master/project')}}>
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

        <ContactModal 
          openContactModel={this.state.openContactModel} 
          closeContactModel={this.closeContactModel}
          currencyList = {currency_list}
          countryList = {country_list}
        />    

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailProject)