import { BEGINING_BALANCE } from 'constants/types'

const initState = {
}

const BeginingBalanceReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {

    default:
      return state
  }
}

export default BeginingBalanceReducer