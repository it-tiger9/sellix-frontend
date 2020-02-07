import { USER } from 'constants/types'

const initState = {
  user_list: []
}

const UserReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {
    
    case USER.USER_LIST:
      return {
        ...state,
        user_list: Object.assign([], payload.data)
      }

    default:
      return state
  }
}

export default UserReducer