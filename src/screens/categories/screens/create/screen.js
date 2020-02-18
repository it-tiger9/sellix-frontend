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
import { Loader, ImageUpload } from 'components'


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

class CreateCategories extends React.Component {
  
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
      <div className="product-screen">
        <div className="animated fadeIn">
          <Card>
            <CardHeader>
              <Row style={{alignItems: 'center'}}>
                <Col md={12}>
                  <h1>New Category</h1>
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
                            <Input
                              type="text"
                              id="product_code"
                              name="product_code"
                              placeholder="Enter Email ID"
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Products</Label>
                            <Select
                              className="select-default-width"
                              id="parentProduct"
                              name="parentProduct"
                              placeholder="Select Products"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Image</Label>
                            <ImageUpload addFile={this.addFile} files={files}/>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={2}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Priority</Label>
                            <Input
                              type="number"
                              id="product_code"
                              name="product_code"
                              placeholder="Sort Priority"
                              required
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={2}>
                          <FormGroup check inline className="mb-3">
                              <div className="custom-checkbox custom-control">
                                <input 
                                  className="custom-control-input"
                                  type="checkbox"
                                  id="inline-radio1"
                                  name="SMTP-auth"
                                  />
                                <label className="custom-control-label" htmlFor="inline-radio1">
                                  Unlisted &nbsp;<span href="#" id="unlistedTooltip"><i className="fa fa-question-circle"></i></span>
                                  <Tooltip placement="right" isOpen={tooltipOpen} target="unlistedTooltip" 
                                    toggle={this.unlistedTooltipToggle.bind(this)}>
                                    Unlisted!
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
            >Save Category</Button>
            
          </Card>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategories)
