import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  Label,
  ButtonGroup,
  Form,
  FormGroup,
  Input
} from 'reactstrap'
import Select from 'react-select'

import { Loader } from 'components'
import * as ContactActions from './actions'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
    contact_list: state.contact.contact_list
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    ContactActions: bindActionCreators(ContactActions, dispatch)
  })
}

class Contact extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      clickedRow: {}
    }

    this.initializeData = this.initializeData.bind(this)
  }

  componentDidMount () {
    this.initializeData()
  }

  initializeData () {
    this.props.ContactActions.getContactList()
  }


  render() {

    const { loading } = this.state
    const { contact_list } = this.props
    return (
      <div className="contact-screen container">
        <div className="animated fadeIn">
        <Card>
            <CardBody className="p5-4 pb-5">
              <div className="flex-wrapper align-items-center">
                <h4 className="title text-primary f-18 mb-5 mt-4">Create a Query</h4>
              </div>
              <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="warehouseName">Title</Label>
                        <Input type="text" placeholder="Title"/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="warehouseName">Email</Label>
                        <Input type="email" placeholder="Email"></Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="warehouseName">Message</Label>
                        <Input type="textarea" className="pt-3 pb-3" rows={5} placeholder="What would you like to ask?"/>
                    </FormGroup>
                  </Col>
                </Row>
                <Button color="primary" className="mt-4 mb-3">Ask</Button>
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)
