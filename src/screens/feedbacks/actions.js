import { FEEDBACKS } from 'constants/types'
import {
  api,
  formData,
  authApi
} from 'utils'


export const getFeedbacks = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: `self/feedback`
    }

    return authApi(data).then(res => {
      if (res.status === 200) {
        dispatch({
          type: FEEDBACKS.FEEDBACKS,
          payload: res.data.feedbacks
        })
        console.log({res})
        return res
        
      } else {
        throw res
      }     
    }).catch(err => {
      throw err
    })
  }
}

export const replyFeedback = (feedback) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `/feedback/reply`,
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


