import React from 'react'
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

import QRCode from 'react-qr-code';
import { Formik } from 'formik';
import * as Yup from "yup";

import * as ProductActions from '../actions'

class TwoFactorModal extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false
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

  render() {
    const { openModal, closeModal, onNext } = this.props

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
                    <QRCode value="hey" />,
                  </ModalBody>
                  <ModalFooter className="justify-content-start">
                    <Button color="primary" type="submit" className="mr-2" onClick={this.onNext.bind(this)}>Next</Button>
                  </ModalFooter>
              </Form>
              )}
            </Formik>
          </Modal>
        </div>
    )
  }
}

export default TwoFactorModal