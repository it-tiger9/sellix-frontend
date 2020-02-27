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
import { Loader, FaviconUploader } from 'components'
import ColorPicker from 'rc-color-picker'

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

class Custoization extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      openModal: false,
      files: [],
      color: '#613BEA'
    }
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
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

  changeHandler(e) {
    this.setState({
      color: e.target.value
    })
  }


  render() {
    const { 
      loading, 
      files, 
      color
    } = this.state


    return (
      <div className="customization-screen">
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
                        <Label className="title">Shop customization</Label>
                      </FormGroup>
                    </Col>
                    <Col lg={12}>
                      <Row>
                        <Col lg={4}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Primary Color</Label>
                            <div className="d-flex">
                              <Input type="color" className="colorpicker" 
                                onChange={this.changeHandler.bind(this)} value={color}></Input>
                              <Input type="text" value={color} onChange={this.changeHandler.bind(this)} ></Input>
                            </div>
                            
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12}>
                          <FormGroup className="mb-3">
                            <Label htmlFor="product_code">Favicon</Label>
                            <FaviconUploader  addFile={this.addFile} files={files}/>
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
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Custoization)
