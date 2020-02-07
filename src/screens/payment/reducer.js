import { PAYMENT } from 'constants/types'

const initState = {
  payment_list: []
}

const PaymentReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {

    case PAYMENT.PAYMENT_LIST:
      return {
        ...state,
        payment_list: Object.assign([], payload.data)
      }

    default:
      return state
  }
}

export default PaymentReducer