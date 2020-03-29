import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import * as router from 'react-router-dom';
import {connect} from 'react-redux'
import { Link, NavLink } from 'react-router-dom';
import { bindActionCreators } from 'redux'

import { Container, Nav, NavItem, Label, Card } from 'reactstrap'
import {
  AppAside,
  AppBreadcrumb,
  AppHeader,
  AppSidebar,
  AppSidebarNav,
} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify'

import { shopRoutes } from 'routes'
import {
  AuthActions,
  CommonActions
} from 'services/global'
import { ThemeProvider, createGlobalStyle  } from 'styled-components';
import { darkTheme, lightTheme } from 'layouts/theme/theme'
import { GlobalStyles } from 'layouts/theme/global'
import { mainNavigation, accountSettingsNavigation, shopSettingsNavigation } from 'constants/navigation'

import {
  Aside,
  Footer,
  Loading
} from 'components'

import Header from './header'

import './style.scss'

import shopIcon from 'assets/images/brand/shop-brand.png'
const userId = window.localStorage.getItem('userId')

const mapStateToProps = (state) => {
  return ({
    version: state.common.version
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    authActions: bindActionCreators(AuthActions, dispatch),
    commonActions: bindActionCreators(CommonActions, dispatch)
  })
}

class ShopLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: 'light'
    }
  }

  componentDidMount () {
    // if (!window.localStorage.getItem('accessToken')) {
    //   this.props.history.push('/login')
    // } else {
    //   this.props.authActions.checkAuthStatus().catch(err => {
    //     this.props.authActions.logOut()
    //     this.props.history.push('/login')
    //   })
    //   this.props.commonActions.getSimpleVATVersion()
    //   const toastifyAlert = (status, message) => {
    //     if (!message) {
    //       message = 'Unexpected Error'
    //     }
    //     if (status === 'success') {
    //       toast.success(message, {
    //         position: toast.POSITION.TOP_RIGHT
    //       })
    //     } else if (status === 'error') {
    //       toast.error(message, {
    //         position: toast.POSITION.TOP_RIGHT
    //       })
    //     } else if (status === 'warn') {
    //       toast.warn(message, {
    //         position: toast.POSITION.TOP_RIGHT
    //       })
    //     } else if (status === 'info') {
    //       toast.info(message, {
    //         position: toast.POSITION.TOP_RIGHT
    //       })
    //     }
    //   }
    //   this.props.commonActions.setTostifyAlertFunc(toastifyAlert)
    // }
  }

  changeTheme() {
    const theme = window.localStorage.getItem('theme') || 'light'
    window.localStorage.setItem('theme', theme == 'light'? 'dark': 'light')

    this.setState({theme: theme == 'light'? 'dark': 'light'})
  }

  render() {
    const containerStyle = {
      zIndex: 1999
    }

    return (
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
          <div className="shop-container bg-white">
            <div className="app">
              
              <div className="shop-content flex-column">
                <AppHeader>
                  <Suspense fallback={Loading()}>
                    <Header {...this.props}/>
                  </Suspense>
                </AppHeader>
              
                <section className="pb-3">
                    <div className="text-center align-items-center logo-content">
                        <h4 className="mb-0 mt-3 mb-3">PixelStore</h4>
                        <img src={shopIcon} width="130" height="130" style={{borderRadius: '50%'}}/>
                    </div>
                    <Card className="report-count mb-2 mt-3 ml-auto mr-auto pt-1 pb-1 pl-3 pr-3 flex-row" 
                      style={{width: 'fit-content'}}>
                        <span className="text-green mr-2">20</span>
                        <span className=""></span>
                        <span className="text-grey pl-2 pr-2">2</span>
                        <span className=""></span>
                        <span className="text-red ml-2">27</span>
                    </Card>
                    <div>
                        <Nav className="d-flex flex-row justify-content-center" navbar>
                            <NavItem className="px-3">
                                <NavLink to={`/${userId}/shop/products`} className="nav-link" >Products</NavLink>
                            </NavItem>
                            <NavItem className="px-3">
                                <NavLink to={`/${userId}/shop/contact`} className="nav-link">Contact</NavLink>
                            </NavItem>
                            <NavItem className="px-3">
                                <NavLink to={`/${userId}/shop/feedback`} className="nav-link">Feedback</NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </section>
              </div>
              <div style={{backgroundColor: '#F5F5FE'}}>
                <div className=" shop-content mb-5 p-3">
                    <Container className="p-0" fluid>
                      <Suspense fallback={Loading()}>
                        <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
                        <Switch>
                          {
                            shopRoutes.map((prop, key) => {
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
                        </Switch>
                      </Suspense>
                      
                    </Container>
                  </div>
                  <p className="text-center text-grey footer-report pb-4">
                  Copyright by Sellix.io - <a href="mailto:abuse@sellix.io">Report Abuse</a>
                </p>
              </div>
              
            </div>
          </div>
        </ThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopLayout)
