import React from 'react'
import { connect } from 'react-redux'
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
  Form,
  Input
} from 'reactstrap'
import Select from 'react-select'
import { Loader } from 'components'
import { Formik } from 'formik'
import * as _ from 'lodash'
import {
  CommonActions
} from 'services/global'
import { createBlacklist } from './actions'
import { getBlacklist } from '../../actions'
import { editBlacklist } from '../detail/actions'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import './style.scss'

const user = window.localStorage.getItem('userId')

const mapStateToProps = (state) => {
  return ({
    blacklist_list: state.blacklist.blacklist_list
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    commonActions: bindActionCreators(CommonActions, dispatch),
    actions: bindActionCreators({ getBlacklist }, dispatch),
    createBlacklist: bindActionCreators(createBlacklist, dispatch),
    editBlacklist: bindActionCreators(editBlacklist, dispatch),
  })
}

const MockDataType = [
  { label: 'email', value: 'email' }
]

const MockData = [
  { label: 'emailForBlackList@gmail.com', value: 'emailForBlackList@gmail.com' },
  { label: 'testing@gmail.com', value: 'testing@gmail.com'}
]

class CreatePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      tooltipOpen: false,
      files: [],
    }
  }

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  }

  unlistedTooltipToggle() {
    this.setState({ tooltipOpen: !this.state.tooltipOpen })
  }

  componentDidMount() {
    this.props.actions.getBlacklist()
  }

  isEdit = () => {
    return this.props.match.params.id
  }

  handleSubmit(values) {
    this.setState({ loading: true })
    const createOrEditPromise = this.isEdit()
      ? this.props.editBlacklist({ ...values, uniqid: this.props.match.params.id })
      : this.props.createBlacklist(values)

    createOrEditPromise.then(res => {
      this.props.commonActions.tostifyAlert('success', res.message)
      this.props.history.push({
        pathname: `/${user}/blacklist`
      })
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.message)
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  render() {
    const { loading } = this.state
    let initialValues = this.isEdit() 
      ? _.find(this.props.blacklist_list, item => item.uniqid === this.props.match.params.id)
      : {}
    return (
      <div className="create-pages-screen mt-3">
        <div className="animated fadeIn">
          <Breadcrumb className="mb-0">
            <BreadcrumbItem active className="mb-0">
              <a onClick={(e) => this.props.history.goBack()}><i className="fas fa-chevron-left"/> Blacklist</a>
            </BreadcrumbItem>
          </Breadcrumb>
          <Formik
            initialValues={
              initialValues
            }
            enableReinitialize={true}
            onSubmit={(values) => {
              this.handleSubmit(values)
            }}>{props => (
              <Form onSubmit={props.handleSubmit}>
                <Card>
                  <CardHeader>
                    <Row style={{ alignItems: 'center' }}>
                      <Col md={12}>
                        <h1>{this.isEdit() ? 'Edit Blacklist' : 'New Blacklist'}</h1>
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
                                  <Label htmlFor="product_code">Type</Label>
                                  <Select
                                    placeholder="Type"
                                    options={MockDataType}
                                    onChange={(option) => {
                                      props.setFieldValue('type', option.value)
                                    }}
                                    value={props.values.type}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={12}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Blocked Data</Label>
                                  <Select
                                    placeholder="Blocked Data"
                                    options={MockData}
                                    onChange={(option) => {
                                      props.setFieldValue('data', option.value)
                                    }}
                                    value={props.values.data}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={12}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Note</Label>
                                  <Input
                                    placeholder="Note"
                                    name="note"
                                    onChange={props.handleChange}
                                    value={props.values.note}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                    }
                  </CardBody>
                  <Button color="primary" type="submit" className="" style={{ width: 200 }}>Save Blacklist</Button>
                </Card>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage)