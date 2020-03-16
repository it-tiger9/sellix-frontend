import {
  api,
  authApi,
  formData
} from 'utils'

export const editCoupon = (couponEdit) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `coupons/edit`,
      data: formData(couponEdit)
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
