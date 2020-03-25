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
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

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

    const flag = rate?(rate>4?'positive':'negative'):'neutral'

    return (
      <div className="reply-screen mt-3">
        <div className="animated fadeIn">
          <Breadcrumb className="mb-0">
						<BreadcrumbItem active className="mb-0">
							<a onClick={(e) => this.props.history.goBack()}><i className="fas fa-chevron-left"/> Feedback</a>
						</BreadcrumbItem>
					</Breadcrumb>
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
                            <Label htmlFor="warehouseName">Feedback <span className={`badge badge-${flag}`}>Positive</span></Label>
                            <div>
                                <p className="text-grey mt-3 mb-4">This product is perfect!!!</p>
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <FormGroup>
                      <Label htmlFor="warehouseName">Reply</Label>
                        <Input type="textarea" className="pt-3 pb-3 " rows={7} placeholder="Reply to feedback"/>
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
