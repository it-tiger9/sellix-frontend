import { QUERIES } from 'constants/types'
import {
  api,
  authApi,
  formData
} from 'utils'

export const getQueries = () => {
  return (dispatch) => {
    let data = {
      method: 'GET',
      url: `/self/queries`
    }

    return authApi(data).then(res => {
      if (res.status === 200) {
        console.log({res})
        dispatch({
          type: QUERIES.QUERIES_LIST,
          payload: res.data.queries
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

export const replyQuerie = (feedback) => {
  return (dispatch) => {
    let data = {
      method: 'POST',
      url: `/queries/reply`,
      data: formData(feedback)
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



// export const getProductList = () => {
//   return (dispatch) => {
//     // let data = {
//     //   method: 'GET',
//     //   url: `rest/product/getproduct`
//     // }

//     // return authApi(data).then(res => {

//     //   dispatch({
//     //     type: PRODUCT.PRODUCT_LIST,
//     //     payload: res.data
//     //   })
//     //   return res
//     // }).catch(err => {
//     //   throw err
//     // })
//     dispatch({
//       type: PRODUCT.PRODUCT_LIST,
//       payload: {
//         data: [{
//           id: '4bf2b681',
//           title: 'Finn Daly',
//           email: 'FinFDaly44@outlook.com',
//           status: 'open',
//           updatedAt: '3 days ago'
//         }, {
//           id: '4bf2b681',
//           title: 'Finn Daly',
//           email: 'FinFDaly44@outlook.com',
//           status: 'closed',
//           updatedAt: '3 days ago'
//         }, {
//           id: '4bf2b681',
//           title: 'Finn Daly',
//           email: 'FinFDaly44@outlook.com',
//           status: 'open',
//           updatedAt: '3 days ago'
//         }, {
//           id: '4bf2b681',
//           title: 'My account has not been upgraded yet. Please help me.',
//           email: 'FinFDaly44@outlook.com',
//           status: 'open',
//           updatedAt: '3 days ago'
//         }, {
//           id: '4bf2b681',
//           title: 'Finn Daly',
//           email: 'FinFDaly44@outlook.com',
//           status: 'closed',
//           updatedAt: '3 days ago'
//         },{
//           id: '4bf2b681',
//           title: 'Finn Daly',
//           email: 'FinFDaly44@outlook.com',
//           status: 'open',
//           updatedAt: '3 days ago'
//         },{
//           id: '4bf2b681',
//           title: 'Finn Daly',
//           email: 'FinFDaly44@outlook.com',
//           status: 'closed',
//           updatedAt: '3 days ago'
//         }]
//       }
//     })
//   }
// }


// // Get Product By ID
// export const getProductByID = (id) => {
//   return (dispatch) => {
//     let data = {
//       method: 'GET',
//       url: `rest/product/editproduct?id=${id}`
//     }

//     return authApi(data).then(res => {
//       return res
//     }).catch(err => {
//       throw err
//     })
//   }
// }


// // Create & Save Product
// export const createAndSaveProduct = (product) => {
//   return (dispatch) => {
//     let data = {
//       method: 'POST',
//       url: `/rest/product/saveproduct?id=1`,
//       data: product
//     }

//     return authApi(data).then(res => {
//       return res
//     }).catch(err => {
//       throw err
//     })
//   }
// }



// // Create Warehouse
// export const createWarehouse = (warehouse) => {
//   let data = {
//     method: 'POST',
//     url: `/rest/product/savewarehouse`,
//     data: warehouse
//   }

//   return authApi(data).then(res => {
//     return res
//   }).catch(err => {
//     throw err
//   })
// }


// // Get Product Warehouse
// export const getProductWareHouseList = () => {
//   return (dispatch) => {
//     let data = {
//       method: 'GET',
//       url: '/rest/product/getwarehouse'
//     }

//     return authApi(data).then(res => {
//       dispatch({
//         type: PRODUCT.PRODUCT_WHARE_HOUSE,
//         payload: res
//       })
//       return res
//     }).catch(err => {
//       throw err
//     })
//   }
// }


// // Get Product VatCategory
// export const getProductVatCategoryList = () => {
//   return (dispatch) => {
//     let data = {
//       method: 'GET',
//       url: '/rest/product/getvatpercentage'
//     }

//     return authApi(data).then(res => {
//       dispatch({
//         type: PRODUCT.PRODUCT_VAT_CATEGORY,
//         payload: res
//       })
//       return res
//     }).catch(err => {
//       throw err
//     })
//   }
// }


// // Get Parent Product
// export const getParentProductList = () => {
//   return (dispatch) => {
//     let data = {
//       method: 'GET',
//       url: '/rest/product/getproduct'
//     }

//     return authApi(data).then(res => {
//       dispatch({
//         type: PRODUCT.PRODUCT_PARENT,
//         payload: res
//       })
//       return res
//     }).catch(err => {
//       throw err
//     })
//   }
// }
