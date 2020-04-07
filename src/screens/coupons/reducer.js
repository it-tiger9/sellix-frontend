import { COUPONS, PRODUCTS } from 'constants/types'

const initState = {
  coupons: [],
  products: []
}

const Coupons = (state = initState, action) => {
  const { type, payload } = action
  switch (type) {
    case COUPONS.COUPONS:
      return {
        ...state,
        coupons: Object.assign([], payload)
      }
    case PRODUCTS.PRODUCTS:
      return {
        ...state,
        products: Object.assign([], payload)
      }
    default:
      return state
  }
}

export default Coupons