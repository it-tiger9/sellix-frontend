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
  Input
} from 'reactstrap'
import { Formik } from 'formik'
import {
  CommonActions
} from 'services/global'
import { createQuery} from './actions'
import './style.scss'

const user = window.localStorage.getItem('userId')

const mapStateToProps = (state) => {
  return ({

  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    createQuery: bindActionCreators(createQuery, dispatch),
    commonActions: bindActionCreators(CommonActions, dispatch),
  })
}

class Contact extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }


  handleSubmit(values) {
    this.setState({ loading: true })
    this.props.createQuery({...values, username: user}).then(res => {
      this.props.commonActions.tostifyAlert('success', res.message)
      this.props.history.push({
        pathname: `/u/${user}/query/${res.data.uniqid}`
      })
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.message)
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div className="contact-screen container">
        <div className="animated fadeIn">
          <Formik
            onSubmit={(values) => {
              this.handleSubmit(values)
            }}>{props => (
              <Form onSubmit={props.handleSubmit}>
                <Card>
                  <CardBody className="p5-4 pb-5">
                    <div className="flex-wrapper align-items-center">
                      <h4 className="title text-primary f-18 mb-5 mt-4">Create a Query</h4>
                    </div>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label htmlFor="warehouseName">Title</Label>
                          <Input
                            name='title' 
                            type="text" 
                            placeholder="Title" 
                            onChange={props.handleChange}
                            value={props.values.title}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label htmlFor="warehouseName">Email</Label>
                          <Input 
                            name='email'
                            type="email" 
                            placeholder="Email"
                            onChange={props.handleChange}
                            value={props.values.email}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label htmlFor="warehouseName">Message</Label>
                          <Input 
                            type="textarea"
                            name='message' 
                            className="pt-3 pb-3" 
                            rows={5} 
                            placeholder="What would you like to ask?" 
                            onChange={props.handleChange}
                            value={props.values.message}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button color="primary" className="mt-4 mb-3">Ask</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Contact)
