import { FEEDBACKS } from 'constants/types'

const initState = {
  feedbacks: []
}

const Feedbacks = (state = initState, action) => {
  const { type, payload} = action
  switch(type) {
    case FEEDBACKS.FEEDBACKS:
      return {
        ...state,
        feedbacks: Object.assign([], payload)
      }
    default:
      return state
  }
}



export default Feedbacks