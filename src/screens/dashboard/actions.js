import { DASHBOARD } from 'constants/types'
import {
  api,
  authApi
} from 'utils'

// Get Product By ID
export const getAnalyticsData = (startdate, enddate) => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: `/self/analytics?from=${startdate}&to=${enddate}&year=true`
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
