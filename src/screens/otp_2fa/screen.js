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

class OTPLogin extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      captchaVerify: null,
      loading: false,
      qr_image: '',
      recover_key: ''
    }
  }

  handleSubmit = (data) => {
    let { tostifyAlert, history } = this.props;

    this.props.authActions.OTPAuthentication(data)
      .then(() => {
        this.props.authActions.getSelfUser().then(res => {
          history.push(`/dashboard`)
        })
      })
      .catch(err => {
          let errMsg = 'Invalid Code'
          tostifyAlert('error', errMsg)
      })
  }


  componentDidMount() {

  }

  render() {
    const { qr_image, loading, recover } = this.state

    let validationSchema = Yup.object()
        .shape({
          code: Yup.string()
            .required('Code is required')
            .min(6, 'OTP code must 6 characters long')
            .max(6, 'OTP code must 6 characters long')
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
                                <p className="mt-4 mb-4 text-grey">
                                You have setup a one time password for your multi factor authentication, please use Google Authenticator or any similar to get the code and proceed with the login.
                                </p>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="code">Code</Label>
                                  <Input
                                    type="text"
                                    id="code"
                                    name="code"
                                    placeholder="Enter the OTP code"
                                    onChange={handleChange}
                                    value={values.code}
                                    className={errors.code && touched.code ? "is-invalid" : ""}
                                  />
                                  {errors.code && touched.code && <div className="invalid-feedback">{errors.code}</div>}
                                </FormGroup>
                                
                                <Row>
                                  <Col lg={12} className="text-center mt-4">
                                    <Button color="primary" type="submit">Send Code</Button>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <FormGroup className="mb-0 text-center mt-3">
                                      <Link to="/login">
                                        <Label style={{cursor: 'pointer'}}><b>Login?</b></Label>
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

export default connect(null, mapDispatchToProps)(OTPLogin)
