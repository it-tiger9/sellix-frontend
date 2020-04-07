import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Col,
  Label,
  Form,
  FormGroup,
  Input
} from 'reactstrap'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import * as _ from 'lodash'
import { Formik } from 'formik'
import {replyQuerie} from '../../actions'
import {
  CommonActions
} from 'services/global'

import './style.scss'

const user = window.localStorage.getItem('userId')

const mapStateToProps = (state) => {
  return ({
    feedbacks: state.feedbacks.feedbacks
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    commonActions: bindActionCreators(CommonActions, dispatch),
    replyQuerie: bindActionCreators(replyQuerie, dispatch),
  })
}

class ReplyToQuerie extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  componentDidMount() {
    // this.props.actions.getFeedbacks()
  }

  handleSubmit(values) {
    this.setState({ loading: true })
    this.props.replyQuerie({ ...values, uniqid: this.props.match.params.id }).then(res => { 
      this.props.commonActions.tostifyAlert('success', res.message)
      this.props.history.push({
        pathname: `/dashboard/queries`
      })
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.message)
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  render() {
    // const currentFeedback = _.find(this.props.feedbacks, (feedback) => feedback.id === this.props.match.params.id)
    // if (!currentFeedback) { return null }
    return (
      <div className="reply-screen mt-3">
        <div className="animated fadeIn">
          <Breadcrumb className="mb-0">
            <BreadcrumbItem active className="mb-0">
              <a onClick={(e) => this.props.history.goBack()}><i className="fas fa-chevron-left" /> Queries</a>
            </BreadcrumbItem>
          </Breadcrumb>
          <Formik
            onSubmit={(values) => {
              this.handleSubmit(values)
            }}>{props => (
              <Form onSubmit={props.handleSubmit}>
                <Card>
                  <CardHeader>
                    <Row style={{ alignItems: 'center' }}>
                      <Col md={12}>
                        <h1>Reply to querie</h1>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody className="p5-4 pb-5">
                    <Row>
                      <Col lg={8}>
                        <FormGroup>
                          {/* <Label htmlFor="warehouseName">Feedback <span className={`badge badge-${currentFeedback.feedback.toLowerCase()}`}>{currentFeedback.feedback.toLowerCase()}</span></Label> */}
                          <div>
                            {/* <p className="text-grey mt-3 mb-4">{currentFeedback.message}</p> */}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12}>
                        <FormGroup>
                          <Label htmlFor="warehouseName">Reply</Label>
                          <Input
                            type="textarea"
                            className="pt-3 pb-3 "
                            rows={7}
                            name='message'
                            placeholder="Reply to querie"
                            onChange={props.handleChange}
                            value={props.values.message}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button color="primary" className="mt-4 mb-3">Submit</Button>
                  </CardBody>
                </Card>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyToQuerie)
