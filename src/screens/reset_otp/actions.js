import { USER } from 'constants/types'
import {
  api,
  authApi,
  formData
} from 'utils'

export const resetOTP = (obj) => {
  return (dispatch) => {
    let data = {
      method: 'post',
      url: '/reset/otp',
      data: formData(obj)
    }
    return authApi(data).then(res => {
      if(res && res.status == 200) {
        return res
      } else if(res && res.status == 202) {
        return res
      } else throw res
    }).catch(err => {
      throw err
    })
  }
}