import { QUERIES, QUERIE } from 'constants/types'

const initState = {
  queries_list: [],
  querie: []
}


const Queries = (state = initState, action) => {
  const { type, payload} = action
  switch(type) {
    case QUERIES.QUERIES_LIST:
      return {
        ...state,
        queries_list: Object.assign([], payload)
      }
      case QUERIE.QUERIE:
      return {
        ...state,
        querie: Object.assign([], payload)
      }
    default:
      return state
  }
}

export default Queries