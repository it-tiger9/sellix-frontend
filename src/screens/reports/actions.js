import { ANALYTICS } from 'constants/types'
import {
  formData,
  authApi
} from 'utils'

// Get Report List
export const getReports = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: '/self/analytics/reports'
    }

    return authApi(data).then(res => {
      dispatch({
        type: ANALYTICS.ALL_REPORTS,
        payload: res.data.analytics
      })
      return res
    }).catch(err => {
      throw err
    })
  }
}


// Create Report
export const createReport = (period) => {
  console.log('11111')
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: 'analytics/create',
      data: formData(period)
    }

    return authApi(data).then(res => {
      if (res.status === 200) {
        dispatch({
          type: ANALYTICS.NEW_REPORT,
          payload: res.data.report
        })
      }
      
      return res
    }).catch(err => {
      throw err
    })
  }
}

