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
    data.uniqid = this.props.match.params.id
    this.props.authActions.resetPassword(data).then(res => {
      this.setState({
        alert: null
      })

      this.setState({
        emailSent: true,
        alert: <Message
          type="success"
          content="New password has been set successfully. Please login again with your new password"
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
                          initialValues={{password: ''}}
                          onSubmit={(values) => {
                            this.handleSubmit(values)
                          }}
                          validationSchema={Yup.object().shape({
                            password: Yup.string()
                              .required('Password is required'),
                          })}>
                            {props => (
                              <Form onSubmit={props.handleSubmit}>
                                <h4 className="text-center mb-4">Reset Password</h4>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="email">New Password</Label>
                                  <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="New Password"
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
