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
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";


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

class CreatePage extends React.Component {
  
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

    console.log(files)

    return (
      <div className="create-pages-screen">
        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              <Row style={{alignItems: 'center'}}>
                <Col md={12}>
                  <h1>New Page</h1>
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
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Title</Label>
                            <Input type="text" placeholder="Title"></Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Code</Label>
                            <div className="d-flex">
                              <Button color="primary" className="code-addon">gavinice.selly.store/</Button>
                              <Input type="number" placeholder="Coupon code"></Input>
                            </div>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Template</Label>
                            <AceEditor
                              mode="markdown"
                              theme="github"
                              name="blah2"
                              onLoad={this.onLoad}
                              onChange={this.onChange}
                              width="100%"
                              fontSize={14}
                              showPrintMargin={false}
                              showGutter={true}
                              highlightActiveLine={true}
                              value={``}
                              setOptions={{
                                enableBasicAutocompletion: false,
                                enableLiveAutocompletion: false,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2,
                                wrap: 'view'
                            }}/>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
              }
            </CardBody>
            <Button color="primary" className="" style={{width: 200}}
            >Save Page</Button>
            
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage)
