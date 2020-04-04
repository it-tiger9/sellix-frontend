import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
} from 'reactstrap'
import StarRatings from 'react-star-ratings';
import { Loader } from 'components'
import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from 'react-time-ago'
import {
  CommonActions
} from 'services/global'
import './style.scss'

const mapStateToProps = (state) => {
  return ({
    user_feedback: state.common.user_feedback
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    commonActions: bindActionCreators(CommonActions, dispatch)
  })
}

class ShopFeedback extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }

    this.initializeData = this.initializeData.bind(this)
  }

  componentDidMount () {
    this.initializeData()
  }

  initializeData () {
    this.props.commonActions.getUserFeedbacks(this.props.match.params.username).then(res => {
      if (res.status === 200) {
        this.setState({ loading: false })
      }
    })
  }

  render() {
    const { loading } = this.state
    const { user_feedback } = this.props

    return (
      <div className="feedback-shop-screen">
        <div className="animated fadeIn">
        {
            loading ?
              <Row>
                <Col lg={12}>
                  <Loader />
                </Col>
              </Row>
            :
              <Row className="py-3">
                {
                  user_feedback.map(feedback => 
                    <Col lg={3}>
                      <Card className="">
                        <CardBody className="p-3 bg-white d-flex flex-column align-items-center justify-content-between">
                          <p className="text-right w-100">{
                            feedback.feedback == 'positive'?
                              <span className="badge badge-like" title="Positive">Positive</span>:
                              (feedback.feedback == 'negative'?
                                <span className="badge badge-dislike" title="Negative">Negative</span>:
                                <span className="badge badge-neutral" title="Neutral">Neutral</span>)
                            }</p>
                          <p>{feedback.message}</p>
                          <div className="d-flex flex-row justify-content-between w-100">
                            <p><i className="fas fa-check feedback-checked"></i> Verified Purchase</p>
                            <p><ReactTimeAgo date={feedback.date*1000/1} locale="en"/></p>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>)
                }
                {user_feedback.length == 0 && <p className="w-100 text-center mt-4 mb-4">No Feedback Given</p>}
              </Row>
            }
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopFeedback)
