import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader, 
  ModalBody,
  ModalFooter,
} from 'reactstrap'
import Select from 'react-select'
import _ from 'lodash'
import { Alert } from 'reactstrap'
import { Spin } from 'components'
import QRCode from 'react-qr-code';
import { Formik } from 'formik';
import * as Yup from "yup";
import {
  CommonActions,
  AuthActions
} from 'services/global'

import * as Actions from '../actions'


const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators(Actions, dispatch),
    commonActions: bindActionCreators(CommonActions, dispatch)
  })
}

class TwoFactorModal extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      nextStep: false,
      verifyCode: ''
    }

    this.verifyOTP = this.verifyOTP.bind(this)
  }

  onNext() {
    this.props.onNext()
    this.props.closeModal()
  }

  nextStep(){
    this.setState({
      nextStep: true
    })
  }

  verifyOTP(values) {
    this.setState({loading: true})
    this.props.actions.verifyOTP({code: values.verifyCode}).then(res => {
      this.props.otpEnabled()
      this.props.commonActions.tostifyAlert('success', "OTP has setup successfully!")
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error || 'Seomthing went wrong!')
    }).finally(() => {
      
      this.setState({loading: false})
      this.props.closeModal()
    })
  }

  render() {
    const { openModal, closeModal, onNext, QRCode, recover } = this.props
    const { nextStep, verifyCode, loading } = this.state

    return (
      <div className="">
        <Modal isOpen={openModal}
          className="modal-success newmember-modal"
          >
          <ModalHeader toggle={closeModal}>Enable Two-Factor Authentication</ModalHeader>
            <ModalBody className="text-center">
                  <Formik
                    initialValues={{verifyCode: verifyCode}}
                    onSubmit={this.verifyOTP}
                    validationSchema={Yup.object().shape({
                      verifyCode: Yup.string()
                        .required('OTP code is required')
                        .min(6, 'OTP code must 6 characters long')
                        .max(6, 'OTP code must 6 characters long')
                    })}>
                    {props => (
                      <Form name="simpleForm" onSubmit={props.handleSubmit}>
                    {
                      !nextStep?
                        <div>
                          <p className="text-left">Download the free Google Authentication app, click add, and then scan this barcode to setup your two-factor authentication.</p>
                          <img src={QRCode}/>
                        </div>
                        :
                        <div>
                          <Alert color="warning" className="text-left">
                            <div className="d-flex align-items-center">
                              <i className="fa fa-warning mr-3" style={{fontSize: 40}}></i>
                              <div>
                                <b>Save the recovery code: </b><br/><br/>
                                <b>{recover}</b> Your account cannot be recovered without it if you lose access to your two-factor app
                              </div>
                            </div>
                          </Alert>
                          <FormGroup className="mb-3">
                            <Label htmlFor="verifyCode" className="text-left">
                              Enter the 6 digit OTP code displayed in your Google Authenticator App</Label>
                            <Input 
                                type="text" 
                                id="verifyCode"
                                name="verifyCode"
                                onChange={props.handleChange}
                                value={props.values.verifyCode}
                                placeholder="Enter the 6 digit OTP code" 
                                className={
                                  props.errors.verifyCode && props.touched.verifyCode
                                    ? "is-invalid"
                                    : ""
                                }
                              />
                              {props.errors.verifyCode && props.touched.verifyCode && (
                                <div className="invalid-feedback">{props.errors.verifyCode}</div>
                              )}
                          </FormGroup>
                        </div>
                    }
                    {nextStep &&
                      <Button color="primary" type="submit" className="mr-2 mt-4 mb-4" disabled={loading}>
                      {loading?<Spin/>:<span>Verify</span>}
                      </Button>
                    }
                  </Form>
                )}             
              </Formik>
            </ModalBody>
            {!nextStep && 
              <ModalFooter className="justify-content-center">
                <Button color="primary" type="button" className="mr-2"
                  onClick={this.nextStep.bind(this)}>
                  Next
                </Button>
              </ModalFooter>
            }
          </Modal>
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TwoFactorModal)