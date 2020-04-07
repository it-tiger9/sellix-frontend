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
  Form,
  Input
} from 'reactstrap'
import Select from 'react-select'
import { Formik } from 'formik';
import * as Yup from "yup";
import { Loader, ImageUpload, AvatarUploader } from 'components'
import * as Actions from './actions'
import {
  CommonActions,
  AuthActions
} from 'services/global'
import './style.scss'


const CURRENCY_OPTIONS = [
	{ value: 'USD', label: 'US Dollar (USD)' },
]

const TIMEAONES = [
	{ value: 'GMT+00:00', label: '(GMT+00:00) London' },
]


const mapStateToProps = (state) => {
  return ({

  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    actions: bindActionCreators(Actions, dispatch),
    authActions: bindActionCreators(AuthActions, dispatch),
    commonActions: bindActionCreators(CommonActions, dispatch)
  })
}

class GeneralSettings extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      files: [],
      initState: {
        profile_attachment: '',
        email: '',
        username: ''
      }
    }
  }

  addFile = file => {
    this.setState({
      files: file.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    });
  };

  handleSubmit(data) {
    this.setState({loading: true})
    this.props.actions.saveGeneralSettings(data).then(res => {
      this.props.commonActions.tostifyAlert('success', res.message)
    }).catch(err => {
      this.props.commonActions.tostifyAlert('error', err.error)
    }).finally(() => {
      this.setState({loading: false})
    })
  }


  componentDidMount() {
    this.setState({loading: true})
    this.props.authActions.getUserSettings().then(res => {
      const settings = res.data.settings

      this.setState({
        initState: {
          profile_attachment: settings.profile_attachment || '',
          email: settings.email || '',
          username: settings.username || '',
        }
      })
    }).finally(() => {
      this.setState({loading: false})
    })
  }

  render() {
    const { 
      loading, 
      files, 
      initState
    } = this.state

    return (
      <div className="create-product-screen">
        <div className="animated fadeIn">
          <Formik
            initialValues={initState}
            enableReinitialize={true}
            onSubmit={(values) => {
              this.handleSubmit(values)
            }}
            validationSchema={Yup.object().shape({
              profile_attachment: Yup.string(),
              email: Yup.string()
                .email('Please enter the valid email')
                .required('Email is required'),
              username: Yup.string()
                .required("Username is required")
            })}>
              {props => (
                <Form onSubmit={props.handleSubmit}>
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
                                    {/* <AvatarUploader addFile={this.addFile} files={files} name="gavinice" 
                                      caption="Click to change your avatar" /> */}
                                    <Label htmlFor="profile_attachment">Avatar URL</Label>
                                    <Input
                                      type="text"
                                      id="profile_attachment"
                                      name="profile_attachment"
                                      placeholder="Avatar URL"
                                      onChange={props.handleChange}
                                      value={props.values.profile_attachment}
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col lg={12}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                      type="text"
                                      id="username"
                                      name="username"
                                      placeholder="Username"
                                      onChange={props.handleChange}
                                      value={props.values.username}
                                      className={
                                        props.errors.username && props.touched.username
                                          ? "is-invalid"
                                          : ""
                                      }
                                    />
                                    {props.errors.username && props.touched.username && (
                                      <div className="invalid-feedback">{props.errors.username}</div>
                                    )}
                                  </FormGroup>
                                </Col>
                                <Col lg={12}>
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                      type="text"
                                      id="email"
                                      name="email"
                                      placeholder="Email"
                                      onChange={props.handleChange}
                                      value={props.values.email}
                                      className={
                                        props.errors.email && props.touched.email
                                          ? "is-invalid"
                                          : ""
                                      }
                                    />
                                    {props.errors.email && props.touched.email && (
                                      <div className="invalid-feedback">{props.errors.email}</div>
                                    )}
                                  </FormGroup>
                                </Col>
                              </Row>
                              {/* <Row>
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
                              </Row> */}
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
                    <Button color="primary" type="submit" className="" style={{width: 200}}
                    >Save Settings</Button>
                    
                  </Card>
                </Form>
              )}
            </Formik>
                  
          
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings)
