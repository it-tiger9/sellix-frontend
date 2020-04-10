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

import { AuthActions, CommonActions } from 'services/global'
import * as Actions from './actions'

import './style.scss'

const mapDispatchToProps = dispatch => ({
  tostifyAlert: bindActionCreators(CommonActions.tostifyAlert, dispatch),
  authActions: bindActionCreators(AuthActions, dispatch),
  actions: bindActionCreators(Actions, dispatch),
})

class OTPLogin extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    }
  }

  handleSubmit = (data) => {
    let { tostifyAlert, history } = this.props;

    this.props.actions.resetOTP(data)
      .then((res) => {
        tostifyAlert('success', res.message)
        history.push(`/auth/login`)
      })
      .catch(err => {
          tostifyAlert('error', err.error)
      })
  }

  render() {

    let validationSchema = Yup.object()
        .shape({
          recover: Yup.string()
            .required('Recovery code is required')
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
                          initialValues={{ recover: '' }}
                          onSubmit={this.handleSubmit}
                          validationSchema={validationSchema}
                        >
                          {({ handleSubmit, handleChange, values, errors, touched }) => (
                              <Form onSubmit={handleSubmit}>
                                <h4 className="text-center mb-4">Reset OTP</h4>
                                <p className="mt-4 mb-4 text-grey">
                                
                                </p>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="code">Recovery Code</Label>
                                  <Input
                                    type="text"
                                    id="recover"
                                    name="recover"
                                    placeholder="Enter the recover code"
                                    onChange={handleChange}
                                    value={values.recover}
                                    className={errors.recover && touched.recover ? "is-invalid" : ""}
                                  />
                                  {errors.recover && touched.recover && <div className="invalid-feedback">{errors.recover}</div>}
                                </FormGroup>
                                
                                <Row>
                                  <Col lg={12} className="text-center mt-4">
                                    <Button color="primary" type="submit">Send Code</Button>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col>
                                    <FormGroup className="mb-0 text-center mt-3">
                                      <Link to="/auth/login">
                                        <Label style={{cursor: 'pointer'}}><b>Login</b></Label>
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
