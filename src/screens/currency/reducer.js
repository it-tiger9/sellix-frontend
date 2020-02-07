import { CURRENCY } from 'constants/types'

const initState = {
}

const CurrencyReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {

    default:
      return state
  }
}

export default CurrencyReducer