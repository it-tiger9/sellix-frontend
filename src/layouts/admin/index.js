import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import { Container } from 'reactstrap'
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react'
import { ToastContainer, toast } from 'react-toastify'

import { adminRoutes } from 'routes'
import {
  AuthActions,
  CommonActions
} from 'services/global'

import navigation from 'constants/navigation'

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

class AdminLayout extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
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

  render() {

    const containerStyle = {
      zIndex: 1999
    }

    return (
      <div className="admin-container">
        <div className="app">
          <AppHeader fixed>
            <Suspense fallback={Loading()}>
              <Header {...this.props} />
            </Suspense>
          </AppHeader>
          <div className="app-body">
            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
                <AppSidebarNav navConfig={navigation} {...this.props} />
              </Suspense>
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
            <main className="main">
              <AppBreadcrumb appRoutes={adminRoutes} />
              <Container fluid>
                <Suspense fallback={Loading()}>
                  <ToastContainer position="top-right" autoClose={5000} style={containerStyle} />
                  <Switch>
                    {
                      adminRoutes.map((prop, key) => {
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
          <AppFooter>
            <Suspense fallback={Loading()}>
              <Footer {...this.props} />
            </Suspense>
          </AppFooter>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout)
