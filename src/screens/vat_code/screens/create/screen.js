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
import _ from 'lodash'
import { Loader } from 'components'
import {
  selectOptionsFactory
} from 'utils'
import {
  CommonActions
} from 'services/global'

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
    commonActions: bindActionCreators(CommonActions, dispatch),
    vatActions: bindActionCreators(VatActions, dispatch)
  })
}

class CreateVatCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initValue: {name: '', vat: ''},
      loading: false,
      readMore: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.success = this.success.bind(this)
  }

  componentDidMount() {
  }

  // Save Updated Field's Value to State
  handleChange(e, name) {
    this.setState({
      vatData: _.set(
        { ...this.state.vatData },
        e.target.name && e.target.name !== '' ? e.target.name : name,
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
      )
    })
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
        this.props.commonActions.tostifyAlert('success', 'New vat code is created successfully!')

        if(this.state.readMore){
          this.setState({
            readMore: false
          })
        } else this.props.history.push('/admin/master/vat-code')
      }
    }).catch(err => {
      console.log(err)
      this.props.commonActions.tostifyAlert('error', err.data.message)
    })
  }

  render() {
    const { loading } = this.state

    return (
      <div className="vat-code-create-screen">
        <div className="animated fadeIn">
          
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <div className="h4 mb-0 d-flex align-items-center">
                    <i className="nav-icon icon-briefcase" />
                    <span className="ml-2">New Vat Code</span>
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
                          name: Yup.string()
                            .required("Vat Code Name is Required"),
                          vat: Yup.string()
                            .required("Vat Percentage is Required")
                        })}>
                          {props => (
                            <Form onSubmit={props.handleSubmit} name="simpleForm">
                              <FormGroup>
                                <Label htmlFor="name">Vat Code Name</Label>
                                <Input
                                  type="text"
                                  id="name"
                                  name="name"
                                  placeholder="Enter Vat Code Name"
                                  onChange={props.handleChange}
                                  value={props.values.name}
                                  className={
                                    props.errors.name && props.touched.name
                                      ? "is-invalid"
                                      : ""
                                  }
                                />
                                {props.errors.name && props.touched.name && (
                                  <div className="invalid-feedback">{props.errors.name}</div>
                                )}
                              </FormGroup>
                              <FormGroup>
                                <Label htmlFor="name">Percentage</Label>
                                <Input
                                  type="number"
                                  id="name"
                                  name="vat"
                                  placeholder="Enter Percentage"
                                  onChange={props.handleChange}
                                  value={props.values.vat}
                                  className={
                                    props.errors.vat && props.touched.vat
                                      ? "is-invalid"
                                      : ""
                                  }
                                />
                                {props.errors.vat && props.touched.vat && (
                                  <div className="invalid-feedback">{props.errors.vat}</div>
                                )}
                              </FormGroup>            
                              <FormGroup className="text-right mt-5">
                                <Button type="submit" name="submit" color="primary" className="btn-square mr-3">
                                  <i className="fa fa-dot-circle-o"></i> Create
                                </Button>
                                <Button name="button" color="primary" className="btn-square mr-3" 
                                  onClick={() => {
                                    this.setState({readMore: true})
                                    props.handleSubmit()
                                  }}>
                                  <i className="fa fa-refresh"></i> Create and More
                                </Button>
                                <Button type="submit" color="secondary" className="btn-square"
                                  onClick={() => {this.props.history.push('/admin/master/vat-code')}}>
                                  <i className="fa fa-ban"></i> Cancel
                                </Button>
                              </FormGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateVatCode)
