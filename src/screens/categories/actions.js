import { CATEGORY } from 'constants/types'
import {
  authApi,
  formData
} from 'utils'

// Get Category List
export const getCategoryList = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: '/self/categories'
    }

    return authApi(data).then(res => {
      dispatch({
        type: CATEGORY.ALL_CATEGORY,
        payload: res.data.categories
      })
      return res
    }).catch(err => {
      throw err
    })
  }
}


// Get Category By ID
export const getCategoryByID = (id) => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: `categories/unique/${id}`
    }

    return authApi(data).then(res => {
      if (res.status === 200) {
        dispatch({
          type: CATEGORY.CURRENT_CATEGORY,
          payload: res.data.category
        })
        return res
      } else {
        throw res
      }     
    }).catch(err => {
      throw err
    })
  }
}

// Create New Category
export const createCategory = (category) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `categories/create`,
      data: formData(category)
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


// Save Category
export const editCategory = (category) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `categories/edit`,
      data: formData(category)
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


// Delete Category
export const deleteCategory = (category) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `categories/delete`,
      data: formData(category)
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