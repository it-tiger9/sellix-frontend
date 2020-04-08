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

import { AuthActions, CommonActions } from 'services/global'

import './style.scss'

const mapDispatchToProps = dispatch => ({
    tostifyAlert: bindActionCreators(CommonActions.tostifyAlert, dispatch),
    authActions: bindActionCreators(AuthActions, dispatch)
})

class LogIn extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      captchaVerify: null
    }
  }

  handleSubmit = (data) => {

    let { captchaVerify } = this.state;
    let { tostifyAlert, history } = this.props;
    let { logIn, getSelfUser } = this.props.authActions;

    if(!captchaVerify) {
      tostifyAlert('error', 'reCAPTCHA verification failed, please try again.')
      return false
    }

    data.captcha = captchaVerify

    logIn(data)
      .then(res => {
 
        if(res.status === 202) {
          if(res.data.type == 'email')
            history.push('/email-2fa')
          else if(res.data.type == 'otp')
            history.push('/otp-2fa')
        }

        if(res.status === 200)
          getSelfUser().then(res => {
            history.push(`/dashboard`);
          })
      })
      .catch(err => {
          let errMsg = err.status === 403 ? 'reCAPTCHA verification failed, please try again.' : 'Invalid Email or Password. Please try again.';
          tostifyAlert('error', errMsg)
      })
  }

  render() {

    let initialValues = { email: '', password: '' };
    let validationSchema = Yup.object()
        .shape({
          email: Yup.string()
              .email('Please enter the valid email')
              .required('Email is required'),
          password: Yup.string()
              .required("Password is required")
        });

    return (
      <div className="log-in-screen">
        <div className="animated fadeIn">
          <div className="app flex-row align-items-center">
            <Container>
              <Row className="justify-content-center">
                <Col md="11">
                  <CardGroup>
                    <Card>
                      <CardBody className="p-4 bg-gray-100">
                        <Formik
                          initialValues={initialValues}
                          onSubmit={this.handleSubmit}
                          validationSchema={validationSchema}
                        >
                            {({ handleSubmit, handleChange, values, errors, touched }) =>
                                <Form onSubmit={handleSubmit}>
                                
                                  <h4 className="text-center mb-4">Log In</h4>

                                  <FormGroup className="mb-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        onChange={handleChange}
                                        value={values.email}
                                        className={errors.email && touched.email ? "is-invalid" : ""}
                                    />
                                    {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
                                  </FormGroup>

                                  <FormGroup className="mb-4">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        value={values.password}
                                        className={errors.password && touched.password ? "is-invalid" : ""}
                                    />
                                    {errors.password && touched.password && <div className="invalid-feedback">{errors.password}</div>}
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
                                      <Button color="primary" type="submit">
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
                                </Form>
                            }
                        </Formik>
                      </CardBody>
                    </Card>
                    <Card className="second-card text-white bg-primary d-md-down-none">
                      <CardBody className="text-center bg-primary flex align-items-center">
                          <h2><b>Hello friend!</b></h2>
                          <p style={{ width: '70%' }}>Enter your personal info and star journey with us.</p>
                          <Link to="/register">
                            <Button color="primary" active>
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

export default connect(null, mapDispatchToProps)(LogIn)
