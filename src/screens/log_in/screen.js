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
import { Message } from 'components'
import ReCaptcha from "@matt-block/react-recaptcha-v2";
import config from 'constants/config'

import { AuthActions } from 'services/global'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    authActions: bindActionCreators(AuthActions, dispatch)
  })
}

class LogIn extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
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

    this.props.authActions.logIn(data).then(res => {
      this.setState({
        alert: null
      })

      if(res.status == 202) {
        window.location.href= '/2fa'
      }

      this.props.authActions.getSelfUser().then(res => {
        const preUrl = `/${res.data.user.username}/dashboard`
        window.location.href = preUrl
      })
    }).catch(err => {
      let errMsg = 'Invalid Email or Password. Please try again.'

      if(err.status == 403)
        errMsg = 'reCAPTCHA verification failed, please try again.'

      this.setState({
        alert: <Message
          type="danger"
          content={errMsg}
        />
      })
    })
  }

  render() {
    return (
      <div className="log-in-screen">
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
                    <Card>
                      <CardBody className="p-4 bg-gray-100">
                        <Formik
                          initialValues={{email: '', password: ''}}
                          onSubmit={(values) => {
                            this.handleSubmit(values)
                          }}
                          validationSchema={Yup.object().shape({
                            email: Yup.string()
                              .email('Please enter the valid email')
                              .required('Email is required'),
                            password: Yup.string()
                              .required("Password is required")
                          })}>
                            {props => (
                              <Form onSubmit={props.handleSubmit}>
                                <h4 className="text-center mb-4">Log In</h4>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="email">Email</Label>
                                  <Input
                                    type="email"
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
                                      Sign In
                                    </Button>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <FormGroup className="mb-0 text-center mt-3">
                                      <Link to="/password/new">
                                        <Label style={{cursor: 'pointer'}}><b>Forgot Password?</b></Label>
                                      </Link>
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </Form> )}
                        </Formik>
                      </CardBody>
                    </Card>
                    <Card className="second-card text-white bg-primary d-md-down-none">
                      <CardBody className="text-center bg-primary flex align-items-center">
                          <h2><b>Hello friend!</b></h2>
                          <p style={{width: '70%'}}>Enter your personal info and star journey with us.</p>
                          <Link to="/register">
                            <Button
                              color="primary"
                              active
                            >
                              Sign Up
                            </Button>
                          </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
