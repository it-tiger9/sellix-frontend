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
    
    this.props.authActions.twoFactorAuthentication(data).then(res => {
      this.setState({
        alert: null
      })

      const preUrl = `/${window.localStorage.getItem('userId')}/dashboard`
      window.location.href= preUrl
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
                  <CardGroup>
                    <Card>
                      <CardBody className="p-5 bg-gray-100">
                        <Formik
                          initialValues={{code: ''}}
                          onSubmit={(values) => {
                            this.handleSubmit(values)
                          }}
                          validationSchema={Yup.object().shape({
                            code: Yup.string()
                              .required('Code is required'),
                          })}>
                            {props => (
                              <Form onSubmit={props.handleSubmit}>
                                <h4 className="text-center mb-4">Log In</h4>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="code">Code</Label>
                                  <Input
                                    type="text"
                                    id="code"
                                    name="code"
                                    placeholder="Code"
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
                                      Send Code
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
