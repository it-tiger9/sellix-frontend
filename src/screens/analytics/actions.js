import { PRODUCT } from 'constants/types'
import {
  api,
  authApi
} from 'utils'

// Get Product By ID
export const getAnalyticsData = (startdate, enddate) => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: `/self/analytics?from=${startdate}&to=${enddate}`
    }

    return authApi(data).then(res => {
      if (res.status === 200) {
        console.log(res)
        return res
      } else {
        throw res
      }     
    }).catch(err => {
      throw err
    })
  }
}