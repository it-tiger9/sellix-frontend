import React from 'react'
import {
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader, 
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import Select from 'react-select'
import _ from 'lodash'

import { Formik } from 'formik';
import * as Yup from "yup";

import * as ProjectActions from '../actions'


const INVOICE_LANGUAGE_OPTIONS = [
  { value: 1, label: 'English'},
  { value: 2, label: 'Arabic'}
]

class ContactModal extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,

      initContactValue: {
        title: '',
        billingEmail: '',
        city: '',
        country : '',
        currency: '',
        firstName: '',
        lastName: '',
        middleName: '',
        email: '',
        stateRegion: '',
        invoicingAddressLine1: '',
        invoicingAddressLine2: '' 
      },
    }

    this.contactHandleSubmit = this.contactHandleSubmit.bind(this)
  }

  // Create or Contact
  contactHandleSubmit(data) {
    ProjectActions.createProjectContact(data).then(res => {
      if (res.status === 200) {
      // this.success()
      this.closeContactModel()
      }
    })
  }

  render() {
    const { openContactModel, closeContactModel, currencyList, countryList } = this.props

    return (
      <div className="contact-modal-screen">
        <Modal isOpen={openContactModel}
          className="modal-success contact-modal"
          >
          <Formik
            initialValues={this.state.initContactValue}
            onSubmit={(values, {resetForm}) => {
              this.contactHandleSubmit(values)
              resetForm(this.state.initContactValue)
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string()
                .required('Title is a required field'),
              billingEmail: Yup.string()
                .email('Billing Email must be a valid email')
                .required('Billing Email is a required field'),
              city: Yup.string()
                .required('City is a required field'),
              country: Yup.string()
                .required('Country is a required field'),
              currency: Yup.string()
                .required('Currency is a required field'),
              firstName: Yup.string()
                .required('First Name is a required field'),
              lastName: Yup.string()
                .required('Last Name is a required field'),
              email: Yup.string()
                .email('Email must be a valid email')
                .required('Email is a required field'),
              stateRegion: Yup.string()
                .required('State is a required field'),
              invoicingAddressLine1: Yup.string()
                .required('Address1 is a required field'),
              invoicingAddressLine2: Yup.string()
                .required('Address2 is a required field')
            })}>
            {props => (
              <Form name="simpleForm" onSubmit={props.handleSubmit}>
                <ModalHeader toggle={this.toggleDanger}>New Contact</ModalHeader>
                  <ModalBody>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label htmlFor="categoryCode"><span className="text-danger">*</span>Title</Label>
                          <Select
                            className="select-default-width"
                            options={INVOICE_LANGUAGE_OPTIONS}
                            id="title"
                            onChange={(option) => {
                              this.setState({
                              selectedContactTitle: option.value
                              })
                              props.handleChange("title")(option.value);
                            }}
                            placeholder="Select title"
                            value={this.state.selectedContactTitle}
                            name="title"
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
                      <Col>
                        <FormGroup>
                          <Label htmlFor="categoryName"><span className="text-danger">*</span>First Name</Label>
                            <Input
                              type="text"
                              id="firstName"
                              name="firstName"
                              onChange={props.handleChange}
                              placeholder="Enter firstName "
                              value={props.values.firstName }
                              className={
                                props.errors.firstName  && props.touched.firstName 
                                ? "is-invalid"
                                : ""
                              }
                            />
                          {props.errors.firstName  && props.touched.firstName  && (
                            <div className="invalid-feedback">{props.errors.firstName }</div>
                          )}
                        </FormGroup>
                      </Col>
                      <Col>
                      <FormGroup>
                        <Label htmlFor="categoryName">Middle Name</Label>
                          <Input
                            type="text"
                            id="middleName"
                            name="middleName"
                            onChange={props.handleChange}
                            placeholder="Enter middleName  "
                            value={props.values.middleName}
                            className={
                              props.errors.middleName && props.touched.middleName  
                              ? "is-invalid"
                              : ""
                            }
                          />
                        {props.errors.middleName && props.touched.middleName && (
                          <div className="invalid-feedback">{props.errors.middleName}</div>
                        )}
                      </FormGroup>
                      </Col>
                      <Col>
                      <FormGroup>
                        <Label htmlFor="categoryName"><span className="text-danger">*</span>Last Name</Label>
                          <Input
                            type="text"
                            id="lastName"
                            name="lastName"
                            onChange={props.handleChange}
                            placeholder="Enter lastName   "
                            value={props.values.lastName  }
                            className={
                              props.errors.lastName && props.touched.lastName   
                              ? "is-invalid"
                              : ""
                            }
                          />
                        {props.errors.lastName && props.touched.lastName && (
                          <div className="invalid-feedback">{props.errors.lastName}</div>
                        )}
                      </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                      <FormGroup>
                        <Label htmlFor="categoryName"><span className="text-danger">*</span>Email</Label>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            onChange={props.handleChange}
                            placeholder="Enter email"
                            value={props.values.email   }
                            className={
                              props.errors.email && props.touched.email    
                              ? "is-invalid"
                              : ""
                            }
                          />
                        {props.errors.email && props.touched.email && (
                          <div className="invalid-feedback">{props.errors.email}</div>
                        )}
                      </FormGroup>
                      </Col>
                      <Col>
                      <FormGroup>
                        <Label htmlFor="categoryName"><span className="text-danger">*</span>Address Line 1</Label>
                        <Input
                          type="text"
                          id="invoicingAddressLine1"
                          name="invoicingAddressLine1"
                          onChange={props.handleChange}
                          placeholder="Enter invoicingAddressLine1"
                          value={props.values.invoicingAddressLine1}
                          className={
                            props.errors.invoicingAddressLine1 && props.touched.invoicingAddressLine1     
                            ? "is-invalid"
                            : ""
                          }
                        />
                        {props.errors.invoicingAddressLine1 && props.touched.invoicingAddressLine1 && (
                          <div className="invalid-feedback">{props.errors.invoicingAddressLine1}</div>
                        )}
                      </FormGroup>
                      </Col>
                      <Col>
                      <FormGroup>
                        <Label htmlFor="categoryName"><span className="text-danger">*</span>Address Line 2</Label>
                        <Input
                        type="text"
                        id="invoicingAddressLine2"
                        name="invoicingAddressLine2"
                        onChange={props.handleChange}
                        placeholder="Enter invoicingAddressLine2"
                        value={props.values.invoicingAddressLine2}
                        className={
                          props.errors.invoicingAddressLine2 && props.touched.invoicingAddressLine2     
                          ? "is-invalid"
                          : ""
                        }
                        />
                        {props.errors.invoicingAddressLine2 && props.touched.invoicingAddressLine2 && (
                        <div className="invalid-feedback">{props.errors.invoicingAddressLine2}</div>
                        )}
                      </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                      <FormGroup>
                        <Label htmlFor="categoryName"><span className="text-danger">*</span>State Region</Label>
                        <Input
                        type="text"
                        id="stateRegion"
                        name="stateRegion"
                        onChange={props.handleChange}
                        placeholder="Enter stateRegion"
                        value={props.values.stateRegion}
                        className={
                          props.errors.stateRegion && props.touched.stateRegion     
                          ? "is-invalid"
                          : ""
                        }
                        />
                        {props.errors.stateRegion && props.touched.stateRegion && (
                        <div className="invalid-feedback">{props.errors.stateRegion}</div>
                        )}
                      </FormGroup>
                      </Col>
                      <Col>
                      <FormGroup>
                        <Label htmlFor="categoryName"><span className="text-danger">*</span>City</Label>
                        <Input
                        type="text"
                        id="city"
                        name="city"
                        onChange={props.handleChange}
                        placeholder="Enter stateRegion"
                        value={props.values.city}
                        className={
                          props.errors.city && props.touched.city     
                          ? "is-invalid"
                          : ""
                        }
                        />
                        {props.errors.city && props.touched.city && (
                        <div className="invalid-feedback">{props.errors.city}</div>
                        )}
                      </FormGroup>
                      </Col>
                      <Col>
                      <FormGroup>
                        <Label htmlFor="categoryName"><span className="text-danger">*</span>Country</Label>
                        <Select
                        className="select-default-width"
                        options={countryList}
                        id="country"
                        onChange={(option) => {
                          this.setState({
                          selectedContactCountry: option.value
                          })
                          props.handleChange("country")(option.value);
                        }}
                        placeholder="Select country"
                        value={this.state.selectedContactCountry}
                        name="country"
                        className={
                          props.errors.country && props.touched.country
                          ? "is-invalid"
                          : ""
                        }
                        />
                        {props.errors.country && props.touched.country && (
                        <div className="invalid-feedback">{props.errors.country}</div>
                        )}
                      </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                      <FormGroup>
                        <Label htmlFor="categoryName"><span className="text-danger">*</span>Currency Code</Label>
                        <Select
                        className="select-default-width"
                        options={currencyList}
                        id="currency"
                        onChange={(option) => {
                          this.setState({
                          selectedContactCurrency: option.value
                          })
                          props.handleChange("currency")(option.value);
                        }}
                        placeholder="Select currency"
                        value={this.state.selectedContactCurrency}
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
                      <Col>
                      <FormGroup>
                        <Label htmlFor="categoryName"><span className="text-danger">*</span>Billing Email</Label>
                        <Input
                        type="text"
                        id="billingEmail"
                        name="billingEmail"
                        onChange={props.handleChange}
                        placeholder="Enter billingEmail"
                        value={props.values.billingEmail}
                        className={
                          props.errors.billingEmail && props.touched.billingEmail    
                          ? "is-invalid"
                          : ""
                        }
                        />
                        {props.errors.billingEmail && props.touched.billingEmail && (
                        <div className="invalid-feedback">{props.errors.billingEmail}</div>
                        )}
                      </FormGroup>
                      </Col>
                    </Row>

                  </ModalBody>
                  <ModalFooter>
                    <Button color="success" type="submit" className="btn-square">Save</Button>&nbsp;
                    <Button color="secondary" className="btn-square" onClick={closeContactModel}>Cancel</Button>
                  </ModalFooter>
              </Form>
              )}
            </Formik>
          </Modal>
        </div>
    )
  }
}

export default ContactModal