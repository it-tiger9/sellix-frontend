import { USERS_ROLES } from 'constants/types'

const initState = {
}

const UsersRolesReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {

    default:
      return state
  }
}

export default UsersRolesReducer