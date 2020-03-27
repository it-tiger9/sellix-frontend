import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { ToastContainer, toast } from 'react-toastify'
import { initialRoutes } from 'routes'
import {
  AuthActions,
  CommonActions
} from 'services/global'
import {NotFound} from 'components'

import './style.scss'

const mapStateToProps = (state) => {
  return ({
  })
}
const mapDispatchToProps = (dispatch) => {
  return ({
    authActions: bindActionCreators(AuthActions, dispatch),
    commonActions: bindActionCreators(CommonActions, dispatch)
  })
}

class InitialLayout extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
    const preUrl = `/${window.localStorage.getItem('userId')}`
      

    if (window.localStorage.getItem('accessToken')) {
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

    return (
      <div className="initial-container">
        <ToastContainer position="top-right" autoClose={5000} style={containerStyle} hideProgressBar={true}/>
        <Switch>
          {
            initialRoutes.map((prop, key) => {
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
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InitialLayout)
