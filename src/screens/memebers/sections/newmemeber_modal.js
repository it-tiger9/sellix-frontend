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

import { DateRangePicker2 } from 'components'

import { Formik } from 'formik';
import * as Yup from "yup";

import * as ProductActions from '../actions'

import './style.scss'

class NewMemberModal extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,

      initWareHouseValue: {
        warehouseName: '',
      },
    }

    this.wareHouseHandleSubmit = this.wareHouseHandleSubmit.bind(this)
  }

  // Create or Contact
  wareHouseHandleSubmit(data) {
    // ProductActions.createWarehouse(data).then(res => {
    //   if (res.status === 200) {
    //   // this.success()
        
    //   }
    // })

    this.props.closeModal()
  }

  render() {
    const { openModal, closeModal } = this.props

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
                <ModalHeader toggle={closeModal}>Invite New Member</ModalHeader>
                  <ModalBody>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label htmlFor="warehouseName">Email of User to Invite</Label>
                          <Input type="email" placeholder="Email of User to Invite"/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label htmlFor="warehouseName">Permissions</Label>
                          <div className="d-flex flex-wrap">
                            <div className="custom-checkbox custom-control">
                              <input 
                                className="custom-control-input"
                                type="checkbox"
                                id="paypal-email"
                                name="SMTP-auth"
                                />
                              <label className="custom-control-label" htmlFor="paypal-email">
                                Dashboard
                              </label>
                            </div>
                            <div className="custom-checkbox custom-control">
                              <input 
                                className="custom-control-input"
                                type="checkbox"
                                id="paypal-email"
                                name="SMTP-auth"
                                />
                              <label className="custom-control-label" htmlFor="paypal-email">
                                Products
                              </label>
                            </div>
                            <div className="custom-checkbox custom-control">
                              <input 
                                className="custom-control-input"
                                type="checkbox"
                                id="paypal-email"
                                name="SMTP-auth"
                                />
                              <label className="custom-control-label" htmlFor="paypal-email">
                                Orders
                              </label>
                            </div>
                            <div className="custom-checkbox custom-control">
                              <input 
                                className="custom-control-input"
                                type="checkbox"
                                id="paypal-email"
                                name="SMTP-auth"
                                />
                              <label className="custom-control-label" htmlFor="paypal-email">
                                Coupons
                              </label>
                            </div>
                            <div className="custom-checkbox custom-control">
                              <input 
                                className="custom-control-input"
                                type="checkbox"
                                id="paypal-email"
                                name="SMTP-auth"
                                />
                              <label className="custom-control-label" htmlFor="paypal-email">
                                Queries
                              </label>
                            </div>
                            <div className="custom-checkbox custom-control">
                              <input 
                                className="custom-control-input"
                                type="checkbox"
                                id="paypal-email"
                                name="SMTP-auth"
                                />
                              <label className="custom-control-label" htmlFor="paypal-email">
                                Reports
                              </label>
                            </div>
                            <div className="custom-checkbox custom-control">
                              <input 
                                className="custom-control-input"
                                type="checkbox"
                                id="paypal-email"
                                name="SMTP-auth"
                                />
                              <label className="custom-control-label" htmlFor="paypal-email">
                                Categories
                              </label>
                            </div>
                            <div className="custom-checkbox custom-control">
                              <input 
                                className="custom-control-input"
                                type="checkbox"
                                id="paypal-email"
                                name="SMTP-auth"
                                />
                              <label className="custom-control-label" htmlFor="paypal-email">
                                Developer
                              </label>
                            </div>
                            <div className="custom-checkbox custom-control">
                              <input 
                                className="custom-control-input"
                                type="checkbox"
                                id="paypal-email"
                                name="SMTP-auth"
                                />
                              <label className="custom-control-label" htmlFor="paypal-email">
                                Feedback
                              </label>
                            </div>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter className="justify-content-start">
                    <Button color="primary" type="submit" className="mr-2">Invite User</Button>
                  </ModalFooter>
              </Form>
              )}
            </Formik>
          </Modal>
        </div>
    )
  }
}

export default NewMemberModal