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
import _ from 'lodash'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {
  selectOptionsFactory
} from 'utils'
import {
  CommonActions
} from 'services/global'
import * as createBankAccountActions from './actions'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
    account_type_list: state.bank_account.account_type_list,
    currency_list: state.bank_account.currency_list,
    country_list: state.bank_account.country_list
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    commonActions: bindActionCreators(CommonActions, dispatch),
    createBankAccountActions: bindActionCreators(createBankAccountActions, dispatch)
  })
}

class CreateBankAccount extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      createMore: false,

      initialVals: {
        account_name: 'test',
        currency: null,
        opening_balance: 2323,
        account_type: null,
        bank_name: 'DKL',
        account_number: '29340234',
        iban_number: '23424323',
        swift_code: '2342342',
        country: null,
        account_is_for: null
      },
      currentData: {}
    }

    this.initializeData = this.initializeData.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    this.initializeData()
  }

  initializeData () {
    this.props.createBankAccountActions.getAccountTypeList()
    this.props.createBankAccountActions.getCurrencyList()
    this.props.createBankAccountActions.getCountryList()
  }

  handleChange (e, name) {
    this.setState({
      currentData: _.set(
        { ...this.state.currentData },
        e.target.name && e.target.name !== '' ? e.target.name : name,
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
      )
    })
  }

  handleSubmit (data) {
    const {
      account_name,
      currency,
      opening_balance,
      account_type,
      bank_name,
      account_number,
      iban_number,
      swift_code,
      country,
      account_is_for
    } = data
    let obj = {
      bankAccountName: account_name,
      bankAccountCurrency: currency.value,
      openingBalance: opening_balance,
      bankAccountType: account_type.value,
      bankName: bank_name,
      accountNumber: account_number,
      ibanNumber: iban_number,
      swiftCode: swift_code,
      bankCountry: country.value,
      personalCorporateAccountInd: account_is_for.value
    }
    this.props.createBankAccountActions.createBankAccount(obj).then(res => {
      this.props.commonActions.tostifyAlert('success', 'Creted Successfully.')
      if (this.state.createMore) {
        this.setState({
          createMore: false
        })
      } else {
        this.props.history.push('/admin/banking/bank-account')
      }
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.data ? err.data.message : null)
    })
  }

  render() {

    const {
      account_type_list,
      currency_list,
      country_list
    } = this.props

    const {
      initialVals
    } = this.state

    return (
      <div className="create-bank-account-screen">
        <div className="animated fadeIn">
          <Row>
            <Col lg={12} className="mx-auto">
              <Card>
                <CardHeader>
                  <Row>
                    <Col lg={12}>
                      <div className="h4 mb-0 d-flex align-items-center">
                        <i className="fas fa-university" />
                        <span className="ml-2">Create Bank Account</span>
                      </div>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={12}>
                      <Formik
                        initialValues={initialVals}
                        onSubmit={(values, {resetForm}) => {
                          this.handleSubmit(values)
                          resetForm(initialVals)
                        }}
                        validationSchema={Yup.object().shape({
                          account_name: Yup.string()
                            .required('Account Name is Required'),
                          currency: Yup.object().shape({
                            label: Yup.string().required(),
                            value: Yup.string().required(),
                          }),
                          account_type: Yup.object().shape({
                            label: Yup.string().required(),
                            value: Yup.string().required(),
                          }),
                          bank_name: Yup.string()
                            .required('Bank Name is Required'),
                          account_number: Yup.string()
                            .required('Account Number is Required'),
                          iban_number: Yup.string()
                            .required('IBAN Number is Required'),
                          swift_code: Yup.string()
                            .required('Swift Code is Required'),
                          country: Yup.object().shape({
                            label: Yup.string().required(),
                            value: Yup.string().required(),
                          }),
                          account_is_for: Yup.object().shape({
                            label: Yup.string().required(),
                            value: Yup.string().required()
                          })
                        })}
                      >
                        {
                          props => (
                            <Form onSubmit={props.handleSubmit}>
                              <Row>
                                <Col lg={4}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="account_name">Account Name</Label>
                                    <Input
                                      type="text"
                                      id="account_name"
                                      name="account_name"
                                      placeholder="Enter Account Name"
                                      value={props.values.account_name}
                                      onChange={props.handleChange}
                                      className={
                                        props.errors.account_name && props.touched.account_name
                                          ? 'is-invalid'
                                          : ''
                                      }
                                    />
                                  </FormGroup>
                                </Col>
                                <Col lg={4}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="currency">Currency</Label>
                                    <Select
                                      className="select-default-width"
                                      id="currency"
                                      name="currency"
                                      options={selectOptionsFactory.renderOptions('currencyName', 'currencyCode', currency_list)}
                                      value={props.values.currency}
                                      onChange={option => props.handleChange('currency')(option)}
                                      className={
                                        props.errors.currency && props.touched.currency
                                          ? 'is-invalid'
                                          : ''
                                      }
                                    />
                                  </FormGroup>
                                </Col>
                                <Col lg={4}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="opening_balance">Opening Balance</Label>
                                    <Input
                                      type="number"
                                      id="opening_balance"
                                      name="opening_balance"
                                      placeholder="Your Opening Balance"
                                      value={props.values.opening_balance}
                                      onChange={props.handleChange}
                                      className={
                                        props.errors.opening_balance && props.touched.opening_balance
                                          ? 'is-invalid'
                                          : ''
                                      }
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={4}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="account_type">Account Type</Label>
                                    <Select
                                      className="select-default-width"
                                      id="account_type"
                                      name="account_type"
                                      options={selectOptionsFactory.renderOptions('name', 'id', account_type_list)}
                                      value={props.values.account_type}
                                      onChange={option => props.handleChange('account_type')(option)}
                                      className={
                                        props.errors.account_type && props.touched.account_type
                                          ? 'is-invalid'
                                          : ''
                                      }
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <hr />
                              <Row>
                                <Col lg={4}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="bank_name">Bank Name</Label>
                                    <Input
                                      type="text"
                                      id="bank_name"
                                      name="bank_name"
                                      placeholder="Enter Bank Name"
                                      value={props.values.bank_name}
                                      onChange={props.handleChange}
                                      className={
                                        props.errors.bank_name && props.touched.bank_name
                                          ? 'is-invalid'
                                          : ''
                                      }
                                    />
                                  </FormGroup>
                                </Col>
                                <Col lg={4}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="account_number">Account Number</Label>
                                    <Input
                                      type="text"
                                      id="account_number"
                                      name="account_number"
                                      placeholder="Enter Account Number"
                                      value={props.values.account_number}
                                      onChange={props.handleChange}
                                      className={
                                        props.errors.account_number && props.touched.account_number
                                          ? 'is-invalid'
                                          : ''
                                      }
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={4}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="iban_number">IBAN Number</Label>
                                    <Input
                                      type="text"
                                      id="iban_number"
                                      name="iban_number"
                                      placeholder="Enter IBAN Number"
                                      value={props.values.iban_number}
                                      onChange={props.handleChange}
                                      className={
                                        props.errors.iban_number && props.touched.iban_number
                                          ? 'is-invalid'
                                          : ''
                                      }
                                    />
                                  </FormGroup>
                                </Col>
                                <Col lg={4}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="swift_code">Swift Code</Label>
                                    <Input
                                      type="text"
                                      id="swift_code"
                                      name="swift_code"
                                      placeholder="Enter Swift Code"
                                      value={props.values.swift_code}
                                      onChange={props.handleChange}
                                      className={
                                        props.errors.swift_code && props.touched.swift_code
                                          ? 'is-invalid'
                                          : ''
                                      }
                                    />
                                  </FormGroup>
                                </Col>
                                <Col lg={4}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="country">Country</Label>
                                    <Select
                                      className="select-default-width"
                                      id="country"
                                      name="country"
                                      options={selectOptionsFactory.renderOptions('countryName', 'countryCode', country_list)}
                                      value={props.values.country}
                                      onChange={option => props.handleChange('country')(option)}
                                      className={
                                        props.errors.country && props.touched.country
                                          ? 'is-invalid'
                                          : ''
                                      }
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={4}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="account_is_for">Account is for</Label>
                                    <Select
                                      className="select-default-width"
                                      id="account_is_for"
                                      name="account_is_for"
                                      options={[
                                        {label: 'Personal', value: 'Personal'},
                                        {label: 'Corporate', value: 'Corporate'}
                                      ]}
                                      value={props.values.account_is_for}
                                      onChange={option => props.handleChange('account_is_for')(option)}
                                      className={
                                        props.errors.account_is_for && props.touched.account_is_for
                                          ? 'is-invalid'
                                          : ''
                                      }
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={12}>
                                  <FormGroup className="text-right mt-5">
                                    <Button type="submit" name="submit" color="primary" className="btn-square mr-3">
                                      <i className="fa fa-dot-circle-o"></i> Create
                                    </Button>
                                    <Button type="button" name="button" color="primary" className="btn-square mr-3"
                                      onClick={() => {
                                        this.setState({createMore: true}, () => {
                                          props.handleSubmit()
                                        })
                                      }}
                                    >
                                      <i className="fa fa-repeat"></i> Create and More
                                    </Button>
                                    <Button type="button" name="button" color="secondary" className="btn-square" 
                                      onClick={() => {this.props.history.push('/admin/banking/bank-account')}}>
                                      <i className="fa fa-ban"></i> Cancel
                                    </Button>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Form>
                          )
                        }
                      </Formik>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateBankAccount)
