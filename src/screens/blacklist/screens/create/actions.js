import {
  authApi,
  formData
} from 'utils'

export const createBlacklist = (blacklist) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `/blacklists/create`,
      data: formData(blacklist)
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