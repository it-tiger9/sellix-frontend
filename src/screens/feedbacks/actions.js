import { FEEDBACKS } from 'constants/types'
import {
  api,
  authApi
} from 'utils'


export const getFeedbacks = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: `self/feedbacks`
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


