import { CATEGORY } from 'constants/types'
import {
  api,
  authApi,
  formData
} from 'utils'

// Get Category List
export const getCategoryList = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: '/self/categories'
    }

    return authApi(data).then(res => {
      dispatch({
        type: CATEGORY.ALL_CATEGORY,
        payload: res.data.categories
      })
      return res
    }).catch(err => {
      throw err
    })
  }
}

// Save Category Order
export const saveCategoryOrder = (ids) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: '/categories/sort',
      data: formData(ids)
    }

    return authApi(data).then(res => {
      if(res.status == 200)
        return res
      else throw res
    }).catch(err => {
      throw err
    })
  }
}