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

import { AuthActions, CommonActions } from 'services/global'

import './style.scss'


const mapDispatchToProps = (dispatch) => ({
  tostifyAlert: bindActionCreators(CommonActions.tostifyAlert, dispatch),
  resetPassword: bindActionCreators(AuthActions.resetPassword, dispatch)
})

class ForgotPassword extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      emailSent: false
    }
  }

  handleSubmit = (data) => {

    let { resetPassword, tostifyAlert, match } = this.props;
    let { id } = match.params;

    data.uniqid = id;

    resetPassword(data)
        .then(() => {
            tostifyAlert('success', "New password has been set successfully. Please login again with your new password")
        })
        .catch(err => {
            tostifyAlert('error', err.error)
        })
  }

  render() {

    let { emailSent } = this.state;
    let validationSchema = Yup.object()
        .shape({
          password: Yup.string()
            .required('Password is required')
        })

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
                          onSubmit={this.handleSubmit}
                          validationSchema={validationSchema}
                        >
                            {({ handleSubmit, handleChange, values, errors, touched }) => (
                              <Form onSubmit={handleSubmit}>
                                <h4 className="text-center mb-4">Reset Password</h4>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="email">New Password</Label>
                                  <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="New Password"
                                    onChange={handleChange}
                                    value={values.password}
                                    className={errors.password && touched.password ? "is-invalid" : ""}
                                  />
                                  {errors.password && touched.password && <div className="invalid-feedback">{errors.password}</div>}
                                </FormGroup>
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
                            )}
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
