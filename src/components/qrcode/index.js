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

class QRCodeModal extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }

    this.qrCodeClose = this.qrCodeClose.bind(this)
  }

  // Create or Contact
  qrCodeClose(data) {
    this.props.closeModal()
  }

  render() {
    const { openModal, closeModal, value='hey' } = this.props
    return (
      <div className="">
        <Modal isOpen={openModal}
          className="modal-success newmember-modal"
          style={{width: 340}}
          >
          <Formik
            initialValues={this.state.initWareHouseValue}
            onSubmit={(values, {resetForm}) => {
              this.qrCodeClose(values)
              resetForm(this.state.initWareHouseValue)
            }}
            validationSchema={Yup.object().shape({
                warehouseName: Yup.string()
                    .required('Warehouse Name is a required field'),
            })}>
            {props => (
              <Form name="simpleForm" onSubmit={props.handleSubmit}>
                <ModalHeader toggle={closeModal}>QR Code</ModalHeader>
                  <ModalBody className="text-center pb-5">
                    <QRCode value={value} />,
                  </ModalBody>
              </Form>
              )}
            </Formik>
          </Modal>
        </div>
    )
  }
}

export default QRCodeModal