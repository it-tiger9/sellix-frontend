import { BLACKLIST } from '../../constants/types'

const initState = {
  blacklist_list: []
}

const Blacklist = (state = initState, action) => {
  const { type, payload} = action
  switch(type) {
    case BLACKLIST.BLACKLIST_LIST:
      return {
        ...state,
        blacklist_list: Object.assign([], payload)
      }
    default:
      return state
  }
}

export default Blacklist