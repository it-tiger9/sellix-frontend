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
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify'

import { ThemeProvider, createGlobalStyle  } from 'styled-components';
import { darkTheme, lightTheme } from 'layouts/theme/theme'
import { GlobalStyles } from 'layouts/theme/global'

import { adminRoutes } from 'routes'
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
    version: state.common.version,
    user: state.auth.profile,
    is_authed: state.auth.is_authed
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    authActions: bindActionCreators(AuthActions, dispatch),
    commonActions: bindActionCreators(CommonActions, dispatch)
  })
}

class AdminLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: window.localStorage.getItem('theme') || 'light'
    }
  }

  componentDidMount () {
    if (!window.localStorage.getItem('accessToken')) {
      this.props.history.push('/login')
    } else {
      this.props.authActions.getSelfUser().catch(err => {
        this.props.authActions.logOut()
        this.props.history.push('/login')
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

    const theme = window.localStorage.getItem('theme') || this.state || 'light'
    console.log(this.props.user)
    return (
      <ThemeProvider theme={theme=='light'?lightTheme:darkTheme}>
        <GlobalStyles />
        <div className="admin-container">
          <div className="app">
            <AppHeader fixed>
              <Suspense fallback={Loading()}>
                <Header {...this.props} theme={theme} changeTheme={this.changeTheme.bind(this)}/>
              </Suspense>
            </AppHeader>
            <div className="app-body">
              <AppSidebar  className="pt-4 mb-5" fixed display="lg">
                <Suspense>
                  <AppSidebarNav navConfig={mainNavigation} {...this.props} router={router}/>
                </Suspense>
              </AppSidebar>
              <main className="main mb-5">
                <Container className="p-0" fluid>
                  <Suspense fallback={Loading()}>
                    <ToastContainer position="top-right" autoClose={5000} style={containerStyle} hideProgressBar={true}/>
                    <Switch>
                      {
                        adminRoutes.map((prop, key) => {
                          if (prop.redirect)
                            return <Redirect from={prop.path} to={prop.pathTo} key={key} />
                          return (
                            <Route
                              path={prop.path}
                              component={prop.component}
                              exact={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout)
