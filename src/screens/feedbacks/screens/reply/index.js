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
import StarRatings from 'react-star-ratings';

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

class ReplyToFeedback extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      rate: 5
    }
  }

  render() {
    const {rate} = this.state

    return (
      <div className="reply-screen">
        <div className="animated fadeIn">
        <Card>
            <CardHeader>
                <Row style={{alignItems: 'center'}}>
                <Col md={12}>
                    <h1>Reply to feedback</h1>
                </Col>
                </Row>
            </CardHeader>
            <CardBody className="p5-4 pb-5">
                <Row>
                    <Col lg={8}>
                        <FormGroup>
                            <Label htmlFor="warehouseName">Feedback</Label>
                            <div>
                                <StarRatings
                                    rating={5}
                                    starRatedColor={rate>3?'#2BB224':'#B22424'}
                                    numberOfStars={5}
                                    starDimension="20px"
                                    starSpacing="2px"
                                    name='rating'
                                />
                                <p className="text-grey mt-3 mb-4">This product is perfect!!!</p>
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                  <Col lg={8}>
                    <FormGroup>
                      <Label htmlFor="warehouseName">Reply</Label>
                        <Input type="textarea" className="pt-3 pb-3 " rows={5} placeholder="Reply to feedback"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ReplyToFeedback)
