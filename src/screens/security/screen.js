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
  FormGroup,
  Label,
  Tooltip,
  Input
} from 'reactstrap'
import Select from 'react-select'
import { Loader, ImageUpload, DataSlider } from 'components'
import { TwoFactorModal } from './sections'

import * as ProductActions from './actions'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
    product_list: state.product.product_list
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    productActions: bindActionCreators(ProductActions, dispatch)
  })
}

class SecurityPage extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      openModal: false
    }
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
  }

  openTwoFactorModal() {
    this.setState({openModal: true})
  }

  closeTwoFactorModal() {
    this.setState({openModal: false})
  }

  render() {
    const { loading, openModal } = this.state


    return (
      <div className="create-pages-screen">
        <div className="animated fadeIn">
          <TwoFactorModal openModal={openModal} closeModal={this.closeTwoFactorModal.bind(this)}/>
          <Card>
            <CardBody className="p-4 mb-5">
              {
                loading ?
                  <Row>
                    <Col lg={12}>
                      <Loader />
                    </Col>
                  </Row>
                : 
                  <Row className="mt-4 mb-4">
                    <Col lg={12}>
                      <FormGroup className="mb-5">
                        <Label className="title">Password</Label>
                      </FormGroup>
                    </Col>
                    <Col lg={12}>
                      <Row>
                        <Col lg={12}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Current Password</Label>
                            <Input type="text" placeholder="Current Password"></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">New Password</Label>
                            <Input type="text" placeholder="New Password"></Input>
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Confirm New Password</Label>
                            <Input type="text" placeholder="Confirm Password"></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
              }
            </CardBody>
            <Button color="primary" className="mb-4" style={{width: 200}}
            >Save Settings</Button>
            
          </Card>
          <Card>
            <CardBody className="p-4 mb-5">
              {
                loading ?
                  <Row>
                    <Col lg={12}>
                      <Loader />
                    </Col>
                  </Row>
                : 
                  <Row className="mt-4 mb-4">
                    <Col lg={12}>
                      <FormGroup className="mb-5">
                        <Label className="title">Two-Factor Authentication</Label>
                      </FormGroup>
                      <p style={{fontSize: 18, color: '#A7A5B4'}}>
                        Keep your account extra secure with a second authentication step.</p>
                      <Button color="default" onClick={this.openTwoFactorModal.bind(this)}>Add</Button>
                    </Col>
                  </Row>
              }
            </CardBody>
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SecurityPage)
