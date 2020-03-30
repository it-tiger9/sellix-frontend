import { COMMON } from 'constants/types'

const initState = {
  is_loading: false,
  version: '',
  tostifyAlertFunc: null,
  general_info: {},
  user_feedback: [],
  user_categories: [],
  user_products: []
}

const CommonReducer = (state = initState, action) => {
  const { type, payload } = action
  
  switch(type){

    case COMMON.START_LOADING:
      return {
        ...state,
        is_loading: true,
      }
      
    case COMMON.END_LOADING:
      return {
        ...state,
        is_loading: false,
      }
    
    case COMMON.TOSTIFY_ALERT_FUNC:
      return {
        ...state,
        tostifyAlertFunc: payload.data
      }
    
    case COMMON.TOSTIFY_ALERT:
      if (state.tostifyAlertFunc) {
        state.tostifyAlertFunc(payload.status, payload.message)
      }

    case COMMON.VAT_VERSION:
      return {
        ...state,
        version: payload.data
      }

    case COMMON.GENERAL_USER_INFO:
      return {
        ...state,
        general_info: Object.assign({}, payload.user)
      }

    case COMMON.USER_FEEDBACKS:
      return {
        ...state,
        user_feedback: Object.assign([], payload.feedbacks)
      }

    case COMMON.USER_CATEGORY:
      return {
        ...state,
        user_categories: Object.assign([], payload.categories)
      }

    case COMMON.USER_PRODUCTS:
      return {
        ...state,
        user_products: Object.assign([], payload.products)
      }
    
    default:
        return state
  }
}

export default CommonReducer