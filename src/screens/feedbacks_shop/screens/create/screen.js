import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardBody,
  Button,
  Row,
  Col,
  Label,
  Form,
  FormGroup,
  Input,
  ButtonToolbar,
  ButtonGroup
} from 'reactstrap'
import { Formik } from 'formik'
import { createFeedback } from './actions'
import {
  CommonActions
} from 'services/global'

import './style.scss'

const mapStateToProps = (state) => {
  return ({

  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    createFeedback: bindActionCreators(createFeedback, dispatch),
    commonActions: bindActionCreators(CommonActions, dispatch),
  })
}

class LeaveFeedback extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  handleSubmit(values) {
    this.setState({ loading: true })
    this.props.createFeedback({ ...values, uniqid: this.props.match.params.id }).then(res => {
      this.props.commonActions.tostifyAlert('success', res.message)
      // this.props.history.push({
      //   pathname: '/admin/blacklist'
      // })
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.message)
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Formik
          onSubmit={(values) => {
            this.handleSubmit(values)
          }}>{props => (
            <Form onSubmit={props.handleSubmit}>
              <Row>
                <Col lg={8} className="ml-auto mr-auto">
                  <Card>
                    <CardBody className="p5-4 pb-5">
                      <div className="flex-wrapper align-items-center">
                        <h5 className="title text-primary f-18 mt-4">Leave your feedback</h5>
                        <p className="text-grey mt-3 mb-4">Was the product good? Write your feedback about it here.</p>
                      </div>
                      <div className="mb-4 feedback-radioGroup">
                        <ButtonToolbar aria-label="Toolbar with button groups">
                          <ButtonGroup className="mr-2 feedback-radioGroup" aria-label="First group">
                            <Button onClick={() => props.setFieldValue('feedback', 'positive')}type='button'><i className="fa fa-thumbs-up fa-lg mr-3" style={{ color: '#2BB224' }}></i></Button>
                            <Button onClick={() => props.setFieldValue('feedback', 'negative')} type='button'><i className="fa fa-thumbs-down fa-lg mr-3" style={{ color: '#B22424' }}></i></Button>
                            <Button onClick={() => props.setFieldValue('feedback', 'neutral')} type='button'><i className="fas fa-hand-paper fa-lg mr-3" style={{ color: '#A7A5B4' }}></i></Button>
                          </ButtonGroup>
                        </ButtonToolbar>
                      </div>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label htmlFor="warehouseName">Review</Label>
                            <Input
                              type="textarea"
                              className="pt-3 pb-3"
                              rows={5}
                              placeholder="Leave a text for your feedback"
                              name="message"
                              onChange={props.handleChange}
                              value={props.values.message}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button color="primary" className="mt-4 mb-3">Submit</Button>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div >
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeaveFeedback)
