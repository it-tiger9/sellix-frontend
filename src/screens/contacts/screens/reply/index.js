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
import * as cn from 'classnames'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import * as _ from 'lodash'
import { Formik } from 'formik'
import { replyQuerie } from '../../actions'
import { getQuerie } from '../../actions'
import { closeQuerie } from '../../actions'
import { reopenQuerie } from '../../actions'
import {
  CommonActions
} from 'services/global'

import './style.scss'

const user = window.localStorage.getItem('userId')

const mapStateToProps = (state) => {
  return ({
    querie: state.queries.querie
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    commonActions: bindActionCreators(CommonActions, dispatch),
    replyQuerie: bindActionCreators(replyQuerie, dispatch),
    actions: bindActionCreators({ getQuerie }, dispatch),
    closeQuerie: bindActionCreators({ closeQuerie }, dispatch),
    reopenQuerie: bindActionCreators({ reopenQuerie }, dispatch),
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
    this.props.actions.getQuerie(this.props.match.params.id)
  }

  handleSubmit(values) {
    this.setState({ loading: true })

    const sendData = () => {
      this.props.replyQuerie({ ...values, uniqid: this.props.match.params.id }).then(res => {
        this.props.commonActions.tostifyAlert('success', res.message)
      }).catch(err => {
        this.props.commonActions.tostifyAlert('error', err.message)
      }).finally(() => {
        this.setState({ loading: false })
      })
    }
    
    if (this.props.querie[0].status === 'closed') {
      this.props.reopenQuerie.reopenQuerie({ uniqid: this.props.match.params.id }).then(res => {
        sendData()
        this.props.commonActions.tostifyAlert('success', res.message)
      }).catch(err => {
        this.props.commonActions.tostifyAlert('error', err.message)
      }).finally(() => {
        this.setState({ loading: false })
      })
    }else{
      sendData()
    }

  }

  renderMessages = () => {
    return _.map(this.props.querie, querie => {
      return <div className={querie.role === 'customer' ? 'alignForCustomerCS' : 'AlignForYouCS'}>
        <div className='querieMessageBlockCS'>
          <div className='querieMessageTitle'>{querie.role === 'customer' ? 'Customer' : 'You'}</div>
          <div>{querie.message}</div>
          <div className='querieMessageDate'>{querie.day_value}-{querie.month}-{querie.year}</div>
        </div>
      </div>
    })
  }

  closeQuerie = (uniqid) => {
    this.props.closeQuerie.closeQuerie({ uniqid })
  }

  render() {
    console.log({ querie: this.props.querie })
    const currentQuerie = _.find(this.props.querie, (querie) => querie.uniqid === this.props.match.params.id)
    if (!currentQuerie) { return null }
    return (
      <div className="reply-screen mt-3">
        <div className="animated fadeIn">
          <Formik
            onSubmit={(values) => {
              this.handleSubmit(values)
            }}>{props => (
              <Form onSubmit={props.handleSubmit}>
                <Card>
                  <CardHeader>
                    <Row style={{ alignItems: 'center' }}>
                      <Col md={12}>
                        <div className='querieTitle'>
                          <h1>TICKET {this.props.querie[0].uniqid}</h1>
                          {this.props.querie[0].status != 'closed' && <Button color="default" onClick={(e) => this.closeQuerie(this.props.match.params.id)}>Close</Button>}
                        </div>
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
                        <div className='QuerieChatBlock'>
                          {this.renderMessages()}
                        </div>
                        <FormGroup>
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
