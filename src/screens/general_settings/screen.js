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
import { Loader, ImageUpload, AvatarUploader } from 'components'
import * as ProductActions from './actions'

import './style.scss'


const CURRENCY_OPTIONS = [
	{ value: 'USD', label: 'US Dollar (USD)' },
]

const TIMEAONES = [
	{ value: 'GMT+00:00', label: '(GMT+00:00) London' },
]


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

class GeneralSettings extends React.Component {
  
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
      files, 
    } = this.state

    return (
      <div className="create-product-screen">
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
                      <Row>
                        <Col lg={12}>
                          <FormGroup>
                            <Label className="mb-4">General Information</Label>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12}>
                          <FormGroup className="mb-4">
                            <AvatarUploader addFile={this.addFile} files={files} name="gavinice" 
                              caption="Click to change your avatar" />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Username</Label>
                            <Input
                              type="text"
                              id="product_code"
                              name="product_code"
                              placeholder="Title"
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Email</Label>
                            <Input
                              type="text"
                              id="product_code"
                              name="product_code"
                              placeholder="Title"
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={6}>
                          <FormGroup>
                            <Label>Currency</Label>
                            <Select options={CURRENCY_OPTIONS} className="mb-2"/>
                            <small>Analytics and Reports will show the total/partial revenue in US dollars, your products will be sold with the currency you choose when you create one.</small>
                          </FormGroup>
                        </Col>
                        <Col lg={6}>
                          <FormGroup>
                            <Label>Timezone</Label>
                            <Select options={TIMEAONES} className="mb-2"/>
                            <small>Currently our default timezone for invoices, orders, analytics and basic events is determined by the UTC primary time standard, more options will come in the future.</small>
                          </FormGroup>
                        </Col>
                      </Row>
                      {/* <Row>
                        <Col lg={12}>
                          <FormGroup>
                            <Label>API Key</Label>
                            <div className="d-flex">
                              <Input className="bg-brown" value="vXwyXyji89sxZGyDKyvxzmNnpTa3Bhg4h5jFjJSn5yy2eoVmDg"/>
                              <Button color="primary">Re-Generate</Button>
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12}>
                          <FormGroup>
                            <Label>Webhook Secret</Label>
                            <Select/>
                          </FormGroup>
                        </Col>
                      </Row> */}
                      
                    </Col>
                  </Row>
              }
            </CardBody>
            <Button color="primary" className="" style={{width: 200}}
            >Save Settings</Button>
            
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings)
