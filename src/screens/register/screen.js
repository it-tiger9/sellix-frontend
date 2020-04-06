import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  Row,
  FormGroup,
  Label
} from 'reactstrap'
import { Formik } from 'formik';
import * as Yup from "yup";
import ReCaptcha from "@matt-block/react-recaptcha-v2";
import config from 'constants/config'

import {
  Message
} from 'components'

import {
  AuthActions,
  CommonActions
} from 'services/global'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
    version: state.common.version
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    commonActions: bindActionCreators(CommonActions, dispatch),
    authActions: bindActionCreators(AuthActions, dispatch)
  })
}

class Register extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      initState: {
        email: '',
        username: '',
        password: '',
        confirm_password: ''
      },
      alert: null,
      captchaVerify: null
    }
  }

  handleSubmit(data) {
    if(!this.state.captchaVerify) {
      this.setState({
        alert: <Message
          type="danger"
          content='reCAPTCHA verification failed, please try again.'
        />
      })

      return false
    }

    data.captcha = this.state.captchaVerify

    let obj = Object.assign({}, data)
    delete obj['confirm_password']
    // delete data['confirm_password']
    this.props.authActions.register(obj).then(res => {
      this.props.commonActions.tostifyAlert('success', 'You are successfully registered, Please login!')

      if(res.status == 202) {
        window.location.href= '/2fa'
      }

      this.props.authActions.checkAuthStatus().then(user => {
        const preUrl = `/${user.username}/dashboard`
        window.location.href = preUrl
      })
    }).catch(err => {
      this.setState({
        alert: <Message
          type="danger"
          content={err.error}
        />
      })
    })
  }

  render() {
    const { initState } = this.state

    return (
      <div className="register-screen">
        <div className="animated fadeIn">
          <div className="app flex-row align-items-center">
            <Container>
              <Row className="justify-content-center">
                <Col md="8">
                  { this.state.alert }
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col md="11">
                  <CardGroup>
                    <Card className="second-card text-white bg-primary d-md-down-none">
                      <CardBody className="text-center bg-primary flex align-items-center">
                          <h2 className="mb-3"><b>Welcome back!</b></h2>
                          <p style={{width: '90%'}}>To keep connected with us please login with your personal info.</p>
                          <Link to="/login">
                            <Button
                              color="primary"
                              active
                            >
                              Sign In
                            </Button>
                          </Link>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody className="p-5 bg-gray-100">
                        <Formik
                          initialValues={initState}
                          onSubmit={(values) => {
                            this.handleSubmit(values)
                          }}
                          validationSchema={Yup.object().shape({
                            email: Yup.string()
                              .email('Please enter the valid email')
                              .required('Email is required'),
                            username: Yup.string()
                              .min(3, 'Username must be at least 3 characters long')
                              .required('Username is required'),
                            password: Yup.string()
                              .min(8, 'Password must be at least 8 characters long')
                              .required("Password is required"),
                            confirm_password: Yup.string()
                              .required("Password confirmation is required")
                              .when("password", {
                                is: val => (val && val.length > 0 ? true : false),
                                then: Yup.string().oneOf(
                                  [Yup.ref("password")],
                                  "Both password need to be the same"
                              )})
                          })}>
                            {props => (
                              <Form onSubmit={props.handleSubmit}>
                                <h4 className="text-center mb-4">Create Account </h4>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="email">Email</Label>
                                  <Input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={props.handleChange}
                                    value={props.values.email}
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
                                <FormGroup className="mb-3">
                                  <Label htmlFor="username">Username</Label>
                                  <Input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    onChange={props.handleChange}
                                    value={props.values.username}
                                    className={
                                      props.errors.username && props.touched.username
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {props.errors.username && props.touched.username && (
                                    <div className="invalid-feedback">{props.errors.username}</div>
                                  )}
                                </FormGroup>
                                <FormGroup className="mb-4">
                                  <Label htmlFor="password">Password</Label>
                                  <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={props.handleChange}
                                    value={props.values.password}
                                    className={
                                      props.errors.password && props.touched.password
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {props.errors.password && props.touched.password && (
                                    <div className="invalid-feedback">{props.errors.password}</div>
                                  )}
                                </FormGroup>
                                <FormGroup className="mb-4">
                                  <Label htmlFor="confirm_password">Password Confirmation</Label>
                                  <Input
                                    type="password"
                                    id="confirm_password"
                                    name="confirm_password"
                                    placeholder="Password Confirmation"
                                    onChange={props.handleChange}
                                    value={props.values.confirm_password}
                                    className={
                                      props.errors.confirm_password && props.touched.confirm_password
                                        ? "is-invalid"
                                        : ""
                                    }
                                  />
                                  {props.errors.confirm_password && props.touched.confirm_password && (
                                    <div className="invalid-feedback">{props.errors.confirm_password}</div>
                                  )}
                                </FormGroup>
                                <div className="ml-auto mr-auto recptcah" style={{width: 'fit-content'}}>
                                  <ReCaptcha
                                    siteKey={config.CAPTCHA_SITE_KEY}
                                    theme="light"
                                    size="normal"
                                    onSuccess={(captcha) => {this.setState({captchaVerify: captcha})}}
                                    onExpire={() => {this.setState({captchaVerify: null})}}
                                    onError={() => {this.setState({captchaVerify: null})}}
                                  />
                                </div>
                                <Row>
                                  <Col lg={12} className="text-center mt-4">
                                    <Button
                                      color="primary"
                                      type="submit"
                                    >
                                      Sign Up
                                    </Button>
                                  </Col>
                                </Row>
                                
                              </Form>)}
                          </Formik>
                      </CardBody>
                    </Card>
                    
                  </CardGroup>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
