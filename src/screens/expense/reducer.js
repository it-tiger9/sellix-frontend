import { EXPENSE } from 'constants/types'

const initState = {
  expense_list: []
}

const ExpenseReducer = (state = initState, action) => {
  const { type, payload} = action
  
  switch(type) {

    case EXPENSE.EXPENSE_LIST:
      return {
        ...state,
        expense_list: Object.assign([], payload.data)
      }

    default:
      return state
  }
}

export default ExpenseReducer