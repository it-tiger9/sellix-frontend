import {
  api,
  authApi,
  formData
} from 'utils'

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
