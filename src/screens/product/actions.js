import { PRODUCT } from 'constants/types'
import {
  authApi,
  formData
} from 'utils'


// Get Product List
export const getProductList = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: '/self/products'
    }

    return authApi(data).then(res => {
      dispatch({
        type: PRODUCT.ALL_PRODUCTS,
        payload: res.data.products
      })
      return res
    }).catch(err => {
      throw err
    })
  }
}


// Get Product By ID
export const getProductByID = (id) => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: `products/unique/${id}`
    }

    return authApi(data).then(res => {
      if (res.status === 200) {
        // dispatch({
        //   type: PRODUCT.CURRENT_PRODUCT,
        //   payload: res.data.product
        // })
        return res
      } else {
        throw res
      }     
    }).catch(err => {
      throw err
    })
  }
}


// Create New Product
export const createProduct = (product) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `products/create`,
      data: formData(product)
    }

    return authApi(data).then(res => {
      if (res.status === 200) {
        return res
      } else {
        throw res
      }
    }).catch(err => {
      throw err
    })
  }
}


// Save Product
export const editProduct = (product) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `products/edit`,
      data: formData(product)
    }

    return authApi(data).then(res => {
      if (res.status === 200) {
        return res
      } else {
        throw res
      }
    }).catch(err => {
      throw err
    })
  }
}


// Delete Product
export const deleteProduct = (product) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `products/delete`,
      data: formData(product)
    }

    return authApi(data).then(res => {
      if (res.status === 200) {
        return res
      } else {
        throw res
      }
    }).catch(err => {
      throw err
    })
  }
}