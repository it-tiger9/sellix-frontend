import { CATEGORY } from 'constants/types'

const initState = {
  all_categories: [],
  current_category: {}
}

const CategoryReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {
    case CATEGORY.ALL_CATEGORY:
      return {
        ...state,
        all_categories: Object.assign([], payload)
      }
    case CATEGORY.CURRENT_CATEGORY:
      return {
        ...state,
        current_category: Object.assign([], payload)
      }

    default:
      return state
  }
}

export default CategoryReducer