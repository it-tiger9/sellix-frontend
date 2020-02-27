import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
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
  Header,
  Footer,
  Loading
} from 'components'

import './style.scss'

import shopIcon from 'assets/images/brand/shop.svg'

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
    this.setState({
      theme: this.state.theme == 'light'? 'dark': 'light'
    })
  }

  render() {
    const containerStyle = {
      zIndex: 1999
    }

    const {theme} = this.state

    let isSettings = this.props.location.pathname.includes('/admin/settings')?true:false

    return (
      <ThemeProvider theme={theme=='light'?lightTheme:darkTheme}>
        <GlobalStyles />
          <div className="admin-container">
            <div className="app">
              <AppHeader>
                <Suspense fallback={Loading()}>
                  <Header {...this.props} theme={theme} changeTheme={this.changeTheme.bind(this)}  />
                </Suspense>
              </AppHeader>
              <div className="app-body flex-column">
                <section className="mt-4 pt-5 pb-4">
                    <div className="br-2 bg-primary logo-background"></div>
                    <div className="text-center align-items-center logo-content">
                        <h4 className="text-white mb-3">PixelStore</h4>
                        <Card className="bg-white mb-0 ml-auto mr-auto pt-1 pb-1 pl-3 pr-3 flex-row" style={{width: 'fit-content'}}>
                            <span className="text-green mr-2">20</span>
                            <span className="">|</span>
                            <span className="text-grey pl-2 pr-2">2</span>
                            <span className="">|</span>
                            <span className="text-red ml-2">20</span>
                        </Card>
                        <img src={shopIcon} width="150" height="150"/>
                    </div>
                    <div>
                        <Nav className="d-flex flex-row justify-content-center" navbar>
                            <NavItem className="px-3">
                                <NavLink to="/shop/products" className="nav-link" >Products</NavLink>
                            </NavItem>
                            <NavItem className="px-3">
                                <NavLink to="/shop/contact" className="nav-link">Contact</NavLink>
                            </NavItem>
                            <NavItem className="px-3">
                                <NavLink to="/shop/feedbacks" className="nav-link">Feedback</NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </section>
                <main className="main mt-3 mb-5">
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
                </main>
              </div>
            </div>
          </div>
        </ThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopLayout)
