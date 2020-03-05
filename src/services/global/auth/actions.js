import { AUTH } from 'constants/types'
import {
  api,
  authApi,
  formData
} from 'utils'

export const checkAuthStatus = () => {
  return (dispatch) => {
    let data = {
      method: 'get',
      url: '/rest/user/current'
    }
    return authApi(data).then(res => {
      if (res.status == 200) {
        dispatch({
          type: AUTH.SIGNED_IN
        })
        dispatch({
          type: AUTH.USER_PROFILE,
          payload: {
            data: res.data
          }
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

export const logOut = () => {
  return (dispatch) => {
    window.localStorage.removeItem('accessToken')
    dispatch({
      type: AUTH.SIGNED_OUT
    })
  }
}
