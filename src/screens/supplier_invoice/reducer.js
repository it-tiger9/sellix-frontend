import { SUPPLIER_INVOICE } from 'constants/types'

const initState = {
  supplier_invoice_list: []
}

const SupplierInvoiceReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {

    case SUPPLIER_INVOICE.SUPPLIER_INVOICE_LIST:
      return {
        ...state,
        supplier_invoice_list: Object.assign([], payload.data)
      }

    default:
      return state
  }
}

export default SupplierInvoiceReducer