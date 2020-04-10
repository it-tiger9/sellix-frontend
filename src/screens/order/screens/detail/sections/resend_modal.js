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

import * as Actions from '../../../actions'


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

class ResendModal extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      email: ''
    }
  }

  resendInvoice(values){
    this.setState({ loading: true })
    this.props.actions.resendInvoice({
      uniqid: this.props.invoiceId,
      email: values.email?values.email:this.props.email
    }).then(res => {
      if(res.status == 200){
        this.props.commonActions.tostifyAlert('success', res.message)
        this.props.closeModal()
      } else throw res
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error)
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  render() {
    const { openModal, closeModal, invoiceId } = this.props
    const { loading } = this.state

    return (
      <div className="">
        <Modal isOpen={openModal}
          className="modal-success"
          >
          <ModalHeader toggle={closeModal}>Resend Order</ModalHeader>
            <ModalBody>
                  <Formik
                    initialValues={{email: ''}}
                    onSubmit={this.resendInvoice.bind(this)}
                    validationSchema={Yup.object().shape({
                        email: Yup.string()
                                .email('Please enter the valid email')
                    })}>
                    {props => (
                      <Form name="simpleForm" onSubmit={props.handleSubmit}>
                        <div>
                          <p className="text-left">
                            This invoice <b>{invoiceId}</b> has been fulfilled. <br/> 
                            You can resend the product bought to the customer.
                          </p>
                        </div>
                        <FormGroup className="mb-3 mt-4">
                            <Label htmlFor="email" className="text-left">
                                Email</Label>
                            <Input 
                                type="email" 
                                id="email"
                                name="email"
                                onChange={props.handleChange}
                                value={props.values.email}
                                placeholder="Enter email" 
                                className={
                                    props.errors.email && props.touched.email
                                    ? "is-invalid"
                                    : ""
                                }
                                />
                                {props.errors.email && props.touched.email && (
                                <div className="invalid-feedback">{props.errors.email}</div>
                            )}
                        </FormGroup>
                      <Button color="primary" type="submit" className="mr-2 mt-4 mb-4" disabled={loading}>
                      {loading?<Spin/>:<span>Resend Order</span>}
                      </Button>
                  </Form>
                )}             
              </Formik>
            </ModalBody>
          </Modal>
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResendModal)