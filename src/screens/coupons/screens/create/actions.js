import {
  api,
  authApi,
  formData
} from 'utils'
import { PRODUCTS } from 'constants/types'

export const createCoupon = (coupon) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `/coupons/create`,
      data: formData(coupon)
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

export const getProducts = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: `/self/products`
    }

    return authApi(data).then(res => {
      if (res.status === 200) {
        dispatch({
          type: PRODUCTS.PRODUCTS,
          payload: res.data.products
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
