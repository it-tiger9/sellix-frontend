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


export const getBankAccountByID = (_id) => {
  return (dispatch) => {
    let data = {
      method: 'get',
      url: `rest/bank/getbyid?id=${_id}`
    }
    return authApi(data).then(res => {
      if (res.status == 200) {
        return res.data
      } else {
        throw new Error('Some Error detected. ')
      }
    }).catch(err => {
      throw err
    })
  }
}


export const updateBankAccount = (obj) => {
  return (dispatch) => {
    let url = `rest/bank/${obj.bankAccountId}?bankAccountId=${obj.bankAccountId}`
    for (let key in obj) {
      url += `&${key}=${obj[key]}`
    }
    let data = {
      method: 'put',
      url
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