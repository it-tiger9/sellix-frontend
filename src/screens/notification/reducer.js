import { NOTIFICATION } from 'constants/types'

const initState = {
}

const NotificationReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {

    default:
      return state
  }
}

export default NotificationReducer