import { AUTH } from 'constants/types'
import {
  api,
  authApi
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
      url: '/auth/token',
      data: obj
    }
    return api(data).then(res => {
      dispatch({
        type: AUTH.SIGNED_IN
      })
      window.localStorage.setItem('accessToken', res.data.token)
      return res
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
