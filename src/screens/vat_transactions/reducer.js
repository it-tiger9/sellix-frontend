import { VAT_TRANSACTIONS } from 'constants/types'

const initState = {
}

const VatTransactionsReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {

    default:
      return state
  }
}

export default VatTransactionsReducer