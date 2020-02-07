import { EMPLOYEE } from 'constants/types'

const initState = {
}

const EmployeeReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {

    default:
      return state
  }
}

export default EmployeeReducer