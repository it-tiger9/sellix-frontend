import React from 'react'

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap'

import './style.scss'

class LeaveFeedbackModal extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
    }

  }

  render() {

    const {
      isOpen,
      okHandler,
      product,
      date
    } =  this.props

    return (
      <div className="leave-feedback-modal">
        <Modal
          isOpen={isOpen}
          centered
          className="leave-feedback-modal"
        >
          <ModalHeader tag="h4">
            SELLIX
          </ModalHeader>
          <ModalBody className="pl-5 pr-5 pt-5 pb-0">
            <p className="text-grey">
              You have recently purchased from Sellix. 
              Is everything good with your purchase? 
              Please leave a feedback for the seller.</p>
            <div className="d-flex justify-content-between mt-4">
              <p className="text-primary"><b>Product</b><br/>{product}</p>
              <p className="text-primary"><b>Date Purchased</b><br/>{date}</p>
            </div>
          </ModalBody>
          <ModalFooter className="text-center pb-5">
            <Button color="primary" className="btn-square ml-auto mr-auto" onClick={okHandler}>Leave Feedback</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default LeaveFeedbackModal


