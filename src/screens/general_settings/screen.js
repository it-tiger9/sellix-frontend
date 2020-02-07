import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { Editor } from "react-draft-wysiwyg"
import { EditorState } from "draft-js"

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
  Button
} from "reactstrap"
import Select from 'react-select'

import './style.scss'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
  })
}

class GeneralSettings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }

    this.onEditorStateChange = this.onEditorStateChange.bind(this)
  }

  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    })
  }

  render(){
    const { editorState } = this.state

    return (
      <div className="general-settings-screen">
        <div className="animated fadeIn">
          <Row>
            <Col xs="12">
              <Card>
                <CardHeader> 
                  <div className="h4 mb-0 d-flex align-items-center">
                    <i className="nav-icon icon-wrench" />
                    <span className="ml-2">General Settings</span>
                  </div>
                </CardHeader>
                <CardBody>
                  <h4>General Details</h4>
                  <Form
                    action=""
                    method="post"
                    encType="multipart/form-data"
                    className="form-horizontal"
                  >
                    <Row>
                      <Col sm="6">
                        <FormGroup>
                          <Label htmlFor="text-input">
                            Invoicing Refrence Pattern
                          </Label>
                          <Input
                            type="text"
                            id="text-input"
                            name="text-input"
                            placeholder="Text"
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="6">
                        <FormGroup >
                          <Label htmlFor="select">Invoicing Templates</Label>
                          <Select
                            options={[]}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                  <h4>Mail Configuration Detail</h4>
                  <Form
                    action=""
                    method="post"
                    encType="multipart/form-data"
                    className="form-horizontal"
                  >
                    <Row>
                      <Col sm='6'>
                        <FormGroup>
                          <Label htmlFor="text-input">Mailing Host</Label>
                          <Input type="text" id="text-input" name="text-input" />
                        </FormGroup>
                      </Col>
                      <Col sm='6'>
                        <FormGroup>
                          <Label htmlFor="text-input">Mailing Post</Label>
                          <Input type="text" id="text-input" name="text-input" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm='6'>
                        <FormGroup>
                          <Label htmlFor="text-input">Mailing UserName</Label>
                          <Input type="text" id="text-input" name="text-input" />
                        </FormGroup>
                      </Col>
                      <Col sm='6'>
                        <FormGroup>
                          <Label htmlFor="text-input">Mailing Password</Label>
                          <Input type="password" id="text-input" name="text-input" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm='6'>
                        <FormGroup>
                          <Label htmlFor="text-input">Mailing SMTP Authorization</Label>
                          <div>
                            <FormGroup check inline>
                              <div className="custom-radio custom-control">
                                <input 
                                  className="custom-control-input"
                                  type="radio"
                                  id="inline-radio1"
                                  name="SMTP-auth"
                                  value="Y"
                                  checked
                                  onChange={this.handleChange} />
                                <label className="custom-control-label" htmlFor="inline-radio1">Yes</label>
                              </div>
                            </FormGroup>
                            <FormGroup check inline>
                              <div className="custom-radio custom-control">
                                <input 
                                  className="custom-control-input"
                                  type="radio"
                                  id="inline-radio2"
                                  name="SMTP-auth"
                                  value="N"
                                  onChange={this.handleChange}/>
                                <label className="custom-control-label" htmlFor="inline-radio2">No</label>
                              </div>
                            </FormGroup>
                          </div>
                        </FormGroup>
                      </Col>
                      <Col sm='6'>
                        <FormGroup>
                          <Label htmlFor="text-input">Mailing Smtp Starttls Enable</Label>
                          <div>
                            <FormGroup check inline>
                              <div className="custom-radio custom-control">
                                <input 
                                  className="custom-control-input"
                                  type="radio"
                                  id="inline-radio3"
                                  name="SMTP-enable"
                                  value="Y"
                                  checked
                                  onChange={this.handleChange} />
                                <label className="custom-control-label" htmlFor="inline-radio3">Yes</label>
                              </div>
                            </FormGroup>
                            <FormGroup check inline>
                              <div className="custom-radio custom-control">
                                <input 
                                  className="custom-control-input"
                                  type="radio"
                                  id="inline-radio4"
                                  name="SMTP-enable"
                                  value="N"
                                  onChange={this.handleChange}/>
                                <label className="custom-control-label" htmlFor="inline-radio4">No</label>
                              </div>
                            </FormGroup>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>

                  <h4>Invoice Mail Configuration</h4>
                  <Form
                    action=""
                    method="post"
                    encType="multipart/form-data"
                    className="form-horizontal"
                  >
                    <Row>
                      <Col sm="8">
                        <FormGroup>
                          <Label htmlFor="text-input">Subject</Label>
                          <Input
                            type="text"
                            id="text-input"
                            name="text-input"
                            placeholder="Text"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="text-input">Message</Label>
                          <Editor
                            editorState={editorState}
                            toolbarClassName="editor-toolbar"
                            wrapperClassName="wrapperClassName"
                            editorClassName="massage-editor"
                            onEditorStateChange={this.onEditorStateChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm="4">
                        <FormGroup>
                          <Label htmlFor="text-input">Description</Label>
                          <Table responsive bordered>
                            <thead>
                              <th>Value</th>
                              <th>Description</th>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{"{invoiceReferenceNumber}"}</td>
                                <td>Invoice Reference Number</td>
                              </tr>
                              <tr>
                                <td>{"{invoiceDate}"}</td>
                                <td>Invoice Date</td>
                              </tr>
                              <tr>
                                <td>{"{invoiceDueDate}"}</td>
                                <td>Invoice Due Date</td>
                              </tr>
                              <tr>
                                <td>{"{invoiceDiscount}"}</td>
                                <td>Invoice Discount</td>
                              </tr>
                              <tr>
                                <td>{"{contractPoNumber}"}</td>
                                <td>contract Po Number</td>
                              </tr>

                              <tr>
                                <td>{"{contactName}"}</td>
                                <td>Contact Name</td>
                              </tr>
                              <tr>
                                <td>{"{projectName}"}</td>
                                <td>Project Name</td>
                              </tr>
                              <tr>
                                <td>{"{invoiceAmount}"}</td>
                                <td>Invoice Amount</td>
                              </tr>
                              <tr>
                                <td>{"{dueAmount}"}</td>
                                <td>Due Amount</td>
                              </tr>
                              <tr>
                                <td>{"{senderName}"}</td>
                                <td>Sender Name</td>
                              </tr>
                              <tr>
                                <td>{"{companyName}"}</td>
                                <td>Company Name</td>
                              </tr>
                            </tbody>
                          </Table>
                        </FormGroup>
                        
                      </Col>
                    </Row>
                  </Form>
                  <FormGroup className="text-right mt-5">
                    <Button type="submit" name="submit" color="primary" className="btn-square">
                      <i className="fa fa-dot-circle-o"></i> Save
                    </Button>
                    <Button color="secondary" className="btn-square">
                      <i className="fa fa-ban"></i> Cancel
                    </Button>
                  </FormGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings)
