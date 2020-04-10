import { ORDER } from 'constants/types'
import {
  api,
  authApi,
  formData
} from 'utils'

// Get Invoice List
export const getOrderList = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: '/self/invoices'
    }

    return authApi(data).then(res => {
      dispatch({
        type: ORDER.ALL_ORDERS,
        payload: res.data.invoices
      })
      return res
    }).catch(err => {
      throw err
    })
  }
}


// Get Invoice By ID
export const getOrderByID = (id) => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: `/invoices/unique/${id}`
    }

    return authApi(data).then(res => {
      return res
    }).catch(err => {
      throw err
    })
  }
}


// Resend Invoice
export const resendInvoice = (invoice) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `/invoices/resend`,
      data: formData(invoice)
    }

    return authApi(data).then(res => {
      return res
    }).catch(err => {
      throw err
    })
  }
}