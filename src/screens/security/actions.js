import { CONTACT } from 'constants/types'
import {
  api,
  authApi,
  formData
} from 'utils'

// Save Securitt Actions
export const saveSecurity = (security) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `settings/security`,
      data: formData(security)
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
