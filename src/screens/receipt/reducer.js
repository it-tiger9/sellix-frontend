import { RECEIPT } from 'constants/types'

const initState = {
  receipt_list: []
}

const TempReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {

    case RECEIPT.RECEIPT_LIST:
      return {
        ...state,
        receipt_list: Object.assign([], payload.data)
      }

    default:
      return state
  }
}

export default TempReducer