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
  twoFactorAuthentication: bindActionCreators(AuthActions.twoFactorAuthentication, dispatch)
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
    let { tostifyAlert, getSelfUser, twoFactorAuthentication, history } = this.props;

    if(!captchaVerify) {
      tostifyAlert('error', 'reCAPTCHA verification failed, please try again.')
      return false
    }

    data.captcha = captchaVerify;
    
    twoFactorAuthentication(data)
        .then(() => {
          return getSelfUser()
        })
        .then(({ data: { user }}) => {
          history.push(`/${user.username}/dashboard`)
        })
        .catch(err => {
            let errMsg = err.status === 403 ? 'reCAPTCHA verification failed, please try again.' : 'Invalid Code'
            tostifyAlert('error', errMsg)
        })
  }

  render() {

    let validationSchema = Yup.object()
        .shape({
          code: Yup.string()
            .required('Code is required'),
        });

    return (
      <div className="bg-white">
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
                                    <Button color="primary" type="submit">Send Code</Button>
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
