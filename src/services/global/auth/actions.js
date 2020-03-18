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
      url: `/check/${window.localStorage.getItem('accessToken')}`
    }
    return authApi(data).then(res => {
      if (!res.error) {
        dispatch({
          type: AUTH.SIGNED_IN
        })
        dispatch({
          type: AUTH.USER_PROFILE,
          payload: {
            data: res
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
        
        let data1 = {
          method: 'get',
          url: `/check/${res.data.token}`
        }

        return authApi(data1).then(user => {
          dispatch({
            type: AUTH.SIGNED_IN
          })
  
          window.localStorage.setItem('accessToken', res.data.token)
          window.localStorage.setItem('userId', user.username)
        })
        
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
    window.localStorage.removeItem('userId')
    dispatch({
      type: AUTH.SIGNED_OUT
    })
  }
}
