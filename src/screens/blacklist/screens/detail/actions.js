import {
  authApi,
  formData
} from 'utils'

export const editBlacklist = (blacklistEdit) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `blacklists/edit`,
      data: formData(blacklistEdit)
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