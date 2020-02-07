import { CUSTOMER_INVOICE } from 'constants/types'

const initState = {
  customer_invoice_list: []
}

const CustomerInvoiceReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {

    case CUSTOMER_INVOICE.CUSTOMER_INVOICE_LIST:
      return {
        ...state,
        customer_invoice_list: Object.assign([], payload.data)
      }

    default:
      return state
  }
}

export default CustomerInvoiceReducer