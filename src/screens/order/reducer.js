import { ORDER } from 'constants/types'

const initState = {
  order_list : []
}

const InvoiceReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {

    case ORDER.ALL_ORDERS:
      return {
        ...state,
        order_list: Object.assign([], payload)
      }

    default:
      return state
  }
}

export default InvoiceReducer