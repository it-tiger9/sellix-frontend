import { COMMON } from 'constants/types'

const initState = {
  is_loading: false,
  version: '',
  tostifyAlertFunc: null
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
    
    default:
        return state
  }
}

export default CommonReducer