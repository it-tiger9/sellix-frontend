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
  Form,
  Input,
} from 'reactstrap'
import Select from 'react-select'
import { Loader } from 'components'
import { Formik } from 'formik'
import { CommonActions } from 'services/global'
import { createBlacklist } from './actions'
import { getBlacklist } from '../../actions'
import { editBlacklist } from '../detail/actions'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import find from 'lodash/find'
import './style.scss'
import * as Yup from "yup";

const user = window.localStorage.getItem('userId')

const mapStateToProps = ({ blacklist: { blacklist_list } }) => ({ blacklist_list })
const mapDispatchToProps = dispatch => {
  return ({
    commonActions: bindActionCreators(CommonActions, dispatch),
    actions: bindActionCreators({ getBlacklist }, dispatch),
    createBlacklist: bindActionCreators(createBlacklist, dispatch),
    editBlacklist: bindActionCreators(editBlacklist, dispatch),
  })
}

const TYPE_OPTIONS = [
  { label: 'Email', value: 'email' },
  { label: 'IP', value: 'ip' },
  { label: 'Country', value: 'country' },
]


class CreatePage extends React.Component {

  constructor(props) {
    super(props);

    let initialValues = this.isEdit() ? find(props.blacklist_list, item => item.uniqid === props.match.params.id) : {
      type: '',
      data: '',
      note: '',
    };

    this.state = {
      loading: false,
      initialValues: initialValues,
    }
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
        pathname: `/dashboard/${user}/blacklist`
      })
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error || err.message)
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  render() {

    const { loading, initialValues } = this.state;

    const validateIP = ip => {
      if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
        return true
      } else {
        this.props.commonActions.tostifyAlert('error', 'IP address incorrect')
        return false
      }
    };

    return (
      <div className="create-pages-screen mt-3">
        <div className="animated fadeIn">
          <Breadcrumb className="mb-0">
            <BreadcrumbItem active className="mb-0">
              <a onClick={(e) => this.props.history.goBack()}><i className="fas fa-chevron-left"/> Blacklist</a>
            </BreadcrumbItem>
          </Breadcrumb>
          <Formik
              initialValues={initialValues}
              onSubmit={(values) => this.handleSubmit(values)}
              validationSchema={Yup.object().shape({
                type: Yup.string().required('Type is required'),
                data: Yup.string().required('Specify data to be blocked'),
                note: Yup.string().required('Note is required'),
              })}
          >
            {props => (
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
                                    options={TYPE_OPTIONS}
                                    onChange={(option) => {
                                      props.setFieldValue('type', option.value)
                                    }}
                                    value={props.values.type}
                                    className={
                                      props.errors.type && props.touched.type
                                          ? "is-invalid"
                                          : ""
                                    }
                                    searchable={false}
                                  />
                                  {props.errors.type && props.touched.type && (
                                      <div className="invalid-feedback">{props.errors.type}</div>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={12}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Blocked Data</Label>
                                  <Input
                                      placeholder="Blocked Data"
                                      name="data"
                                      onChange={props.handleChange}
                                      value={props.values.data}
                                      className={
                                        props.errors.data && props.touched.data
                                            ? "is-invalid"
                                            : ""
                                      }
                                  />
                                  {props.errors.data && props.touched.data && (
                                      <div className="invalid-feedback">{props.errors.data}</div>
                                  )}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={12}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="product_code">Note</Label>
                                  <Input
                                    placeholder="Note"
                                    type="textarea"
                                    name="note"
                                    rows={6}
                                    onChange={props.handleChange}
                                    value={props.values.note}
                                    className={
                                      props.errors.note && props.touched.note
                                          ? "is-invalid"
                                          : ""
                                    }
                                  />
                                  {props.errors.note && props.touched.note && (
                                      <div className="invalid-feedback">{props.errors.note}</div>
                                  )}
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