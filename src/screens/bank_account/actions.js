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

export const getBankAccountList = () => {
  return (dispatch) => {
    let data = {
      method: 'get',
      url: 'rest/bank/getbanklist'
    }
    return authApi(data).then(res => {
      if (res.status == 200) {
        dispatch({
          type: BANK_ACCOUNT.BANK_ACCOUNT_LIST,
          payload: {
            data: Object.assign([], res.data)
          } 
        })
      }
    }).catch(err => {
      throw err
    })
  }
}


export const deleteBankAccount = (_id) => {
  return (dispatch) => {
    let data = {
      method: 'delete',
      url: `rest/bank/deletebank?id=${_id}`
    }
    return authApi(data).then(res => {
      return res
    }).catch(err => {
      throw err
    })
  }
}


export const removeBankAccountByID = (_id) => {
  return (dispatch) => {
    let data = {
      method: 'delete',
      url: `rest/bank/${_id}`
    }
    return authApi(data).then(res => {
      return res
    }).catch(err => {
      throw err
    })
  }
}

export const removeBulkBankAccount = (obj) => {
  return (dispatch) => {
    let data = {
      method: 'delete',
      url: 'rest/bank/multiple',
      data: obj
    }
    return authApi(data).then(res => {
      return res
    }).catch(err => {
      throw err
    })
  }
}



