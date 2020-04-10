import { COMMON } from 'constants/types'
import {
  api,
  authApi,
  formData
} from 'utils'

export const startRequest = () => {
  return (dispatch) => {
    dispatch({
      type: COMMON.START_LOADING
    })
  }
}

export const endRequest = () => {
  return (dispatch) => {
    dispatch({
      type: COMMON.END_LOADING
    })
  }
}


export const checkDiscordChannel = (channel) => {
  return (dispatch) => {
    let data = {
      method: 'post',
      url: `/discord/try`,
      data: formData(channel)
    }
    return authApi(data).then(res => {
      if(res && res.status == 200) {
        return res
      } else throw res
    }).catch(err => {
      throw err
    })
  }
}



export const getGeneralUserInfo = (username) => {
  return (dispatch) => {
    let data = {
      method: 'get',
      url: `/users/${username}`,
    }
    return api(data).then(res => {
      if(res && res.status == 200) {
        console.log(res)
        dispatch({
          type: COMMON.GENERAL_USER_INFO,
          payload: res.data
        })
        // return res
      } else throw res
    }).catch(err => {
      throw err
    })
  }
}


export const createInvoice = (obj) => {
  return (dispatch) => {
    let data = {
      method: 'post',
      url: '/invoices/create',
      data: formData(obj)
    }
    return api(data).then(res => {
      if(res && res.status == 200) {
        return res
      } else throw res
    }).catch(err => {
      throw err
    })
  }
}

export const getUserFeedbacks = (username) => {
  return (dispatch) => {
    let data = {
      method: 'get',
      url: `/feedback/user/${username}`,
    }
    return api(data).then(res => {
      if(res && res.status == 200) {
        dispatch({
          type: COMMON.USER_FEEDBACKS,
          payload: res.data
        })
        return res
      } else throw res
    }).catch(err => {
      throw err
    })
  }
}


export const getUserProductById = (id) => {
  return (dispatch) => {
    let data = {
      method: 'get',
      url: `/products/unique/${id}`,
    }
    return api(data).then(res => {
      if(res && res.status == 200) {
        return res
      } else throw res
    }).catch(err => {
      throw err
    })
  }
}


export const getInvoice = (id) => {
  return (dispatch) => {
    let data = {
      method: 'get',
      url: `/invoices/unique/${id}`,
    }
    return api(data).then(res => {
      if(res && res.status == 200) {
        return res
      } else throw res
    }).catch(err => {
      throw err
    })
  }
}



export const getPayPalInvoice = (id) => {
  console.log(id)
  return (dispatch) => {
    let data = {
      method: 'get',
      url: `/invoices/paypal/${id}`,
    }
    return api(data).then(res => {
      console.log(res)
      if(res && res.status == 200) {
        return res
      } else throw res
    }).catch(err => {
      throw err
    })
  }
}

export const getUserCategories = (username) => {
  return (dispatch) => {
    let data = {
      method: 'get',
      url: `/categories/user/${username}/listed`,
    }
    return api(data).then(res => {
      if(res && res.status == 200) {
        dispatch({
          type: COMMON.USER_CATEGORY,
          payload: res.data
        })
        return res
      } else throw res
    }).catch(err => {
      throw err
    })
  }
}


export const getUserProducts = (username) => {
  return (dispatch) => {
    let data = {
      method: 'get',
      url: `/products/user/${username}`,
    }
    return api(data).then(res => {
      if(res && res.status == 200) {
        dispatch({
          type: COMMON.USER_PRODUCTS,
          payload: res.data
        })
        return res
      } else throw res
    }).catch(err => {
      throw err
    })
  }
}





export const getUserProductsByCategory = (filter) => {
  return (dispatch) => {
    let data = {
      method: 'get',
      url: `/categories/unique/${filter}`,
    }
    return api(data).then(res => {
      console.log(res)
      if(res && res.status == 200) {
        dispatch({
          type: COMMON.USER_PRODUCTS,
          payload: {products: res.data.category.products_bound}
        })
        return res
      } else throw res
    }).catch(err => {
      throw err
    })
  }
}

export const setTostifyAlertFunc = (func) => {
  return (dispatch) => {
    dispatch({
      type: COMMON.TOSTIFY_ALERT_FUNC,
      payload: {
        data: func
      }
    })
  }
}

export const tostifyAlert = (status, message) => {
  return (dispatch) => {
    dispatch({
      type: COMMON.TOSTIFY_ALERT,
      payload: {
        status,
        message
      }
    })
  }
}


