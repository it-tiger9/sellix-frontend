import { COUPONS } from 'constants/types'

const initState = {
  coupons: []
}

const Coupons = (state = initState, action) => {
  const { type, payload} = action
  switch(type) {
    case COUPONS.COUPONS:
      return {
        ...state,
        coupons: Object.assign([], payload)
      }
    default:
      return state
  }
}

export default Coupons