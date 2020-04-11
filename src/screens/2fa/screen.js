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
import ReCAPTCHA from "react-google-recaptcha";
import config from 'constants/config'

import { AuthActions, CommonActions } from 'services/global'

import './style.scss'

const mapDispatchToProps = dispatch => ({
  tostifyAlert: bindActionCreators(CommonActions.tostifyAlert, dispatch),
  authActions: bindActionCreators(AuthActions, dispatch)
})

const user = window.localStorage.getItem('userId')

class LogIn extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      captchaVerify: null
    }

    this.captcha = {}
  }

  handleSubmit = (data) => {

    let { captchaVerify } = this.state;
    let { tostifyAlert, history } = this.props;

    if(!captchaVerify) {
      tostifyAlert('error', 'reCAPTCHA verification failed, please try again.')
      return false
    }

    data.captcha = captchaVerify;
    
    this.props.authActions.EmailAuthentication(data)
      .then(res => {
        if(res.status === 202) {
          if(res.data.type == 'email')
            history.push('/auth/email')
          else if(res.data.type == 'otp')
            history.push('/auth/otp')
        }

        if(res.status === 200)
          this.props.authActions.getSelfUser().then(res => {
            window.location.href = (`/dashboard/${res.data.user.username}/home`)
          })

      })
      .catch(err => {
          console.log(err)
          let errMsg = 'Invalid Code'
          tostifyAlert('error', errMsg)
          this.captcha.reset()
      })
  }

  render() {

    let validationSchema = Yup.object()
        .shape({
          code: Yup.string()
            .required('Code is required'),
        });

    return (
      <div className="log-in-screen bg-white">
        <div className="animated fadeIn">
          <div className="app flex-row align-items-center">
            <Container>
              <Row className="justify-content-center">
                <Col lg="6">
                  <CardGroup>
                    <Card>
                      <CardBody className="p-5 bg-gray-100">
                        <Formik
                          initialValues={{ code: '' }}
                          onSubmit={this.handleSubmit}
                          validationSchema={validationSchema}
                        >
                          {({ handleSubmit, handleChange, values, errors, touched }) => (
                              <Form onSubmit={handleSubmit}>
                                <h4 className="text-center mb-4">Log In</h4>
                                <p className="mt-4 mb-4 text-grey">You have setup the multi factor authentication with your email, please check your emails to get the code needed to proceed with the login</p>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="code">Code</Label>
                                  <Input
                                    type="text"
                                    id="code"
                                    name="code"
                                    placeholder="Code"
                                    onChange={handleChange}
                                    value={values.code}
                                    className={errors.code && touched.code ? "is-invalid" : ""}
                                  />
                                  {errors.code && touched.code && <div className="invalid-feedback">{errors.code}</div>}
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
                                    <Button color="primary" type="submit">Send Code</Button>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <FormGroup className="mb-0 text-center mt-3">
                                      <Link to="/auth/password/reset">
                                        <Label style={{cursor: 'pointer'}}><b>Forgot Password?</b></Label>
                                      </Link>
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </Form>
                            )}

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

export default connect(null, mapDispatchToProps)(LogIn)
