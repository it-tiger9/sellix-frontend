import { VAT } from 'constants/types'
import {
  api,
  authApi
} from 'utils'



// Get transaction report
export const getTransactionReport = (params) => {
  let data = {
    method: 'POST',
    url: '/rest/transactionreport/view',
    data: params
  }

  return authApi(data).then(res => {
    return res
  }).catch(err => {
    throw err
  })
}


// Get transaction category
export const getTransactionCategory = (selectedType) => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: `/rest/transactionreport/gettransactioncategories?transactionTypeCode=${selectedType}`
    }

    return authApi(data).then(res => {
      return res
    }).catch(err => {
      throw err
    })
  }
}


// Get transaction category
export const getTransactionType = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: '/rest/transactionreport/gettransactiontypes'
    }

    return authApi(data).then(res => {
      return res
    }).catch(err => {
      throw err
    })
  }
}
