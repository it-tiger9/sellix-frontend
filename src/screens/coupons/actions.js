import { COUPONS } from 'constants/types'
import {
  api,
  authApi,
  formData
} from 'utils'

export const deleteCoupon = (coupon) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `coupons/delete`,
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

export const getCoupons = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: `self/coupons`
    }

    return authApi(data).then(res => {
      if (res.status === 200) {
        dispatch({
          type: COUPONS.COUPONS,
          payload: res.data.coupons
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
