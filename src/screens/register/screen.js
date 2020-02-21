import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  FormGroup,
  Label
} from 'reactstrap'

import {
  Message
} from 'components'

import {
  AuthActions
} from 'services/global'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
    version: state.common.version
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    authActions: bindActionCreators(AuthActions, dispatch)
  })
}

class Register extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      username: 'admin123@gmail.com',
      password: 'admin',
      alert: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.logInHandler = this.logInHandler.bind(this)
  }

  handleChange (key, val) {
    this.setState({
      [key]: val
    })
  }

  logInHandler (e) {
    e.preventDefault()
    const { username, password } = this.state
    let obj = {
      username,
      password
    }
    this.props.authActions.logIn(obj).then(res => {
      this.setState({
        alert: null
      })
      this.props.history.push('/admin')
    }).catch(err => {
      console.log(err)
      this.setState({
        alert: <Message
          type="danger"
          title={err.data.error}
          content="Log in failed. Please try again later"
        />
      })
    })
  }

  render() {

    return (
      <div className="register-screen">
        <div className="animated fadeIn">
          <div className="app flex-row align-items-center">
            <Container>
              <Row className="justify-content-center">
                <Col md="8">
                  { this.state.alert }
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col md="11">
                  <CardGroup>
                    <Card className="second-card text-white bg-primary d-md-down-none">
                      <CardBody className="text-center bg-primary flex align-items-center">
                          <h2 className="mb-3"><b>Welcome back!</b></h2>
                          <p style={{width: '90%'}}>To keep connected with us please login with your personal info.</p>
                          <Link to="/login">
                            <Button
                              color="primary"
                              active
                            >
                              Sign In
                            </Button>
                          </Link>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody className="p-5 bg-gray-100">
                        <Form onSubmit={this.logInHandler}>
                          <h4 className="text-center mb-4">Create Account </h4>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Email</Label>
                            <Input
                              type="text"
                              id="product_code"
                              name="product_code"
                              placeholder="Email"
                              required
                            />
                          </FormGroup>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Username</Label>
                            <Input
                              type="text"
                              id="product_code"
                              name="product_code"
                              placeholder="Username"
                              required
                            />
                          </FormGroup>
                          <FormGroup className="mb-4">
                            <Label htmlFor="product_code">Password</Label>
                            <Input
                              type="password"
                              id="product_code"
                              name="product_code"
                              placeholder="Password"
                              required
                            />
                          </FormGroup>
                          <FormGroup className="mb-4">
                            <Label htmlFor="product_code">Password Confirmation</Label>
                            <Input
                              type="password"
                              id="product_code"
                              name="product_code"
                              placeholder="Password Confirmation"
                              required
                            />
                          </FormGroup>
                          <Row>
                            <Col lg={12} className="text-center mt-4">
                              <Button
                                color="primary"
                                type="submit"
                              >
                                Sign Up
                              </Button>
                            </Col>
                          </Row>
                          
                        </Form>
                      </CardBody>
                    </Card>
                    
                  </CardGroup>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
