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

class IssueReplacementModal extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      email: ''
    }
  }

  IssueReplacement(props, WithoutQuantity){
    this.setState({ loading: true })
    this.props.actions.issueReplacement({
      uniqid: this.props.invoiceId,
      full: WithoutQuantity,
      quantity: WithoutQuantity ? 0 : props.values.quantity 
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
          <ModalHeader toggle={closeModal}>Issue Replacement</ModalHeader>
            <ModalBody>
                  <Formik
                    initialValues={{quantity: null}}
                    onSubmit={() => null}
                    >
                    {props => (
                      <Form name="simpleForm" onSubmit={props.handleSubmit}>
                        <div>
                          <p className="text-left">
                            This invoice <b>{invoiceId}</b> has been fulfilled. <br/><br /> 
                            Tou can issue a replacement, by doing so we will re-send a new product to the buyer
                          </p>
                        </div>
                        <Button color="primary" type="submit" className="mr-2 mt-4 mb-4" onClick={() => this.IssueReplacement(props, true)}> Issue Full Replacement</Button>
                        <div>
                          <p className="text-left">
                            This will affect your product's stock  and you won't be able to undo this action<br /><br />
                            You can also choose to issue a partial replacement, only the quantity of accounts you decide will be re-send to the buyer 
                          </p>
                        </div>
                        <FormGroup className="mb-3 mt-4">
                            <Label htmlFor="email" className="text-left">
                                Quantity
                            </Label>
                            <Input 
                                type="number" 
                                name="quantity"
                                onChange={props.handleChange}
                                value={props.values.quantity}
                                placeholder="0" 
                            />
                        </FormGroup>
                        <Button color="primary" type="submit" className="mr-2 mt-4 mb-4" onClick={() => this.IssueReplacement(props, false)}> Issue Partial Replacement</Button>
                  </Form>
                )}             
              </Formik>
            </ModalBody>
          </Modal>
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueReplacementModal)