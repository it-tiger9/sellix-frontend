import { NOTIFICATION } from 'constants/types'
import {
  api,
  authApi,
  formData
} from 'utils'


// Save Notification
export const saveNotificationSettings = (settings) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `/settings/notifications`,
      data: formData(settings)
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
