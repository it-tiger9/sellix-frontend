import { PRODUCT } from 'constants/types'
import {
  api,
  authApi,
  formData
} from 'utils'

export const createFeedback = (feedback) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `/feedbacks/send`,
      data: formData(feedback)
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