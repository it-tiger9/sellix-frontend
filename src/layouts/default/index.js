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

class DefaultLayout extends React.Component {
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
      <div className="admin-container">
        <div className="app">
          <AppHeader fixed>
            <Suspense fallback={Loading()}>
              <Header {...this.props} theme={theme} changeTheme={this.changeTheme.bind(this)} />
            </Suspense>
          </AppHeader>
          <div className="app-body mt-5 mb-5 pt-5">
              <Container className="p-0 pt-3" fluid>
                <Suspense fallback={Loading()}>
                  <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
                  <Switch>
                    {
                      paymentRoutes.map((prop, key) => {
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
            <AppAside>
              <Suspense fallback={Loading()}>
                <Aside />
              </Suspense>
            </AppAside>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout)
