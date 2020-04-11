import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import * as router from 'react-router-dom';
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

import { paymentRoutes } from 'routes'
import {
  AuthActions,
  CommonActions
} from 'services/global'


import {
  Aside,
  Header,
  Footer,
  Loading
} from 'components'

import './style.scss'
import { invoiceRoutes } from '../../routes';

const mapStateToProps = (state) => {
  return ({
    version: state.common.version,
    is_authed: state.auth.is_authed
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    authActions: bindActionCreators(AuthActions, dispatch),
    commonActions: bindActionCreators(CommonActions, dispatch)
  })
}

class DefaultLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: 'light'
    }
  }

  componentDidMount () {
      this.props.authActions.getSelfUser().catch(err => {
        this.props.authActions.logOut()
      })
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

  changeTheme() {
    const theme = window.localStorage.getItem('theme') || 'light'
    window.localStorage.setItem('theme', theme == 'light'? 'dark': 'light')

    this.setState({theme: theme == 'light'? 'dark': 'light'})
  }

  render() {
    const containerStyle = {
      zIndex: 1999
    }

    const theme = window.localStorage.getItem('theme') || this.state.theme || 'light'
    let isSettings = this.props.location.pathname.includes('/admin/settings')?true:false

    return (
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
          <div className="admin-container">
            <div className="app">
              <AppHeader fixed>
                <Suspense fallback={Loading()}>
                  <Header {...this.props} theme={theme} changeTheme={this.changeTheme.bind(this)} isShop={true}/>
                </Suspense>
              </AppHeader>
              
              <div className="app-body mt-5 mb-5 pt-5">
                  <Container className="p-0 pt-3" fluid>
                    <Suspense fallback={Loading()}>
                      <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
                      <Switch>
                        {
                          invoiceRoutes.map((prop, key) => {
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
      </ThemeProvider>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout)
