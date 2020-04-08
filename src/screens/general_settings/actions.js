import { SETTINGS } from 'constants/types'
import {
  api,
  authApi,
  formData
} from 'utils'

// Save saveGeneralSettings
export const saveGeneralSettings = (settings) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `/settings/general`,
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