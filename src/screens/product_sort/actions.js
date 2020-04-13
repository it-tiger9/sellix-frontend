import { PRODUCT } from 'constants/types'
import {
  api,
  authApi,
  formData
} from 'utils'

// Get Product List
export const getProductList = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: '/self/products'
    }

    return authApi(data).then(res => {
      dispatch({
        type: PRODUCT.ALL_PRODUCTS,
        payload: res.data.products
      })
      return res
    }).catch(err => {
      throw err
    })
  }
}


// Save Product Order
export const saveProductOrder = (ids) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: '/products/sort',
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