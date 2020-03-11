import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import { Container } from 'reactstrap'
import {
  AppAside,
  AppBreadcrumb,
  AppHeader,
  AppSidebar,
  AppSidebarNav,
} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify'
import { ThemeProvider, createGlobalStyle  } from 'styled-components';
import { darkTheme, lightTheme } from 'layouts/theme/theme'
import { GlobalStyles } from 'layouts/theme/global'

import { settingsRoutes } from 'routes'
import {
  AuthActions,
  CommonActions
} from 'services/global'

import { mainNavigation, accountSettingsNavigation, shopSettingsNavigation } from 'constants/navigation'

import {
  Aside,
  Header,
  Footer,
  Loading
} from 'components'

import './style.scss'

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

class SettingsLayout extends React.Component {
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
              <AppHeader fixed>
                <Suspense fallback={Loading()}>
                  <Header {...this.props} theme={theme} changeTheme={this.changeTheme.bind(this)}  />
                </Suspense>
              </AppHeader>
              <div className="app-body">
                <AppSidebar fixed className="pt-4 mb-5" display="lg">
                  <Suspense>
                    <AppSidebarNav navConfig={mainNavigation} {...this.props} />
                  </Suspense>
                </AppSidebar>
                
                <main className="main mt-5 mb-5 settings-main">
                  <div className="pt-3 mb-5 mr-3 settings-sidebar" display="lg">
                    <Suspense>
                      <h4 style={{color: 'black', fontSize: '16px'}}>Settings</h4>
                      <h4 className="settings-title mt-5">Account</h4>
                      <AppSidebarNav navConfig={accountSettingsNavigation} {...this.props} />
                      <h4 className="settings-title mt-5">Shop</h4>
                      <AppSidebarNav navConfig={shopSettingsNavigation} {...this.props} />
                    </Suspense>
                  </div>
                  <Container className="p-0" fluid>
                    <Suspense fallback={Loading()}>
                      <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
                      <Switch>
                        {
                          settingsRoutes.map((prop, key) => {
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
                <AppAside>
                  <Suspense fallback={Loading()}>
                    <Aside />
                  </Suspense>
                </AppAside>
              </div>
            </div>
          </div>
        </ThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsLayout)
