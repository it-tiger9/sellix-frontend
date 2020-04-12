import React from 'react'
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { ToastContainer, toast } from 'react-toastify'
import { landingRoutes } from 'routes'
import {
  AuthActions,
  CommonActions
} from 'services/global'
import {NotFound} from 'components'

import {
    Button,
    Col,
    Container,
    Row,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'reactstrap'

import sellix_logo from 'assets/images/Sellix_logo_beta.svg'
import './style.scss'

const mapStateToProps = (state) => {
  return ({
    is_authed: state.auth.is_authed
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    authActions: bindActionCreators(AuthActions, dispatch),
    commonActions: bindActionCreators(CommonActions, dispatch)
  })
}

class LandingLayout extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        isOpen: false
    }
  }


  toggle() {
    this.setState({isOpen: !this.state.isOpen})
  }

  componentDidMount () {
    const preUrl = `/${window.localStorage.getItem('userId')}`

    if (window.localStorage.getItem('accessToken') && this.props.is_authed) {
      this.props.history.push(preUrl)
    }

    const toastifyAlert = (status, message) => {
      if (!message) {
        message = 'Unexpected Error'
      }
      if (status === 'success') {
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT
        })
      } else if (status === 'error') {
        toast.error(message, {
          position: toast.POSITION.TOP_RIGHT
        })
      } else if (status === 'warn') {
        toast.warn(message, {
          position: toast.POSITION.TOP_RIGHT
        })
      } else if (status === 'info') {
        toast.info(message, {
          position: toast.POSITION.TOP_RIGHT
        })
      }
    }
    this.props.commonActions.setTostifyAlertFunc(toastifyAlert)
  }

  render() {
    const containerStyle = {
      zIndex: 1999
    }

    const { isOpen } = this.state

    const user = window.localStorage.getItem('userId')

    var dashboardUrl = user? `/dashboard/${user}/home` : '/'

    return (
    <div className="landing-layout">
        <div className="animated fadeIn">
            <div className="initial-container">
                <ToastContainer position="top-right" autoClose={5000} style={containerStyle} hideProgressBar={true}/>
                <header className="pt-2 pb-2 ">
                    <Navbar  color="white" light expand="lg">
                        <NavbarBrand href="/">
                            <img className="logo" src={sellix_logo}/>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle.bind(this)} />
                        <Collapse className="mr-5" isOpen={isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                            <NavItem className="active">
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/">Features</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/auth/register">Get Started</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/"></NavLink>
                            </NavItem>
                            <NavItem className="d-xl-none">
                                <NavLink href="/auth/login">Sign In</NavLink>
                            </NavItem>
                            <NavItem className="d-xl-none">
                                <NavLink href="/auth/register">Sign Up</NavLink>
                            </NavItem>
                            </Nav>
                        </Collapse>
                        <div className="d-lg-down-none">
                            { user?
                                    <Link to={dashboardUrl}>
                                        <Button className="mr-3" color="primary" >Dashboard</Button>
                                    </Link>
                                :
                                <>
                                    <Link to="/auth/login">
                                        <Button className="mr-3" color="secondary" >Sign In</Button>
                                    </Link>
                                    <Link to="/auth/register">
                                        <Button color="primary">Sign Up</Button>
                                    </Link>
                                </>
                            }
                        </div>
                        </Navbar>
                    </header>

                <Router>
                {
                    landingRoutes.map((prop, key) => {
                    if (prop.redirect)
                        return <Redirect from={prop.path} to={prop.pathTo} key={key} />
                    return (
                        <Route
                          path={prop.path}
                          component={prop.component}
                          key={key}
                        />
                    )
                    })
                }
                </Router>

                <footer>
                <div className="section text-center" style={{paddingBottom: 100, paddingTop: 100}}>
                    <Container className="home-container p-0" fluid>
                        <div className="d-flex justify-content-between text-left flex-wrap">
                        <div className="mb-3">
                            <NavbarBrand className="p-0" href="/">
                            <img src={sellix_logo} style={{width: 88, height: 25}}/>
                            </NavbarBrand>
                            <p className="mt-2">Copyright © 2020, Sellix.io.</p>
                        </div>
                        <div className="mb-3" style={{maxWidth: 295}}>
                            <h5 className="mb-3">About Us</h5>
                            <p className="mt-4">Sellix is an online e-commerce payment processing 
                            website that lets your create your own store with a couple of clicks.</p>
                        </div>
                        <div className="mb-3">
                            <h5 className="mb-3">Sellix</h5>
                            <Nav vertical>
                            <NavItem>
                                <NavLink href={dashboardUrl}>Dashboard</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/auth/register">Register</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/terms">Terms</NavLink>
                            </NavItem>
                            </Nav>
                        </div>
                        <div className="mb-3">
                            <h5 className="mb-3">Products</h5>
                            <Nav vertical>
                            <NavItem>
                                <NavLink href="#">API</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">Payments</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/fees">Fees</NavLink>
                            </NavItem>
                            </Nav>
                        </div>
                        <div className="mb-3">
                            <h5 className="mb-3">Help</h5>
                            <Nav vertical>
                            <NavItem>
                                <NavLink href="#">Help Center</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">Contact Us</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">Twitter</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">Status</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">Report Abuse</NavLink>
                            </NavItem>
                            </Nav>
                        </div>
                        </div>
                    
                    </Container>
                </div>
                
                </footer>
            </div>
        </div>
    </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingLayout)
