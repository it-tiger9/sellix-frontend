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
import { Editor } from "react-draft-wysiwyg"
import { EditorState } from "draft-js"
import { AppSwitch } from '@coreui/react'
import { Loader, ImageUpload, DataSlider } from 'components'
import * as ProductActions from './actions'

import './style.scss'

import bitcoinIcon from 'assets/images/crypto/btc.svg'
import ethereumIcon from 'assets/images/crypto/eth.svg'
import stripeIcon from 'assets/images/crypto/stripe.svg'
import bitcoinCashIcon from 'assets/images/crypto/bitcoincash.svg'
import litecoinIcon from 'assets/images/crypto/ltc.svg'
import skrillIcon from 'assets/images/crypto/skrill.svg'
import perfectmoneyIcon from 'assets/images/crypto/perfectmoney.svg'

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

class CreateProduct extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      unlistedTooltipOpen: false,
      privateTooltipOpen: false,
      blockTooltipOpen: false,
      paypalTooltipOpen: false,
      files: [],
      editorState: EditorState.createEmpty()
    }

    this.onEditorStateChange = this.onEditorStateChange.bind(this)
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    })
  }

  unlistedTooltipToggle() {
    this.setState({unlistedTooltipOpen: !this.state.unlistedTooltipOpen})
  }

  privateTooltipToggle() {
    this.setState({privateTooltipOpen: !this.state.privateTooltipOpen})
  }

  blockTooltipToggle() {
    this.setState({blockTooltipOpen: !this.state.blockTooltipOpen})
  }

  paypalTooltipToggle() {
    this.setState({paypalTooltipOpen: !this.state.paypalTooltipOpen})
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
    const { 
      loading, 
      unlistedTooltipOpen, 
      privateTooltipOpen,
      blockTooltipOpen,
      paypalTooltipOpen,
      files, 
      editorState 
    } = this.state

    return (
      <div className="create-product-screen">
        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              <Row style={{alignItems: 'center'}}>
                <Col md={12}>
                  <h1>New Product</h1>
                </Col>
              </Row>
            </CardHeader>
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
                      <Row>
                        <Col lg={12}>
                          <h4 className="mb-4">General Information</h4>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={8}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Title</Label>
                            <Input
                              type="text"
                              id="product_code"
                              name="product_code"
                              placeholder="Title"
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={4}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Price</Label>
                            <div className="d-flex">
                              <Input
                                className="price-select"
                                type="text"
                                id="product_code"
                                name="product_code"
                                placeholder="Price"
                                required
                              />
                              <Select
                                className="currency-select"
                                id="parentProduct"
                                name="parentProduct"
                                placeholder="USD"
                              />
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Description</Label>
                            <Editor
                              editorState={editorState}
                              toolbarClassName="editor-toolbar"
                              wrapperClassName="wrapperClassName"
                              editorClassName="massage-editor"
                              onEditorStateChange={this.onEditorStateChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12}>
                          
                          <FormGroup className="mb-3 mr-4">
                            <Label htmlFor="product_code">Payment Methods</Label>
                            <div className="d-flex flex-wrap">
                              <div className="custom-checkbox custom-control payment-checkbox">
                                <input 
                                  className="custom-control-input"
                                  type="checkbox"
                                  id="paypal"
                                  name="SMTP-auth"
                                  />
                                <label className="custom-control-label" htmlFor="paypal">
                                  <i className="fa fa-paypal"></i>
                                  PayPal
                                </label>
                              </div>

                              <div className="custom-checkbox custom-control payment-checkbox">
                                <input 
                                  className="custom-control-input"
                                  type="checkbox"
                                  id="btc"
                                  name="SMTP-auth"
                                  />
                                <label className="custom-control-label" htmlFor="btc">
                                  <img src={bitcoinIcon} width="20" height="20"/>
                                  Bitcoin
                                </label>
                              </div>

                              <div className="custom-checkbox custom-control payment-checkbox">
                                <input 
                                  className="custom-control-input"
                                  type="checkbox"
                                  id="eth"
                                  name="SMTP-auth"
                                  />
                                <label className="custom-control-label" htmlFor="eth">
                                  <img src={ethereumIcon} width="20" height="20"/>
                                  Ethereum
                                </label>
                              </div>

                              <div className="custom-checkbox custom-control payment-checkbox">
                                <input 
                                  className="custom-control-input"
                                  type="checkbox"
                                  id="ltc"
                                  name="SMTP-auth"
                                  />
                                <label className="custom-control-label" htmlFor="ltc">
                                  <img src={litecoinIcon} width="20" height="20"/>
                                  Litecoin
                                </label>
                              </div>

                              <div className="custom-checkbox custom-control payment-checkbox">
                                <input 
                                  className="custom-control-input"
                                  type="checkbox"
                                  id="sp"
                                  name="SMTP-auth"
                                  />
                                <label className="custom-control-label" htmlFor="sp">
                                  <img src={stripeIcon} width="20" height="20"/>
                                  Stripe
                                </label>
                              </div>

                              <div className="custom-checkbox custom-control payment-checkbox">
                                <input 
                                  className="custom-control-input"
                                  type="checkbox"
                                  id="pm"
                                  name="SMTP-auth"
                                  />
                                <label className="custom-control-label" htmlFor="pm">
                                  <img src={perfectmoneyIcon} width="20" height="20"/>
                                  Perfect Money
                                </label>
                              </div>

                              <div className="custom-checkbox custom-control payment-checkbox">
                                <input 
                                  className="custom-control-input"
                                  type="checkbox"
                                  id="btcc"
                                  name="SMTP-auth"
                                  />
                                <label className="custom-control-label" htmlFor="btcc">
                                  <img src={bitcoinCashIcon} width="20" height="20"/>
                                  Bitcoin Cash
                                </label>
                              </div>

                              <div className="custom-checkbox custom-control payment-checkbox">
                                <input 
                                  className="custom-control-input"
                                  type="checkbox"
                                  id="sk"
                                  name="SMTP-auth"
                                  />
                                <label className="custom-control-label" htmlFor="sk">
                                  <img src={skrillIcon} width="20" height="20"/>
                                  Skrill
                                </label>
                              </div>
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <hr className="mt-4"/>

                      <Row>
                        <Col lg={12}>
                          <h4 className="mb-4 mt-4">Product Stock</h4>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Type</Label>
                            <Select placeholder="Type" className="mb-3"></Select>
                            <ImageUpload  addFile={this.addFile} files={files}/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12}>
                          <FormGroup row>
                            <Col xs="12" md="7" className="d-flex align-items-center">
                              <AppSwitch className="mx-1 file-switch mr-2"
                                style={{width: 50}}
                                variant={'pill'} 
                                color={'primary'}
                                size="sm"
                                /><span>Set how many this file can be sold </span>
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>

                      <hr className="mt-4"/>
                      <Row>
                        <Col lg={12}>
                          <h4 className="mb-4 mt-4">Customization</h4>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={8}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Layout</Label>
                            <Select placeholder="Layout"></Select>
                          </FormGroup>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Note to Customer(optional)</Label>
                            <Input
                              type="text"
                              id="product_code"
                              name="product_code"
                              placeholder="Note to Customer"
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={4}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Image(optional)</Label>
                            <ImageUpload  addFile={this.addFile} files={files}/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={3}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Custom Fields(optional)</Label>
                            <Button color="default">Add Custom Field</Button>
                          </FormGroup>
                        </Col>
                      </Row>

                      <hr className="mt-4"/>
                      <Row>
                        <Col lg={12}>
                          <h4 className="mb-4 mt-4">Miscellaneous</h4>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Webhook URL (optional)</Label>
                            <Input
                              type="text"
                              id="product_code"
                              name="product_code"
                              placeholder="Webhook URL"
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Crypto Currency Confirmations</Label>
                            <DataSlider domain={[0, 6]} value={[3]} ticks={[0, 1, 2, 3, 4, 5, 6]}/>
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Max Risk Level</Label>
                            <DataSlider domain={[0, 100]} value={[50]} ticks={[1, 50, 100]}/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12} className="d-flex flex-wrap">
                          <FormGroup check inline className="mb-3 mr-4">
                            <div className="custom-checkbox custom-control">
                              <input 
                                className="custom-control-input"
                                type="checkbox"
                                id="unlisted"
                                name="SMTP-auth"
                                />
                              <label className="custom-control-label" htmlFor="unlisted">
                                Unlisted &nbsp;
                                <span href="#" id="unlistedTooltip"><i className="fa fa-question-circle"></i></span>
                                <Tooltip placement="right" isOpen={unlistedTooltipOpen} target="unlistedTooltip" 
                                  toggle={this.unlistedTooltipToggle.bind(this)}>
                                  Unlisted!
                                </Tooltip>
                              </label>
                            </div>
                          </FormGroup>
                          <FormGroup check inline className="mb-3 mr-4">
                            <div className="custom-checkbox custom-control">
                              <input 
                                className="custom-control-input"
                                type="checkbox"
                                id="private"
                                name="SMTP-auth"
                                />
                              <label className="custom-control-label" htmlFor="private">
                                Private &nbsp;
                                <span href="#" id="privateTooltip"><i className="fa fa-question-circle"></i></span>
                                <Tooltip placement="right" isOpen={privateTooltipOpen} target="privateTooltip" 
                                  toggle={this.privateTooltipToggle.bind(this)}>
                                  Private
                                </Tooltip>
                              </label>
                            </div>
                          </FormGroup>
                          <FormGroup check inline className="mb-3 mr-4">
                            <div className="custom-checkbox custom-control">
                              <input 
                                className="custom-control-input"
                                type="checkbox"
                                id="block"
                                name="SMTP-auth"
                                />
                              <label className="custom-control-label" htmlFor="block">
                                Block VPNs/Proxies &nbsp;
                                <span href="#" id="blockTooltip"><i className="fa fa-question-circle"></i></span>
                                <Tooltip placement="right" isOpen={blockTooltipOpen} target="blockTooltip" 
                                  toggle={this.blockTooltipToggle.bind(this)}>
                                  Block VPNs/Proxies
                                </Tooltip>
                              </label>
                            </div>
                          </FormGroup>
                          <FormGroup check inline className="mb-3 mr-4">
                            <div className="custom-checkbox custom-control">
                              <input 
                                className="custom-control-input"
                                type="checkbox"
                                id="paypal-email"
                                name="SMTP-auth"
                                />
                              <label className="custom-control-label" htmlFor="paypal-email">
                                PayPal Email Delivery &nbsp;
                                <span href="#" id="paypalTooltip"><i className="fa fa-question-circle"></i></span>
                                <Tooltip placement="right" isOpen={paypalTooltipOpen} target="paypalTooltip" 
                                  toggle={this.paypalTooltipToggle.bind(this)}>
                                  PayPal Email Delivery
                                </Tooltip>
                              </label>
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
              }
            </CardBody>
            <Button color="primary" className="" style={{width: 200}}
            >Save Product</Button>
            
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct)
