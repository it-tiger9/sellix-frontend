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

    this.wareHouseHandleSubmit = this.wareHouseHandleSubmit.bind(this)
  }

  // Create or Contact
  wareHouseHandleSubmit(data) {
    this.props.closeModal()
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

  verifyOTP() {
    this.setState({loading: true})
    this.props.actions.verifyOTP({code: this.state.verifyCode}).then(res => {
      this.props.commonActions.tostifyAlert('success', res.message)
      this.props.otpEnabled()
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error || 'Seomthing went wrong!')
      this.props.otpEnabled()
    }).finally(() => {
      this.setState({loading: false})
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
          <Formik
            initialValues={this.state.initWareHouseValue}
            onSubmit={(values, {resetForm}) => {
              this.wareHouseHandleSubmit(values)
              resetForm(this.state.initWareHouseValue)
            }}
            validationSchema={Yup.object().shape({
                warehouseName: Yup.string()
                    .required('Warehouse Name is a required field'),
            })}>
            {props => (
              <Form name="simpleForm" onSubmit={props.handleSubmit}>
                <ModalHeader toggle={closeModal}>Enable Two-Factor Authentication</ModalHeader>
                  <ModalBody className="text-center">
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
                          <div className="mt-5">
                              <p className="text-left">Enter the 6 digit OTP code displayed in your Google Authenticator App</p>
                              <div className="d-flex">
                                <Input 
                                  type="text" 
                                  value={verifyCode}
                                  placeholder="Enter the 6 digit OTP code" 
                                  onChange={e => {this.setState({verifyCode: e.target.value})}}></Input>
                              </div>
                            </div>
                        </div>
                    }
                  </ModalBody>
                  <ModalFooter className="justify-content-center mt-4">
                    <Button color="primary" type="submit" className="mr-2" disabled={loading}
                      onClick={nextStep?this.verifyOTP.bind(this):this.nextStep.bind(this)}>
                     {loading?<Spin/>:<span>{nextStep?'Verify':'Next'}</span>}
                    </Button>
                  </ModalFooter>
              </Form>
              )}
            </Formik>
          </Modal>
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TwoFactorModal)