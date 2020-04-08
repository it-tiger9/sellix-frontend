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
import { AppSwitch } from '@coreui/react'
import Select from 'react-select'
import { Loader, ImageUpload, DataSlider, Spin } from 'components'
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
      loadingWebhook: false,
      generatingAPI: false,
      loading2FA: false,
      openModal: false,
      email_2fa: false,
      changed_otp: true,
      otp_enabled: false,
      QRCode: '',
      recover: '',
      api_key: '',
      initState: {
        current_password: '',
        new_password: '',
        confirm_password: '',
        webhook_secret: '',
      }
    }
  }

  componentDidMount() {
    this.setState({loading: true})
    this.props.authActions.getUserSettings().then(res => {
      this.setState({
        api_key: res.data.settings.apikey,
        email_2fa: res.data.settings.email_2fa == '1'?true:false,
        otp_enabled: res.data.settings.otp_2fa == '1'?true:false,
        initState: {
          ...this.state.initState, 
          webhook_secret: res.data.settings.webhook_secret || '',
        }})
    }).finally(() =>{
      this.setState({loading: false})
    })
  }

  openTwoFactorModal() {
    this.props.actions.setupOTP().then(res => {
      this.setState({openModal: true, QRCode: res.data.otp.qrcode, recover: res.data.otp.recover})
    })
  }

  closeTwoFactorModal() {
    this.setState({openModal: false})
  }

  otpEnabled(){
    this.setState({
      otp_enabled:true,
      changed_otp: true
    })
  }

  saveSettings(data, loading) {
    this.setState({[loading]: true})
    this.props.actions.saveSecurity(data).then(res => {
      this.props.commonActions.tostifyAlert('success', res.message)
      if(!this.state.changed_otp){
        this.setState({otp_enabled: false})
      }
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error || 'Seomthing went wrong!')
    }).finally(() => {
      this.setState({ [loading]: false })
    })
  }

  newAPIkey() {
    this.setState({generatingAPI: true})
    this.props.actions.newAPIkey().then(res => {
      this.setState({api_key: res.data.apikey})
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error || 'Seomthing went wrong!')
    }).finally(() => {
      this.setState({generatingAPI: false})
    })
  }

  handleSubmit(values, loading){
    delete values['confirm_password']
    values['email_2fa'] = this.state.email_2fa

    if(!this.state.changed_otp)
      values['otp_2fa'] = false

    this.saveSettings(values, loading)
  }

  render() {
    const { 
      loading, 
      openModal, 
      initState, 
      loading2FA, 
      email_2fa, 
      changed_otp, 
      QRCode,
      recover,
      api_key,
      otp_enabled,
      generatingAPI
    } = this.state

    return (
      <div className="security-screen">
        <div className="animated fadeIn">
          {openModal && 
            <TwoFactorModal 
              openModal={true} 
              closeModal={this.closeTwoFactorModal.bind(this)}
              QRCode={QRCode}
              recover={recover}
              otpEnabled={this.otpEnabled.bind(this)}
            />
          }
          <Formik
            initialValues={initState}
            enableReinitialize={true}
            onSubmit={(values) => {
              this.handleSubmit(values, 'loading')
            }}
            validationSchema={Yup.object().shape({
              current_password: Yup.string(),
              webhook_secret: Yup.string(),
              new_password: Yup.string()
                .min(8, 'Password must be at least 8 characters long'),
              confirm_password: Yup.string()
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
                                <Label className="title">General</Label>
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
                              <hr/>
                              <Row>
                                <Col lg={12}>
                                  <FormGroup>
                                    <Label>API Key</Label>
                                    <div className="d-flex input-group">
                                      <Input className="bg-brown" disabled value={api_key}/>
                                      <Button color="primary" disabled={generatingAPI} onClick={this.newAPIkey.bind(this)}>
                                        {generatingAPI ?<Spin/>:'Re-Generate' }</Button>
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={12}>
                                  <FormGroup>
                                    <Label>Webhook Secret</Label>
                                    <Input 
                                      type="text"
                                      id="webhook_secret"
                                      name="webhook_secret"
                                      className="bg-brown" 
                                      onChange={props.handleChange}
                                      value={props.values.webhook_secret}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                      }
                    </CardBody>
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
                                <Label className="title">Multi Factor Authentication</Label>
                              </FormGroup>
                              <FormGroup row>
                                <Col className="d-flex align-items-center">
                                  <Label className="mb-0 mr-2" style={{width: 160}}>Email: </Label>
                                  <AppSwitch className="mx-1 file-switch mr-2"
                                    variant={'pill'} 
                                    color={'primary'}
                                    checked={email_2fa}
                                    onChange={(e) => {
                                      this.setState({email_2fa: e.target.checked})
                                    }}
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup row>
                                <Col className="d-flex align-items-center mt-2">
                                    <Label className="mb-0 mr-2" style={{width: 160}}>One Time Password: </Label>
                                    {
                                      otp_enabled?
                                        <AppSwitch className="mx-1 file-switch mr-2"
                                          variant={'pill'} 
                                          color={'primary'}
                                          checked={changed_otp}
                                          onChange={(e) => {
                                            this.setState({changed_otp: e.target.checked})
                                          }}
                                        />:
                                        <Button color="default" onClick={this.openTwoFactorModal.bind(this)}>
                                          Add
                                        </Button>
                                      }
                                  </Col>
                              </FormGroup>
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
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SecurityPage)
