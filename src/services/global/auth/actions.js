import { AUTH } from 'constants/types'
import {
  api,
  authApi,
  formData
} from 'utils'

export const checkJWT = () => {
  return (dispatch) => {
    let data = {
      method: 'get',
      url: `/self`
    }
    return authApi(data).then(res => {
      if (!res.error) {
        dispatch({
          type: AUTH.SIGNED_IN
        })
        dispatch({
          type: AUTH.USER_PROFILE,
          payload: {
            data: (res.data || {}).user || {}
          }
        })
        return res
      } else {
        throw new Error('Auth Failed')
      }
    }).catch(err => {
      throw err
    })
  }
}

export const getSelfUser = () => {
  return (dispatch) => {
    let data = {
      method: 'get',
      url: `/self`
    }
    return authApi(data).then(res => {
      if (!res.error) {
        dispatch({
          type: AUTH.SIGNED_IN
        })
        dispatch({
          type: AUTH.USER_PROFILE,
          payload: {
            data: (res.data || {}).user || {}
          }
        })

        window.localStorage.setItem('userId', res.data.user.username)
        return res
      } else {
        throw res
      }
    }).catch(err => {
      throw err
    })
  }
}


export const markAsRead = () => {
  return (dispatch) => {
    let data = {
      method: 'post',
      url: `/notifications/read`
    }
    return authApi(data).then(res => {
      if (!res.error) {
        dispatch({
          type: AUTH.MARK_AS_READ,
        })
      } else {
        throw new Error('Auth Failed')
      }
    }).catch(err => {
      throw err
    })
  }
}

export const logIn = (obj) => {
  return (dispatch) => {
    let data = {
      method: 'post',
      url: '/login',
      data: formData(obj)
    }
    return api(data).then(res => {
      if(res && res.status == 200) {
        dispatch({
          type: AUTH.SIGNED_IN
        })
        window.localStorage.setItem('accessToken', res.data.token)
        return res
      } else if(res && res.status == 202) {
        window.localStorage.setItem('accessToken', res.data.token)
        return res
      } else throw res
    }).catch(err => {
      throw err
    })
  }
}


export const EmailAuthentication = (obj) => {
  return (dispatch) => {
    let data = {
      method: 'post',
      url: '/auth/2fa/email',
      data: formData(obj)
    }
    return authApi(data).then(res => {
      if(res && res.status == 200) {
        dispatch({
          type: AUTH.SIGNED_IN
        })
        window.localStorage.setItem('accessToken', res.data.token)
        return res
      } else if(res && res.status == 202) {
        window.localStorage.setItem('accessToken', res.data.token)
        return res
      } else throw res
    }).catch(err => {
      throw err
    })
  }
}


export const OTPAuthentication = (obj) => {
  return (dispatch) => {
    let data = {
      method: 'post',
      url: '/auth/2fa/otp',
      data: formData(obj)
    }
    return authApi(data).then(res => {
      if(res && res.status == 200) {
        dispatch({
          type: AUTH.SIGNED_IN
        })
        window.localStorage.setItem('accessToken', res.data.jwt)
        return res
      } else throw res
    }).catch(err => {
      throw err
    })
  }
}

export const register = (obj) => {
  return (dispatch) => {
    let data = {
      method: 'post',
      url: '/register',
      data: formData(obj)
    }
    return api(data).then(res => {
      if(res && res.status == 200) {
        dispatch({
          type: AUTH.SIGNED_IN
        })
        
        window.localStorage.setItem('accessToken', res.data.token)
        return res
      } else throw res
    }).catch(err => {
      throw err
    })
  }
}


export const requestNewPassword = (obj) => {
  return (dispatch) => {
    let data = {
      method: 'post',
      url: '/reset/request',
      data: formData(obj)
    }
    return api(data).then(res => {
      if(res && res.status == 200) {
        return res
      } else throw res
    }).catch(err => {
      throw err
    })
  }
}


export const resetPassword = (obj) => {
  return (dispatch) => {
    let data = {
      method: 'post',
      url: '/reset/password',
      data: formData(obj)
    }
    return api(data).then(res => {
      if(res && res.status == 200) {
        return res
      } else throw res
    }).catch(err => {
      throw err
    })
  }
}



export const getUserSettings = () => {
  return (dispatch) => {
    let data = {
      method: 'get',
      url: '/self/settings',
    }

    return authApi(data).then(res => {
      if(res && res.status == 200) {
        dispatch({
          type: AUTH.USER_SETTINGS,
          payload: res.data.settings
        })
        return res
      } else throw res
    }).catch(err => {
      throw err
    })
  }
}

export const logOut = () => {
  window.localStorage.removeItem('accessToken')
  window.localStorage.removeItem('userId')
  return (dispatch) => {
    dispatch({
      type: AUTH.SIGNED_OUT
    })
  }
}
