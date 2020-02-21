import { PRODUCT } from 'constants/types'
import {
  api,
  authApi
} from 'utils'

export const getProductList = () => {
  return (dispatch) => {
    // let data = {
    //   method: 'GET',
    //   url: `rest/product/getproduct`
    // }

    // return authApi(data).then(res => {

    //   dispatch({
    //     type: PRODUCT.PRODUCT_LIST,
    //     payload: res.data
    //   })
    //   return res
    // }).catch(err => {
    //   throw err
    // })
    dispatch({
      type: PRODUCT.PRODUCT_LIST,
      payload: {
        data: [{
          id: '11111',
          url: 'htpps://selly.io/dashboard',
          events: 1,
          retries: 1,
          sentAt: 'sentat@mail.com',
          status: 'Live'
        }, {
          id: '11111',
          url: 'htpps://selly.io/dashboard',
          events: 1,
          retries: 1,
          sentAt: 'sentat@mail.com',
          status: 'Live'
        }, {
          id: '11111',
          url: 'htpps://selly.io/dashboard',
          events: 1,
          retries: 1,
          sentAt: 'sentat@mail.com',
          status: 'Live'
        }, {
          id: '11111',
          url: 'htpps://selly.io/dashboard',
          events: 1,
          retries: 1,
          sentAt: 'sentat@mail.com',
          status: 'Live'
        }, {
          id: '11111',
          url: 'htpps://selly.io/dashboard',
          events: 1,
          retries: 1,
          sentAt: 'sentat@mail.com',
          status: 'Live'
        },{
          id: '11111',
          url: 'htpps://selly.io/dashboard',
          events: 1,
          retries: 1,
          sentAt: 'sentat@mail.com',
          status: 'Live'
        },{
          id: '11111',
          url: 'htpps://selly.io/dashboard',
          events: 1,
          retries: 1,
          sentAt: 'sentat@mail.com',
          status: 'Live'
        }]
      }
    })
  }
}


// Get Product By ID
export const getProductByID = (id) => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: `rest/product/editproduct?id=${id}`
    }

    return authApi(data).then(res => {
      return res
    }).catch(err => {
      throw err
    })
  }
}


// Create & Save Product
export const createAndSaveProduct = (product) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `/rest/product/saveproduct?id=1`,
      data: product
    }

    return authApi(data).then(res => {
      return res
    }).catch(err => {
      throw err
    })
  }
}



// Create Warehouse
export const createWarehouse = (warehouse) => {
  let data = {
    method: 'POST',
    url: `/rest/product/savewarehouse`,
    data: warehouse
  }

  return authApi(data).then(res => {
    return res
  }).catch(err => {
    throw err
  })
}


// Get Product Warehouse
export const getProductWareHouseList = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: '/rest/product/getwarehouse'
    }

    return authApi(data).then(res => {
      dispatch({
        type: PRODUCT.PRODUCT_WHARE_HOUSE,
        payload: res
      })
      return res
    }).catch(err => {
      throw err
    })
  }
}


// Get Product VatCategory
export const getProductVatCategoryList = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: '/rest/product/getvatpercentage'
    }

    return authApi(data).then(res => {
      dispatch({
        type: PRODUCT.PRODUCT_VAT_CATEGORY,
        payload: res
      })
      return res
    }).catch(err => {
      throw err
    })
  }
}


// Get Parent Product
export const getParentProductList = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: '/rest/product/getproduct'
    }

    return authApi(data).then(res => {
      dispatch({
        type: PRODUCT.PRODUCT_PARENT,
        payload: res
      })
      return res
    }).catch(err => {
      throw err
    })
  }
}
