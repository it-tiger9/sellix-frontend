import {
  authApi,
  formData
} from 'utils'
import { BLACKLIST } from '../../constants/types'

export const getBlacklist = (id) => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: `/self/blacklists`
    }

    return authApi(data).then(res => {
      if (res.status === 200) {
        dispatch({
          type: BLACKLIST.BLACKLIST_LIST,
          payload: res.data.blacklists
        })
        return res
      } else {
        throw res
      }     
    }).catch(err => {
      throw err
    })
  }
}

export const deleteFromBlacklist = (category) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `blacklists/delete`,
      data: formData(category)
    }
    return authApi(data).then(res => {
      if (res.status === 200) {
        return res
      } else {
        throw res
      }
    }).catch(err => {
      throw err
    })
  }
}



