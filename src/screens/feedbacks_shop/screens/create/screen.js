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

import './style.scss'

const mapStateToProps = (state) => {
  return ({
    
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
   
  })
}

class LeaveFeedback extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
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
                <h5 className="title text-primary f-18 mt-4">Leave your feedback</h5>
                <p className="text-grey mt-3 mb-4">Was the product good? Write your feedback about it here.</p>
              </div>
                
                <div className="mb-4">
                  <p className="text-primary mb-0">Feedback</p>
                  <i className="fa fa-thumbs-up fa-lg mr-3" style={{color: '#2BB224'}}></i>
                  <i className="fa fa-thumbs-down fa-lg mr-3" style={{color: '#B22424'}}></i>
                  <i className="fas fa-hand-paper fa-lg mr-3" style={{color: '#A7A5B4'}}></i>
                </div>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label htmlFor="warehouseName">Review</Label>
                        <Input type="textarea" className="pt-3 pb-3" rows={5} placeholder="Leave a text for your feedback"/>
                    </FormGroup>
                  </Col>
                </Row>
                <Button color="primary" className="mt-4 mb-3">Submit</Button>
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaveFeedback)
