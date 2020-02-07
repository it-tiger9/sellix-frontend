import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Input,
  Form,
  FormGroup,
  Label,
  Row,
  Col
} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import Select from 'react-select'
import _ from 'lodash'
import { Loader } from 'components'

import 'react-toastify/dist/ReactToastify.css'
import './style.scss'

import * as VatActions from '../../actions'

import { Formik } from 'formik';
import * as Yup from "yup";


const mapStateToProps = (state) => {
  return ({
    vat_row: state.vat.vat_row
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    vatActions: bindActionCreators(VatActions, dispatch)
  })
}

const CHART_ACCOUNT_TYPES = [
  { value: 1, label: 'Sales'},
  { value: 2, label: 'Cost of Sales'}
]

class DetailChartAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initValue: {code: '', account: '', type:''},
      loading: false,
      readMore: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.success = this.success.bind(this)
  }

  componentDidMount() {
  }


  // Show Success Toast
  success() {
    toast.success('Vat Code Updated successfully... ', {
      position: toast.POSITION.TOP_RIGHT
    })
  }

  // Create or Edit Vat
  handleSubmit(data) {
    this.props.vatActions.createBat(data).then(res => {
      if (res.status === 200) {
        this.success()

        if(this.state.readMore){
          this.setState({
            readMore: false
          })
        } else this.props.history.push('/admin/master/vat-code')
      }
    })
  }

  render() {
    const { loading } = this.state

    return (
      <div className="chart-account-screen">
        <div className="animated fadeIn">
          
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <div className="h4 mb-0 d-flex align-items-center">
                    <i className="nav-icon fas fa-area-chart" />
                    <span className="ml-2">Update Chart Account</span>
                  </div>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg={6}>
                      <Formik
                        initialValues={this.state.initValue}
                        onSubmit={(values, {resetForm}) => {
                          
                          this.handleSubmit(values)
                          resetForm(this.state.initValue)
                        }}
                        validationSchema={Yup.object().shape({
                          code: Yup.string()
                            .required("Code Name is Required"),
                          account: Yup.string()
                            .required("Account is Required"),
                          type: Yup.string()
                            .required("Type is Required")
                        })}>
                          {props => (
                            <Form onSubmit={props.handleSubmit} name="simpleForm">
                              <FormGroup>
                                <Label htmlFor="">Code</Label>
                                <Input
                                  type="text"
                                  id="code"
                                  name="code"
                                  placeholder="Enter Code"
                                  onChange={props.handleChange}
                                  value={props.values.code}
                                  className={
                                    props.errors.code && props.touched.code
                                      ? "is-invalid"
                                      : ""
                                  }
                                />
                                {props.errors.code && props.touched.code && (
                                  <div className="invalid-feedback">{props.errors.code}</div>
                                )}
                              </FormGroup>
                              <FormGroup>
                                <Label htmlFor="name">Account</Label>
                                <Input
                                  type="text"
                                  id="name"
                                  name="account"
                                  placeholder="Enter account"
                                  onChange={props.handleChange}
                                  value={props.values.account}
                                  className={
                                    props.errors.account && props.touched.account
                                      ? "is-invalid"
                                      : ""
                                  }
                                />
                                {props.errors.account && props.touched.account && (
                                  <div className="invalid-feedback">{props.errors.account}</div>
                                )}
                              </FormGroup>       
                              <FormGroup>
                              <Label htmlFor="name">Type</Label>
                                <Select
                                  className="select-default-width"
                                  options={CHART_ACCOUNT_TYPES}
                                  onChange={(option) => {
                                    this.setState({
                                      selectedType: option.value
                                    })
                                    props.handleChange("type")(option.value);
                                  }}
                                  placeholder="Select Type"
                                  value={this.state.selectedType}
                                  id="type"
                                  name="type"
                                  className={
                                    props.errors.type && props.touched.type
                                      ? "is-invalid"
                                      : ""
                                  }
                                />
                                {props.errors.type && props.touched.type && (
                                  <div className="invalid-feedback">{props.errors.type}</div>
                                )}     
                              </FormGroup>
                              <Row>
                                <Col lg={12} className="d-flex flex-wrap align-items-center justify-content-between mt-5">
                                  <FormGroup>
                                    <Button type="button" color="danger" className="btn-square">
                                      <i className="fa fa-trash"></i> Delete
                                    </Button>
                                  </FormGroup>
                                  <FormGroup className="text-right">
                                    <Button type="submit" name="submit" color="primary" className="btn-square mr-3">
                                      <i className="fa fa-dot-circle-o"></i> Update
                                    </Button>
                                    <Button type="button" color="secondary" className="btn-square"
                                      onClick={() => {this.props.history.push('/admin/master/chart-account')}}>
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
          {loading ? (
            <Loader></Loader>
          ) : (
              ""
            )}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailChartAccount)
