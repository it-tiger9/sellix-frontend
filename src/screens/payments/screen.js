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

class Payments extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      tooltipOpen: false,
      files: []
    }
  }


  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  }

  unlistedTooltipToggle() {
    this.setState({tooltipOpen: !this.state.tooltipOpen})
  }

  addFile = file => {
    console.log(file);
    this.setState({
      files: file.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    });
  };

  render() {
    const { loading, tooltipOpen, files } = this.state

    return (
      <div className="payments-screen">
        <div className="animated fadeIn">
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
                        <Label className="title">Payments</Label>
                      </FormGroup>
                    </Col>
                    <Col lg={12}>
                      <Row>
                        <Col lg={12}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">PayPal Email</Label>
                            <Input type="text" placeholder="PayPal Email"></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Perfect Money ID</Label>
                            <Input type="text" placeholder="Perfect Money ID"></Input>
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Perfect Money Alternate Passphrase</Label>
                            <Input type="text" placeholder="Perfect Money Alternate Passphrase"></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Stripe</Label><br/>
                            <Button color="primary" className="stripe-button">Connect with Stripe</Button>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Skrill Email</Label>
                            <Input type="text" placeholder="Skrill Email"></Input>
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Skrill Secret Word</Label>
                            <Input type="text" placeholder="Skrill Secret Word"></Input>
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
                        <Label className="title">Crypto Currency</Label>
                      </FormGroup>
                    </Col>
                    <Col lg={12}>
                      <FormGroup className="mb-3">
                        <Label htmlFor="product_code">Crypto Currency Integration</Label><br/>
                        <Select placeholder="Select..."/>
                      </FormGroup>
                    </Col>
                  </Row>
              }

              
            </CardBody>
            <Button color="primary" className="mb-4" style={{width: 200}}>Save Settings</Button>
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments)
