import { PRODUCT } from 'constants/types'

const initState = {
  all_products: [],
  product_list: []
}

const ProductReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {
    case PRODUCT.ALL_PRODUCTS:
      return {
        ...state,
        all_products: Object.assign([], payload)
      }

    case PRODUCT.PRODUCT_LIST:
      return {
        ...state,
        product_list: Object.assign([], payload.data)
      }

    default:
      return state
  }
}

export default ProductReducer