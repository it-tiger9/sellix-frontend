import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Row,
  Input,
  Col,
  Form, 
  FormGroup,
  Label
} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify'
import ImagesUploader from 'react-images-uploader'
import Select from 'react-select'

import { Loader } from 'components'

import 'react-toastify/dist/ReactToastify.css'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import 'react-images-uploader/styles.css'
import 'react-images-uploader/font.css'
import './style.scss'


const industryOptions = [
  { value: 'input', label: 'Option1'},
  { value: 'output', label: 'Option2'},
  { value: 'all', label: 'Option3'},
]

const mapStateToProps = (state) => {
  return ({
    
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({

  })
}

class Organization extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      pictures: [] 
    }

    this.onDrop = this.onDrop.bind(this);///
  }

  onDrop(picture) {
    this.setState({
        pictures: this.state.pictures.concat(picture),
    });
 }

  render() {
    const { loading } = this.state;
    const containerStyle = {
      zIndex: 1999
    };

    return (
      <div className="organization-screen">
        <div className="animated fadeIn">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            style={containerStyle}
          />

          <Card>
            <CardHeader>
              <div className="h4 mb-0 d-flex align-items-center">
                <i className="nav-icon fas fa-sitemap" />
                <span className="ml-2">Organization</span>
              </div>
            </CardHeader>
            <CardBody>
            {
              loading ?
                <Loader></Loader>: 
                <Row>
                  <Col lg='12'>
                    <Form name="simpleForm" className="mt-3">
                      <FormGroup row>
                        <Col md="2" className="text-right">
                          <Label htmlFor="categoryName" className="mt-3">Company Logo</Label>
                        </Col>
                        <Col xs="12" md="8">
                          <ImagesUploader
                            url="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            optimisticPreviews
                            multiple={false}
                            onLoadEnd={(err) => {
                              if (err) {
                                console.error(err);
                              }
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="2" className="text-right">
                          <Label htmlFor="categoryName">
                            <span className="text-danger">*</span>Company Name
                          </Label>
                        </Col>
                        <Col xs="12" md="5">
                          <Input
                            type="text"
                            id="categoryName"
                            name="categoryName"
                            placeholder="Enter User Name"
                            required
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="2" className="text-right">
                          <Label htmlFor="categoryName">
                            <span className="text-danger">*</span>Industry
                          </Label>
                        </Col>
                        <Col xs="12" md="5">
                          <Select
                            options={industryOptions}
                            required
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="2" className="text-right">
                          <Label htmlFor="categoryName">
                            <span className="text-danger">*</span>Company Address
                          </Label>
                        </Col>
                        <Col xs="12" md="8">
                          <FormGroup>
                            <Input
                              type="text"
                              id="categoryName"
                              name="categoryName"
                              placeholder="Street1"
                              required
                            />
                          </FormGroup>
                          <FormGroup>
                            <Input
                              type="text"
                              id="categoryName"
                              name="categoryName"
                              placeholder="Street2"
                              required
                            />
                          </FormGroup>
                          <Row>
                            <Col xs="12" md="4">
                              <Input
                                type="text"
                                id="categoryName"
                                name="categoryName"
                                placeholder="City"
                                required
                              />
                            </Col>
                            <Col xs="12" md="4">
                              <Input
                                type="text"
                                id="categoryName"
                                name="categoryName"
                                placeholder="State/Province"
                                required
                              />
                            </Col>
                            <Col xs="12" md="4">
                              <Input
                                type="text"
                                id="categoryName"
                                name="categoryName"
                                placeholder="Zip/Postal Code"
                                required
                              />
                            </Col>
                          </Row>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="2" className="text-right">
                          <Label htmlFor="categoryName">
                            <span className="text-danger">*</span>Phone
                          </Label>
                        </Col>
                        <Col xs="12" md="8">
                          <Input
                            type="text"
                            id="categoryName"
                            name="categoryName"
                            placeholder="Enter Phone Number"
                            required
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="2" className="text-right">
                          <Label htmlFor="categoryName"><span className="text-danger">*</span>Contact Detail</Label>
                        </Col>
                        <Col xs="12" md="8">
                          <Row>
                            <Col xs="12" md="4">
                              <Input
                                type="text"
                                id="categoryName"
                                name="categoryName"
                                placeholder="Name"
                                required
                              />
                            </Col>
                            <Col xs="12" md="4">
                              <Input
                                type="text"
                                id="categoryName"
                                name="categoryName"
                                placeholder="Email"
                                required
                              />
                            </Col>
                            <Col xs="12" md="4">
                              <Input
                                type="text"
                                id="categoryName"
                                name="categoryName"
                                placeholder="Phone"
                                required
                              />
                            </Col>
                          </Row>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="2" className="text-right">
                          <Label htmlFor="categoryName"><span className="text-danger">*</span>Company ID</Label>
                        </Col>
                        <Col xs="12" md="8">
                          <Row>
                            <Col md="2">
                              <Select options={industryOptions}/>
                            </Col>
                            <Col md="4">
                              <Input
                                type="text"
                                id="categoryName"
                                name="categoryName"
                                placeholder="Enter Company Number"
                                required
                              />
                            </Col>
                          </Row>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="2" className="text-right">
                          <Label htmlFor="categoryName"><span className="text-danger">*</span>Tax ID</Label>
                        </Col>
                        <Col xs="12" md="8">
                          <Input
                            type="text"
                            id="categoryName"
                            name="categoryName"
                            placeholder="Enter Tax ID"
                            required
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col md="2"></Col>
                        <Col xs="12" md="8">
                          <Button
                            type="submit"
                            color="primary"
                            className="btn-square mt-5"
                          >
                            <i className="fas fa-save mr-2"></i>Save
                          </Button>
                        </Col>
                      </FormGroup>
                    </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Organization)
