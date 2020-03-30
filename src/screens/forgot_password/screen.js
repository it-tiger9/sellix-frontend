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

class ForgotPassword extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      alert: null,
      captchaVerify: null,
      emailSent: false
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
    this.props.authActions.requestNewPassword(data).then(res => {
      this.setState({
        alert: null
      })

      this.setState({
        emailSent: true,
        alert: <Message
          type="success"
          content="Email has been sent successfully. You will receive an email with instructions for how to confirm your email address in a few minutes."
        />
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
    const  {emailSent} = this.state

    return (
      <div className="bg-white">
        <div className="animated fadeIn">
          <div className="app flex-row align-items-center">
            <Container>
              <Row className="justify-content-center">
                <Col md="8">
                  { this.state.alert }
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col lg="6">
                    <Card>
                      <CardBody className="p-5 bg-gray-100">
                        <Formik
                          initialValues={{email: '', password: ''}}
                          onSubmit={(values) => {
                            this.handleSubmit(values)
                          }}
                          validationSchema={Yup.object().shape({
                            email: Yup.string()
                              .email('Please enter the valid email')
                              .required('Email is required'),
                          })}>
                            {props => (
                              <Form onSubmit={props.handleSubmit}>
                                <h4 className="text-center mb-4">Forgot Password</h4>
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
                                      {emailSent?'Resend Confirmation Email':'Reset my Password'}
                                    </Button>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <FormGroup className="mb-0 text-center mt-3">
                                      <Label className="mr-2">Already have an account? </Label>
                                      <Link to="/login">
                                        <Label style={{cursor: 'pointer'}}><b>Log in</b></Label>
                                      </Link>
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </Form> )}
                        </Formik>
                      </CardBody>
                    </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
