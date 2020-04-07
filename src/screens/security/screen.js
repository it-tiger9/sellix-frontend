import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  Form,
  Input
} from 'reactstrap'
import Select from 'react-select'
import { Loader, ImageUpload, DataSlider } from 'components'
import { confirmAlert } from 'react-confirm-alert'; 
import { TwoFactorModal } from './sections'
import { Formik } from 'formik';
import * as Yup from "yup";
import {
  CommonActions,
  AuthActions
} from 'services/global'

import * as SecureActions from './actions'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators(SecureActions, dispatch),
    authActions: bindActionCreators(AuthActions, dispatch),
    commonActions: bindActionCreators(CommonActions, dispatch)
  })
}

class SecurityPage extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      loading2FA: false,
      openModal: false,
      initState: {
        current_password: '',
        new_password: '',
        confirm_password: '',
        email_2fa: false
      }
    }
  }

  componentDidMount() {
    this.setState({loading2FA: true})
    this.props.authActions.getUserSettings().then(res => {
      this.setState({initState: {...this.state.initState, email_2fa: res.data.settings.email_2fa == '1'?true:false}})
    }).finally(() =>{
      this.setState({loading2FA: false})
    })
  }

  openTwoFactorModal() {
    this.setState({openModal: true})
  }

  closeTwoFactorModal() {
    this.setState({openModal: false})
  }


  set2FA() {
    this.setState({
      initState: {...this.state.initState, email_2fa: true}
    })

    const data = {
      current_password: '',
      new_password: '',
      email_2fa: true
    }

    this.props.actions.saveSecurity(data).then(res => {
      this.props.commonActions.tostifyAlert('success', 'Email 2FA is set successfully.')
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error || 'Seomthing went wrong!')
    })
  }

  delete2FA() {
    
    confirmAlert({
      title: 'Are you sure?',
      message: 'You want to remove email 2fa?',
      buttons: [
        {
          label: 'Yes, Delete it!',
          onClick: () => {
            this.setState({
              initState: {...this.state.initState, email_2fa: false}
            })

            const data = {
              current_password: '',
              new_password: '',
              email_2fa: false
            }
        
            this.props.actions.saveSecurity(data).then(res => {
              this.props.commonActions.tostifyAlert('success', 'Email 2FA is removed successfully.')
            }).catch(err => {
              this.props.commonActions.tostifyAlert('error', err.error || 'Seomthing went wrong!')
            })
          }
        },
        {
          label: 'No',
          onClick: () => {return true}
        }
      ]
    });
  }


  saveSettings(data) {
    this.setState({loading: true})
    this.props.actions.saveSecurity(data).then(res => {
      this.props.commonActions.tostifyAlert('success', res.message)
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error || 'Seomthing went wrong!')
    }).finally(() => {
      this.setState({ loading: false })
    })
  }


  handleSubmit(values){
    delete values['confirm_password']
    values['email_2fa'] = this.state.initState.email_2fa

    this.saveSettings(values)
  }

  render() {
    const { loading, openModal, initState, loading2FA } = this.state

    return (
      <div className="security-screen">
        <div className="animated fadeIn">
          <TwoFactorModal 
            openModal={openModal} 
            closeModal={this.closeTwoFactorModal.bind(this)}
            onNext={this.set2FA.bind(this)}
          />
          <Formik
            initialValues={initState}
            onSubmit={(values) => {
              this.handleSubmit(values)
            }}
            validationSchema={Yup.object().shape({
              current_password: Yup.string()
                .required('Current password is required'),
              new_password: Yup.string()
                .min(8, 'Password must be at least 8 characters long')
                .required("New password is required"),
              confirm_password: Yup.string()
                .required("Confirm new password is required")
                .when("new_password", {
                  is: val => (val && val.length > 0 ? true : false),
                  then: Yup.string().oneOf(
                    [Yup.ref("new_password")],
                    "Both password need to be the same"
                )})
            })}>
              {props => (
                <Form onSubmit={props.handleSubmit}>
                  <Card>
                    <CardBody className="p-4 mb-5">
                      {
                        loading ?
                          <Row>
                            <Col lg={12}>
                              <Loader />
                            </Col>
                          </Row>
                        : 
                        
                          <Row className="mt-4 mb-4">
                            <Col lg={12}>
                              <FormGroup className="mb-5">
                                <Label className="title">Password</Label>
                              </FormGroup>
                            </Col>
                            <Col lg={12}>
                              <Row>
                                <Col lg={12}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="current_password">Current Password</Label>
                                    <Input 
                                      type="password" 
                                      id="current_password"
                                      placeholder="Current Password"
                                      onChange={props.handleChange}
                                      value={props.values.current_password}
                                      className={
                                        props.errors.current_password && props.touched.current_password
                                          ? "is-invalid"
                                          : ""
                                      }
                                    />
                                    {props.errors.current_password && props.touched.current_password && (
                                      <div className="invalid-feedback">{props.errors.current_password}</div>
                                    )}
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={6}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="new_password">New Password</Label>
                                    <Input 
                                      type="password" 
                                      id="new_password"
                                      name="new_password"
                                      placeholder="New Password"
                                      onChange={props.handleChange}
                                      value={props.values.new_password}
                                      className={
                                        props.errors.new_password && props.touched.new_password
                                          ? "is-invalid"
                                          : ""
                                      }
                                    />
                                    {props.errors.new_password && props.touched.new_password && (
                                      <div className="invalid-feedback">{props.errors.new_password}</div>
                                    )}
                                  </FormGroup>
                                </Col>
                                <Col lg={6}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="confirm_password">Confirm New Password</Label>
                                    <Input 
                                      type="password" 
                                      id="confirm_password"
                                      placeholder="Confirm Password"
                                      onChange={props.handleChange}
                                      value={props.values.confirm_password}
                                      className={
                                        props.errors.confirm_password && props.touched.confirm_password
                                          ? "is-invalid"
                                          : ""
                                      }
                                    />
                                    {props.errors.confirm_password && props.touched.confirm_password && (
                                      <div className="invalid-feedback">{props.errors.confirm_password}</div>
                                    )}
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                      }
                    </CardBody>
                    <Button color="primary" className="mb-4" style={{width: 200}}
                    >Save Settings</Button>
                    
                  </Card> 
                </Form>
              )}
            </Formik>
          
          <Card>
            <CardBody className="p-4 mb-5">
              {
                loading2FA ?
                  <Row>
                    <Col lg={12}>
                      <Loader />
                    </Col>
                  </Row>
                : 
                  <Row className="mt-4 mb-4">
                    <Col lg={12}>
                      <FormGroup className="mb-5">
                        <Label className="title">Two-Factor Authentication</Label>
                      </FormGroup>
                      <p style={{fontSize: 13, color: '#A7A5B4'}}>
                        Keep your account extra secure with a second authentication step.</p>
                        {
                          initState.email_2fa && 
                            <p className="mt-4 mb-4 d-flex align-items-center">
                              <span className="badge badge-completed">E-Mail</span>
                              <span className="ml-3 delete2FA" onClick={this.delete2FA.bind(this)}>×</span>
                            </p>
                        }
                      <Button color="default" onClick={this.openTwoFactorModal.bind(this)}>Add</Button>
                    </Col>
                  </Row>
              }
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SecurityPage)
