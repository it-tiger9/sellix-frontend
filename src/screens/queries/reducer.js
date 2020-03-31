import { QUERIES } from 'constants/types'

const initState = {
  queries_list: [],
}


const Queries = (state = initState, action) => {
  const { type, payload} = action
  switch(type) {
    case QUERIES.QUERIES_LIST:
      return {
        ...state,
        queries_list: Object.assign([], payload)
      }
    default:
      return state
  }
}

export default Queries