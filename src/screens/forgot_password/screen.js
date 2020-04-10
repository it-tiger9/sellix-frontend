import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Button,
  Card,
  CardBody,
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
import ReCAPTCHA from "react-google-recaptcha";
import config from 'constants/config'

import { AuthActions, CommonActions } from 'services/global'

import './style.scss'

const mapDispatchToProps = dispatch => ({
  requestNewPassword: bindActionCreators(AuthActions.requestNewPassword, dispatch),
  tostifyAlert: bindActionCreators(CommonActions.tostifyAlert, dispatch)
})


class ForgotPassword extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      captchaVerify: null,
      emailSent: false
    }

    this.captcha = {}
  }

  handleSubmit = (data) => {

    let { requestNewPassword, tostifyAlert } = this.props;
    let { captchaVerify } = this.state;

    if(!captchaVerify) {
      tostifyAlert('error', 'reCAPTCHA verification failed, please try again.')
      return
    }

    data.captcha = captchaVerify;

    requestNewPassword(data)
        .then(() => {
            tostifyAlert('success', "Email has been sent successfully. You will receive an email with instructions for how to confirm your email address in a few minutes.")
            this.setState({ emailSent: true });
        }).catch(err => {
            tostifyAlert('error', err.error)
            this.captcha.reset()
        })
  }

  render() {

    let { emailSent } = this.state;
    let initialValues = { email: '', password: '' };
    let validationSchema = Yup.object()
        .shape({
          email: Yup.string()
              .email('Please enter the valid email')
              .required('Email is required'),
        });

    return (
      <div className="bg-white">
        <div className="animated fadeIn">
          <div className="app flex-row align-items-center">
            <Container>
              <Row className="justify-content-center">
                <Col lg="6">
                    <Card>
                      <CardBody className="p-5 bg-gray-100">
                        <Formik
                          initialValues={initialValues}
                          onSubmit={this.handleSubmit}
                          validationSchema={validationSchema}
                        >
                            {({ handleSubmit, handleChange, values, errors, touched}) =>
                                <Form onSubmit={handleSubmit}>
                                  <h4 className="text-center mb-4">Forgot Password</h4>

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

                                  <div className="ml-auto mr-auto recptcah" style={{width: 'fit-content'}}>
                                    <ReCAPTCHA
                                      ref={el => { this.captcha = el }}
                                        sitekey={config.CAPTCHA_SITE_KEY}
                                        theme="light"
                                        size="normal"
                                        onChange={(captcha) => {this.setState({captchaVerify: captcha})}}
                                        onExpired={() => {this.setState({captchaVerify: null})}}
                                        onErrored={() => {this.setState({captchaVerify: null})}}
                                    />
                                  </div>

                                  <Row>
                                    <Col lg={12} className="text-center mt-4">
                                      <Button color="primary" type="submit">
                                        { emailSent ? 'Resend Confirmation Email' : 'Reset my Password' }
                                      </Button>
                                    </Col>
                                  </Row>

                                  <Row>
                                    <Col>
                                      <FormGroup className="mb-0 text-center mt-3">
                                        <Label className="mr-2">Already have an account? </Label>
                                        <Link to="/auth/login">
                                          <Label style={{cursor: 'pointer'}}><b>Log in</b></Label>
                                        </Link>
                                      </FormGroup>
                                    </Col>
                                  </Row>

                                </Form>
                            }
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

export default connect(null, mapDispatchToProps)(ForgotPassword)
