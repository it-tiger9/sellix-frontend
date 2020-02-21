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


class NewReportModal extends React.Component {
  
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
      <div>
        <Modal isOpen={openModal}
          className="modal-success"
          wrapClassName="1122"
          modalClassName="888"
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
                <ModalHeader toggle={closeModal}>New Report</ModalHeader>
                  <ModalBody>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label htmlFor="warehouseName">Type</Label>
                            <Select placeholder="Type">
                            </Select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label htmlFor="warehouseName">File Type</Label>
                            <Select placeholder="File Type">
                            </Select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label htmlFor="warehouseName">Period</Label>
                            <DateRangePicker2 getDate={() => {}} opens={'left'}/>
                        </FormGroup>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter className="justify-content-start">
                    <Button color="primary" type="submit" className="mr-2">Generate Report</Button>
                  </ModalFooter>
              </Form>
              )}
            </Formik>
          </Modal>
        </div>
    )
  }
}

export default NewReportModal