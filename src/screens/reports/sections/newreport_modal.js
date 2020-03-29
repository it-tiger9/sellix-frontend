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
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import Select from 'react-select'
import _ from 'lodash'
import moment from 'moment'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { DateRangePicker2, Spin } from 'components'

import { Formik } from 'formik';
import * as Yup from "yup";
import {
  CommonActions,
} from 'services/global'

import * as ReportActions from '../actions'


const mapDispatchToProps = (dispatch) => {
	return ({
		commonActions: bindActionCreators(CommonActions, dispatch),
		actions: bindActionCreators(ReportActions, dispatch)
	})
}

const mapStateToProps = (state) => {
  return ({
    
  })
}

class NewReportModal extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      fromDate: new Date(),
      toDate: new Date(),
      initWareHouseValue: {
        fileType: 'pdf',
      },
    }

    this.submitNewReport = this.submitNewReport.bind(this)
  }

  // Create or Contact
  submitNewReport(data) {
    this.setState({
      loading: true,
    })


    this.props.actions.createReport({
      from: moment(this.state.fromDate).format('MM/DD/YYYY'),
      to: moment(this.state.toDate).format('MM/DD/YYYY')
    }).then(res => {
      if (res.status === 200) {
        this.props.closeModal()
      } else if(res.error) {
        console.log(res)
        this.props.commonActions.tostifyAlert('error', res.error)
      }

      this.setState({
        loading: false,
      })
    })
  }

  fromDateChange = date => {
    this.setState({
      fromDate: date
    })
  }

  toDateChange = date => {
    this.setState({
      toDate: date
    })
  }

  render() {
    const { openModal, closeModal } = this.props
    const { fileType, fromDate, toDate, loading } = this.state

    return (
      <div>
        <Modal isOpen={openModal}
          className="modal-success"
          wrapClassName="1122"
          modalClassName="888"
          >
          <Formik
            initialValues={{}}
            onSubmit={(values, {resetForm}) => {
              this.submitNewReport(values)
            }}
            validationSchema={Yup.object().shape({
            })}>
            {props => (
              <Form name="simpleForm" onSubmit={props.handleSubmit}>
                <ModalHeader toggle={closeModal}>New Report</ModalHeader>
                  <ModalBody>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label htmlFor="warehouseName">File Type</Label>
                            <Select placeholder="File Type" 
                              options={[{value: 'pdf', label: 'PDF'}]}
                              value={fileType}
                              onChange={(option) => {
                                this.setState({fileType: option})
                              }}
                            >
                            </Select>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6}>
                        <FormGroup>
                          <Label htmlFor="warehouseName">Start At</Label>
                          <div></div>
                            <DatePicker
                              maxDate={toDate}
                              selected = {fromDate}
                              onChange={this.fromDateChange}
                              dateFormat="PP"
                            />
                        </FormGroup>
                      </Col>
                      <Col lg={6}>
                        <FormGroup>
                          <Label htmlFor="warehouseName">End At</Label>
                          <div></div>
                            <DatePicker
                              minDate={fromDate}
                              selected = {toDate}
                              onChange={this.toDateChange}
                              dateFormat="PP"
                            />
                        </FormGroup>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter className="justify-content-start">
                    <Button color="primary" type="submit" className="mr-2" disabled={loading}>{loading ?<Spin/>:'Generate Report' }</Button>
                  </ModalFooter>
              </Form>
              )}
            </Formik>
          </Modal>
        </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewReportModal)