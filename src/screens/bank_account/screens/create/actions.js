import { BANK_ACCOUNT } from 'constants/types'
import {
  api,
  authApi
} from 'utils'

export const getAccountTypeList = () => {
  return (dispatch) => {
    let data ={
      method: 'get',
      url: 'rest/bank/getaccounttype'
    }
    return authApi(data).then(res => {
      if (res.status == 200) {
        dispatch({
          type: BANK_ACCOUNT.ACCOUNT_TYPE_LIST,
          payload: {
            data: res.data
          }
        })
      }
    }).catch(err => {
      throw err
    })
  }
}

export const getCurrencyList = () => {
  return (dispatch) => {
    let data = {
      method: 'get',
      url: 'rest/bank/getcurrenncy'
    }
    return authApi(data).then(res => {
      if (res.status == 200) {
        dispatch({
          type: BANK_ACCOUNT.CURRENCY_LIST,
          payload: {
            data: res.data
          }
        })
      }
    }).catch(err => {
      throw err
    })
  }
}

export const getCountryList = () => {
  return (dispatch) => {
    let data = {
      method: 'get',
      url: 'rest/datalist/getcountry'
    }
    return authApi(data).then(res => {
      if (res.status == 200) {
        dispatch({
          type: BANK_ACCOUNT.COUNTRY_LIST,
          payload: {
            data: res.data
          }
        })
      }
    }).catch(err => {
      throw err
    })
  }
}


export const createBankAccount = (obj) => {
  return (dispatch) => {
    let data = {
      method: 'post',
      url: 'rest/bank',
      data: obj
    }
    return authApi(data).then(res => {
      return res
    }).catch(err => {
      throw err
    })
  }
}
