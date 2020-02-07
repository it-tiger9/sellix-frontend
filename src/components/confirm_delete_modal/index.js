import React from 'react'

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap'

import './style.scss'

class ConfirmModal extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
    }

  }

  render() {

    const {
      isOpen,
      okHandler,
      cancelHandler
    } =  this.props

    return (
      <div className="confirm-modal-component">
        <Modal
          isOpen={isOpen}
          centered
          className="modal-primary"
        >
          <ModalHeader toggle={cancelHandler} tag="h4">
            Are you sure ?
          </ModalHeader>
          <ModalBody>
            <h5 className="mb-0">The data will be deleleted permanently.</h5>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" className="btn-square" onClick={okHandler}>Yes</Button>{' '}
            <Button color="secondary" className="btn-square" onClick={cancelHandler}>No</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default ConfirmModal


