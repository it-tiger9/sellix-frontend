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
  Loader,
  ConfirmDeleteModal
} from 'components'
import {
  selectOptionsFactory
} from 'utils'
import {
  CommonActions
} from 'services/global'
import * as detailBankAccountActions from './actions'

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
    detailBankAccountActions: bindActionCreators(detailBankAccountActions, dispatch)
  })
}

class DetailBankAccount extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      dialog: null,

      current_bank_account_id: null,
      current_bank_account: null,

      initialVals: null,
      currentData: {}
    }

    this.initializeData = this.initializeData.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.closeBankAccount = this.closeBankAccount.bind(this)
    this.removeBankAccount = this.removeBankAccount.bind(this)
    this.removeDialog = this.removeDialog.bind(this)

  }

  componentDidMount () {
    if (this.props.location.state && this.props.location.state.bankAccountId) {
      this.initializeData()
      this.setState({
        current_bank_account_id: this.props.location.state.bankAccountId
      }, () => {
        this.props.detailBankAccountActions.getBankAccountByID(this.state.current_bank_account_id).then(res => {
          this.setState({
            current_bank_account: res,
            initialVals: {
              account_name: res.bankAccountName,
              currency: res.bankAccountCurrency ? {
                label: res.bankAccountCurrency.currencyName,
                value: res.bankAccountCurrency.currencyCode
              } : null,
              opening_balance: res.openingBalance,
              account_type: res.bankAccountType ? {
                label: res.bankAccountType.name,
                value: res.bankAccountType.id
              } : null,
              bank_name: res.bankName,
              account_number: res.accountNumber,
              iban_number: res.ibanNumber,
              swift_code: res.swiftCode,
              country: res.bankCountry ? {
                label: res.bankCountry.countryName,
                value: res.bankCountry.countryCode
              } : null,
              account_is_for: res.personalCorporateAccountInd == 'P' ? {
                label: 'Personal',
                value: 'Personal'
              } : res.personalCorporateAccountInd == 'C' ? {
                label: 'Corporate',
                value: 'Corporate'
              } : null,
            }
          })
        }).catch(err => {
          this.props.commonActions.tostifyAlert('error', err.data ? err.data.message : null)
          this.props.history.push('/admin/banking/bank-account')
        })
      })
    } else {
      this.props.history.push('/admin/banking/bank-account')
    }
  }

  initializeData () {
    this.props.detailBankAccountActions.getAccountTypeList()
    this.props.detailBankAccountActions.getCurrencyList()
    this.props.detailBankAccountActions.getCountryList()
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
    let obj = {
      bankAccountId: this.state.current_bank_account_id,
      bankAccountName: data.account_name,
      bankAccountCurrency: data.currency.value,
      personalCorporateAccountInd: data.account_is_for.value == 'Personal' ? 'P' :
        data.account_is_for.value == 'Corporate' ? 'C' : '',
      bankName: data.bank_name,
      accountNumber: data.account_number,
      ibanNumber: data.iban_number,
      swiftCode: data.swift_code,
      openingBalance: data.opening_balance,
      bankCountry: data.country.value,
      bankAccountType: data.account_type.value
    }
    this.props.detailBankAccountActions.updateBankAccount(obj).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.data ? err.data.message : null)
    })
  }

  closeBankAccount () {
    this.setState({
      dialog: <ConfirmDeleteModal
        isOpen={true}
        okHandler={this.removeBankAccount}
        cancelHandler={this.removeDialog}
      />
    })
  }

  removeBankAccount () {
    let {
      current_bank_account_id
    } = this.state
    this.removeDialog()
    this.props.detailBankAccountActions.removeBankAccountByID(current_bank_account_id).then(() => {
      this.props.commonActions.tostifyAlert('success', 'Removed Successfully')
      this.props.history.push('/admin/banking/bank-account')
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.data ? err.data.message : null)
    })
  }

  removeDialog () {
    this.setState({
      dialog: null
    })
  }

  render() {

    const {
      account_type_list,
      currency_list,
      country_list
    } = this.props

    const {
      initialVals,
      current_bank_account,
      dialog
    } = this.state

    return (
      <div className="detail-bank-account-screen">
        <div className="animated fadeIn">
          { dialog }
          <Card>
            <CardHeader>
              <Row>
                <Col lg={12}>
                  <div className="h4 mb-0 d-flex align-items-center">
                    <i className="fas fa-university" />
                    <span className="ml-2">Update Bank Account {
                      current_bank_account ? ` - ${current_bank_account.bankAccountName}` : ''
                    }
                    </span>
                  </div>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <Col lg={12}>
                  {
                    initialVals ?
                      <Formik
                        initialValues={initialVals}
                        onSubmit={(values, {resetForm}) => {
                          this.handleSubmit(values)
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
                                  <FormGroup className="">
                                    <Label htmlFor="account_type">
                                      Account Type
                                    </Label>
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
                                <Col lg={12} className="d-flex align-items-center justify-content-between flex-wrap mt-5">
                                  <FormGroup>
                                    <Button type="button" name="button" color="danger" className="btn-square"
                                      onClick={this.closeBankAccount}
                                    >
                                      <i className="fa fa-trash"></i> Close
                                    </Button>
                                  </FormGroup>
                                  <FormGroup className="text-right">
                                    <Button type="submit" name="submit" color="primary" className="btn-square mr-3">
                                      <i className="fa fa-dot-circle-o"></i> Update
                                    </Button>
                                    <Button type="button" name="button" color="secondary" className="btn-square" 
                                      onClick={() => {this.props.history.push("/admin/banking/bank-account")}}>
                                      <i className="fa fa-ban"></i> Cancel
                                    </Button>
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Form>
                          )
                        }
                      </Formik>
                    :
                      <Loader />
                  }
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailBankAccount)
